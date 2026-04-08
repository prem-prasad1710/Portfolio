import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  SITE,
  GITHUB_USERNAME,
  LEETCODE_USERNAME,
  CURRENTLY,
  FUN_FACTS,
  PRINCIPLES,
} from "../../config/site";
import { useProfileData } from "../../context/ProfileDataContext";

const PROMPT = "prem@paytm:~/portfolio$";

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
  "A SQL query walks into a bar, walks up to two tables and asks: Can I JOIN you?",
  "There are 10 kinds of people: those who understand binary and those who don't.",
  "I would tell you a UDP joke, but you might not get it.",
  "rm -rf / feelings — backup first.",
  "YAML: Yet Another Mistake, Likely.",
];

const HELP = `Commands (try tab-completion vibes ✨):
  help, ?          This list
  whoami           GitHub handle
  role             Job title
  where            Location
  bio              One-liner about me
  skills           Stack teaser
  repos            Repo names from GitHub (or fallback)
  recent, hot      Top 5 repos by latest pushes / commits
  social           Profile links
  projects         Jump to Projects page
  leetcode         Open LeetCode profile
  joke             Random dev joke
  fact, shuffle    Random line from FUN_FACTS (site config)
  now, status      Human “currently” snapshot (focus, learning, TZ)
  principles       How I work (values from site config)
  matrix           A tiny fiction break
  konami           Hint for a site-wide keyboard easter egg
  stats            Repo & follower snapshot (from API when available)
  clear            Clear your session output
  echo <text>      Parrot mode 🦜
  skip             Skip the intro animation`;

function PortfolioTerminal() {
  const navigate = useNavigate();
  const { github } = useProfileData();
  const { repos, profile, usingFallback, loading, recentWork } = github;

  const [bootLines, setBootLines] = useState([]);
  const [partial, setPartial] = useState("");
  const [bootDone, setBootDone] = useState(false);
  const [session, setSession] = useState([]);
  const [input, setInput] = useState("");
  const lineRef = useRef(0);
  const charRef = useRef(0);
  const timerRef = useRef(null);
  const cancelledRef = useRef(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const script = useMemo(
    () => [
      ["cmd", "whoami"],
      ["out", GITHUB_USERNAME],
      ["cmd", "cat ./role.md"],
      ["out", `${SITE.role} @ ${SITE.company}`],
      ["cmd", "echo $LOCATION"],
      ["out", SITE.location],
      ["cmd", "grep -o '^.*' ./focus.txt"],
      ["out", "Shipping reliable software · APIs · UX · performance"],
      ["cmd", "npm run mantra --silent"],
      ["out", "Build. Measure. Iterate."],
    ],
    []
  );

  const scrollBottom = useCallback(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollBottom();
  }, [bootLines, partial, bootDone, session, scrollBottom]);

  useEffect(() => {
    if (!bootDone) return undefined;
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [bootDone]);

  useEffect(() => {
    cancelledRef.current = false;

    function schedule(fn, ms) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(fn, ms);
    }

    function tick() {
      if (cancelledRef.current) return;
      const i = lineRef.current;
      if (i >= script.length) {
        setPartial("");
        setBootDone(true);
        return;
      }
      const [kind, text] = script[i];

      if (kind === "cmd") {
        const c = charRef.current;
        if (c < text.length) {
          charRef.current = c + 1;
          setPartial(text.slice(0, c + 1));
          schedule(tick, 32);
        } else {
          setBootLines((prev) => [...prev, { kind: "cmd", text }]);
          setPartial("");
          charRef.current = 0;
          lineRef.current = i + 1;
          schedule(tick, 200);
        }
      } else {
        setBootLines((prev) => [...prev, { kind: "out", text }]);
        const next = i + 1;
        lineRef.current = next;
        if (next >= script.length) {
          setBootDone(true);
          setPartial("");
          return;
        }
        schedule(tick, 85);
      }
    }

    lineRef.current = 0;
    charRef.current = 0;
    setBootLines([]);
    setPartial("");
    setBootDone(false);
    setSession([]);
    tick();

    return () => {
      cancelledRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [script]);

  const skipIntro = useCallback(() => {
    cancelledRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    const done = [];
    script.forEach(([k, t]) => {
      done.push({ kind: k, text: t });
    });
    setBootLines(done);
    setPartial("");
    lineRef.current = script.length;
    charRef.current = 0;
    setBootDone(true);
  }, [script]);

  const runCommand = useCallback(
    (raw) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const rest = parts.slice(1).join(" ");

      let out = "";

      if (cmd === "help" || cmd === "?" || cmd === "man") {
        out = HELP;
      } else if (cmd === "whoami") {
        out = GITHUB_USERNAME;
      } else if (cmd === "role") {
        out = `${SITE.role} @ ${SITE.company}`;
      } else if (cmd === "where" || cmd === "location") {
        out = SITE.location;
      } else if (cmd === "bio" || cmd === "about") {
        out = SITE.bio;
      } else if (cmd === "skills" || cmd === "stack") {
        out =
          "TypeScript · JavaScript · Python · Go · React · Node · Next.js · Cloud · AI APIs — full grid on About.";
      } else if (cmd === "recent" || cmd === "hot") {
        if (loading) {
          out = "Still loading recent activity…";
        } else if (!recentWork.length) {
          out =
            "No recent-activity list yet. Wait for GitHub to load or open the Projects page.";
        } else {
          out = recentWork
            .map((r, i) => {
              const day = r.activityAt ? String(r.activityAt).slice(0, 10) : "?";
              const bump =
                r.commitsInLastPush != null && r.source === "push_event"
                  ? ` (+${r.commitsInLastPush} in last push)`
                  : "";
              return `  ${i + 1}. ${r.name} — ${day}${bump}`;
            })
            .join("\n");
        }
      } else if (cmd === "repos" || cmd === "ls") {
        if (loading) {
          out = "Still fetching from GitHub… try again in a second!";
        } else if (repos.length === 0) {
          out = "No repos in memory right now. Try the Projects page.";
        } else {
          const slice = repos.slice(0, 12);
          out =
            slice.map((r) => `  • ${r.name} ★${r.stargazers_count ?? 0}`).join("\n") +
            (usingFallback
              ? "\n\n(hint: featured list — API was rate-limited; add REACT_APP_GITHUB_TOKEN for live data)"
              : "");
        }
      } else if (cmd === "social" || cmd === "links") {
        out = [
          `GitHub:   ${SITE.links.github}`,
          `LinkedIn: ${SITE.links.linkedin}`,
          `X:        ${SITE.links.twitter}`,
          `LeetCode: ${SITE.links.leetcode(LEETCODE_USERNAME)}`,
          `Instagram:${SITE.links.instagram}`,
        ].join("\n");
      } else if (cmd === "projects") {
        navigate("/project");
        out = "Navigating to ./projects …";
      } else if (cmd === "leetcode" || cmd === "lc") {
        window.open(SITE.links.leetcode(LEETCODE_USERNAME), "_blank", "noopener,noreferrer");
        out = "Opening LeetCode in a new tab. Good luck on the grind! 💪";
      } else if (cmd === "github" || cmd === "gh") {
        window.open(SITE.links.github, "_blank", "noopener,noreferrer");
        out = "Opening GitHub profile…";
      } else if (cmd === "joke" || cmd === "fortune") {
        out = JOKES[Math.floor(Math.random() * JOKES.length)];
      } else if (cmd === "fact" || cmd === "shuffle") {
        if (!FUN_FACTS.length) {
          out = "No facts in site config — add FUN_FACTS in src/config/site.js.";
        } else {
          out = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
        }
      } else if (cmd === "now" || cmd === "status") {
        out = [
          `focus:    ${CURRENTLY.focus}`,
          `learning: ${CURRENTLY.learning}`,
          `timezone: ${CURRENTLY.timezone}`,
          `role:     ${SITE.role} @ ${SITE.company}`,
        ].join("\n");
      } else if (cmd === "principles" || cmd === "values") {
        out = PRINCIPLES.map((p) => `• ${p.title} — ${p.detail}`).join("\n");
      } else if (cmd === "matrix") {
        out = "Wake up, Neo…\n(Static site — no spoon, only HTML.)";
      } else if (cmd === "konami" || cmd === "easter") {
        out =
          "Keyboard combo: ↑ ↑ ↓ ↓ ← → ← → B A — try it anywhere on the site.";
      } else if (cmd === "clear") {
        setSession([]);
        return;
      } else if (cmd === "echo") {
        out = rest || "(silent echo…)";
      } else if (cmd === "skip") {
        out = "Intro already played — you're in interactive mode. Type help!";
      } else if (cmd === "stats") {
        const pr = profile?.public_repos;
        const fw = profile?.followers;
        out = [
          `login:       ${profile?.login ?? GITHUB_USERNAME}`,
          `public_repos:${pr ?? "—"}`,
          `followers:   ${fw ?? "—"}`,
          usingFallback ? "data_source:  fallback (rate limit — use token)" : "data_source:  live API",
        ].join("\n");
      } else {
        out = `command not found: ${parts[0]}. Type help for ideas.`;
      }

      setSession((prev) => [
        ...prev,
        { kind: "user", text: trimmed },
        { kind: "reply", text: out },
      ]);
    },
    [repos, profile, loading, usingFallback, navigate, recentWork]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const v = input;
    setInput("");
    runCommand(v);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const interactive = bootDone;

  return (
    <div className="dev-terminal dev-terminal--animated">
      <div className="dev-terminal__chrome">
        <span className="dev-terminal__dot dev-terminal__dot--r" />
        <span className="dev-terminal__dot dev-terminal__dot--y" />
        <span className="dev-terminal__dot dev-terminal__dot--g" />
        <span className="dev-terminal__title">playful-zsh — try typing below</span>
        {!bootDone ? (
          <button
            type="button"
            className="dev-terminal__skip"
            onClick={skipIntro}
          >
            Skip intro →
          </button>
        ) : null}
      </div>
      <div
        className="dev-terminal__body"
        ref={bodyRef}
        aria-label="Portfolio terminal"
      >
        {bootLines.map((line, idx) => (
          <p
            key={`b-${idx}-${line.text.slice(0, 8)}`}
            className="dev-terminal__line dev-terminal__line--pop"
          >
            {line.kind === "cmd" ? (
              <>
                <span className="dev-terminal__prompt">{PROMPT} </span>
                <span className="dev-terminal__cmd">{line.text}</span>
              </>
            ) : (
              <span
                className={
                  line.text.startsWith("Build.")
                    ? "dev-terminal__out dev-terminal__out--highlight"
                    : "dev-terminal__out"
                }
              >
                {line.text}
              </span>
            )}
          </p>
        ))}
        {partial ? (
          <p className="dev-terminal__line">
            <span className="dev-terminal__prompt">{PROMPT} </span>
            <span className="dev-terminal__cmd">{partial}</span>
            <span className="dev-terminal__cursor" />
          </p>
        ) : null}

        {session.map((line, idx) => (
          <p key={`s-${idx}`} className="dev-terminal__line dev-terminal__line--pop">
            {line.kind === "user" ? (
              <>
                <span className="dev-terminal__prompt">{PROMPT} </span>
                <span className="dev-terminal__cmd">{line.text}</span>
              </>
            ) : (
              <span className="dev-terminal__out dev-terminal__reply">
                {line.text}
              </span>
            )}
          </p>
        ))}

        {interactive ? (
          <>
            <p className="dev-terminal__hint dev-terminal__line--pop">
              ✨ Your turn — type <kbd>help</kbd> and press Enter
            </p>
            <form
              className="dev-terminal__form"
              onSubmit={onSubmit}
              autoComplete="off"
            >
              <span className="dev-terminal__prompt">{PROMPT}</span>
              <input
                ref={inputRef}
                className="dev-terminal__input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="help"
                aria-label="Type a terminal command"
                spellCheck={false}
              />
            </form>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default PortfolioTerminal;
