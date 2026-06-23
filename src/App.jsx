import { useEffect, useState } from "react";

const navItems = [
  { label: "主页", href: "/" },
  { label: "Doc", href: "/docs/getting-started" },
  { label: "GitHub", href: "https://github.com/anxelswanz/astraea-agent" },
  { label: "官网", href: "/" },
];

const features = [
  {
    label: "01",
    name: "Goal orchestration",
    accent: "text-astraea-green",
    title: "把复杂目标变成清晰进度",
    body: "Astraea 不只回答问题，它会把大任务拆开、安排顺序、持续检查结果，让你知道每一步为什么完成、哪里还需要继续。",
  },
  {
    label: "02",
    name: "user-friendly UI",
    accent: "text-astraea-cyan",
    title: "致力于创造 Agent 最便捷、最用户友好的 UI",
    body: "从输入、选择、确认到查看进度，Astraea 都尽量让操作自然、清楚、少打扰。强大的 agent 能力，不应该只属于专家。",
  },
  {
    label: "03",
    name: "Counsel mode",
    accent: "text-astraea-amber",
    title: "独特 Counsel 模式：先问清楚再执行",
    body: "当你的需求还不够清楚时，Astraea 会先帮你把问题问明白，再开始行动。少返工、少误解，方向对了再加速。",
  },
  {
    label: "04",
    name: "Permission red-line matrix",
    accent: "text-astraea-coral",
    title: "red-line 权限系统真的不会越线",
    body: "你可以选择保守、快速或全自动，但关键边界始终守住。Astraea 的目标是让自动化更放心，而不是让你失去控制。",
  },
  {
    label: "05",
    name: "Vigil scheduled agents",
    accent: "text-astraea-green",
    title: "Vigil 让 agent 变成后台守夜人",
    body: "把检查、总结、提醒和后台任务交给 Astraea 定时处理。它不只在你提问时工作，也能在你离开后继续照看进度。",
  },
];

const updates = [
  {
    version: "0.9.45",
    date: "Jun 23, 2026",
    title: "Markdown code renders like a real terminal pane",
    body: "Code blocks gained Astraea themed backgrounds, line gutters, full-line fills, and tighter inline code treatment.",
  },
  {
    version: "0.9.44",
    date: "Jun 23, 2026",
    title: "PowerShell now shares Bash permission semantics",
    body: "Forge can auto-allow ordinary commands while sensitive paths keep their red-line confirmation behavior.",
  },
  {
    version: "0.9.43",
    date: "Jun 23, 2026",
    title: "/goal expands pasted multi-line objectives",
    body: "Pasted placeholders are expanded before slash-command parsing, so evaluators receive the actual goal conditions.",
  },
  {
    version: "0.9.42",
    date: "Jun 23, 2026",
    title: "Long reasoning gets heartbeat events",
    body: "Thinking deltas now keep the watchdog alive, preventing healthy extended reasoning from being aborted as idle.",
  },
  {
    version: "0.9.41",
    date: "Jun 23, 2026",
    title: "Permission prompts can notify the system",
    body: "Astraea can call you back when Allow/Deny is needed, and aborts now exit without noisy false errors.",
  },
];

const installTabs = [
  {
    platform: "macOS",
    steps: [
      {
        title: "Install Bun",
        code: "curl -fsSL https://bun.sh/install | bash",
        body: "Astraea runs on Bun. Restart your terminal after installation if the bun command is not found.",
      },
      {
        title: "Clone and install",
        code: "git clone https://github.com/anxelswanz/astraea-agent.git astraea\ncd astraea\nbun install",
        body: "Download the source and install dependencies.",
      },
      {
        title: "Register the astraea command",
        code: "bun link",
        body: "After linking, you can start Astraea from any folder with astraea.",
      },
      {
        title: "Launch",
        code: "astraea",
        body: "On first launch, follow /login to choose a provider and /language to choose your language.",
      },
    ],
  },
  {
    platform: "Windows",
    steps: [
      {
        title: "Install Bun in PowerShell",
        code: "powershell -c \"irm bun.sh/install.ps1|iex\"",
        body: "Windows 10 1809+ or Windows 11 is recommended. Reopen PowerShell after installation.",
      },
      {
        title: "Clone and install",
        code: "git clone https://github.com/anxelswanz/astraea-agent.git astraea\ncd astraea\nbun install",
        body: "Install Astraea from the repository and prepare dependencies.",
      },
      {
        title: "Register the astraea command",
        code: "bun link",
        body: "This exposes astraea as a global terminal command.",
      },
      {
        title: "Launch",
        code: "astraea",
        body: "Astraea will guide you through provider login and language selection.",
      },
    ],
  },
];

const commandDocs = [
  {
    id: "cmd-login",
    command: "/login",
    purpose: "Choose provider, model, and API key.",
    example: "/login",
    when: "Use on first launch, when changing from Anthropic to OpenAI/DeepSeek/Kimi/Ollama, or when rotating an API key.",
  },
  {
    id: "cmd-internet",
    command: "/internet",
    purpose: "Configure web search providers such as Bocha, Zhipu, Tavily, Brave, or Exa.",
    example: "/internet",
    when: "Use when Astraea needs current docs, news, source checking, or research beyond local files.",
  },
  {
    id: "cmd-language",
    command: "/language",
    purpose: "Switch UI language and reply language instantly.",
    example: "/language zh",
    when: "Use when you want Astraea to answer and display controls in another language.",
  },
  {
    id: "cmd-reason",
    command: "/reason",
    purpose: "Set reasoning effort: low, medium, high, max, or auto.",
    example: "/reason high",
    when: "Use high or max for architecture, debugging, audits, or tasks where deeper thinking matters more than speed.",
  },
  {
    id: "cmd-mode",
    command: "/mode",
    purpose: "Choose autonomy mode: default, orbit, cruise, forge, counsel.",
    example: "/mode counsel",
    when: "Use orbit for read-only planning, cruise for faster edits, forge for trusted automation, and counsel when the task is ambiguous.",
  },
  {
    id: "cmd-goal",
    command: "/goal",
    purpose: "Set a concrete objective that Astraea must satisfy with evidence.",
    example: "/goal Build the homepage and verify npm run build passes",
    when: "Use for multi-step work where completion should be checked, not merely claimed.",
  },
  {
    id: "cmd-vigil",
    command: "/vigil",
    purpose: "Manage scheduled background tasks.",
    example: "/vigil",
    when: "Use for recurring checks, reminders, summaries, or long-running work that should happen later.",
  },
  {
    id: "cmd-mcp",
    command: "/mcp",
    purpose: "Show live MCP server connection status inside the REPL.",
    example: "/mcp",
    when: "Use after adding, removing, or restarting MCP servers to confirm whether Astraea can see their tools.",
  },
  {
    id: "cmd-plugin",
    command: "/plugin",
    purpose: "Show installed plugins and subscribed plugin marketplaces.",
    example: "/plugin",
    when: "Use when checking whether plugin-provided skills or MCP servers should be available after restart.",
  },
  {
    id: "cmd-stop",
    command: "/stop",
    purpose: "Stop the current task and any running agents.",
    example: "/stop",
    when: "Use when a task is going in the wrong direction, taking too long, or should be interrupted immediately.",
  },
  {
    id: "cmd-clear",
    command: "/clear",
    purpose: "Clear the current visible conversation history.",
    example: "/clear",
    when: "Use when you want a fresh chat surface without changing project configuration.",
  },
  {
    id: "cmd-compact",
    command: "/compact",
    purpose: "Compact context now, optionally with a focus hint.",
    example: "/compact focus on the deployment issue",
    when: "Use during long sessions when context is heavy but you want Astraea to preserve the important thread.",
  },
  {
    id: "cmd-resume",
    command: "/resume",
    purpose: "Resume a previous persisted session from transcript history.",
    example: "/resume",
    when: "Use when you want to continue a past conversation or recover work after closing the terminal.",
  },
  {
    id: "cmd-usage",
    command: "/usage",
    purpose: "Show token usage and estimated cost.",
    example: "/usage",
    when: "Use during long sessions to understand spend and model usage.",
  },
  {
    id: "cmd-help",
    command: "/help",
    purpose: "List available commands and skills.",
    example: "/help",
    when: "Use whenever you forget a command or want to discover project skills.",
  },
];

const configDocs = [
  {
    id: "config-mcp",
    title: "MCP configuration",
    summary: "MCP servers expose external tools such as databases, Sentry, filesystem adapters, or internal APIs.",
    bullets: [
      "Use a remote HTTP server when the tool provider hosts an MCP endpoint.",
      "Use a remote auth header when the endpoint requires a static token.",
      "Use a local stdio server when the tool runs as a local subprocess.",
      "Inspect configured servers, remove old servers, then check live status inside the REPL.",
      "Config storage: project scope goes to .mcp.json, user scope goes to ~/.astraea/settings.json, local scope goes to .astraea/settings.local.json.",
      "Restart Astraea after changing MCP config because servers connect at startup.",
    ],
    code: `astraea mcp add --transport http sentry https://mcp.sentry.dev/mcp
astraea mcp add --transport http corridor https://app.example/mcp -H "Authorization: Bearer $TOKEN"
astraea mcp add filesystem npx -- -y @modelcontextprotocol/server-filesystem /path
astraea mcp list
astraea mcp remove sentry
/mcp`,
  },
  {
    id: "config-skill",
    title: "Skill configuration",
    summary: "Skills are Markdown operating manuals. They teach Astraea a repeatable workflow and can add allowed tools or a model override for that invocation.",
    bullets: [
      "Project skill path: <repo>/.astraea/skills/<name>/SKILL.md.",
      "User skill path: ~/.astraea/skills/<name>/SKILL.md. User skills win on name conflict.",
      "The folder name is the command name. A skill at .astraea/skills/code-review/SKILL.md becomes /code-review.",
      "Frontmatter can include description, when_to_use, allowed-tools, argument-hint, model, user-invocable, and disable-model-invocation.",
    ],
    code: `mkdir -p .astraea/skills/code-review
$EDITOR .astraea/skills/code-review/SKILL.md

---
description: review a diff for bugs and security issues
when_to_use: when the user asks for a code review
allowed-tools: [Read, Grep, Bash]
argument-hint: "[path]"
---

# Code Review
Prioritize correctness bugs, security issues, and missing tests.`,
  },
  {
    id: "config-agents",
    title: "AGENTS.md project instructions",
    summary: "AGENTS.md is Astraea's project instruction file. Use it for repo-specific conventions, testing commands, release rules, and safety notes.",
    bullets: [
      "Load order: <repo>/AGENTS.md, then <repo>/AGENTS.local.md, then ~/.astraea/AGENTS.md.",
      "AGENTS.md is usually committed and shared with the team.",
      "AGENTS.local.md is for personal or machine-specific notes and should normally stay out of git.",
      "Global ~/.astraea/AGENTS.md applies across projects.",
      "Astraea uses AGENTS.md / AGENTS.local.md for this purpose, not CLAUDE.md.",
    ],
    code: `# AGENTS.md
Use bun test for tests.
Run bun run typecheck before release.
Do not edit generated files unless asked.`,
  },
  {
    id: "config-transcripts",
    title: "Transcripts and chat history",
    summary: "Astraea persists append-only JSONL transcripts so /resume and rewind-style recovery can restore past work.",
    bullets: [
      "Path format: ~/.astraea/projects/<escaped-cwd>/<sessionId>.jsonl.",
      "escaped-cwd replaces / with -, for example /Users/me/app becomes -Users-me-app.",
      "Audit logs sit beside transcripts as <sessionId>.audit.jsonl.",
      "Default retention is 30 days. Set cleanupPeriodDays in ~/.astraea/settings.json; 0 disables persistence, negative keeps forever.",
      "To find a project's chat history, list ~/.astraea/projects and choose the directory matching the escaped project path.",
    ],
    code: `ls ~/.astraea/projects
ls ~/.astraea/projects/-Users-me-my-project
cat ~/.astraea/projects/-Users-me-my-project/<sessionId>.jsonl`,
  },
  {
    id: "config-settings",
    title: "Settings and secrets",
    summary: "Settings and secrets are intentionally separated so API keys do not need to live in the project.",
    bullets: [
      "Provider and web-search keys are saved by /login and /internet, normally in ~/.astraea/.env.",
      "Behavior settings live in ~/.astraea/settings.json.",
      "Project .env can override provider settings for a specific repository, but do not commit secrets.",
      "Use /usage to monitor token and cost impact after choosing models or reasoning effort.",
    ],
  },
  {
    id: "config-plugin",
    title: "Plugins",
    summary: "Plugins package skills and MCP servers into installable units. They are useful when a team wants to distribute a workflow instead of copying folders by hand.",
    bullets: [
      "Subscribe to a local marketplace before installing from it.",
      "Install a plugin, then restart to apply new MCP servers.",
      "Inspect installed plugins in the REPL or from the terminal.",
      "Manual skills and MCP configuration win over plugin-provided entries on conflict.",
      "Plugin files live under ~/.astraea/plugins unless ASTRAEA_PLUGINS_DIR is set.",
    ],
    code: `astraea plugin marketplace add ./my-shelf
astraea plugin install db-tools
/plugin
astraea plugin list
astraea plugin disable db-tools
astraea plugin enable db-tools`,
  },
];

const subAgentDocs = [
  {
    id: "subagent-when",
    title: "When to use SubAgent",
    body: "Use SubAgent when one main conversation is not enough: independent research branches, comparing two approaches, checking multiple packages, summarizing many files, or running a focused investigation without polluting the main context.",
    code: `Ask Astraea:
"Launch two SubAgents: one reviews the frontend architecture, one reviews deployment risk. Then compare their findings."`,
  },
  {
    id: "subagent-launch",
    title: "Launch a worker",
    body: "A SubAgent gets its own context window and tool access. The prompt must be self-contained because the worker does not automatically inherit your current conversation.",
    code: `Agent({
  description: "Audit docs navigation",
  prompt: "Review the docs page navigation. Check whether every command and mode has a clear anchor, then report missing links.",
  model: "small"
})`,
  },
  {
    id: "subagent-monitor",
    title: "Monitor progress",
    body: "The launch call returns a taskId. Use the task tools to list workers, inspect one worker, or stream its output while it is still running.",
    code: `TaskList({ statusFilter: "running" })
TaskGet({ taskId: "a3x9m7kp" })
TaskOutput({ taskId: "a3x9m7kp", offset: 0, limit: 80 })`,
  },
  {
    id: "subagent-guide",
    title: "Guide or stop a worker",
    body: "You can send a correction to a running SubAgent at its next safe turn boundary. If the worker is no longer useful, stop it cooperatively.",
    code: `SendMessage({
  to: "a3x9m7kp",
  message: "Focus only on broken links. Ignore copywriting."
})

TaskStop({ taskId: "a3x9m7kp" })`,
  },
  {
    id: "subagent-peers",
    title: "Talk to another Astraea process",
    body: "SubAgent also supports local peer communication. Discover other Astraea processes on the same machine, then send a message to the socket address.",
    code: `ListPeers()

SendMessage({
  to: "uds:/tmp/astraea-12345.sock",
  message: "Please summarize your current findings for this repo."
})`,
  },
];

const modes = [
  {
    id: "mode-default",
    name: "default",
    summary: "The everyday mode. Astraea can help normally, but asks before writing files or running shell commands.",
    bestFor: "Daily coding, small fixes, reading files, explaining code, and making changes when you still want approval gates.",
    scenario: "You ask Astraea to fix a typo in a component. It can inspect files, propose the change, and asks before touching files or running commands.",
  },
  {
    id: "mode-orbit",
    name: "orbit",
    summary: "Read-only planning mode. Astraea can investigate and think, but cannot edit or execute risky actions.",
    bestFor: "Codebase exploration, architecture review, debugging strategy, risk assessment, and planning before a large change.",
    scenario: "Before rewriting an auth flow, use /mode orbit. Astraea reads the code, maps dependencies, and gives a plan without changing anything.",
  },
  {
    id: "mode-cruise",
    name: "cruise",
    summary: "Fast editing mode. File writes are auto-approved, while shell commands still ask.",
    bestFor: "Trusted local edits where you want speed but still want command execution to pause for permission.",
    scenario: "You ask Astraea to update copy across several React files. It can edit files quickly, but still asks before running tests or scripts.",
  },
  {
    id: "mode-forge",
    name: "forge",
    summary: "High-autonomy execution mode. Ordinary writes and commands can run without prompts, but red-line safety still applies.",
    bestFor: "Trusted repetitive work, large mechanical changes, scheduled headless tasks, or moments when you explicitly want less interruption.",
    scenario: "You ask Astraea to update many generated docs and run the full test suite. Forge keeps momentum, but still stops for sensitive paths like .git, .astraea, or shell startup files.",
  },
  {
    id: "mode-counsel",
    name: "counsel",
    summary: "Clarify-first mode. Astraea asks questions and confirms direction before executing.",
    bestFor: "Ambiguous product requests, UI redesigns, broad refactors, planning-heavy work, or any task where the definition of done is unclear.",
    scenario: "You say 'make the docs better'. Counsel asks what audience, scope, structure, and acceptance criteria matter before it edits anything.",
  },
];

function usePointerParallax() {
  const [style, setStyle] = useState({ "--mx": "0px", "--my": "0px" });

  useEffect(() => {
    const handlePointer = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * -14;
      const y = (event.clientY / window.innerHeight - 0.5) * -10;
      setStyle({ "--mx": `${x}px`, "--my": `${y}px` });
    };

    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  return style;
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/15 bg-astraea-night/75 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a className="flex items-center gap-3 font-bold text-astraea-ink" href="/" aria-label="Astraea home">
          <img className="h-10 w-10 rounded-full border border-white/25 object-cover" src="/LOGO.png" alt="Astraea logo" />
          <span>Astraea</span>
        </a>
        <nav className="flex gap-1 overflow-x-auto text-sm text-astraea-muted" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a className="whitespace-nowrap px-3 py-2 transition hover:text-astraea-ink" href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function BackgroundScene() {
  const style = usePointerParallax();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-astraea-night" aria-hidden="true">
      <div
        className="absolute inset-0 scale-105 bg-[linear-gradient(90deg,rgba(4,7,12,.92),rgba(4,7,12,.38)_58%,rgba(4,7,12,.76)),linear-gradient(180deg,rgba(4,7,12,.24),rgba(4,7,12,.9)),url('/background.png')] bg-cover bg-center transition-transform duration-200 ease-out"
        style={{ transform: `translate3d(${style["--mx"]}, ${style["--my"]}, 0) scale(1.05)` }}
      />
      <div className="scene-sweep absolute inset-0 opacity-50 mix-blend-screen" />
      <div className="scene-sweep-reverse absolute inset-0 opacity-40 mix-blend-screen" />
      <div className="absolute inset-0 bg-grid opacity-15 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
    </div>
  );
}

function Hero() {
  return (
    <section className="grid min-h-[calc(100vh-72px)] items-end gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-24 lg:py-24">
      <div className="max-w-4xl">
        <p className="mb-4 text-xs font-extrabold uppercase text-astraea-green">Terminal-native AI coding agent</p>
        <h1 className="mb-4 text-[clamp(4rem,13vw,10.5rem)] font-black leading-[.86] text-astraea-ink">Astraea</h1>
        <p className="mb-5 text-[clamp(1.35rem,2.6vw,2.4rem)] font-bold text-astraea-amber">
          An Agent of Order and Precision.
        </p>
        <p className="max-w-2xl text-lg leading-8 text-astraea-muted">
          A terminal-native agent that turns ambiguous work into TaskGraph planning, evidence gates, user-friendly UI,
          Counsel-first execution, and permission-aware automation.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            className="inline-flex min-h-12 items-center justify-center gap-3 bg-astraea-ink px-5 font-extrabold text-[#071018] shadow-panel transition hover:-translate-y-0.5"
            href="/docs/getting-started"
          >
            Getting Started
            <span aria-hidden="true">→</span>
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center border border-white/15 bg-white/10 px-5 font-bold text-astraea-ink"
            href="#features"
          >
            Explore features
          </a>
        </div>
      </div>
      <aside className="rounded-lg border border-white/15 bg-[#080e16]/75 p-5 shadow-panel backdrop-blur-xl">
        <img className="mb-5 aspect-square w-full rounded-lg object-cover" src="/LOGO.png" alt="Astraea goddess logo" />
        <span className="text-sm font-bold text-astraea-cyan">Current release</span>
        <strong className="my-3 block text-4xl text-astraea-amber">v0.9.45</strong>
        <p className="leading-7 text-astraea-muted">Markdown code blocks now render as focused terminal code areas.</p>
      </aside>
    </section>
  );
}

function Features() {
  return (
    <section className="bg-[#03070b]/45 px-5 py-20 sm:px-8 lg:px-24" id="features" aria-labelledby="features-title">
      <div className="mx-auto mb-9 flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase text-astraea-green">Why Astraea</p>
          <h2 id="features-title" className="text-[clamp(2rem,4vw,4.2rem)] font-black leading-none text-astraea-ink">
            Why you should use Astraea
          </h2>
        </div>
        <p className="max-w-xl leading-7 text-astraea-muted">
          不只是会写代码的聊天框，而是把目标、UI、权限、证据和调度变成工程系统的 agent runtime。
        </p>
      </div>
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-5">
        {features.map((feature) => (
          <article className="rounded-lg border border-white/15 bg-[#080e16]/70 p-5 shadow-panel backdrop-blur-xl" key={feature.name}>
            <span className={`mb-7 inline-grid h-9 w-11 place-items-center border-b-2 border-astraea-coral text-sm font-black ${feature.accent}`}>
              {feature.label}
            </span>
            <p className="mb-3 text-xs font-extrabold uppercase text-white/45">{feature.name}</p>
            <h3 className="mb-3 text-lg font-extrabold leading-snug text-astraea-ink">{feature.title}</h3>
            <p className="text-sm leading-7 text-astraea-muted">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Updates() {
  return (
    <section className="bg-astraea-night/75 px-5 py-20 sm:px-8 lg:px-24" aria-labelledby="updates-title">
      <div className="mx-auto mb-9 max-w-5xl">
        <p className="mb-4 text-xs font-extrabold uppercase text-astraea-green">Latest feature work</p>
        <h2 id="updates-title" className="text-[clamp(2rem,4vw,4.2rem)] font-black leading-none text-astraea-ink">
          Recent updates
        </h2>
      </div>
      <div className="mx-auto grid max-w-5xl gap-3">
        {updates.map((update) => (
          <article
            className="grid gap-4 rounded-lg border border-white/15 bg-[#080e16]/85 p-6 shadow-panel backdrop-blur-xl md:grid-cols-[180px_minmax(0,1fr)]"
            key={update.version}
          >
            <time className="text-sm font-bold text-astraea-cyan">
              {update.version} · {update.date}
            </time>
            <div>
              <h3 className="mb-2 text-lg font-extrabold text-astraea-ink">{update.title}</h3>
              <p className="leading-7 text-astraea-muted">{update.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CodeBlock({ children }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/45 p-4 text-sm leading-6 text-astraea-ink">
      <code>{children}</code>
    </pre>
  );
}

function DocsSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-white/10 py-10">
      <h2 className="mb-5 text-3xl font-black text-astraea-ink">{title}</h2>
      {children}
    </section>
  );
}

function DocsPage() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-white/15 bg-[#080e16]/80 p-5 text-sm text-astraea-muted shadow-panel backdrop-blur-xl">
            <p className="mb-4 font-extrabold text-astraea-ink">Getting Started</p>
            <details className="docs-nav-group" open>
              <summary>Start here</summary>
              <div className="border-l border-white/10 pl-3">
                <a className="block py-1.5 hover:text-astraea-ink" href="#install">Install</a>
                <a className="block py-1.5 hover:text-astraea-ink" href="#launch">Launch</a>
              </div>
            </details>
            <details className="docs-nav-group" open>
              <summary>Commands overview</summary>
              <div className="border-l border-white/10 pl-3">
                <a className="block py-1.5 hover:text-astraea-ink" href="#commands">All commands</a>
                {commandDocs.map((item) => (
                  <a className="block py-1.5 font-mono text-xs hover:text-astraea-ink" href={`#${item.id}`} key={item.id}>
                    {item.command}
                  </a>
                ))}
              </div>
            </details>
                <details className="docs-nav-group" open>
                  <summary>Modes</summary>
                  <div className="border-l border-white/10 pl-3">
                <a className="block py-1.5 hover:text-astraea-ink" href="#modes">Modes overview</a>
                {modes.map((mode) => (
                  <a className="block py-1.5 font-mono text-xs hover:text-astraea-ink" href={`#${mode.id}`} key={mode.id}>
                    {mode.name}
                  </a>
                ))}
                  </div>
                </details>
                <details className="docs-nav-group" open>
                  <summary>SubAgent</summary>
                  <div className="border-l border-white/10 pl-3">
                    <a className="block py-1.5 hover:text-astraea-ink" href="#subagent">SubAgent overview</a>
                    {subAgentDocs.map((item) => (
                      <a className="block py-1.5 text-xs hover:text-astraea-ink" href={`#${item.id}`} key={item.id}>
                        {item.title}
                      </a>
                    ))}
                  </div>
                </details>
                <details className="docs-nav-group" open>
                  <summary>Key configuration</summary>
              <div className="border-l border-white/10 pl-3">
                <a className="block py-1.5 hover:text-astraea-ink" href="#configuration">Configuration overview</a>
                {configDocs.map((item) => (
                  <a className="block py-1.5 text-xs hover:text-astraea-ink" href={`#${item.id}`} key={item.id}>
                    {item.title}
                  </a>
                ))}
              </div>
            </details>
          </div>
        </aside>

        <article className="rounded-lg border border-white/15 bg-[#080e16]/82 p-6 shadow-panel backdrop-blur-xl sm:p-9">
          <p className="mb-4 text-xs font-extrabold uppercase text-astraea-green">Docs</p>
          <h1 className="mb-5 text-[clamp(3rem,8vw,6rem)] font-black leading-none text-astraea-ink">Getting Started</h1>
          <p className="max-w-3xl text-lg leading-8 text-astraea-muted">
            This guide compresses the README into a practical first-run tutorial: install Astraea, launch the REPL,
            configure model providers, and learn the commands you will use most.
          </p>

          <DocsSection id="install" title="Install">
            <div className="grid gap-5 xl:grid-cols-2">
              {installTabs.map((platform) => (
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5" key={platform.platform}>
                  <h3 className="mb-4 text-2xl font-black text-astraea-amber">{platform.platform}</h3>
                  <div className="grid gap-5">
                    {platform.steps.map((step) => (
                      <div key={step.title}>
                        <h4 className="mb-2 font-extrabold text-astraea-ink">{step.title}</h4>
                        <p className="mb-3 leading-7 text-astraea-muted">{step.body}</p>
                        <CodeBlock>{step.code}</CodeBlock>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DocsSection>

          <DocsSection id="launch" title="Launch and first configuration">
            <div className="grid gap-5">
              <p className="leading-8 text-astraea-muted">
                After installation, start the interactive REPL. If you did not run bun link, launch from the project with bun run repl.
              </p>
              <CodeBlock>{"astraea\n# or\nbun run repl"}</CodeBlock>
                  <p className="leading-8 text-astraea-muted">
                    On first launch, Astraea walks you through provider login and language selection. You can open those
                    setup panels again any time:
                  </p>
                  <CodeBlock>{"/login\n/language zh"}</CodeBlock>
                </div>
              </DocsSection>

          <DocsSection id="commands" title="Important commands">
            <p className="mb-5 leading-8 text-astraea-muted">
              The left navigation links to every command directly. Each card explains what the command does, shows a
              real invocation, and tells you when to use it.
            </p>
            <div className="grid gap-4">
                  {commandDocs.map((item) => (
                    <div id={item.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-5" key={item.command}>
                      <div className="mb-3">
                        <h3 className="font-mono text-xl font-black text-astraea-cyan">{item.command}</h3>
                      </div>
                      <p className="mb-2 leading-7 text-astraea-ink">{item.purpose}</p>
                      <CodeBlock>{item.example}</CodeBlock>
                      <p className="leading-7 text-astraea-muted">
                        <strong className="text-astraea-green">When to use:</strong> {item.when}
                      </p>
                </div>
              ))}
            </div>
          </DocsSection>

              <DocsSection id="modes" title="Session modes">
            <p className="mb-5 leading-8 text-astraea-muted">
              Modes control how much autonomy Astraea has. Think of them as different driving styles: from careful
              read-only planning to high-autonomy execution.
            </p>
            <div className="grid gap-4">
              {modes.map((mode) => (
                <div id={mode.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-5" key={mode.id}>
                      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <code className="font-mono text-2xl font-black text-astraea-amber">{mode.name}</code>
                      </div>
                      <CodeBlock>{`/mode ${mode.name}`}</CodeBlock>
                      <p className="mb-3 leading-8 text-astraea-ink">{mode.summary}</p>
                  <p className="mb-2 leading-7 text-astraea-muted">
                    <strong className="text-astraea-green">Best for:</strong> {mode.bestFor}
                  </p>
                  <p className="leading-7 text-astraea-muted">
                    <strong className="text-astraea-green">Concrete scenario:</strong> {mode.scenario}
                  </p>
                </div>
              ))}
            </div>
              </DocsSection>

              <DocsSection id="subagent" title="SubAgent">
                <p className="mb-5 leading-8 text-astraea-muted">
                  SubAgent lets Astraea split work across independent workers. The main agent stays responsible for the
                  final answer, while each worker explores one focused branch with its own context.
                </p>
                <div className="grid gap-5">
                  {subAgentDocs.map((item) => (
                    <div id={item.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-5" key={item.id}>
                      <h3 className="mb-3 text-2xl font-black text-astraea-amber">{item.title}</h3>
                      <p className="mb-4 leading-8 text-astraea-muted">{item.body}</p>
                      <CodeBlock>{item.code}</CodeBlock>
                    </div>
                  ))}
                </div>
              </DocsSection>

              <DocsSection id="configuration" title="Key configuration">
            <p className="mb-5 leading-8 text-astraea-muted">
              These are the files and directories users most often need to find after installation. The paths below are
              the practical map for configuring Astraea and debugging where state is stored.
            </p>
            <div className="grid gap-5">
              {configDocs.map((item) => (
                <div id={item.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-5" key={item.id}>
                  <h3 className="mb-3 text-2xl font-black text-astraea-amber">{item.title}</h3>
                  <p className="mb-4 leading-8 text-astraea-muted">{item.summary}</p>
                  <ul className="mb-4 grid gap-2 text-astraea-muted">
                    {item.bullets.map((bullet) => (
                      <li className="leading-7" key={bullet}>
                        <span className="text-astraea-green">•</span> {bullet}
                      </li>
                    ))}
                  </ul>
                  {item.code ? <CodeBlock>{item.code}</CodeBlock> : null}
                </div>
              ))}
            </div>
          </DocsSection>

          <DocsSection id="scripts" title="One-shot CLI and project scripts">
            <p className="mb-4 leading-8 text-astraea-muted">
              The REPL is best for conversation. The CLI is better for scripts, pipes, or one-off answers.
            </p>
            <CodeBlock>{'bun run src/cli.ts "explain what src/services/compact does"\necho "summarize this branch" | bun run src/cli.ts\nbun test\nbun run typecheck'}</CodeBlock>
          </DocsSection>
        </article>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Updates />
    </>
  );
}

export default function App() {
  const isDocsRoute = window.location.pathname === "/docs/getting-started";

  return (
    <>
      <BackgroundScene />
      <Header />
      <main>{isDocsRoute ? <DocsPage /> : <HomePage />}</main>
    </>
  );
}
