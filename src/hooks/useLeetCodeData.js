import { useEffect, useState } from "react";
import { LEETCODE_USERNAME } from "../config/site";

const LC_CACHE_KEY = `portfolio_lc_stats_v1_${LEETCODE_USERNAME}`;
const LC_CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function normalizeStats(payload) {
  if (!payload || typeof payload !== "object") return null;
  if (payload.data && typeof payload.data === "object") {
    const inner = normalizeStats(payload.data);
    if (inner) return inner;
  }
  const total =
    payload.totalSolved ??
    payload.total_solved ??
    (payload.submitStats?.acSubmissionNum || []).find(
      (x) => x?.difficulty === "All"
    )?.count;
  const easy =
    payload.easySolved ??
    payload.easy_solved ??
    (payload.submitStats?.acSubmissionNum || []).find(
      (x) => x?.difficulty === "Easy"
    )?.count;
  const medium =
    payload.mediumSolved ??
    payload.medium_solved ??
    (payload.submitStats?.acSubmissionNum || []).find(
      (x) => x?.difficulty === "Medium"
    )?.count;
  const hard =
    payload.hardSolved ??
    payload.hard_solved ??
    (payload.submitStats?.acSubmissionNum || []).find(
      (x) => x?.difficulty === "Hard"
    )?.count;
  const ranking =
    payload.ranking ?? payload.profile?.ranking ?? payload.userRanking;
  if (total == null && easy == null) return null;
  return {
    totalSolved: total ?? null,
    easySolved: easy ?? null,
    mediumSolved: medium ?? null,
    hardSolved: hard ?? null,
    ranking: ranking ?? null,
    acceptanceRate: payload.acceptanceRate ?? null,
  };
}

async function tryFetchJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) return null;
  return res.json();
}

function loadLeetCodeCache() {
  try {
    const raw = localStorage.getItem(LC_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.t || !parsed.stats) return null;
    if (Date.now() - parsed.t > LC_CACHE_MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveLeetCodeCache(stats, source) {
  try {
    if (!stats || typeof stats !== "object") return;
    localStorage.setItem(
      LC_CACHE_KEY,
      JSON.stringify({ t: Date.now(), stats, source: source || "live" })
    );
  } catch {
    /* quota / private mode */
  }
}

export function useLeetCodeData() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState("unavailable");
  const [fromCache, setFromCache] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const u = encodeURIComponent(LEETCODE_USERNAME);

    async function load() {
      setLoading(true);
      setError(null);
      setSource("unavailable");
      setFromCache(false);
      const urls = [
        `https://alfa-leetcode-api.onrender.com/${u}`,
        `https://leetcode-api-faisalshohag.vercel.app/${u}`,
        `https://leetcode-stats-api.herokuapp.com/${u}`,
      ];

      try {
        const cached = loadLeetCodeCache();
        if (cached && cached.stats && !cancelled) {
          setStats(cached.stats);
          setSource(cached.source || "cache");
          setFromCache(true);
          setLastUpdated(cached.t || null);
        }

        for (const url of urls) {
          if (cancelled) return;
          try {
            const data = await tryFetchJson(url);
            const n = normalizeStats(data);
            if (n) {
              if (!cancelled) {
                setStats(n);
                setSource(url);
                setFromCache(false);
                setLastUpdated(Date.now());
              }
              saveLeetCodeCache(n, url);
              return;
            }
          } catch {
            /* try next */
          }
        }
        if (!cancelled && !cached) setStats(null);
      } catch (e) {
        if (!cancelled) {
          const cached = loadLeetCodeCache();
          if (cached?.stats) {
            setStats(cached.stats);
            setSource(cached.source || "cache");
            setFromCache(true);
            setLastUpdated(cached.t || null);
            setError(null);
          } else {
            setError(e.message || "LeetCode unavailable");
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

  const cardImageUrl = `https://leetcard.jacoblin.cool/${encodeURIComponent(
    LEETCODE_USERNAME
  )}?theme=dark&font=Baloo_2&ext=heatmap`;

  return {
    stats,
    loading,
    error,
    source,
    fromCache,
    lastUpdated,
    username: LEETCODE_USERNAME,
    profileUrl: `https://leetcode.com/${LEETCODE_USERNAME}/`,
    cardImageUrl,
  };
}
