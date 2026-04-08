import { useEffect, useMemo, useState } from "react";
import {
  GITHUB_USERNAME,
  SITE,
  GITHUB_FALLBACK_REPOS,
  getGitHubFallbackProfile,
} from "../config/site";

const REPOS_CACHE_KEY = `portfolio_gh_repos_v2_${GITHUB_USERNAME}`;
const PROFILE_CACHE_KEY = `portfolio_gh_profile_v1_${GITHUB_USERNAME}`;
const CACHE_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

function sortRepos(repos) {
  const featured = new Map(
    SITE.featuredRepoNames.map((name, i) => [name.toLowerCase(), i])
  );
  const hidden = new Set(SITE.hiddenRepoNames.map((n) => n.toLowerCase()));

  const list = repos.filter(
    (r) => !r.archived && !hidden.has(r.name.toLowerCase())
  );

  return [...list].sort((a, b) => {
    const fa = featured.has(a.name.toLowerCase())
      ? featured.get(a.name.toLowerCase())
      : 999;
    const fb = featured.has(b.name.toLowerCase())
      ? featured.get(b.name.toLowerCase())
      : 999;
    if (fa !== fb) return fa - fb;
    const stars = (b.stargazers_count || 0) - (a.stargazers_count || 0);
    if (stars !== 0) return stars;
    return new Date(b.pushed_at) - new Date(a.pushed_at);
  });
}

function githubHeaders() {
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token && String(token).trim()) {
    headers.Authorization = `Bearer ${String(token).trim()}`;
  }
  return headers;
}

function isRateLimited(res) {
  return res.status === 429 || res.status === 403;
}

function loadReposFromCache() {
  try {
    const raw = localStorage.getItem(REPOS_CACHE_KEY);
    if (!raw) return null;
    const { t, repos } = JSON.parse(raw);
    if (!Array.isArray(repos) || !t || Date.now() - t > CACHE_MAX_AGE_MS) {
      return null;
    }
    return repos;
  } catch {
    return null;
  }
}

function saveReposToCache(repos) {
  try {
    if (!Array.isArray(repos) || repos.length === 0) return;
    localStorage.setItem(
      REPOS_CACHE_KEY,
      JSON.stringify({ t: Date.now(), repos })
    );
  } catch {
    /* quota / private mode */
  }
}

function loadProfileFromCache() {
  try {
    const raw = localStorage.getItem(PROFILE_CACHE_KEY);
    if (!raw) return null;
    const { t, profile } = JSON.parse(raw);
    if (!profile || typeof profile !== "object" || !t) return null;
    if (Date.now() - t > CACHE_MAX_AGE_MS) return null;
    return profile;
  } catch {
    return null;
  }
}

function saveProfileToCache(profile) {
  try {
    if (!profile || typeof profile !== "object") return;
    localStorage.setItem(
      PROFILE_CACHE_KEY,
      JSON.stringify({ t: Date.now(), profile })
    );
  } catch {
    /* quota / private mode */
  }
}

/**
 * Fetch every page of public repos (100 per page). type=all includes org/member
 * visibility the API exposes for this user (more than default type=owner).
 */
async function fetchAllUserRepos(headers, username) {
  const acc = [];
  let page = 1;
  const perPage = 100;
  const maxPages = 50;

  while (page <= maxPages) {
    const url = `https://api.github.com/users/${encodeURIComponent(
      username
    )}/repos?type=all&per_page=${perPage}&page=${page}&sort=updated`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      if (isRateLimited(res)) {
        return {
          repos: acc,
          stoppedReason: acc.length > 0 ? "rate_limited_mid" : "rate_limited_first",
        };
      }
      const t = await res.text();
      throw new Error(t || `GitHub repos ${res.status}`);
    }

    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    acc.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
  }

  return { repos: acc, stoppedReason: null };
}

function repoMapByFullName(repos) {
  const m = new Map();
  for (const r of repos) {
    const fn = (r.full_name || `${GITHUB_USERNAME}/${r.name}`).toLowerCase();
    m.set(fn, r);
  }
  return m;
}

function top5ByPushedAtItems(repos) {
  const list = [...repos].filter((r) => !r.archived);
  list.sort(
    (a, b) =>
      new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0)
  );
  return list.slice(0, 5).map((repo) => ({
    repo,
    activityAt: repo.pushed_at,
    commitsInLastPush: null,
    source: "pushed_at",
    displayFullName: repo.full_name || `${GITHUB_USERNAME}/${repo.name}`,
  }));
}

function recentFromPublicEvents(events, repoMap) {
  if (!Array.isArray(events)) return [];
  const seen = new Set();
  const out = [];
  for (const ev of events) {
    if (!ev || ev.type !== "PushEvent" || !ev.repo || !ev.repo.name) continue;
    const fullName = String(ev.repo.name);
    const key = fullName.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const repo = repoMap.get(key) || null;
    const commitsInLastPush =
      ev.payload?.distinct_size != null
        ? ev.payload.distinct_size
        : ev.payload?.size ?? null;
    out.push({
      repo,
      activityAt: ev.created_at,
      commitsInLastPush,
      source: "push_event",
      displayFullName: fullName,
    });
    if (out.length >= 5) break;
  }
  return out;
}

function normalizeRecentWork(items) {
  return items.map((item, i) => {
    const r = item.repo;
    const fullName =
      item.displayFullName ||
      r?.full_name ||
      `${GITHUB_USERNAME}/${r?.name || "repo"}`;
    const parts = fullName.split("/").filter(Boolean);
    const owner = parts[0] || GITHUB_USERNAME;
    const name = parts[1] || parts[0] || "repository";
    const html_url = r?.html_url || `https://github.com/${owner}/${name}`;

    return {
      key: String(r?.id ?? `${fullName}-${i}`),
      name: r?.name || name,
      full_name: r?.full_name || fullName,
      html_url,
      description: r?.description || "",
      language: r?.language,
      activityAt: item.activityAt,
      commitsInLastPush: item.commitsInLastPush,
      source: item.source,
      stargazers_count: r?.stargazers_count,
    };
  });
}

async function fetchRecentWork(headers, sortedRepos, cancelled) {
  if (cancelled || !sortedRepos.length) return [];
  let items = top5ByPushedAtItems(sortedRepos);
  try {
    const evRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`,
      { headers }
    );
    if (evRes.ok) {
      const events = await evRes.json();
      const map = repoMapByFullName(sortedRepos);
      const fromEv = recentFromPublicEvents(events, map);
      if (fromEv.length > 0) items = fromEv;
    }
  } catch {
    /* keep pushed_at ordering */
  }
  if (cancelled) return [];
  return normalizeRecentWork(items);
}

export function useGitHubData() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [recentWork, setRecentWork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [fromBrowserCache, setFromBrowserCache] = useState(false);
  const [repoFetchIncomplete, setRepoFetchIncomplete] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const userUrl = `https://api.github.com/users/${GITHUB_USERNAME}`;

    async function load() {
      setLoading(true);
      setError(null);
      setUsingFallback(false);
      setFromBrowserCache(false);
      setRepoFetchIncomplete(false);
      setRecentWork([]);

      const applyRecent = async (headers, sorted) => {
        const rw = await fetchRecentWork(headers, sorted, cancelled);
        if (!cancelled) setRecentWork(rw);
      };

      try {
        const headers = githubHeaders();
        const uRes = await fetch(userUrl, { headers });
        const uLimited = !uRes.ok && isRateLimited(uRes);

        let user = null;
        if (uRes.ok) {
          user = await uRes.json();
          saveProfileToCache(user);
        } else if (!uLimited) {
          const t = await uRes.text();
          throw new Error(t || `GitHub user ${uRes.status}`);
        }

        const cachedProfile = loadProfileFromCache();
        const resolvedProfile = user || cachedProfile || getGitHubFallbackProfile();

        const {
          repos: rawAccum,
          stoppedReason,
        } = await fetchAllUserRepos(headers, GITHUB_USERNAME);

        if (stoppedReason === "rate_limited_first") {
          const cachedRepos = loadReposFromCache();
          if (cachedRepos && cachedRepos.length > 0) {
            const sorted = sortRepos(cachedRepos);
            if (!cancelled) {
              setProfile(resolvedProfile);
              setRepos(sorted);
              setUsingFallback(false);
              setFromBrowserCache(true);
            }
            await applyRecent(headers, sorted);
            return;
          }

          const sorted = sortRepos([...GITHUB_FALLBACK_REPOS]);
          if (!cancelled) {
            setProfile(resolvedProfile);
            setRepos(sorted);
            setUsingFallback(true);
            setFromBrowserCache(false);
          }
          await applyRecent(headers, sorted);
          return;
        }

        if (stoppedReason === "rate_limited_mid") {
          const sorted = sortRepos(rawAccum);
          saveReposToCache(rawAccum);
          if (!cancelled) {
            setProfile(resolvedProfile);
            setRepos(sorted);
            setRepoFetchIncomplete(true);
            setUsingFallback(false);
            setFromBrowserCache(false);
          }
          await applyRecent(headers, sorted);
          return;
        }

        /* stoppedReason === null — all pages loaded (may be 0 repos) */
        {
          const sorted = sortRepos(Array.isArray(rawAccum) ? rawAccum : []);
          saveReposToCache(rawAccum);
          if (!cancelled) {
            setProfile(resolvedProfile);
            setRepos(sorted);
            setUsingFallback(!user || uLimited);
            setFromBrowserCache(false);
          }
          await applyRecent(headers, sorted);
        }
      } catch (e) {
        if (!cancelled) {
          const cachedRepos = loadReposFromCache();
          const cachedProfile = loadProfileFromCache();
          if (cachedRepos && cachedRepos.length > 0) {
            const sorted = sortRepos(cachedRepos);
            setProfile(cachedProfile || getGitHubFallbackProfile());
            setRepos(sorted);
            setUsingFallback(false);
            setFromBrowserCache(true);
            setError(null);
            const headers = githubHeaders();
            await fetchRecentWork(headers, sorted, cancelled).then((rw) => {
              if (!cancelled) setRecentWork(rw);
            });
          } else {
            setError(e.message || "Failed to load GitHub");
            setProfile(cachedProfile || null);
            setRepos([]);
            setRecentWork([]);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const sortedRepos = useMemo(() => repos, [repos]);

  return {
    profile,
    repos: sortedRepos,
    recentWork,
    loading,
    error,
    usingFallback,
    fromBrowserCache,
    repoFetchIncomplete,
    username: GITHUB_USERNAME,
  };
}
