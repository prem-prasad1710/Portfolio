import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineFundProjectionScreen,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { SITE, GITHUB_USERNAME } from "../../config/site";

const ICONS = {
  home: AiOutlineHome,
  about: AiOutlineUser,
  projects: AiOutlineFundProjectionScreen,
  resume: CgFileDocument,
  github: FaGithub,
  linkedin: FaLinkedinIn,
  copy: AiOutlineLink,
};

function buildItems() {
  return [
    {
      id: "home",
      label: "Home",
      hint: "/",
      icon: ICONS.home,
      type: "route",
      to: "/",
    },
    {
      id: "about",
      label: "About",
      hint: "/about",
      icon: ICONS.about,
      type: "route",
      to: "/about",
    },
    {
      id: "projects",
      label: "Projects",
      hint: "/project",
      icon: ICONS.projects,
      type: "route",
      to: "/project",
    },
    {
      id: "resume",
      label: "Resume",
      hint: "/resume",
      icon: ICONS.resume,
      type: "route",
      to: "/resume",
    },
    {
      id: "github",
      label: "GitHub profile",
      hint: GITHUB_USERNAME,
      icon: ICONS.github,
      type: "external",
      href: SITE.links.github,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      hint: "Connect",
      icon: ICONS.linkedin,
      type: "external",
      href: SITE.links.linkedin,
    },
    {
      id: "copy",
      label: "Copy site URL",
      hint: "Share with a teammate",
      icon: ICONS.copy,
      type: "copy",
    },
  ];
}

function SiteCommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const items = useMemo(() => buildItems(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => {
      const hay = `${it.label} ${it.hint}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    setCopied(false);
  }, []);

  const runItem = useCallback(
    (item) => {
      if (!item) return;
      if (item.type === "route") {
        navigate(item.to);
        close();
        return;
      }
      if (item.type === "external") {
        window.open(item.href, "_blank", "noopener,noreferrer");
        close();
        return;
      }
      if (item.type === "copy") {
        const url = window.location.origin + location.pathname;
        (async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* ignore */
          }
        })();
      }
    },
    [navigate, location.pathname, close]
  );

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("site:open-command-palette", onOpen);
    return () => window.removeEventListener("site:open-command-palette", onOpen);
  }, []);

  useEffect(() => {
    if (open) {
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setActive((i) => {
      if (filtered.length === 0) return 0;
      return Math.min(i, filtered.length - 1);
    });
  }, [filtered.length]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) =>
        filtered.length ? (i - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      runItem(filtered[active]);
    }
  };

  if (!open) return null;

  const mod = /Mac|iPhone|iPad|iPod/i.test(navigator.platform)
    ? "⌘"
    : "Ctrl";

  const node = (
    <div
      className="cmd-palette-portal cmd-palette-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="cmd-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="cmd-palette__head">
          <span className="cmd-palette__title">Quick nav</span>
          <span className="cmd-palette__kbd">{mod}+K</span>
        </div>
        <input
          ref={inputRef}
          type="search"
          className="cmd-palette__input"
          placeholder="Jump to page or link…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <ul className="cmd-palette__list" role="listbox">
          {filtered.length === 0 ? (
            <li className="cmd-palette__empty">No matches</li>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSel = idx === active;
              return (
                <li key={item.id} role="none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSel}
                    className={`cmd-palette__row${isSel ? " is-active" : ""}`}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => runItem(item)}
                  >
                    <span className="cmd-palette__icon" aria-hidden>
                      <Icon />
                    </span>
                    <span className="cmd-palette__label">{item.label}</span>
                    <span className="cmd-palette__hint">{item.hint}</span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
        <div className="cmd-palette__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move · <kbd>↵</kbd> open · <kbd>esc</kbd> close
          </span>
          {copied ? (
            <span className="cmd-palette__toast">Link copied</span>
          ) : null}
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent("site:open-command-palette"));
}

export default SiteCommandPalette;
