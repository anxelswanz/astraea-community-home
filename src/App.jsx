import { useEffect, useState } from "react";

const languages = [
  { code: "zh", label: "中文" },
  { code: "en", label: "English" },
];

const navItems = [
  { labelKey: "home", href: "/" },
  { labelKey: "docs", href: "/docs/getting-started" },
  { labelKey: "github", href: "https://github.com/anxelswanz/astraea-agent" },
  { labelKey: "official", href: "/" },
];

const pageCopy = {
  zh: {
    nav: { home: "主页", docs: "Doc", github: "GitHub", official: "官网" },
    heroEyebrow: "Terminal-native AI coding agent",
    heroTagline: "An Agent of Order and Precision.",
    heroBody: "Astraea 把模糊工作变成 TaskGraph 规划、证据验收、友好的 UI、Counsel-first 执行和权限感知自动化。",
    gettingStarted: "Getting Started",
    exploreFeatures: "Explore features",
    currentRelease: "Current release",
    currentReleaseBody: "/selection 已上线：在任意 app 选中文字、按快捷键唤起 Astraea 悬浮窗——快速研究与任务随手可得，适合学习、调研和日常工作。",
    featuresEyebrow: "Why Astraea",
    featuresTitle: "Why you should use Astraea",
    featuresIntro: "不只是会写代码的聊天框，而是把目标、UI、权限、证据和调度变成工程系统的 agent runtime。",
    updatesEyebrow: "Latest feature work",
    updatesTitle: "Recent updates",
    docsNavTitle: "快速开始",
    startHere: "开始",
    install: "安装",
    launch: "启动",
    commandsOverview: "命令总览",
    allCommands: "全部命令",
    modesOverview: "模式总览",
    subAgentOverview: "SubAgent 总览",
    keyConfiguration: "关键配置",
    configurationOverview: "配置总览",
    docsEyebrow: "Docs",
    docsTitle: "快速开始",
    docsIntro: "这份指南把 README 压缩成实用的首次上手教程：安装 Astraea、启动 REPL、配置模型 provider，并理解最常用的命令。",
    launchTitle: "启动与首次配置",
    launchIntro: "安装完成后，启动交互式 REPL。如果没有执行 bun link，也可以在项目目录中使用 bun run repl 启动。",
    firstLaunchIntro: "首次启动时，Astraea 会引导你完成 provider 登录和语言选择。之后也可以随时重新打开这些设置面板：",
    commandsTitle: "重要命令",
    commandsIntro: "左侧导航可以直接定位到每一个命令。每张卡片都会说明命令作用、给出真实调用方式，并告诉你什么时候使用。",
    whenToUseLabel: "什么时候使用：",
    modesTitle: "Session modes",
    modesIntro: "模式决定 Astraea 可以拥有多少自主性。你可以把它理解为不同驾驶风格：从谨慎只读规划，到高自主执行。",
    bestForLabel: "适合场景：",
    concreteScenarioLabel: "具体场景：",
    subAgentTitle: "SubAgent",
    subAgentIntro: "SubAgent 让 Astraea 为研究、审查、对比和长清单任务引入专注助手。你仍留在一个对话里，Astraea 会汇总这些发现并生成清晰结论。",
    modelProviderTitle: "Model Provider",
    modelProviderOverview: "Provider 总览",
    modelProviderIntro: "Astraea 会把同一套交互语义映射到不同模型供应商。DeepSeek V4 的适配重点不是简单换模型，而是利用 1M 上下文、低 cache-hit 成本、Flash/Pro 分层和 JSON 输出能力，让长任务更稳、更省、更少损失原始细节。",
    configurationTitle: "关键配置",
    configurationIntro: "这些是安装后最常需要找到的文件和目录。下面的路径就是配置 Astraea、排查状态存储位置时的实用地图。",
    scriptsTitle: "一次性 CLI 与项目脚本",
    scriptsIntro: "REPL 最适合对话式协作；CLI 更适合脚本、管道输入或一次性回答。",
    designPhilosophyNavLink: "设计哲学",
    backToGettingStarted: "← 快速开始",
    dpEyebrow: "Design Philosophy",
    dpNavTitle: "设计哲学",
    dpTitle: "设计哲学",
    dpIntro: "这里记录 Astraea 在工程取舍上的核心理念 —— 为什么这样设计，而不是别的方式。每一篇都聚焦一个独立的设计主题，并会随系统演进持续补充。以下是目前已经成型的部分。",
  },
  en: {
    nav: { home: "Home", docs: "Docs", github: "GitHub", official: "Official" },
    heroEyebrow: "Terminal-native AI coding agent",
    heroTagline: "An Agent of Order and Precision.",
    heroBody: "Astraea turns ambiguous work into TaskGraph planning, evidence gates, user-friendly UI, Counsel-first execution, and permission-aware automation.",
    gettingStarted: "Getting Started",
    exploreFeatures: "Explore features",
    currentRelease: "Current release",
    currentReleaseBody: "/selection is live: select text in any app and press a hotkey to summon a floating Astraea panel — quick research and tasks at your fingertips, great for learning, research, and everyday work.",
    featuresEyebrow: "Why Astraea",
    featuresTitle: "Why you should use Astraea",
    featuresIntro: "Not just a coding chatbot: Astraea turns goals, UI, permissions, evidence, and scheduling into an agent runtime.",
    updatesEyebrow: "Latest feature work",
    updatesTitle: "Recent updates",
    docsNavTitle: "Getting Started",
    startHere: "Start here",
    install: "Install",
    launch: "Launch",
    commandsOverview: "Commands overview",
    allCommands: "All commands",
    modesOverview: "Modes overview",
    subAgentOverview: "SubAgent overview",
    keyConfiguration: "Key configuration",
    configurationOverview: "Configuration overview",
    docsEyebrow: "Docs",
    docsTitle: "Getting Started",
    docsIntro: "This guide compresses the README into a practical first-run tutorial: install Astraea, launch the REPL, configure model providers, and learn the commands you will use most.",
    launchTitle: "Launch and first configuration",
    launchIntro: "After installation, start the interactive REPL. If you did not run bun link, launch from the project with bun run repl.",
    firstLaunchIntro: "On first launch, Astraea walks you through provider login and language selection. You can open those setup panels again any time:",
    commandsTitle: "Important commands",
    commandsIntro: "The left navigation links to every command directly. Each card explains what the command does, shows a real invocation, and tells you when to use it.",
    whenToUseLabel: "When to use:",
    modesTitle: "Session modes",
    modesIntro: "Modes control how much autonomy Astraea has. Think of them as different driving styles: from careful read-only planning to high-autonomy execution.",
    bestForLabel: "Best for:",
    concreteScenarioLabel: "Concrete scenario:",
    subAgentTitle: "SubAgent",
    subAgentIntro: "SubAgent lets Astraea bring in focused helpers for research, review, comparison, and long checklists. You stay in one conversation, while Astraea gathers focused findings and turns them into a clear final answer.",
    modelProviderTitle: "Model Provider",
    modelProviderOverview: "Provider overview",
    modelProviderIntro: "Astraea maps one interaction model onto different model providers. The DeepSeek V4 adaptation is not just a model swap: it uses the 1M context window, low cache-hit cost, Flash/Pro tiering, and JSON output support to keep long tasks steadier, cheaper, and less lossy.",
    configurationTitle: "Key configuration",
    configurationIntro: "These are the files and directories users most often need to find after installation. The paths below are the practical map for configuring Astraea and debugging where state is stored.",
    scriptsTitle: "One-shot CLI and project scripts",
    scriptsIntro: "The REPL is best for conversation. The CLI is better for scripts, pipes, or one-off answers.",
    designPhilosophyNavLink: "Design Philosophy",
    backToGettingStarted: "← Getting Started",
    dpEyebrow: "Design Philosophy",
    dpNavTitle: "Design Philosophy",
    dpTitle: "Design Philosophy",
    dpIntro: "These notes record the core ideas behind Astraea's engineering trade-offs — why it is built this way and not another. Each entry focuses on one self-contained design theme and keeps growing as the system evolves. Below are the parts that have taken shape so far.",
  },
};

function textFor(value, language) {
  return typeof value === "string" ? value : value[language];
}

const features = [
  {
    label: "01",
    name: "Goal orchestration",
    accent: "text-astraea-green",
    title: {
      zh: "把复杂目标变成清晰进度",
      en: "Turn complex goals into clear progress",
    },
    body: {
      zh: "Astraea 不只回答问题，它会把大任务拆开、安排顺序、持续检查结果，让你知道每一步为什么完成、哪里还需要继续。",
      en: "Astraea does more than answer. It breaks large work into ordered steps, keeps checking results, and shows what is done and what still needs attention.",
    },
  },
  {
    label: "02",
    name: "user-friendly UI",
    accent: "text-astraea-cyan",
    title: {
      zh: "致力于创造 Agent 最便捷、最用户友好的 UI",
      en: "A user-friendly UI for powerful agents",
    },
    body: {
      zh: "从输入、选择、确认到查看进度，Astraea 都尽量让操作自然、清楚、少打扰。强大的 agent 能力，不应该只属于专家。",
      en: "From input and selection to confirmation and progress, Astraea keeps agent work clear, calm, and approachable.",
    },
  },
  {
    label: "03",
    name: "Counsel mode",
    accent: "text-astraea-amber",
    title: {
      zh: "独特 Counsel 模式：先问清楚再执行",
      en: "Counsel mode asks first, then acts",
    },
    body: {
      zh: "当你的需求还不够清楚时，Astraea 会先帮你把问题问明白，再开始行动。少返工、少误解，方向对了再加速。",
      en: "When a request is still fuzzy, Astraea clarifies the goal before starting. Less rework, fewer wrong turns, faster execution once the direction is right.",
    },
  },
  {
    label: "04",
    name: "Permission red-line matrix",
    accent: "text-astraea-coral",
    title: {
      zh: "red-line 权限系统真的不会越线",
      en: "Red-line permissions keep control with you",
    },
    body: {
      zh: "你可以选择保守、快速或全自动，但关键边界始终守住。Astraea 的目标是让自动化更放心，而不是让你失去控制。",
      en: "Choose careful, fast, or highly automated workflows while sensitive boundaries still stay protected.",
    },
  },
  {
    label: "05",
    name: "Vigil scheduled agents",
    accent: "text-astraea-green",
    title: {
      zh: "Vigil 让 agent 变成后台守夜人",
      en: "Vigil keeps agent work running in the background",
    },
    body: {
      zh: "把检查、总结、提醒和后台任务交给 Astraea 定时处理。它不只在你提问时工作，也能在你离开后继续照看进度。",
      en: "Schedule checks, summaries, reminders, and background work so Astraea can keep watching progress after you step away.",
    },
  },
];

const updates = [
  {
    version: "0.10.3",
    date: "Jun 25, 2026",
    title: {
      zh: "/selection 悬浮选区助手",
      en: "/selection floating selection companion",
    },
    body: {
      zh: "/selection for quick research and task：在任意 app 选中文字、按快捷键弹出 Astraea 悬浮窗并带入选区，加一句指令即可发送。支持 macOS 原生悬浮面板与 Windows 的 Edge/Chrome app 窗口。",
      en: "/selection for quick research and task: select text in any app, press a hotkey, and a floating Astraea panel opens with your selection ready — just add a command and send. macOS gets a native panel; Windows gets an Edge/Chrome app window.",
    },
  },
  {
    version: "0.10.1",
    date: "Jun 24, 2026",
    title: {
      zh: "/init 项目初始化向导",
      en: "/init project onboarding",
    },
    body: {
      zh: "/init 现在会扫描仓库、读取 README / package.json / .mcp.json / .cursor/rules 等关键文件，并创建或更新 Astraea 的 AGENTS.md 项目指令。",
      en: "/init can now scan a repo, read key files such as README, package.json, .mcp.json, and .cursor/rules, then create or update Astraea AGENTS.md instructions.",
    },
  },
  {
    version: "0.10.0",
    date: "Jun 24, 2026",
    title: {
      zh: "DeepSeek V4 成为完整 Model Provider 适配",
      en: "DeepSeek V4 becomes a full Model Provider adaptation",
    },
    body: {
      zh: "首页和 docs 同步说明 DeepSeek 的 1M 上下文、更晚 compact、低 cache-hit 成本、/reason Flash/Pro 映射、ctx-agent 小模型策略、structuredResponse JSON 输出和 tool schema 兼容路线。",
      en: "Homepage and docs now explain DeepSeek's 1M context, later compaction, low cache-hit cost, /reason Flash/Pro mapping, ctx-agent small-model strategy, structuredResponse JSON output, and tool schema compatibility path.",
    },
  },
  {
    version: "0.9.45",
    date: "Jun 23, 2026",
    title: {
      zh: "Markdown 代码呈现得更像真实终端面板",
      en: "Markdown code renders like a real terminal pane",
    },
    body: {
      zh: "代码块获得 Astraea 主题背景、行号区域、整行填充和更紧凑的行内代码样式。",
      en: "Code blocks gained Astraea themed backgrounds, line gutters, full-line fills, and tighter inline code treatment.",
    },
  },
  {
    version: "0.9.44",
    date: "Jun 23, 2026",
    title: {
      zh: "PowerShell 现在与 Bash 共享权限语义",
      en: "PowerShell now shares Bash permission semantics",
    },
    body: {
      zh: "Forge 可以自动放行普通命令，同时敏感路径仍保留 red-line 确认。",
      en: "Forge can auto-allow ordinary commands while sensitive paths keep their red-line confirmation behavior.",
    },
  },
];

const installTabs = [
  {
    platform: "macOS",
    steps: [
      {
        title: { zh: "安装 Bun", en: "Install Bun" },
        code: "curl -fsSL https://bun.sh/install | bash",
        body: {
          zh: "Astraea 基于 Bun 运行。如果安装后找不到 bun 命令，请重启终端。",
          en: "Astraea runs on Bun. Restart your terminal after installation if the bun command is not found.",
        },
      },
      {
        title: { zh: "克隆源码并安装依赖", en: "Clone and install" },
        code: "git clone https://github.com/anxelswanz/astraea-agent.git astraea\ncd astraea\nbun install",
        body: {
          zh: "下载源码并安装项目依赖。",
          en: "Download the source and install dependencies.",
        },
      },
      {
        title: { zh: "注册 astraea 命令", en: "Register the astraea command" },
        code: "bun link",
        body: {
          zh: "完成 link 后，你可以在任意目录输入 astraea 启动。",
          en: "After linking, you can start Astraea from any folder with astraea.",
        },
      },
      {
        title: { zh: "启动", en: "Launch" },
        code: "astraea",
        body: {
          zh: "首次启动时，根据 /login 选择 provider，并用 /language 选择语言。",
          en: "On first launch, follow /login to choose a provider and /language to choose your language.",
        },
      },
    ],
  },
  {
    platform: "Windows",
    steps: [
      {
        title: { zh: "在 PowerShell 安装 Bun", en: "Install Bun in PowerShell" },
        code: "powershell -c \"irm bun.sh/install.ps1|iex\"",
        body: {
          zh: "建议使用 Windows 10 1809+ 或 Windows 11。安装后重新打开 PowerShell。",
          en: "Windows 10 1809+ or Windows 11 is recommended. Reopen PowerShell after installation.",
        },
      },
      {
        title: { zh: "克隆源码并安装依赖", en: "Clone and install" },
        code: "git clone https://github.com/anxelswanz/astraea-agent.git astraea\ncd astraea\nbun install",
        body: {
          zh: "从仓库安装 Astraea 并准备依赖。",
          en: "Install Astraea from the repository and prepare dependencies.",
        },
      },
      {
        title: { zh: "注册 astraea 命令", en: "Register the astraea command" },
        code: "bun link",
        body: {
          zh: "这会把 astraea 注册成全局终端命令。",
          en: "This exposes astraea as a global terminal command.",
        },
      },
      {
        title: { zh: "启动", en: "Launch" },
        code: "astraea",
        body: {
          zh: "Astraea 会引导你完成 provider 登录和语言选择。",
          en: "Astraea will guide you through provider login and language selection.",
        },
      },
    ],
  },
];

const commandDocs = [
  {
    id: "cmd-selection",
    command: "/selection",
    purpose: {
      zh: "悬浮选区助手：在任意 app 里选中文字，按快捷键弹出 Astraea 小窗，加一句指令即可获得解释、总结、翻译、改写或下一步行动。一句话——/selection 让快速研究与任务随手可得。",
      en: "Floating selection companion: select text in any app, press a hotkey, and a small Astraea panel pops up so you can explain, summarize, translate, rewrite, or turn it into next actions. In one line — /selection brings quick research and tasks to your fingertips.",
    },
    example: {
      zh: "/selection start    # 后台拉起服务\n/selection setup    # 打印快捷键绑定步骤\n/selection status   # 查看服务状态\n/selection stop     # 关闭服务",
      en: "/selection start    # start the service in the background\n/selection setup    # print hotkey setup steps\n/selection status   # check service status\n/selection stop     # stop the service",
    },
    when: {
      zh: "阅读、研究或处理工作时，想对选中的文字立刻提问，又不想切走当前 app 时使用。",
      en: "Use while reading, researching, or working when you want to ask about selected text without leaving the app you are in.",
    },
    details: [
      { zh: "学习：阅读文档、论文或代码时选中难懂的段落或术语，让 Astraea 用大白话解释。", en: "Learn: select a hard paragraph or term while reading docs, papers, or code and ask Astraea for a plain-language explanation." },
      { zh: "研究：从网页或 PDF 选中引用、数据或片段，要求总结、核查、翻译或对比。", en: "Research: select a quote, data point, or snippet from a webpage or PDF and ask for a summary, fact-check, translation, or comparison." },
      { zh: "工作与任务：选中报错日志、邮件草稿或需求，让 Astraea 修复、改写或拆成下一步行动——全程不离开当前 app。", en: "Work and tasks: select an error log, email draft, or spec and have Astraea fix, rewrite, or turn it into next actions — all without leaving the app." },
    ],
    platforms: [
      {
        platform: "macOS",
        steps: [
          { title: { zh: "启动服务", en: "Start the service" }, body: { zh: "在 REPL 里运行 /selection start，或在终端运行 astraea selection start。服务会在后台自动拉起（无需常驻终端）。", en: "Run /selection start in the REPL, or astraea selection start in a terminal. The bridge service auto-starts in the background — no terminal to keep open." }, code: "/selection start" },
          { title: { zh: "拿到绑定命令", en: "Get the bind command" }, body: { zh: "运行 setup，复制它打印出的那行 shell 命令（已填好你本机的绝对路径）。", en: "Run setup and copy the printed shell command (it already has your machine's absolute paths filled in)." }, code: "astraea selection setup" },
          { title: { zh: "在快捷指令里绑定", en: "Bind it in Shortcuts" }, body: { zh: "打开「快捷指令」App → 新建 → 添加「运行 Shell 脚本」动作 → 粘贴上一步的命令 → 指定一个快捷键（如 Option + Space）。", en: "Open the Shortcuts app → new shortcut → add the \"Run Shell Script\" action → paste the command → assign a hotkey (e.g. Option + Space)." } },
          { title: { zh: "授权并使用", en: "Grant access and use it" }, body: { zh: "首次触发时按提示在「系统设置 → 隐私与安全性 → 辅助功能」里授权。之后在任意 app 选中文字、按快捷键，悬浮窗即在光标旁弹出；输入指令，⌘ + ↵ 发送，Esc 关闭。", en: "On first run, grant permission in System Settings → Privacy & Security → Accessibility. Then select text in any app and press your hotkey — the panel pops up by the cursor. Type an instruction, ⌘ + ↵ to send, Esc to close." } },
        ],
      },
      {
        platform: "Windows",
        steps: [
          { title: { zh: "启动服务", en: "Start the service" }, body: { zh: "在 REPL 里运行 /selection start，或在终端运行 astraea selection start。服务会在后台自动拉起。", en: "Run /selection start in the REPL, or astraea selection start in a terminal. The bridge service auto-starts in the background." }, code: "/selection start" },
          { title: { zh: "拿到绑定命令", en: "Get the bind command" }, body: { zh: "运行 setup，复制它打印出的那行命令。", en: "Run setup and copy the printed command." }, code: "astraea selection setup" },
          { title: { zh: "绑定快捷键（任选其一）", en: "Bind a hotkey (either option)" }, body: { zh: "方案 A（推荐）：装 AutoHotkey v2，新建 .ahk 脚本写入下方热键并运行。方案 B：在桌面新建快捷方式，目标填上一步的命令，右键 → 属性 → 在「快捷键」里设一个组合键（如 Ctrl+Alt+S）。", en: "Option A (recommended): install AutoHotkey v2, put the hotkey below in a .ahk script, and run it. Option B: create a Desktop shortcut whose Target is the command, then right-click → Properties → set a key combo in \"Shortcut key\" (e.g. Ctrl+Alt+S)." }, code: "^!Space::Run '<paste the setup command here>', , 'Hide'" },
          { title: { zh: "使用", en: "Use it" }, body: { zh: "在任意 app 选中文字、按快捷键，一个干净的 Edge/Chrome app 窗口会带着选区弹出；输入指令并发送即可。", en: "Select text in any app and press your hotkey — a clean Edge/Chrome app window opens with your selection. Type an instruction and send." } },
        ],
      },
    ],
  },
  {
    id: "cmd-init",
    command: "/init",
    purpose: { zh: "扫描仓库并创建或更新 Astraea 的 AGENTS.md 项目指令。", en: "Scan a repository and create or update Astraea AGENTS.md project instructions." },
    example: "/init",
    when: { zh: "首次在一个项目中使用 Astraea，或项目命令、架构、约定发生变化时使用。", en: "Use the first time you bring Astraea into a project, or when project commands, architecture, or conventions change." },
  },
  {
    id: "cmd-login",
    command: "/login",
    purpose: { zh: "选择 provider、model 和 API key。", en: "Choose provider, model, and API key." },
    example: "/login",
    when: { zh: "首次启动、更换模型供应商，或轮换 API key 时使用。", en: "Use on first launch, when changing from Anthropic to OpenAI/DeepSeek/Kimi/Ollama, or when rotating an API key." },
  },
  {
    id: "cmd-internet",
    command: "/internet",
    purpose: { zh: "配置 Bocha、Zhipu、Tavily、Brave 或 Exa 等联网搜索 provider。", en: "Configure web search providers such as Bocha, Zhipu, Tavily, Brave, or Exa." },
    example: { zh: "/internet\n# 别名\n/search", en: "/internet\n# alias\n/search" },
    when: { zh: "当 Astraea 需要最新文档、新闻、来源核查，或超出本地文件的研究时使用。", en: "Use when Astraea needs current docs, news, source checking, or research beyond local files." },
  },
  {
    id: "cmd-language",
    command: "/language",
    purpose: { zh: "即时切换 UI 语言和回复语言。", en: "Switch UI language and reply language instantly." },
    example: "/language zh",
    when: { zh: "当你希望 Astraea 用另一种语言回答并显示控件时使用。", en: "Use when you want Astraea to answer and display controls in another language." },
  },
  {
    id: "cmd-reason",
    command: "/reason",
    purpose: { zh: "设置推理强度：low、medium、high、max 或 auto。", en: "Set reasoning effort: low, medium, high, max, or auto." },
    example: "/reason high",
    when: { zh: "架构设计、调试、审计，或深度思考比速度更重要时使用 high 或 max。", en: "Use high or max for architecture, debugging, audits, or tasks where deeper thinking matters more than speed." },
  },
  {
    id: "cmd-mode",
    command: "/mode",
    purpose: { zh: "选择自主模式：default、orbit、cruise、forge、counsel。", en: "Choose autonomy mode: default, orbit, cruise, forge, counsel." },
    example: "/mode counsel",
    when: { zh: "只读规划用 orbit；快速编辑用 cruise；可信自动化用 forge；需求模糊时用 counsel。", en: "Use orbit for read-only planning, cruise for faster edits, forge for trusted automation, and counsel when the task is ambiguous." },
  },
  {
    id: "cmd-model",
    command: "/model",
    purpose: { zh: "查看当前 provider、model、endpoint 和上下文容量。", en: "Show the current provider, model, endpoint, and context capacity." },
    example: "/model",
    when: { zh: "不确定当前使用哪个模型，或想确认 provider 是否切换成功时使用。", en: "Use when you are unsure which model Astraea is currently using or want to confirm a provider switch." },
  },
  {
    id: "cmd-goal",
    command: "/goal",
    purpose: { zh: "设置一个 Astraea 必须用证据完成的明确目标。", en: "Set a concrete objective that Astraea must satisfy with evidence." },
    example: "/goal Build the homepage and verify npm run build passes",
    when: { zh: "用于多步骤任务，尤其是完成状态需要被验证而不是只靠口头声明时。", en: "Use for multi-step work where completion should be checked, not merely claimed." },
  },
  {
    id: "cmd-vigil",
    command: "/vigil",
    purpose: { zh: "管理定时后台任务。", en: "Manage scheduled background tasks." },
    example: "/vigil",
    when: { zh: "用于周期检查、提醒、总结，或之后需要运行的长任务。", en: "Use for recurring checks, reminders, summaries, or long-running work that should happen later." },
  },
  {
    id: "cmd-mcp",
    command: "/mcp",
    purpose: { zh: "在 REPL 中查看 MCP server 的实时连接状态。", en: "Show live MCP server connection status inside the REPL." },
    example: "/mcp",
    when: { zh: "添加、移除或重启 MCP server 后，用它确认 Astraea 是否能看到对应工具。", en: "Use after adding, removing, or restarting MCP servers to confirm whether Astraea can see their tools." },
  },
  {
    id: "cmd-plugin",
    command: "/plugin",
    purpose: { zh: "查看已安装插件和已订阅的插件市场。", en: "Show installed plugins and subscribed plugin marketplaces." },
    example: "/plugin",
    when: { zh: "检查插件提供的 skill 或 MCP server 是否应在重启后可用时使用。", en: "Use when checking whether plugin-provided skills or MCP servers should be available after restart." },
  },
  {
    id: "cmd-reload-plugins",
    command: "/reload-plugins",
    purpose: { zh: "不重启 REPL，重新加载插件 skills。", en: "Reload plugin skills without restarting the REPL." },
    example: "/reload-plugins",
    when: { zh: "编辑或安装插件 skill 后使用。MCP server 连接仍然需要重启生效。", en: "Use after editing or installing plugin skills. Restart is still needed for MCP server connections." },
  },
  {
    id: "cmd-stop",
    command: "/stop",
    purpose: { zh: "停止当前任务和正在运行的 agents。", en: "Stop the current task and any running agents." },
    example: "/stop",
    when: { zh: "任务方向不对、耗时太久，或需要立即中断时使用。", en: "Use when a task is going in the wrong direction, taking too long, or should be interrupted immediately." },
  },
  {
    id: "cmd-clear",
    command: "/clear",
    purpose: { zh: "清空当前可见对话历史。", en: "Clear the current visible conversation history." },
    example: "/clear",
    when: { zh: "想要一个干净的聊天界面，但不改变项目配置时使用。", en: "Use when you want a fresh chat surface without changing project configuration." },
  },
  {
    id: "cmd-compact",
    command: "/compact",
    purpose: { zh: "立即压缩上下文，也可以附带一个关注重点。", en: "Compact context now, optionally with a focus hint." },
    example: "/compact focus on the deployment issue",
    when: { zh: "长会话上下文变重，但你希望 Astraea 保留关键线索时使用。", en: "Use during long sessions when context is heavy but you want Astraea to preserve the important thread." },
    details: [
      {
        zh: "这些比例按 effectiveWindow 计算，不是绝对 token 数；effectiveWindow 会从当前 provider 的上下文容量中扣除输出预留空间。",
        en: "These ratios are calculated against effectiveWindow, not absolute token counts; effectiveWindow reserves output space from the active provider context capacity.",
      },
      {
        zh: "通用默认阈值：warning 0.80、stage 0.75、commit 0.85、autocompact 0.92、blocking collapse 0.95、hard blocking 0.98。",
        en: "General default thresholds: warning 0.80, stage 0.75, commit 0.85, autocompact 0.92, blocking collapse 0.95, hard blocking 0.98.",
      },
      {
        zh: "DeepSeek context thresholds 是 DeepSeek 专属：80% effective window 启动 ctx-agent 后台折叠，90% 提醒并允许自动 compact，95% 阻塞并强制 compact。",
        en: "DeepSeek context thresholds are provider-specific: 80% effective window starts ctx-agent background staging, 90% warns and allows automatic compact, and 95% blocks for forced compact.",
      },
      {
        zh: "默认配置是 DEEPSEEK_CONTEXT_WINDOW=1000000，DEEPSEEK_MAX_TOKENS=8192；因此普通对话和长代码阅读会优先保留原始上下文，不会因为 token 数看起来很大就过早压缩。",
        en: "The defaults are DEEPSEEK_CONTEXT_WINDOW=1000000 and DEEPSEEK_MAX_TOKENS=8192, so ordinary conversation and long code reading preserve raw context instead of compacting early just because the token count looks large.",
      },
    ],
  },
  {
    id: "cmd-resume",
    command: "/resume",
    purpose: { zh: "从保存的聊天记录中恢复历史会话。", en: "Resume a previous persisted session from transcript history." },
    example: "/resume",
    when: { zh: "想继续之前的对话，或关闭终端后恢复工作时使用。", en: "Use when you want to continue a past conversation or recover work after closing the terminal." },
  },
  {
    id: "cmd-rewind",
    command: "/rewind",
    purpose: { zh: "把当前会话回到更早的检查点，包括对话状态和已编辑文件。", en: "Return the current session to an earlier checkpoint, including conversation state and edited files." },
    example: "/rewind\n/rewind 4",
    when: { zh: "最近一步走错，想回滚而不是手动撤销每个改动时使用。", en: "Use when a recent turn went wrong and you want to roll back instead of manually undoing every change." },
  },
  {
    id: "cmd-usage",
    command: "/usage",
    purpose: { zh: "查看 token 使用量和预估成本。", en: "Show token usage and estimated cost." },
    example: "/usage",
    when: { zh: "长会话中想了解模型使用和成本时使用。", en: "Use during long sessions to understand spend and model usage." },
  },
  {
    id: "cmd-audit",
    command: "/audit",
    purpose: { zh: "查看权限决策，以及某个动作为什么被允许或拒绝。", en: "Review permission decisions and why an action was allowed or denied." },
    example: "/audit\n/audit --project --deny\n/audit --reason redline --limit 20",
    when: { zh: "想理解安全确认、被拒绝动作，或项目级权限历史时使用。", en: "Use when you want to understand safety prompts, denied actions, or project-level permission history." },
  },
  {
    id: "cmd-help",
    command: "/help",
    purpose: { zh: "列出可用命令和 skills。", en: "List available commands and skills." },
    example: "/help",
    when: { zh: "忘记命令，或想发现当前项目可用 skills 时使用。", en: "Use whenever you forget a command or want to discover project skills." },
  },
];

const configDocs = [
  {
    id: "config-mcp",
    title: { zh: "MCP 配置", en: "MCP configuration" },
    summary: { zh: "MCP server 可以把数据库、Sentry、文件系统适配器或内部 API 这类外部工具交给 Astraea 使用。", en: "MCP servers expose external tools such as databases, Sentry, filesystem adapters, or internal APIs." },
    bullets: [
      { zh: "工具提供方托管 MCP endpoint 时，使用远程 HTTP server。", en: "Use a remote HTTP server when the tool provider hosts an MCP endpoint." },
      { zh: "endpoint 需要固定 token 时，添加远程认证 header。", en: "Use a remote auth header when the endpoint requires a static token." },
      { zh: "工具作为本地子进程运行时，使用 stdio server。", en: "Use a local stdio server when the tool runs as a local subprocess." },
      { zh: "配置后先列出 server，移除旧 server，再在 REPL 中检查实时状态。", en: "Inspect configured servers, remove old servers, then check live status inside the REPL." },
      { zh: "配置位置：project scope 写入 .mcp.json；user scope 写入 ~/.astraea/settings.json；local scope 写入 .astraea/settings.local.json。", en: "Config storage: project scope goes to .mcp.json, user scope goes to ~/.astraea/settings.json, local scope goes to .astraea/settings.local.json." },
      { zh: "修改 MCP 配置后请重启 Astraea，因为 server 会在启动时连接。", en: "Restart Astraea after changing MCP config because servers connect at startup." },
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
    title: { zh: "Skill 配置", en: "Skill configuration" },
    summary: { zh: "Skill 是 Markdown 操作手册，用来教 Astraea 可重复执行的工作流，也可以为单次调用指定工具或模型。", en: "Skills are Markdown operating manuals. They teach Astraea a repeatable workflow and can add allowed tools or a model override for that invocation." },
    bullets: [
      { zh: "项目级路径：<repo>/.astraea/skills/<name>/SKILL.md。", en: "Project skill path: <repo>/.astraea/skills/<name>/SKILL.md." },
      { zh: "用户级路径：~/.astraea/skills/<name>/SKILL.md。重名时用户级 skill 优先。", en: "User skill path: ~/.astraea/skills/<name>/SKILL.md. User skills win on name conflict." },
      { zh: "文件夹名就是命令名，例如 .astraea/skills/code-review/SKILL.md 会变成 /code-review。", en: "The folder name is the command name. A skill at .astraea/skills/code-review/SKILL.md becomes /code-review." },
      { zh: "Frontmatter 可包含 description、when_to_use、allowed-tools、argument-hint、model、user-invocable、disable-model-invocation。", en: "Frontmatter can include description, when_to_use, allowed-tools, argument-hint, model, user-invocable, and disable-model-invocation." },
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
    title: { zh: "AGENTS.md 项目说明", en: "AGENTS.md project instructions" },
    summary: { zh: "AGENTS.md 是 Astraea 的项目指令文件，用来记录仓库约定、测试命令、发布规则和安全注意事项。", en: "AGENTS.md is Astraea's project instruction file. Use it for repo-specific conventions, testing commands, release rules, and safety notes." },
    bullets: [
      { zh: "加载顺序：<repo>/AGENTS.md，然后 <repo>/AGENTS.local.md，最后 ~/.astraea/AGENTS.md。", en: "Load order: <repo>/AGENTS.md, then <repo>/AGENTS.local.md, then ~/.astraea/AGENTS.md." },
      { zh: "AGENTS.md 通常会提交到 git，与团队共享。", en: "AGENTS.md is usually committed and shared with the team." },
      { zh: "AGENTS.local.md 用于个人或本机说明，通常不要提交。", en: "AGENTS.local.md is for personal or machine-specific notes and should normally stay out of git." },
      { zh: "全局 ~/.astraea/AGENTS.md 会作用于所有项目。", en: "Global ~/.astraea/AGENTS.md applies across projects." },
      { zh: "Astraea 使用 AGENTS.md / AGENTS.local.md，不使用 CLAUDE.md。", en: "Astraea uses AGENTS.md / AGENTS.local.md for this purpose, not CLAUDE.md." },
    ],
    code: `# AGENTS.md
Use bun test for tests.
Run bun run typecheck before release.
Do not edit generated files unless asked.`,
  },
  {
    id: "config-transcripts",
    title: { zh: "聊天记录与 transcripts", en: "Transcripts and chat history" },
    summary: { zh: "Astraea 会保存 append-only JSONL transcript，让 /resume 和回滚式恢复能找回过去的工作。", en: "Astraea persists append-only JSONL transcripts so /resume and rewind-style recovery can restore past work." },
    bullets: [
      { zh: "路径格式：~/.astraea/projects/<escaped-cwd>/<sessionId>.jsonl。", en: "Path format: ~/.astraea/projects/<escaped-cwd>/<sessionId>.jsonl." },
      { zh: "escaped-cwd 会把 / 替换成 -，例如 /Users/me/app 会变成 -Users-me-app。", en: "escaped-cwd replaces / with -, for example /Users/me/app becomes -Users-me-app." },
      { zh: "审计日志与 transcript 放在同目录，文件名为 <sessionId>.audit.jsonl。", en: "Audit logs sit beside transcripts as <sessionId>.audit.jsonl." },
      { zh: "默认保留 30 天。可在 ~/.astraea/settings.json 设置 cleanupPeriodDays；0 表示关闭持久化，负数表示永久保留。", en: "Default retention is 30 days. Set cleanupPeriodDays in ~/.astraea/settings.json; 0 disables persistence, negative keeps forever." },
      { zh: "要找某个项目的聊天记录，先列出 ~/.astraea/projects，再选择匹配项目路径的目录。", en: "To find a project's chat history, list ~/.astraea/projects and choose the directory matching the escaped project path." },
    ],
    code: `ls ~/.astraea/projects
ls ~/.astraea/projects/-Users-me-my-project
cat ~/.astraea/projects/-Users-me-my-project/<sessionId>.jsonl`,
  },
  {
    id: "config-settings",
    title: { zh: "设置与密钥", en: "Settings and secrets" },
    summary: { zh: "Astraea 会刻意分离行为设置和密钥，因此 API key 不需要放在项目里。", en: "Settings and secrets are intentionally separated so API keys do not need to live in the project." },
    bullets: [
      { zh: "Provider 和联网搜索 key 会由 /login 与 /internet 保存，通常位于 ~/.astraea/.env。", en: "Provider and web-search keys are saved by /login and /internet, normally in ~/.astraea/.env." },
      { zh: "行为设置位于 ~/.astraea/settings.json。", en: "Behavior settings live in ~/.astraea/settings.json." },
      { zh: "项目 .env 可以覆盖某个仓库的 provider 设置，但不要提交密钥。", en: "Project .env can override provider settings for a specific repository, but do not commit secrets." },
      { zh: "优先级：shell 环境变量，然后 ~/.astraea/settings.json env，然后项目 .env，最后 ~/.astraea/.env。", en: "Priority order: shell environment, then ~/.astraea/settings.json env, then project .env, then ~/.astraea/.env." },
      { zh: "支持 Anthropic、OpenAI-compatible endpoints、DeepSeek、Kimi 和本地 Ollama。", en: "Supported model providers include Anthropic, OpenAI-compatible endpoints, DeepSeek, Kimi, and local Ollama." },
      { zh: "选择模型或推理强度后，可用 /usage 观察 token 和成本影响。", en: "Use /usage to monitor token and cost impact after choosing models or reasoning effort." },
    ],
    code: {
      zh: `# 全局密钥，可跨项目复用
mkdir -p ~/.astraea
$EDITOR ~/.astraea/.env

PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-6

# OpenAI-compatible 示例
PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o

/login
/model
/usage`,
      en: `# global secrets, shared across projects
mkdir -p ~/.astraea
$EDITOR ~/.astraea/.env

PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-6

# OpenAI-compatible example
PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o

/login
/model
/usage`,
    },
  },
  {
    id: "config-notify",
    title: { zh: "通知", en: "Notifications" },
    summary: { zh: "任务完成或权限确认需要你处理时，Astraea 可以发出提醒。", en: "Astraea can notify you when a task finishes or when a permission prompt needs your attention." },
    bullets: [
      { zh: "用 enabled 开启或关闭通知。", en: "Use enabled to turn notifications on or off." },
      { zh: "channel 设置为 auto 可以获得最适合当前终端的行为。", en: "Use channel auto for the best terminal-specific behavior." },
      { zh: "用 minDurationMs 避免短任务频繁通知。", en: "Use minDurationMs to avoid notifications for very short tasks." },
      { zh: "如果希望富通知也触发终端铃声，可开启 sound。", en: "Use sound if you want rich notifications to also trigger a terminal bell." },
    ],
    code: `{
  "notify": {
    "enabled": true,
    "channel": "auto",
    "minDurationMs": 30000,
    "sound": false
  }
}`,
  },
  {
    id: "config-retention",
    title: { zh: "聊天记录保留时间", en: "Transcript retention" },
    summary: { zh: "当你想控制聊天记录在磁盘上保存多久时，配置 transcript retention。", en: "Use transcript retention when you want to control how long chat history stays on disk." },
    bullets: [
      { zh: "默认保留 30 天。", en: "The default is 30 days." },
      { zh: "cleanupPeriodDays 设为 0 会关闭 transcript 持久化。", en: "Set cleanupPeriodDays to 0 to disable transcript persistence." },
      { zh: "cleanupPeriodDays 小于 0 表示永久保留。", en: "Set cleanupPeriodDays below 0 to keep transcripts forever." },
      { zh: "resume 和历史恢复都依赖 transcripts。", en: "Transcripts are the source used by resume and history recovery." },
    ],
    code: `{
  "cleanupPeriodDays": 30
}`,
  },
  {
    id: "config-hooks",
    title: { zh: "压缩 hooks", en: "Compaction hooks" },
    summary: { zh: "Hooks 允许高级用户在上下文压缩前后运行自己的脚本。", en: "Hooks let advanced users run their own scripts before or after context compaction." },
    bullets: [
      { zh: "用 preCompact 把本地上下文加入压缩指令。", en: "Use preCompact to add local context into the compaction instruction." },
      { zh: "用 postCompact 执行日志记录或同步摘要等副作用。", en: "Use postCompact for side effects such as logging or syncing a summary." },
      { zh: "用 timeoutMs 防止 hooks 阻塞会话太久。", en: "Use timeoutMs to keep hooks from blocking the session for too long." },
      { zh: "除非已有明确自动化需求，否则可以跳过 hooks。", en: "Skip hooks unless you already have a concrete automation need." },
    ],
    code: `{
  "hooks": {
    "preCompact": "bun scripts/pre-compact.ts",
    "postCompact": "bun scripts/post-compact.ts",
    "timeoutMs": 10000
  }
}

/compact focus on deployment decisions`,
  },
  {
    id: "config-env",
    title: { zh: "环境变量覆盖", en: "Environment overrides" },
    summary: { zh: "env 设置适合保存 Astraea 启动时要应用的非密钥运行开关。", en: "Use env settings for non-secret runtime flags that should apply when Astraea starts." },
    bullets: [
      { zh: "Shell 环境变量仍然拥有最高优先级。", en: "Shell environment variables still have highest priority." },
      { zh: "这里适合放行为开关，不适合放 API key。", en: "Use this for behavior flags, not API keys." },
      { zh: "Provider 和搜索 API key 通常应保存在 /login 与 /internet 管理的环境文件中。", en: "Provider and search API keys should usually stay in the environment file managed by the login and internet setup flows." },
    ],
    code: `{
  "env": {
    "PHOENIX_ENABLED": "true",
    "ENABLE_LSP_TOOL": "true",
    "ASTRAEA_AUTOCOMPACT": "true",
    "ASTRAEA_SEARCH_ADAPTER": "auto"
  }
}`,
  },
  {
    id: "config-vigil",
    title: { zh: "Vigil daemon", en: "Vigil daemon" },
    summary: { zh: "Vigil 用于定时任务。REPL 负责创建和查看任务，daemon 负责在后台运行。", en: "Vigil is for scheduled work. The REPL is where you create and review tasks; the daemon is the background runner." },
    bullets: [
      { zh: "在 Astraea 内使用 /vigil 添加、列出、删除或查看定时任务。", en: "Use /vigil inside Astraea to add, list, delete, or review scheduled tasks." },
      { zh: "当定时任务需要在当前 REPL 外继续运行时，启动 daemon。", en: "Run the daemon when scheduled tasks should keep working outside the active REPL." },
      { zh: "daemon 适合提醒、周期总结和重复检查。", en: "Use the daemon for reminders, periodic summaries, and recurring checks." },
      { zh: "长任务后可用 /usage 查看模型使用情况。", en: "Use /usage after long-running tasks if you want to inspect model usage." },
    ],
    code: `/vigil
bun run src/cli.ts --daemon
bun run src/cli.ts --headless --task <task-id>`,
  },
  {
    id: "config-plugin",
    title: { zh: "插件", en: "Plugins" },
    summary: { zh: "插件会把 skills 和 MCP servers 打包成可安装单元，适合团队分发工作流，而不是手动复制文件夹。", en: "Plugins package skills and MCP servers into installable units. They are useful when a team wants to distribute a workflow instead of copying folders by hand." },
    bullets: [
      { zh: "从本地 marketplace 安装前，需要先订阅它。", en: "Subscribe to a local marketplace before installing from it." },
      { zh: "安装插件后，重启才能应用新的 MCP servers。", en: "Install a plugin, then restart to apply new MCP servers." },
      { zh: "可以在 REPL 或终端中查看已安装插件。", en: "Inspect installed plugins in the REPL or from the terminal." },
      { zh: "如果发生冲突，手动配置的 skills 和 MCP 会优先于插件提供的内容。", en: "Manual skills and MCP configuration win over plugin-provided entries on conflict." },
      { zh: "除非设置 ASTRAEA_PLUGINS_DIR，插件文件默认位于 ~/.astraea/plugins。", en: "Plugin files live under ~/.astraea/plugins unless ASTRAEA_PLUGINS_DIR is set." },
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
    title: { zh: "什么时候使用 SubAgent", en: "When to use SubAgent" },
    body: { zh: "当你希望 Astraea 把大任务拆给多个专注助手分别处理，再汇总成一个答案时使用 SubAgent。", en: "Use SubAgent when you want Astraea to ask focused helpers to work on separate parts of a larger job, then bring the results back into one answer." },
    code: {
      zh: `Ask Astraea:
"启动两个 SubAgent：一个审查前端架构，一个审查部署风险。然后对比它们的发现。"`,
      en: `Ask Astraea:
"Launch two SubAgents: one reviews the frontend architecture, one reviews deployment risk. Then compare their findings."`,
    },
  },
  {
    id: "subagent-launch",
    title: { zh: "请求一个专注助手", en: "Ask for a focused helper" },
    body: { zh: "像写一份小 brief 一样描述助手任务：要检查什么、忽略什么、希望返回什么结果。自然语言就是最常用的使用方式。", en: "Describe the helper's job like a mini brief: what to inspect, what to ignore, and what kind of answer you want back. Natural language is the normal way to use it." },
    code: {
      zh: `Ask Astraea:
"启动一个 SubAgent 审查 docs 导航。检查每个 command 和 mode 是否都有清晰锚点。只报告缺失链接。"

# Astraea 启动助手时可能展示的精确动作形式：
Agent({
  description: "Audit docs navigation",
  prompt: "Review the docs page navigation. Check whether every command and mode has a clear anchor, then report missing links.",
  model: "small"
})`,
      en: `Ask Astraea:
"Launch a SubAgent to review docs navigation. Check whether every command and mode has a clear anchor. Report missing links only."

# Exact action form Astraea may show when it launches the helper:
Agent({
  description: "Audit docs navigation",
  prompt: "Review the docs page navigation. Check whether every command and mode has a clear anchor, then report missing links.",
  model: "small"
})`,
    },
  },
  {
    id: "subagent-monitor",
    title: { zh: "查看进度", en: "Monitor progress" },
    body: { zh: "当多个助手同时运行时，可以让 Astraea 列出正在运行的助手、按 ID 打开某一个，或展示它的最新输出。", en: "When several helpers are running, ask Astraea which ones are active, open one by ID, or show its latest output." },
    code: {
      zh: `Ask Astraea:
"显示正在运行的 SubAgent，并打开 docs 导航审查。"

TaskList({ statusFilter: "running" })
TaskGet({ taskId: "a3x9m7kp" })
TaskOutput({ taskId: "a3x9m7kp", offset: 0, limit: 80 })`,
      en: `Ask Astraea:
"Show running SubAgents and open the docs navigation audit."

TaskList({ statusFilter: "running" })
TaskGet({ taskId: "a3x9m7kp" })
TaskOutput({ taskId: "a3x9m7kp", offset: 0, limit: 80 })`,
    },
  },
  {
    id: "subagent-guide",
    title: { zh: "纠偏或停止助手", en: "Guide or stop a worker" },
    body: { zh: "如果助手看错方向，可以给它追加说明；如果它已经不再有用，可以停止它，让其他工作继续推进。", en: "If a helper is looking at the wrong thing, send a correction. If the helper is no longer useful, stop it and keep the rest of the work moving." },
    code: {
      zh: `Ask Astraea:
"告诉 docs 审查 SubAgent 只关注坏链接。如果它开始审查文案，就停止它。"

SendMessage({
  to: "a3x9m7kp",
  message: "Focus only on broken links. Ignore copywriting."
})

TaskStop({ taskId: "a3x9m7kp" })`,
      en: `Ask Astraea:
"Tell the docs audit SubAgent to focus only on broken links. Stop it if it starts reviewing copywriting."

SendMessage({
  to: "a3x9m7kp",
  message: "Focus only on broken links. Ignore copywriting."
})

TaskStop({ taskId: "a3x9m7kp" })`,
    },
  },
  {
    id: "subagent-peers",
    title: { zh: "与另一个 Astraea 会话沟通", en: "Talk to another Astraea process" },
    body: { zh: "如果同一台机器上还有另一个 Astraea 会话，可以让当前会话找到它，并发送一条简短协作消息。", en: "If you have another Astraea session open on the same machine, you can ask this session to find it and send a short coordination message." },
    code: {
      zh: `Ask Astraea:
"查找本地其他 Astraea 会话，并让活跃会话总结它当前的发现。"

ListPeers()

SendMessage({
  to: "uds:/tmp/astraea-12345.sock",
  message: "Please summarize your current findings for this repo."
})`,
      en: `Ask Astraea:
"Find other local Astraea sessions and ask the active one to summarize its current findings."

ListPeers()

SendMessage({
  to: "uds:/tmp/astraea-12345.sock",
  message: "Please summarize your current findings for this repo."
})`,
    },
  },
];

const modelProviderDocs = [
  {
    id: "provider-deepseek",
    title: { zh: "DeepSeek V4", en: "DeepSeek V4" },
    summary: {
      zh: "Astraea 对 DeepSeek 的适配目标是把 V4 的长上下文、低 cache-hit 成本、Flash/Pro 分层和结构化输出变成实际工作流优势。",
      en: "Astraea's DeepSeek adaptation turns V4's long context, low cache-hit cost, Flash/Pro tiering, and structured output into practical workflow advantages.",
    },
    groups: [
      {
        title: { zh: "/reason 映射与 /login 优先级", en: "/reason mapping and /login priority" },
        bullets: [
          {
            zh: "默认轻量路径使用 deepseek-v4-flash；/reason high 和 /reason max 会自动升到 deepseek-v4-pro。",
            en: "The default lightweight path uses deepseek-v4-flash; /reason high and /reason max automatically move to deepseek-v4-pro.",
          },
          {
            zh: "/reason auto 与 low 关闭 thinking；medium 开启 thinking.type 并设置 reasoning_effort=high；max 使用 reasoning_effort=max。",
            en: "/reason auto and low disable thinking; medium enables thinking.type with reasoning_effort=high; max uses reasoning_effort=max.",
          },
          {
            zh: "/login 选择的 provider 和 model 拥有最高优先级；切换 provider 时会清理旧的会话级 reasoning 覆盖，避免 Flash 被旧状态意外升 Pro。",
            en: "/login has the highest priority for provider and model selection; switching providers clears stale session reasoning overrides so Flash is not unexpectedly promoted to Pro.",
          },
        ],
        code: `/login
/reason high

auto | low    -> configured model, thinking disabled
medium       -> configured model, thinking.type enabled, reasoning_effort=high
high         -> deepseek-v4-pro, thinking.type enabled, reasoning_effort=high
max          -> deepseek-v4-pro, thinking.type enabled, reasoning_effort=max`,
      },
      {
        title: { zh: "1M 上下文与更晚 compact", en: "1M context and later compaction" },
        bullets: [
          {
            zh: "DeepSeek 默认 DEEPSEEK_CONTEXT_WINDOW=1000000，输出上限仍用 DEEPSEEK_MAX_TOKENS=8192 保持保守。",
            en: "DeepSeek defaults to DEEPSEEK_CONTEXT_WINDOW=1000000 while keeping DEEPSEEK_MAX_TOKENS=8192 conservative.",
          },
          {
            zh: "普通对话和长代码阅读优先保留原始上下文，避免过早摘要造成文件细节、调用链和用户约束丢失。",
            en: "Ordinary conversation and long code reading preserve raw context first, avoiding early summaries that lose file details, call chains, and user constraints.",
          },
          {
            zh: "DeepSeek context thresholds：80% 启动 ctx-agent 后台折叠，90% 提醒或自动 compact，95% 阻塞并强制 compact。",
            en: "DeepSeek context thresholds: 80% starts ctx-agent background staging, 90% warns or auto-compacts, and 95% blocks for forced compact.",
          },
          {
            zh: "FileReadTool 会随 provider context window 动态放宽单文件读取上限，但仍保留单次读取保护和绝对上限。",
            en: "FileReadTool can relax per-file read limits based on the provider context window, while still keeping per-read protection and an absolute cap.",
          },
        ],
        code: `DEEPSEEK_CONTEXT_WINDOW=1000000
DEEPSEEK_MAX_TOKENS=8192

80% effective window -> ctx-agent stages a fold in the background
90% effective window -> warn or autocompact
95% effective window -> block and force compact`,
      },
      {
        title: { zh: "低 cache-hit 成本与稳定 prompt 前缀", en: "Low cache-hit cost and stable prompt prefixes" },
        bullets: [
          {
            zh: "DeepSeek V4 的 cache-hit 成本很低，因此 Astraea 尽量让系统提示词的稳定前缀保持不变，提高缓存复用。",
            en: "DeepSeek V4 has a very low cache-hit cost, so Astraea keeps the stable prefix of the system prompt as unchanged as possible to improve cache reuse.",
          },
          {
            zh: "静态身份、操作规范、工具说明和稳定 memory 放在靠前区域；MCP 状态、git 状态、实时日期、动态权限说明等高频变化内容放在后部。",
            en: "Static identity, operating rules, tool instructions, and stable memory stay near the front; volatile MCP state, git state, current dates, and dynamic permission notes move later.",
          },
          {
            zh: "Astraea 避免每轮随机重排 prompt section，也避免把变化内容塞进最前面的缓存友好区域。",
            en: "Astraea avoids random prompt-section reordering each turn and avoids placing volatile content in the most cache-friendly prefix.",
          },
        ],
      },
      {
        title: { zh: "小模型、ctx-agent 与结构化输出", en: "Small model, ctx-agent, and structured output" },
        bullets: [
          {
            zh: "DeepSeek provider 下默认小模型是 deepseek-v4-flash；ctx-agent 默认走 Flash，复杂 eval 或高保真 compact 可显式升 Pro。",
            en: "Under the DeepSeek provider, the default small model is deepseek-v4-flash; ctx-agent uses Flash by default, while complex eval or high-fidelity compact can explicitly move to Pro.",
          },
          {
            zh: "可用 DEEPSEEK_SMALL_MODEL 覆盖内部小模型，用 DEEPSEEK_REASONING_MODEL 指定强推理模型。",
            en: "DEEPSEEK_SMALL_MODEL can override the internal small model, and DEEPSEEK_REASONING_MODEL can identify the stronger reasoning model.",
          },
          {
            zh: "内部小模型调用新增 structuredResponse: 'json' 能力；OpenAI-compatible provider 会发送 response_format: { type: 'json_object' }，非法 JSON 会自动重试一次再回退文本解析。",
            en: "Internal small-model calls gained structuredResponse: 'json'; OpenAI-compatible providers send response_format: { type: 'json_object' }, and invalid JSON retries once before falling back to text parsing.",
          },
        ],
        code: `PROVIDER=deepseek
DEEPSEEK_MODEL=deepseek-v4-flash
CTX_AGENT_MODEL=deepseek-v4-flash
DEEPSEEK_SMALL_MODEL=deepseek-v4-flash
DEEPSEEK_REASONING_MODEL=deepseek-v4-pro

querySmallModel(prompt, signal, systemPrompt, {
  structuredResponse: 'json'
})

response_format: { type: 'json_object' }`,
      },
      {
        title: { zh: "Tool schema 与 strict tools 路线", en: "Tool schema and strict tools path" },
        bullets: [
          {
            zh: "当前默认保持 ordinary tool calls，确保 FileEdit、Bash、WebSearch、Agent 等既有工具调用兼容。",
            en: "The current default keeps ordinary tool calls so existing FileEdit, Bash, WebSearch, Agent, and other tools remain compatible.",
          },
          {
            zh: "DeepSeek 适配层只做必要字段转换：name、description、parameters 和 tool_choice，不强行 strict 化复杂 schema。",
            en: "The DeepSeek adapter only converts required fields: name, description, parameters, and tool_choice, without forcing complex schemas into strict mode.",
          },
          {
            zh: "未来实验开关 DEEPSEEK_STRICT_TOOLS 可用于 strict schema：自动补 additionalProperties: false，检查 required，并对无法 strict 化的工具回退普通模式。",
            en: "The future DEEPSEEK_STRICT_TOOLS experiment can strictify schemas by adding additionalProperties: false, checking required fields, and falling back to ordinary mode when a tool cannot be strictified.",
          },
        ],
        code: `DEEPSEEK_STRICT_TOOLS=1

Phase 1: ordinary tool calls
Phase 2: strict tools experiment with safe fallback`,
      },
    ],
  },
];

const modes = [
  {
    id: "mode-default",
    name: "default",
    summary: { zh: "日常模式。Astraea 可以正常协助，但在写文件或运行 shell 命令前会先询问。", en: "The everyday mode. Astraea can help normally, but asks before writing files or running shell commands." },
    bestFor: { zh: "日常编码、小修复、阅读文件、解释代码，以及你仍希望保留审批门的改动。", en: "Daily coding, small fixes, reading files, explaining code, and making changes when you still want approval gates." },
    scenario: { zh: "你让 Astraea 修复组件里的一个 typo。它可以检查文件、提出改动，并在写文件或运行命令前询问。", en: "You ask Astraea to fix a typo in a component. It can inspect files, propose the change, and asks before touching files or running commands." },
  },
  {
    id: "mode-orbit",
    name: "orbit",
    summary: { zh: "只读规划模式。Astraea 可以调查和思考，但不能编辑或执行高风险动作。", en: "Read-only planning mode. Astraea can investigate and think, but cannot edit or execute risky actions." },
    bestFor: { zh: "代码库探索、架构审查、调试策略、风险评估，以及大改动前的规划。", en: "Codebase exploration, architecture review, debugging strategy, risk assessment, and planning before a large change." },
    scenario: { zh: "重写认证流程前使用 /mode orbit。Astraea 会阅读代码、梳理依赖，并在不改动文件的情况下给出计划。", en: "Before rewriting an auth flow, use /mode orbit. Astraea reads the code, maps dependencies, and gives a plan without changing anything." },
  },
  {
    id: "mode-cruise",
    name: "cruise",
    summary: { zh: "快速编辑模式。文件写入会自动批准，但 shell 命令仍会询问。", en: "Fast editing mode. File writes are auto-approved, while shell commands still ask." },
    bestFor: { zh: "可信的本地编辑：你想提高速度，但仍希望命令执行前暂停确认。", en: "Trusted local edits where you want speed but still want command execution to pause for permission." },
    scenario: { zh: "你让 Astraea 更新多个 React 文件的文案。它可以快速编辑文件，但运行测试或脚本前仍会询问。", en: "You ask Astraea to update copy across several React files. It can edit files quickly, but still asks before running tests or scripts." },
  },
  {
    id: "mode-forge",
    name: "forge",
    summary: { zh: "高自主执行模式。普通写入和命令可以不打断执行，但 red-line 安全边界仍然生效。", en: "High-autonomy execution mode. Ordinary writes and commands can run without prompts, but red-line safety still applies." },
    bestFor: { zh: "可信的重复工作、大规模机械改动、定时 headless 任务，或你明确希望减少打断的场景。", en: "Trusted repetitive work, large mechanical changes, scheduled headless tasks, or moments when you explicitly want less interruption." },
    scenario: { zh: "你让 Astraea 更新大量生成文档并运行完整测试套件。Forge 会保持推进，但遇到 .git、.astraea 或 shell 启动文件等敏感路径仍会停下确认。", en: "You ask Astraea to update many generated docs and run the full test suite. Forge keeps momentum, but still stops for sensitive paths like .git, .astraea, or shell startup files." },
  },
  {
    id: "mode-counsel",
    name: "counsel",
    summary: { zh: "先澄清再执行的模式。Astraea 会先提问并确认方向，然后再开始行动。", en: "Clarify-first mode. Astraea asks questions and confirms direction before executing." },
    bestFor: { zh: "模糊产品需求、UI redesign、大范围重构、规划型任务，或任何完成标准不清楚的工作。", en: "Ambiguous product requests, UI redesigns, broad refactors, planning-heavy work, or any task where the definition of done is unclear." },
    scenario: { zh: "你说“让 docs 更好”。Counsel 会先问清受众、范围、结构和验收标准，再开始编辑。", en: "You say 'make the docs better'. Counsel asks what audience, scope, structure, and acceptance criteria matter before it edits anything." },
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

function Header({ language, onLanguageChange }) {
  const copy = pageCopy[language];

  return (
    <header className="sticky top-0 z-30 border-b border-white/15 bg-astraea-night/75 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a className="flex items-center gap-3 font-bold text-astraea-ink" href="/" aria-label="Astraea home">
          <img className="h-10 w-10 rounded-full border border-white/25 object-cover" src="/LOGO.png" alt="Astraea logo" />
          <span>Astraea</span>
        </a>
        <div className="flex flex-wrap items-center gap-3">
          <nav className="flex gap-1 overflow-x-auto text-sm text-astraea-muted" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a className="whitespace-nowrap px-3 py-2 transition hover:text-astraea-ink" href={item.href} key={item.labelKey}>
                {copy.nav[item.labelKey]}
              </a>
            ))}
          </nav>
          <div className="flex rounded-lg border border-white/15 bg-white/10 p-1 text-xs font-bold" aria-label="Language selector">
            {languages.map((item) => (
              <button
                className={`min-h-8 px-3 transition ${
                  language === item.code ? "bg-astraea-ink text-[#071018]" : "text-astraea-muted hover:text-astraea-ink"
                }`}
                key={item.code}
                onClick={() => onLanguageChange(item.code)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
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

function Hero({ language }) {
  const copy = pageCopy[language];

  return (
    <section className="grid min-h-[calc(100vh-72px)] items-end gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-24 lg:py-24">
      <div className="max-w-4xl">
        <p className="mb-4 text-xs font-extrabold uppercase text-astraea-green">{copy.heroEyebrow}</p>
        <h1 className="mb-4 text-[clamp(4rem,13vw,10.5rem)] font-black leading-[.86] text-astraea-ink">Astraea</h1>
        <p className="mb-5 text-[clamp(1.35rem,2.6vw,2.4rem)] font-bold text-astraea-amber">
          {copy.heroTagline}
        </p>
        <p className="max-w-2xl text-lg leading-8 text-astraea-muted">
          {copy.heroBody}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            className="inline-flex min-h-12 items-center justify-center gap-3 bg-astraea-ink px-5 font-extrabold text-[#071018] shadow-panel transition hover:-translate-y-0.5"
            href="/docs/getting-started"
          >
            {copy.gettingStarted}
            <span aria-hidden="true">→</span>
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center border border-white/15 bg-white/10 px-5 font-bold text-astraea-ink"
            href="#features"
          >
            {copy.exploreFeatures}
          </a>
        </div>
      </div>
      <aside className="rounded-lg border border-white/15 bg-[#080e16]/75 p-5 shadow-panel backdrop-blur-xl">
        <img className="mb-5 aspect-square w-full rounded-lg object-cover" src="/LOGO.png" alt="Astraea goddess logo" />
        <span className="text-sm font-bold text-astraea-cyan">{copy.currentRelease}</span>
        <strong className="my-3 block text-4xl text-astraea-amber">v0.10.1</strong>
        <p className="leading-7 text-astraea-muted">{copy.currentReleaseBody}</p>
      </aside>
    </section>
  );
}

function Features({ language }) {
  const copy = pageCopy[language];

  return (
    <section className="bg-[#03070b]/45 px-5 py-20 sm:px-8 lg:px-24" id="features" aria-labelledby="features-title">
      <div className="mx-auto mb-9 flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase text-astraea-green">{copy.featuresEyebrow}</p>
          <h2 id="features-title" className="text-[clamp(2rem,4vw,4.2rem)] font-black leading-none text-astraea-ink">
            {copy.featuresTitle}
          </h2>
        </div>
        <p className="max-w-xl leading-7 text-astraea-muted">
          {copy.featuresIntro}
        </p>
      </div>
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-5">
        {features.map((feature) => (
          <article className="rounded-lg border border-white/15 bg-[#080e16]/70 p-5 shadow-panel backdrop-blur-xl" key={feature.name}>
            <span className={`mb-7 inline-grid h-9 w-11 place-items-center border-b-2 border-astraea-coral text-sm font-black ${feature.accent}`}>
              {feature.label}
            </span>
            <p className="mb-3 text-xs font-extrabold uppercase text-white/45">{feature.name}</p>
            <h3 className="mb-3 text-lg font-extrabold leading-snug text-astraea-ink">{feature.title[language]}</h3>
            <p className="text-sm leading-7 text-astraea-muted">{feature.body[language]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Updates({ language }) {
  const copy = pageCopy[language];

  return (
    <section className="bg-astraea-night/75 px-5 py-20 sm:px-8 lg:px-24" aria-labelledby="updates-title">
      <div className="mx-auto mb-9 max-w-5xl">
        <p className="mb-4 text-xs font-extrabold uppercase text-astraea-green">{copy.updatesEyebrow}</p>
        <h2 id="updates-title" className="text-[clamp(2rem,4vw,4.2rem)] font-black leading-none text-astraea-ink">
          {copy.updatesTitle}
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
                  <h3 className="mb-2 text-lg font-extrabold text-astraea-ink">{update.title[language]}</h3>
                  <p className="leading-7 text-astraea-muted">{update.body[language]}</p>
                </div>
              </article>
        ))}
      </div>
    </section>
  );
}

function CodeBlock({ children }) {
  return (
    <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-white/10 bg-black/45 p-4 text-sm leading-6 text-astraea-ink">
      <code className="break-words">{children}</code>
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

function DocsPage({ language }) {
  const copy = pageCopy[language];

  return (
    <section className="px-5 py-16 sm:px-8 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-white/15 bg-[#080e16]/80 p-5 text-sm text-astraea-muted shadow-panel backdrop-blur-xl">
            <p className="mb-4 font-extrabold text-astraea-ink">{copy.docsNavTitle}</p>
            <a
              className="mb-4 flex items-center justify-between rounded-lg border border-astraea-green/40 bg-astraea-green/10 px-3 py-2 font-extrabold text-astraea-ink transition hover:bg-astraea-green/20"
              href="/docs/design-philosophy"
            >
              {copy.designPhilosophyNavLink}
              <span aria-hidden="true">→</span>
            </a>
            <details className="docs-nav-group" open>
              <summary>{copy.startHere}</summary>
              <div className="border-l border-white/10 pl-3">
                <a className="block py-1.5 hover:text-astraea-ink" href="#install">{copy.install}</a>
                <a className="block py-1.5 hover:text-astraea-ink" href="#launch">{copy.launch}</a>
              </div>
            </details>
            <details className="docs-nav-group" open>
              <summary>{copy.commandsOverview}</summary>
              <div className="border-l border-white/10 pl-3">
                <a className="block py-1.5 hover:text-astraea-ink" href="#commands">{copy.allCommands}</a>
                {commandDocs.map((item) => (
                  <a className="block py-1.5 font-mono text-xs hover:text-astraea-ink" href={`#${item.id}`} key={item.id}>
                    {item.command}
                  </a>
                ))}
              </div>
            </details>
                <details className="docs-nav-group" open>
                  <summary>{copy.modesTitle}</summary>
                  <div className="border-l border-white/10 pl-3">
                <a className="block py-1.5 hover:text-astraea-ink" href="#modes">{copy.modesOverview}</a>
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
                    <a className="block py-1.5 hover:text-astraea-ink" href="#subagent">{copy.subAgentOverview}</a>
                    {subAgentDocs.map((item) => (
                      <a className="block py-1.5 text-xs hover:text-astraea-ink" href={`#${item.id}`} key={item.id}>
                        {textFor(item.title, language)}
                      </a>
                    ))}
                  </div>
                </details>
                <details className="docs-nav-group" open>
                  <summary>{copy.modelProviderTitle}</summary>
                  <div className="border-l border-white/10 pl-3">
                    <a className="block py-1.5 hover:text-astraea-ink" href="#model-provider">{copy.modelProviderOverview}</a>
                    <a className="block py-1.5 text-xs hover:text-astraea-ink" href="#provider-deepseek">DeepSeek V4</a>
                  </div>
                </details>
                <details className="docs-nav-group" open>
                  <summary>{copy.keyConfiguration}</summary>
              <div className="border-l border-white/10 pl-3">
                <a className="block py-1.5 hover:text-astraea-ink" href="#configuration">{copy.configurationOverview}</a>
                {configDocs.map((item) => (
                  <a className="block py-1.5 text-xs hover:text-astraea-ink" href={`#${item.id}`} key={item.id}>
                    {textFor(item.title, language)}
                  </a>
                ))}
              </div>
            </details>
          </div>
        </aside>

        <article className="min-w-0 rounded-lg border border-white/15 bg-[#080e16]/82 p-6 shadow-panel backdrop-blur-xl sm:p-9">
          <p className="mb-4 text-xs font-extrabold uppercase text-astraea-green">{copy.docsEyebrow}</p>
          <h1 className="mb-5 text-[clamp(3rem,8vw,6rem)] font-black leading-none text-astraea-ink">{copy.docsTitle}</h1>
          <p className="max-w-3xl text-lg leading-8 text-astraea-muted">
            {copy.docsIntro}
          </p>

          <DocsSection id="install" title={copy.install}>
            <div className="grid min-w-0 gap-5 xl:grid-cols-2">
              {installTabs.map((platform) => (
                <div className="min-w-0 rounded-lg border border-white/10 bg-white/[0.04] p-5" key={platform.platform}>
                  <h3 className="mb-4 text-2xl font-black text-astraea-amber">{platform.platform}</h3>
                  <div className="grid gap-5">
                    {platform.steps.map((step) => (
                      <div className="min-w-0" key={textFor(step.title, language)}>
                        <h4 className="mb-2 font-extrabold text-astraea-ink">{textFor(step.title, language)}</h4>
                        <p className="mb-3 break-words leading-7 text-astraea-muted">{textFor(step.body, language)}</p>
                        <CodeBlock>{step.code}</CodeBlock>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DocsSection>

          <DocsSection id="launch" title={copy.launchTitle}>
            <div className="grid gap-5">
              <p className="leading-8 text-astraea-muted">
                {copy.launchIntro}
              </p>
              <CodeBlock>{"astraea\n# or\nbun run repl"}</CodeBlock>
                  <p className="leading-8 text-astraea-muted">
                    {copy.firstLaunchIntro}
                  </p>
                  <CodeBlock>{"/login\n/language zh"}</CodeBlock>
                </div>
              </DocsSection>

          <DocsSection id="commands" title={copy.commandsTitle}>
            <p className="mb-5 leading-8 text-astraea-muted">
              {copy.commandsIntro}
            </p>
            <div className="grid gap-4">
                  {commandDocs.map((item) => (
                    <div id={item.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-5" key={item.command}>
                      <div className="mb-3">
                        <h3 className="font-mono text-xl font-black text-astraea-cyan">{item.command}</h3>
                      </div>
                      <p className="mb-2 leading-7 text-astraea-ink">{textFor(item.purpose, language)}</p>
                      <CodeBlock>{textFor(item.example, language)}</CodeBlock>
                      <p className="leading-7 text-astraea-muted">
                        <strong className="text-astraea-green">{copy.whenToUseLabel}</strong> {textFor(item.when, language)}
                      </p>
                      {item.details ? (
                        <ul className="mt-4 grid gap-2 text-sm leading-7 text-astraea-muted">
                          {item.details.map((detail) => (
                            <li key={textFor(detail, language)}>
                              <span className="text-astraea-green">•</span> {textFor(detail, language)}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {item.platforms ? (
                        <div className="mt-5 grid gap-4 lg:grid-cols-2">
                          {item.platforms.map((platform) => (
                            <div className="min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-4" key={platform.platform}>
                              <h4 className="mb-3 text-lg font-black text-astraea-amber">{platform.platform}</h4>
                              <ol className="grid gap-3">
                                {platform.steps.map((step, i) => (
                                  <li className="min-w-0" key={textFor(step.title, language)}>
                                    <h5 className="mb-1 font-extrabold text-astraea-ink">{i + 1}. {textFor(step.title, language)}</h5>
                                    <p className="mb-2 break-words leading-7 text-astraea-muted">{textFor(step.body, language)}</p>
                                    {step.code ? <CodeBlock>{textFor(step.code, language)}</CodeBlock> : null}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          ))}
                        </div>
                      ) : null}
                </div>
              ))}
            </div>
          </DocsSection>

              <DocsSection id="modes" title={copy.modesTitle}>
            <p className="mb-5 leading-8 text-astraea-muted">
              {copy.modesIntro}
            </p>
            <div className="grid gap-4">
              {modes.map((mode) => (
                <div id={mode.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-5" key={mode.id}>
                      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <code className="font-mono text-2xl font-black text-astraea-amber">{mode.name}</code>
                      </div>
                      <CodeBlock>{`/mode ${mode.name}`}</CodeBlock>
                      <p className="mb-3 leading-8 text-astraea-ink">{textFor(mode.summary, language)}</p>
                  <p className="mb-2 leading-7 text-astraea-muted">
                    <strong className="text-astraea-green">{copy.bestForLabel}</strong> {textFor(mode.bestFor, language)}
                  </p>
                  <p className="leading-7 text-astraea-muted">
                    <strong className="text-astraea-green">{copy.concreteScenarioLabel}</strong> {textFor(mode.scenario, language)}
                  </p>
                </div>
              ))}
            </div>
              </DocsSection>

              <DocsSection id="subagent" title={copy.subAgentTitle}>
                <p className="mb-5 leading-8 text-astraea-muted">
                  {copy.subAgentIntro}
                </p>
                <div className="grid gap-5">
                  {subAgentDocs.map((item) => (
                    <div id={item.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-5" key={item.id}>
                      <h3 className="mb-3 text-2xl font-black text-astraea-amber">{textFor(item.title, language)}</h3>
                      <p className="mb-4 leading-8 text-astraea-muted">{textFor(item.body, language)}</p>
                      <CodeBlock>{textFor(item.code, language)}</CodeBlock>
                    </div>
                  ))}
                </div>
              </DocsSection>

              <DocsSection id="model-provider" title={copy.modelProviderTitle}>
                <p className="mb-5 leading-8 text-astraea-muted">
                  {copy.modelProviderIntro}
                </p>
                <div className="grid gap-5">
                  {modelProviderDocs.map((provider) => (
                    <div id={provider.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-5" key={provider.id}>
                      <h3 className="mb-3 text-2xl font-black text-astraea-amber">{textFor(provider.title, language)}</h3>
                      <p className="mb-5 leading-8 text-astraea-muted">{textFor(provider.summary, language)}</p>
                      <div className="grid gap-4">
                        {provider.groups.map((group) => (
                          <section className="min-w-0 rounded-lg border border-white/10 bg-black/20 p-4" key={textFor(group.title, language)}>
                            <h4 className="mb-3 text-lg font-black text-astraea-cyan">{textFor(group.title, language)}</h4>
                            <ul className="mb-4 grid gap-2 text-astraea-muted">
                              {group.bullets.map((bullet) => (
                                <li className="leading-7" key={textFor(bullet, language)}>
                                  <span className="text-astraea-green">•</span> {textFor(bullet, language)}
                                </li>
                              ))}
                            </ul>
                            {group.code ? <CodeBlock>{group.code}</CodeBlock> : null}
                          </section>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </DocsSection>

              <DocsSection id="configuration" title={copy.configurationTitle}>
            <p className="mb-5 leading-8 text-astraea-muted">
              {copy.configurationIntro}
            </p>
            <div className="grid gap-5">
              {configDocs.map((item) => (
                <div id={item.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.04] p-5" key={item.id}>
                  <h3 className="mb-3 text-2xl font-black text-astraea-amber">{textFor(item.title, language)}</h3>
                  <p className="mb-4 leading-8 text-astraea-muted">{textFor(item.summary, language)}</p>
                  <ul className="mb-4 grid gap-2 text-astraea-muted">
                    {item.bullets.map((bullet) => (
                      <li className="leading-7" key={textFor(bullet, language)}>
                        <span className="text-astraea-green">•</span> {textFor(bullet, language)}
                      </li>
                    ))}
                  </ul>
                  {item.code ? <CodeBlock>{textFor(item.code, language)}</CodeBlock> : null}
                </div>
              ))}
            </div>
          </DocsSection>

          <DocsSection id="scripts" title={copy.scriptsTitle}>
            <p className="mb-4 leading-8 text-astraea-muted">
              {copy.scriptsIntro}
            </p>
            <CodeBlock>{'bun run src/cli.ts "explain what src/services/compact does"\necho "summarize this branch" | bun run src/cli.ts\nbun test\nbun run typecheck'}</CodeBlock>
          </DocsSection>
        </article>
      </div>
    </section>
  );
}

const designPhilosophyNav = [
  {
    summary: "Task Graph",
    overviewId: "task-graph",
    items: [
      { id: "task-graph-definition", label: { zh: "定义与状态模型", en: "Definition & state model" } },
      { id: "task-graph-walkthrough", label: { zh: "一个完整例子", en: "A worked example" } },
      { id: "task-graph-features", label: { zh: "三个核心机制", en: "Three core mechanisms" } },
      { id: "task-graph-verification", label: { zh: "如何验证它有效", en: "How we know it works" } },
    ],
  },
  {
    summary: "Long Task",
    overviewId: "long-task",
    items: [
      { id: "long-task-evidence-critique", label: { zh: "Evidence Critique", en: "Evidence Critique" } },
      { id: "long-task-evidence-ledger", label: { zh: "证据账本", en: "Evidence Ledger" } },
    ],
  },
];

function PhilosophyQuote({ children }) {
  return (
    <blockquote className="mb-6 border-l-4 border-astraea-green/60 bg-white/[0.03] py-3 pl-4 pr-3 text-lg font-bold italic leading-8 text-astraea-ink">
      {children}
    </blockquote>
  );
}

function PhilosophySubheading({ id, eyebrow, children }) {
  return (
    <div id={id} className="scroll-mt-28">
      {eyebrow ? <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-astraea-cyan">{eyebrow}</p> : null}
      <h3 className="mb-4 text-2xl font-black text-astraea-amber">{children}</h3>
    </div>
  );
}

function DesignPhilosophyPage({ language }) {
  const copy = pageCopy[language];

  return (
    <section className="px-5 py-16 sm:px-8 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-white/15 bg-[#080e16]/80 p-5 text-sm text-astraea-muted shadow-panel backdrop-blur-xl">
            <a
              className="mb-4 flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-extrabold text-astraea-ink transition hover:bg-white/10"
              href="/docs/getting-started"
            >
              {copy.backToGettingStarted}
            </a>
            <p className="mb-4 font-extrabold text-astraea-ink">{copy.dpNavTitle}</p>
            {designPhilosophyNav.map((group) => (
              <details className="docs-nav-group" open key={group.summary}>
                <summary>{group.summary}</summary>
                <div className="border-l border-white/10 pl-3">
                  {group.items.map((item) => (
                    <a className="block py-1.5 hover:text-astraea-ink" href={`#${item.id}`} key={item.id}>
                      {textFor(item.label, language)}
                    </a>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </aside>

        <article className="min-w-0 rounded-lg border border-white/15 bg-[#080e16]/82 p-6 shadow-panel backdrop-blur-xl sm:p-9">
          <p className="mb-4 text-xs font-extrabold uppercase text-astraea-green">{copy.dpEyebrow}</p>
          <h1 className="mb-5 text-[clamp(3rem,8vw,6rem)] font-black leading-none text-astraea-ink">{copy.dpTitle}</h1>
          <p className="max-w-3xl text-lg leading-8 text-astraea-muted">{copy.dpIntro}</p>

          <DocsSection id="task-graph" title="Task Graph">
            <PhilosophyQuote>
              {textFor(
                {
                  zh: "用 TaskCreate 把复杂工作拆成一张动态的任务图，而不是一份写死的脚本。",
                  en: "Break down complex work with TaskCreate as a dynamic task graph, not a fixed script.",
                },
                language,
              )}
            </PhilosophyQuote>

            <div className="grid gap-8">
              <div>
                <PhilosophySubheading id="task-graph-definition">
                  {textFor({ zh: "定义与状态模型", en: "Definition & state model" }, language)}
                </PhilosophySubheading>
                <p className="mb-5 leading-8 text-astraea-muted">
                  {textFor(
                    {
                      zh: "每个任务是一个小型状态机，节点之间用依赖边连成一张有向无环图。模型不是按一条写死的脚本往下跑，而是维护这张图——通过三个工具读写它：",
                      en: "Each task is a small state machine, and the nodes are wired into a directed acyclic graph by dependency edges. The model does not run down a fixed script; it maintains this graph, reading and writing it through three tools:",
                    },
                    language,
                  )}
                </p>
                <ul className="mb-5 grid gap-3 text-astraea-muted">
                  {[
                    {
                      api: "TaskCreate",
                      desc: { zh: "创建带有显式依赖与验收标准的任务节点。", en: "Creates task nodes with explicit dependencies and acceptance criteria." },
                    },
                    {
                      api: "TaskUpdate",
                      desc: { zh: "推进任务状态、提交证据、修改依赖。", en: "Advances task status, provides evidence, and modifies dependencies." },
                    },
                    {
                      api: "TaskGet / TaskList",
                      desc: { zh: "查询任务的当前状态。", en: "Queries the current state of tasks." },
                    },
                  ].map((row) => (
                    <li className="leading-7" key={row.api}>
                      <code className="font-mono font-black text-astraea-cyan">{row.api}</code>
                      <span className="text-astraea-muted"> — {textFor(row.desc, language)}</span>
                    </li>
                  ))}
                </ul>
                <p className="leading-8 text-astraea-muted">
                  <strong className="text-astraea-green">{textFor({ zh: "触发条件：", en: "Trigger conditions: " }, language)}</strong>
                  {textFor(
                    {
                      zh: "当一个请求涉及超过 3 个可拆分步骤、跨越多个文件，或预计会运行很久时，模型应先用 TaskCreate 建好任务图，再按依赖顺序逐个执行。",
                      en: "when a request involves more than three separable steps, spans multiple files, or is expected to run for a long time, the model first builds a task graph with TaskCreate, then executes the tasks in dependency order.",
                    },
                    language,
                  )}
                </p>
                <p className="mb-3 mt-5 leading-7 text-astraea-muted">
                  {textFor(
                    { zh: "每个节点在六个状态之间流转，转移规则是固定的：", en: "Each node moves between six states along fixed transitions:" },
                    language,
                  )}
                </p>
                <CodeBlock>
                  {textFor(
                    {
                      zh: "pending       就绪，可以开工\nblocked       有依赖未完成，被自动阻塞\nin_progress   进行中\ncompleted     已完成（必须带证据）\nfailed        做不下去\ninvalidated   曾完成，但证据已失效，需修复\n\n状态机：\n  pending → in_progress → completed | failed\n  completed → invalidated → in_progress    （失效后修复）\n  blocked ⇄ pending                          （由依赖自动判定）",
                      en: "pending       ready to start\nblocked       a dependency is unmet, auto-blocked\nin_progress   being worked on\ncompleted     done (evidence required)\nfailed        cannot proceed\ninvalidated   was completed, but its evidence broke; needs repair\n\nState machine:\n  pending → in_progress → completed | failed\n  completed → invalidated → in_progress    (repair after invalidation)\n  blocked ⇄ pending                          (decided automatically by dependencies)",
                    },
                    language,
                  )}
                </CodeBlock>
              </div>

              <div>
                <PhilosophySubheading id="task-graph-walkthrough">
                  {textFor({ zh: "一个完整例子：地基与砌墙", en: "A worked example: foundation and walls" }, language)}
                </PhilosophySubheading>
                <p className="mb-3 leading-8 text-astraea-muted">
                  {textFor(
                    {
                      zh: "下面是一段真实的调用序列——两个任务「打地基」和「砌墙」，砌墙依赖地基。注意系统在每一步是怎么拦住捷径的（报错信息直接取自源码）：",
                      en: "Here is a real call sequence — two tasks, “pour foundation” and “build walls”, where the walls depend on the foundation. Watch how the system blocks every shortcut at each step (the error messages are taken verbatim from the source):",
                    },
                    language,
                  )}
                </p>
                <CodeBlock>
                  {textFor(
                    {
                      zh: 'TaskCreate(subject: "打地基")                          → task-1  status: pending\nTaskCreate(subject: "砌墙", dependencies: ["task-1"])  → task-2  status: blocked   ← 依赖未满足，自动阻塞\n\n# 想跳过地基直接砌墙：\nTaskUpdate(taskId: task-2, status: "in_progress")\n  ✗ Task cannot start while a dependency is incomplete.\n\n# 想把地基标完成，却不给证据：\nTaskUpdate(taskId: task-1, status: "completed")\n  ✗ Cannot complete task; missing evidence for: criterion-1.\n\n# 给出证据后完成地基：\nTaskUpdate(taskId: task-1, status: "completed",\n           evidence: [{ criterionId: "criterion-1", … }])\n  ✓ task-1 completed\n  → reconcile：task-2 自动 blocked → pending（解锁，现在才能开工）',
                      en: 'TaskCreate(subject: "Pour foundation")                       → task-1  status: pending\nTaskCreate(subject: "Build walls", dependencies: ["task-1"]) → task-2  status: blocked   ← dependency unmet, auto-blocked\n\n# Try to skip the foundation and start the walls:\nTaskUpdate(taskId: task-2, status: "in_progress")\n  ✗ Task cannot start while a dependency is incomplete.\n\n# Try to mark the foundation complete with no evidence:\nTaskUpdate(taskId: task-1, status: "completed")\n  ✗ Cannot complete task; missing evidence for: criterion-1.\n\n# Complete the foundation with evidence:\nTaskUpdate(taskId: task-1, status: "completed",\n           evidence: [{ criterionId: "criterion-1", … }])\n  ✓ task-1 completed\n  → reconcile: task-2 auto blocked → pending (unlocked, only now can it start)',
                    },
                    language,
                  )}
                </CodeBlock>
              </div>

              <div>
                <PhilosophySubheading id="task-graph-features">
                  {textFor({ zh: "三个核心机制", en: "Three core mechanisms" }, language)}
                </PhilosophySubheading>

                <div className="grid gap-4">
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                    <h4 className="mb-3 text-lg font-black text-astraea-ink">
                      1. {textFor({ zh: "上游影响下游", en: "Upstream affects downstream" }, language)}
                    </h4>
                    <p className="mb-4 leading-7 text-astraea-muted">
                      {textFor(
                        {
                          zh: "任务图是有方向的：改动会沿依赖关系往下游传播。传播由 reconcileTaskGraph 完成——它反复扫描直到图稳定（不动点），失效只沿依赖边走，不会波及无关任务。",
                          en: "The graph is directional: a change propagates downstream along the dependencies. Propagation is done by reconcileTaskGraph — it rescans until the graph is stable (a fixed point), and invalidation travels only along dependency edges, never spilling onto unrelated tasks.",
                        },
                        language,
                      )}
                    </p>
                    <p className="mb-2 leading-7 text-astraea-muted">
                      <strong className="text-astraea-green">{textFor({ zh: "场景一", en: "Scenario one" }, language)}</strong>
                      {" — "}
                      {textFor(
                        {
                          zh: "你逐层完成 A → B → C，D 也独立完成了。随后你发现 A 的证据失效了（比如 provider 文档更新了），于是手动把 A 标为 invalidated：",
                          en: "you finish A → B → C layer by layer, and D is done independently. Then you find A's evidence no longer holds (say the provider docs changed), so you manually mark A as invalidated:",
                        },
                        language,
                      )}
                    </p>
                    <CodeBlock>{'TaskUpdate(taskId: A, status: "invalidated", notes: "Provider documentation changed.")'}</CodeBlock>
                    <p className="mb-2 mt-3 leading-7 text-astraea-muted">
                      {textFor({ zh: "reconcileTaskGraph 自动向下传播：", en: "reconcileTaskGraph then propagates downstream automatically:" }, language)}
                    </p>
                    <CodeBlock>
                      {textFor(
                        {
                          zh: "A: invalidated   ← 你手动触发\nB: invalidated   ← 依赖 A，自动级联\nC: invalidated   ← 依赖 B，自动级联\nD: completed     ← 无依赖，不受影响",
                          en: "A: invalidated   ← you triggered this\nB: invalidated   ← depends on A, cascades automatically\nC: invalidated   ← depends on B, cascades automatically\nD: completed     ← no dependency, unaffected",
                        },
                        language,
                      )}
                    </CodeBlock>
                    <p className="mb-2 mt-4 leading-7 text-astraea-muted">
                      <strong className="text-astraea-green">{textFor({ zh: "场景二", en: "Scenario two" }, language)}</strong>
                      {" — "}
                      {textFor(
                        {
                          zh: "反过来，当上游完成、依赖被满足后，被阻塞的下游会自动解除阻塞：",
                          en: "conversely, once an upstream task completes and its dependency is satisfied, a blocked downstream task is released automatically:",
                        },
                        language,
                      )}
                    </p>
                    <CodeBlock>
                      {textFor(
                        {
                          zh: "A: completed\nB: pending    ← A 的依赖满足了，blocked 自动解除\nC: blocked    ← B 还没完成，C 仍被阻塞",
                          en: "A: completed\nB: pending    ← A's dependency is satisfied, no longer blocked\nC: blocked    ← B is not done yet, so C stays blocked",
                        },
                        language,
                      )}
                    </CodeBlock>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                    <h4 className="mb-3 text-lg font-black text-astraea-ink">
                      2. {textFor({ zh: "每个完成的任务都需要证据", en: "Every completed task needs evidence" }, language)}
                    </h4>
                    <p className="mb-4 leading-7 text-astraea-muted">
                      {textFor(
                        {
                          zh: "每一个标记为 completed 的任务都必须附带证据。证据不是一句『应该好了』，而是一份可核查的结构——它声明了什么、来源是什么、可信度多高、依赖哪些假设：",
                          en: "Every task marked completed must carry evidence. Evidence is not a casual “should be fine” — it is a checkable record of what is claimed, where it comes from, how confident it is, and what assumptions it rests on:",
                        },
                        language,
                      )}
                    </p>
                    <CodeBlock>
                      {textFor(
                        {
                          zh: '{\n  "criterionId": "criterion-1",\n  "claim": "登录向导在已有 DeepSeek Key 时显示复用选项",\n  "source": "bun test src/ui/LoginWizard.test.tsx，退出码为 0",\n  "confidence": "high",\n  "assumptions": [\n    "该测试调用的是生产环境中的 LoginWizard 组件"\n  ]\n}',
                          en: '{\n  "criterionId": "criterion-1",\n  "claim": "Login wizard shows the reuse option when a DeepSeek key already exists",\n  "source": "bun test src/ui/LoginWizard.test.tsx, exit code 0",\n  "confidence": "high",\n  "assumptions": [\n    "The test exercises the production LoginWizard component"\n  ]\n}',
                        },
                        language,
                      )}
                    </CodeBlock>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                    <h4 className="mb-3 text-lg font-black text-astraea-ink">
                      3. {textFor({ zh: "失效是怎么触发的？", en: "How is invalidation triggered?" }, language)}
                    </h4>
                    <PhilosophyQuote>
                      {textFor(
                        {
                          zh: "如果某个证据后来被证伪，就把对应任务标为 invalidated，让依赖它的结果在本地一并失效、随后被修复。",
                          en: "If evidence later becomes false, mark its task invalidated so dependent results are invalidated locally and can be repaired.",
                        },
                        language,
                      )}
                    </PhilosophyQuote>
                    <p className="mb-4 leading-7 text-astraea-muted">
                      {textFor(
                        {
                          zh: "由模型自己触发，而且是机会性的，不是定时复查：系统不会在每次完成任务后回扫历史证据。触发点是后续工作又碰到了那条证据的来源（source）——同一个文件、同一条命令、同一个接口。下面是一条 A → B → C 依赖链的真实例子：",
                          en: "The model triggers this itself, and it is opportunistic rather than a scheduled re-check: the system never re-scans historical evidence after each completion. The trigger is later work touching that evidence's source again — the same file, command, or endpoint. Here is a real example along an A → B → C dependency chain:",
                        },
                        language,
                      )}
                    </p>
                    <CodeBlock>
                      {textFor(
                        {
                          zh: 'A「确认 users 表结构」completed\n   evidence.claim:  "users.id 是自增 BIGINT"\n   evidence.source: "psql \\d users 的输出"\nB「生成 ORM 模型」依赖 A，completed       → User 实体 id 字段为 number\nC「写 getUserById 接口」依赖 B，completed → getUserById(id: number)\n\n# 做 C 的收尾验证时，集成测试报类型错：DB 返回的 id 是字符串。\n# 模型回查，重跑 A 证据的 source：\npsql \\d users\n  id | uuid | not null     ← 中途有人跑过迁移，BIGINT 已改成 uuid\n\n# 这一刻 C 的工作再次碰到了 A 的 source，新结果证伪了 A 的 claim：\nTaskUpdate(taskId: A, status: "invalidated", notes: "users.id 已迁移为 uuid")\n\n→ reconcile 沿依赖边级联：\n   A: invalidated   ← 模型手动触发\n   B: invalidated   ← 依赖 A，自动级联\n   C: invalidated   ← 依赖 B，自动级联\n\n→ 修复（invalidated → in_progress）：\n   A 重新确认 uuid → B 重生成 id:string → C 改成 getUserById(id: string)',
                          en: 'A "Confirm users table schema" completed\n   evidence.claim:  "users.id is an auto-increment BIGINT"\n   evidence.source: "output of psql \\d users"\nB "Generate ORM model" depends on A, completed       → User entity id is number\nC "Write getUserById endpoint" depends on B, completed → getUserById(id: number)\n\n# While verifying C, an integration test throws a type error: the DB id is a string.\n# The model investigates and re-runs A\'s evidence source:\npsql \\d users\n  id | uuid | not null     ← someone ran a migration; BIGINT is now uuid\n\n# At this moment C\'s work touched A\'s source again, falsifying A\'s claim:\nTaskUpdate(taskId: A, status: "invalidated", notes: "users.id migrated to uuid")\n\n→ reconcile cascades along dependency edges:\n   A: invalidated   ← triggered by the model\n   B: invalidated   ← depends on A, cascades automatically\n   C: invalidated   ← depends on B, cascades automatically\n\n→ repair (invalidated → in_progress):\n   A re-confirms uuid → B regenerates id:string → C becomes getUserById(id: string)',
                        },
                        language,
                      )}
                    </CodeBlock>
                  </div>
                </div>
              </div>

              <div>
                <PhilosophySubheading id="task-graph-verification">
                  {textFor({ zh: "如何验证它有效", en: "How we know it works" }, language)}
                </PhilosophySubheading>
                <p className="mb-5 leading-8 text-astraea-muted">
                  {textFor(
                    {
                      zh: "一张只供模型「讲故事」的任务图毫无价值。Task Graph 的有效性来自三道由代码强制执行的守卫——它们让「完成」无法靠嘴说出来：",
                      en: "A task graph that merely lets the model narrate a story is worthless. The effectiveness of Task Graph comes from three guards enforced in code — they make “done” something you cannot simply assert:",
                    },
                    language,
                  )}
                </p>
                <div className="mb-6 grid gap-4">
                  {[
                    {
                      title: { zh: "依赖守卫", en: "Dependency guard" },
                      desc: {
                        zh: "依赖未完成，任务就进不了 in_progress——incompleteDependencies 会拦住它。捷径根本开不了工。",
                        en: "A task cannot enter in_progress while a dependency is incomplete — incompleteDependencies stops it. Shortcuts never start.",
                      },
                    },
                    {
                      title: { zh: "证据守卫", en: "Evidence guard" },
                      desc: {
                        zh: "只要有一条验收标准缺证据，任务就进不了 completed——missingEvidence 会拒绝。「我觉得好了」不算完成。",
                        en: "If even one acceptance criterion lacks evidence, the task cannot enter completed — missingEvidence rejects it. “I think it works” is not done.",
                      },
                    },
                    {
                      title: { zh: "无环保证", en: "Acyclic guarantee" },
                      desc: {
                        zh: "依赖一旦成环立即被拒——validateDependencies 用 DFS 检测回路，保证这张图永远可以拓扑推进。",
                        en: "A dependency cycle is rejected on sight — validateDependencies uses a DFS to detect loops, keeping the graph always topologically advanceable.",
                      },
                    },
                  ].map((guard) => (
                    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5" key={textFor(guard.title, language)}>
                      <h4 className="mb-2 text-lg font-black text-astraea-ink">{textFor(guard.title, language)}</h4>
                      <p className="leading-7 text-astraea-muted">{textFor(guard.desc, language)}</p>
                    </div>
                  ))}
                </div>
                <p className="mb-3 leading-8 text-astraea-muted">
                  {textFor(
                    {
                      zh: "这些守卫不是文档里的承诺，而是有测试覆盖的行为。src/tools/taskGraph.test.ts 用真实任务图验证了：依赖未满足时砌墙保持 blocked、上游失效会级联失效下游但不影响无关任务、依赖成环被拒。亲手复现：",
                      en: "These guards are not promises in a doc — they are tested behavior. src/tools/taskGraph.test.ts verifies on a real graph that walls stay blocked while their dependency is unmet, that invalidating an upstream task cascades to its descendants but leaves independent tasks untouched, and that a dependency cycle is rejected. Reproduce it yourself:",
                    },
                    language,
                  )}
                </p>
                <CodeBlock>{"bun test src/tools/taskGraph.test.ts"}</CodeBlock>
              </div>
            </div>
          </DocsSection>

          <DocsSection id="long-task" title="Long Task">
            <p className="mb-6 leading-8 text-astraea-muted">
              {textFor(
                {
                  zh: "长任务最大的风险不是做不完，而是『看起来做完了』。Astraea 用三层检查把真实结果和自我安慰区分开。",
                  en: "The biggest risk in a long task is not running out of steps — it is work that merely looks done. Astraea separates real results from wishful thinking with three layers of checks.",
                },
                language,
              )}
            </p>

            <PhilosophySubheading id="long-task-evidence-critique">Evidence Critique</PhilosophySubheading>
            <CodeBlock>
              {textFor(
                {
                  zh: "每一步：  Task Graph 强制检查 acceptanceCriteria + evidence\n整件事：  /goal evaluator 检查最终完成条件与对话中的真实结果\n收尾前：  evidence critique 检查这些真实结果是否足够可靠",
                  en: "Each step:    Task Graph enforces acceptanceCriteria + evidence\nWhole job:    the /goal evaluator checks final done-conditions against real results in the conversation\nBefore wrap:  evidence critique checks whether those real results are reliable enough",
                },
                language,
              )}
            </CodeBlock>

            <p className="mb-4 mt-6 leading-8 text-astraea-muted">
              {textFor(
                { zh: "收尾前的 evidence critique 主要盯三类问题：", en: "The closing evidence critique watches for three kinds of problems:" },
                language,
              )}
            </p>
            <div className="grid gap-4">
              {[
                {
                  tag: "insufficient_evidence",
                  desc: {
                    zh: "缺少外部证据——没有命令输出、没有 render 结果，连测试都没跑，只有一句『应该好了』。",
                    en: "Missing external evidence — no command output, no render result; not even a test was run, just an “it should be fine.”",
                  },
                },
                {
                  tag: "risk_coverage_gap",
                  desc: {
                    zh: "有检查但遗漏了关键失败路径——测试跑了也过了，但只测了开心路径。",
                    en: "Checks exist but miss the critical failure paths — tests ran and passed, but only the happy path was covered.",
                  },
                },
                {
                  tag: "goal_shift",
                  desc: {
                    zh: "模型偷偷降低验证标准（与第 1 阶段的反作弊呼应）——把测试删掉、跳过，或把断言改成 expect(true).toBe(true)。",
                    en: "The model quietly lowers the bar (echoing the stage-1 anti-cheating) — deleting or skipping tests, or rewriting an assertion into expect(true).toBe(true).",
                  },
                },
              ].map((row) => (
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5" key={row.tag}>
                  <code className="mb-2 block font-mono text-lg font-black text-astraea-amber">{row.tag}</code>
                  <p className="leading-7 text-astraea-muted">{textFor(row.desc, language)}</p>
                </div>
              ))}
            </div>

            <PhilosophySubheading id="long-task-evidence-ledger" eyebrow={textFor({ zh: "改进", en: "Refinement" }, language)}>
              {textFor({ zh: "证据账本：让审查官看证物，而不是听口供", en: "The Evidence Ledger: let the critic see exhibits, not testimony" }, language)}
            </PhilosophySubheading>
            <p className="mb-4 leading-8 text-astraea-muted">
              {textFor(
                {
                  zh: "上面这道 evidence critique 有一个早期的盲点。它原本是凭「对话记录」来判断证据够不够硬的——可是对话很长以后，越早的内容越会被挤出可阅读的窗口。于是一个常见的尴尬出现了：任务真的在第三步就跑过了测试、拿到了 exit 0，但等到收尾审查时，那条证据早已滚出视野，审查官看不到，只能保守地判『证据不足』，逼着已经做完的工作再绕一圈。",
                  en: "This evidence critique had an early blind spot. It used to judge the strength of the evidence from the conversation log — but in a long task, the older the content, the more likely it is pushed out of the readable window. A familiar awkward case follows: the task really did run the tests and get exit 0 back at step three, but by closing time that proof has scrolled out of sight. The critic cannot see it, conservatively rules “insufficient evidence,” and forces already-finished work to loop again.",
                },
                language,
              )}
            </p>
            <p className="mb-4 leading-8 text-astraea-muted">
              {textFor(
                {
                  zh: "问题的根子在于：审查官读的是一段会被裁剪的『口供』，而不是原始『证物』。其实 Astraea 在每个工具跑完时，就把它的真实输出（exit code、测试结果、命令回显）原封不动地存进了一本不会被裁剪的台账。改进很直接——收尾审查时，把这本台账作为第一手证物直接交给审查官，并明确告诉它：以台账为准，对话记录只是补充。",
                  en: "The root cause: the critic was reading a trimmable “testimony,” not the original “exhibits.” In fact, the moment each tool finishes, Astraea already files its real output — exit codes, test results, command echoes — verbatim into a ledger that never gets trimmed. The fix is direct: at closing time, hand that ledger to the critic as first-hand evidence and tell it plainly — the ledger is ground truth, the conversation log is only supplementary.",
                },
                language,
              )}
            </p>
            <p className="mb-4 leading-8 text-astraea-muted">
              {textFor(
                {
                  zh: "台账并非把所有输出一股脑塞进去——它优先保留最近的记录，单条只留结论所在的尾部，整体设有上限，以免拖慢判断。一句话概括这个设计：采集证据和评判证据，本该用的是同一份真值。",
                  en: "The ledger does not dump everything in — it keeps the most recent records first, keeps only the tail of each entry where conclusions live, and caps the whole thing so judgment stays fast. In one line: gathering evidence and judging evidence should draw on the same source of truth.",
                },
                language,
              )}
            </p>
          </DocsSection>
        </article>
      </div>
    </section>
  );
}

function HomePage({ language }) {
  return (
    <>
      <Hero language={language} />
      <Features language={language} />
      <Updates language={language} />
    </>
  );
}

export default function App() {
  const pathname = window.location.pathname;
  const isPhilosophyRoute = pathname === "/docs/design-philosophy";
  const isDocsRoute = pathname === "/docs/getting-started";
  const [language, setLanguage] = useState(() => {
    return window.localStorage.getItem("astraea-language") === "en" ? "en" : "zh";
  });

  function handleLanguageChange(nextLanguage) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("astraea-language", nextLanguage);
  }

  return (
    <>
      <BackgroundScene />
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <main>
        {isPhilosophyRoute ? (
          <DesignPhilosophyPage language={language} />
        ) : isDocsRoute ? (
          <DocsPage language={language} />
        ) : (
          <HomePage language={language} />
        )}
      </main>
    </>
  );
}
