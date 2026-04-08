import React from "react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiGo,
  SiRust,
  SiOpenjdk,
  SiCplusplus,
  SiKotlin,
  SiSwift,
  SiDart,
  SiPhp,
  SiRuby,
  SiCsharp,
  SiScala,
  SiElixir,
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiSvelte,
  SiReactquery,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiFastapi,
  SiGraphql,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiElasticsearch,
  SiSupabase,
  SiApachekafka,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiAmazonaws,
  SiGooglecloud,
  SiMicrosoftazure,
  SiNginx,
  SiPrometheus,
  SiGrafana,
  SiOpenai,
  SiPytorch,
  SiTensorflow,
  SiJest,
  SiCypress,
  SiVitest,
  SiWebpack,
  SiGit,
  SiGithub,
  SiGnubash,
  SiVisualstudiocode,
  SiNeovim,
  SiPostman,
  SiFigma,
  SiNotion,
  SiLinear,
  SiSlack,
  SiLeetcode,
  SiObsidian,
} from "react-icons/si";

/** Icon size in px — large, readable brand marks */
const ICON_SIZE = 44;

const CATEGORIES = [
  {
    id: "languages",
    title: "Languages",
    accent: "#58a6ff",
    emoji: "⌨️",
    blurb: "Polyglot foundations",
    items: [
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "Python", Icon: SiPython },
      { name: "Go", Icon: SiGo },
      { name: "Rust", Icon: SiRust },
      { name: "Java", Icon: SiOpenjdk },
      { name: "Kotlin", Icon: SiKotlin },
      { name: "Swift", Icon: SiSwift },
      { name: "Dart", Icon: SiDart },
      { name: "C#", Icon: SiCsharp },
      { name: "C++", Icon: SiCplusplus },
      { name: "PHP", Icon: SiPhp },
      { name: "Ruby", Icon: SiRuby },
      { name: "Scala", Icon: SiScala },
      { name: "Elixir", Icon: SiElixir },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    accent: "#3fb950",
    emoji: "◈",
    blurb: "Interfaces users feel",
    items: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Vite", Icon: SiVite },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "Svelte", Icon: SiSvelte },
      { name: "TanStack Query", Icon: SiReactquery },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    accent: "#a371f7",
    emoji: "⚡",
    blurb: "Services & contracts",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "NestJS", Icon: SiNestjs },
      { name: "Express", Icon: SiExpress },
      { name: "FastAPI", Icon: SiFastapi },
      { name: "GraphQL", Icon: SiGraphql },
      { name: "Prisma", Icon: SiPrisma },
    ],
  },
  {
    id: "data",
    title: "Data & messaging",
    accent: "#f0883e",
    emoji: "◉",
    blurb: "Storage & streams",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Redis", Icon: SiRedis },
      { name: "Elasticsearch", Icon: SiElasticsearch },
      { name: "Supabase", Icon: SiSupabase },
      { name: "Kafka", Icon: SiApachekafka },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    accent: "#79c0ff",
    emoji: "☁️",
    blurb: "Ship & observe",
    items: [
      { name: "Docker", Icon: SiDocker },
      { name: "Kubernetes", Icon: SiKubernetes },
      { name: "Terraform", Icon: SiTerraform },
      { name: "GitHub Actions", Icon: SiGithubactions },
      { name: "AWS", Icon: SiAmazonaws },
      { name: "GCP", Icon: SiGooglecloud },
      { name: "Azure", Icon: SiMicrosoftazure },
      { name: "Nginx", Icon: SiNginx },
      { name: "Prometheus", Icon: SiPrometheus },
      { name: "Grafana", Icon: SiGrafana },
    ],
  },
  {
    id: "ai",
    title: "AI / ML",
    accent: "#d2a8ff",
    emoji: "✦",
    blurb: "Models & APIs",
    items: [
      { name: "OpenAI APIs", Icon: SiOpenai },
      { name: "PyTorch", Icon: SiPytorch },
      { name: "TensorFlow", Icon: SiTensorflow },
    ],
  },
  {
    id: "quality",
    title: "Testing & build",
    accent: "#ff7b72",
    emoji: "✓",
    blurb: "Confidence in deploys",
    items: [
      { name: "Jest", Icon: SiJest },
      { name: "Vitest", Icon: SiVitest },
      { name: "Cypress", Icon: SiCypress },
      { name: "Webpack", Icon: SiWebpack },
    ],
  },
  {
    id: "workflow",
    title: "Workflow & collaboration",
    accent: "#8b949e",
    emoji: "⎘",
    blurb: "How work gets done",
    items: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Bash", Icon: SiGnubash },
      { name: "VS Code", Icon: SiVisualstudiocode },
      { name: "Neovim", Icon: SiNeovim },
      { name: "Postman", Icon: SiPostman },
      { name: "Figma", Icon: SiFigma },
      { name: "Notion", Icon: SiNotion },
      { name: "Linear", Icon: SiLinear },
      { name: "Slack", Icon: SiSlack },
      { name: "LeetCode", Icon: SiLeetcode },
      { name: "Obsidian", Icon: SiObsidian },
    ],
  },
];

function SkillsSection() {
  return (
    <div className="skills-section skills-section--v2">
      <div className="skills-section__intro">
        <p className="skills-section__kicker font-monospace">
          $ npx skills --interactive
        </p>
        <p className="skills-section__tagline">
          Big icons, real tools — hover a tile to focus. Everything here maps to
          what shipping software looks like in 2025–2026.
        </p>
      </div>

      {CATEGORIES.map((cat) => (
        <div
          key={cat.id}
          className="skills-category skills-category--v2"
          style={{ "--skills-accent": cat.accent }}
        >
          <div className="skills-category__header">
            <span className="skills-category__emoji" aria-hidden>
              {cat.emoji}
            </span>
            <div>
              <h3 className="skills-category__title">{cat.title}</h3>
              <p className="skills-category__blurb">{cat.blurb}</p>
            </div>
          </div>

          <div className="skills-grid skills-grid--tiles">
            {cat.items.map(({ name, Icon }) => (
              <div key={name} className="skill-tile" title={name}>
                <div className="skill-tile__icon-ring">
                  <Icon
                    className="skill-tile__icon"
                    size={ICON_SIZE}
                    aria-hidden
                  />
                </div>
                <span className="skill-tile__name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillsSection;
