/** Central profile & links — edit LeetCode username if it differs from GitHub. */
export const GITHUB_USERNAME = "prem-prasad1710";

/** LeetCode profile slug (URL: leetcode.com/<username>/) */
export const LEETCODE_USERNAME = "Prem_prasad";

export const SITE = {
  name: "Prem Prasad",
  shortTagline: "Software Engineer @ Paytm",
  location: "New Delhi, India",
  bio: `I build reliable, user-facing software at Paytm and ship side projects across the stack. I care about clean architecture, performance, and interfaces that feel effortless.`,
  company: "Paytm",
  role: "Software Engineer",
  links: {
    github: "https://github.com/prem-prasad1710",
    linkedin: "https://www.linkedin.com/in/prem-prasad1710/",
    twitter: "https://x.com/premprasad1710/",
    instagram: "https://www.instagram.com/callme_prem_kashyap/",
    leetcode: (u) => `https://leetcode.com/${u}/`,
  },
  featuredRepoNames: ["Weather-App"],
  hiddenRepoNames: [],
};

/** Public email — shown with copy button; leave "" to hide */
export const PUBLIC_EMAIL = "";

/**
 * “Live” snapshot — edit anytime so the site feels human, not frozen.
 */
export const CURRENTLY = {
  focus: "Payments-adjacent features & reliability at Paytm",
  learning: "Deeper distributed-systems intuition · AI-assisted workflows",
  timezone: "IST (UTC+5:30) — good overlap with US mornings",
};

/** Rotates on Home — keep them true to you */
export const FUN_FACTS = [
  "I treat every UI like it will be screenshared in a demo.",
  "I read error messages end-to-end before Stack Overflow.",
  "Chess taught me to think three moves ahead — same for refactors.",
  "I believe boring, tested code beats clever code in production.",
  "My git commits are small enough to bisect without tears.",
  "I still get a little happy when CI goes green on the first try.",
];

/** Short principles — shown on About */
export const PRINCIPLES = [
  { title: "Ship in slices", detail: "Small PRs, measurable outcomes." },
  { title: "Own the blast radius", detail: "Observability before scale." },
  { title: "Users over ego", detail: "Clarity beats cleverness." },
  { title: "Document the why", detail: "Future-you is a teammate." },
];

/** URL encoded in Resume QR (LinkedIn works everywhere) */
export function getResumeQrUrl() {
  return SITE.links.linkedin;
}

/**
 * Shown when GitHub REST API returns 403/429 (no token / shared IP limits).
 * Add REACT_APP_GITHUB_TOKEN in .env.local for live API data (5k req/hr for auth).
 */
export const GITHUB_FALLBACK_REPOS = [
  {
    id: "fb-weather",
    name: "Weather-App",
    description:
      "Weather app with clean UI — open on GitHub for full source.",
    html_url: "https://github.com/prem-prasad1710/Weather-App",
    homepage: "https://weatherease.netlify.app/",
    language: "JavaScript",
    topics: ["react", "weather", "api"],
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: new Date().toISOString(),
    fork: false,
    archived: false,
  },
  {
    id: "fb-movie",
    name: "Movie-Magnet",
    description:
      "Movie search & details — explore GitHub for more repos.",
    html_url: `https://github.com/${GITHUB_USERNAME}`,
    homepage: "https://movie-magnet17.netlify.app/",
    language: "JavaScript",
    topics: ["react", "movies", "spa"],
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: new Date().toISOString(),
    fork: false,
    archived: false,
  },
];

export function getGitHubFallbackProfile() {
  return {
    login: GITHUB_USERNAME,
    name: SITE.name,
    public_repos: GITHUB_FALLBACK_REPOS.length,
    followers: 0,
    created_at: null,
  };
}
