import React, { useEffect, useState, useCallback, useRef } from "react";
import { SITE, GITHUB_USERNAME, LEETCODE_USERNAME } from "../../config/site";

const PROMPT = "visitor@about:~$";

const SNIPPETS = [
  {
    id: "vibe",
    label: "./vibe.sh",
    cmd: "./vibe.sh",
    out: "Calm under load · curious by default · ships in small slices 🍰",
  },
  {
    id: "now",
    label: "cat ./now.txt",
    cmd: "cat ./now.txt",
    out: `Building at ${SITE.company} · sharpening systems & UX · side projects on GitHub.`,
  },
  {
    id: "hobbies",
    label: "grep hobbies ~/",
    cmd: "grep -R hobbies ~/",
    out: "chess · films & series · travel · good coffee · late-night refactors",
  },
  {
    id: "stack",
    label: "echo $STACK",
    cmd: "echo $STACK",
    out: "TypeScript · React · Node · cloud · APIs · a sprinkle of AI tooling ✨",
  },
];

const TIPS = [
  "Tip: try every button — no sudo required.",
  "Pro move: open GitHub in another tab while you read.",
  "Fun fact: this panel is lighter than a PNG hero illustration.",
];

function AboutSidePlayground() {
  const [lines, setLines] = useState([]);
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);
  const bodyRef = useRef(null);
  const seqRef = useRef(0);

  const scrollBottom = useCallback(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollBottom();
  }, [lines, scrollBottom]);

  useEffect(() => {
    const boot = [
      { kind: "out", text: `// ${SITE.name} — quick scan` },
      { kind: "cmd", text: "uname -a" },
      {
        kind: "out",
        text: "human · builder · payments-adjacent software · IST timezone",
      },
      { kind: "cmd", text: `curl -s https://github.com/${GITHUB_USERNAME} | head -1` },
      { kind: "out", text: `→ profile: github.com/${GITHUB_USERNAME}` },
      { kind: "out", text: tip },
    ];

    let i = 0;
    const id = ++seqRef.current;
    function next() {
      if (seqRef.current !== id) return;
      if (i >= boot.length) return;
      const row = boot[i];
      i += 1;
      setLines((prev) => [...prev, row]);
      setTimeout(next, row.kind === "cmd" ? 280 : 420);
    }
    next();
    return () => {
      seqRef.current += 1;
    };
  }, [tip]);

  const runSnippet = (s) => {
    setLines((prev) => [
      ...prev,
      { kind: "cmd", text: s.cmd },
      { kind: "out", text: s.out },
    ]);
  };

  return (
    <div className="about-playground">
      <div className="dev-terminal about-side-terminal dev-terminal--animated">
        <div className="dev-terminal__chrome">
          <span className="dev-terminal__dot dev-terminal__dot--r" />
          <span className="dev-terminal__dot dev-terminal__dot--y" />
          <span className="dev-terminal__dot dev-terminal__dot--g" />
          <span className="dev-terminal__title">fun-facts — tap a script</span>
        </div>
        <div className="dev-terminal__body about-side-terminal__body" ref={bodyRef}>
          {lines.map((line, idx) => (
            <p key={`${idx}-${line.text?.slice(0, 6)}`} className="dev-terminal__line dev-terminal__line--pop">
              {line.kind === "cmd" ? (
                <>
                  <span className="dev-terminal__prompt">{PROMPT} </span>
                  <span className="dev-terminal__cmd">{line.text}</span>
                </>
              ) : (
                <span
                  className={
                    line.text.startsWith("//")
                      ? "dev-terminal__out dev-terminal__out--highlight"
                      : "dev-terminal__out"
                  }
                >
                  {line.text}
                </span>
              )}
            </p>
          ))}
        </div>
        <div className="about-play-chips">
          {SNIPPETS.map((s) => (
            <button
              key={s.id}
              type="button"
              className="about-play-chip"
              onClick={() => runSnippet(s)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="about-bento">
        <a
          href={SITE.links.github}
          target="_blank"
          rel="noreferrer"
          className="about-bento__card about-bento__card--accent"
        >
          <span className="about-bento__emoji">◇</span>
          <span className="about-bento__label">GitHub</span>
          <span className="about-bento__val">@{GITHUB_USERNAME}</span>
        </a>
        <a
          href={SITE.links.leetcode(LEETCODE_USERNAME)}
          target="_blank"
          rel="noreferrer"
          className="about-bento__card"
        >
          <span className="about-bento__emoji">◎</span>
          <span className="about-bento__label">LeetCode</span>
          <span className="about-bento__val">@{LEETCODE_USERNAME}</span>
        </a>
        <div className="about-bento__card about-bento__card--wide">
          <span className="about-bento__emoji">📍</span>
          <span className="about-bento__label">Based in</span>
          <span className="about-bento__val">{SITE.location}</span>
        </div>
        <div className="about-bento__card about-bento__card--wide">
          <span className="about-bento__emoji">⚡</span>
          <span className="about-bento__label">Energy</span>
          <span className="about-bento__val">
            Product-quality code · friendly docs · measurable impact
          </span>
        </div>
      </div>
    </div>
  );
}

export default AboutSidePlayground;
