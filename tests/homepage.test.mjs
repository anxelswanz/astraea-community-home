import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const css = await readFile(new URL("../src/index.css", import.meta.url), "utf8");
const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

test("project is a Vercel-ready React and Tailwind app", () => {
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /src\/main\.jsx/);
  assert.equal(pkg.scripts.dev, "vite");
  assert.equal(pkg.scripts.build, "vite build");
  assert.ok(pkg.dependencies.react);
  assert.ok(pkg.devDependencies.tailwindcss);
});

test("homepage uses the supplied background image and animated layers", () => {
  assert.match(app, /background\.png/);
  assert.match(app, /LOGO\.png/);
  assert.match(css, /@keyframes/);
  assert.match(css, /animation:/);
});

test("homepage highlights Astraea's five distinctive capabilities", () => {
  assert.match(app, /TaskGraph/);
  assert.match(app, /user-friendly UI/);
  assert.match(app, /Counsel/);
  assert.match(app, /red-line/);
  assert.match(app, /Vigil/);
  assert.doesNotMatch(app, /SubAgent peer coordination/);

  const featureCount = (app.match(/const features = \[/g) ?? []).length;
  const updateCount = (app.match(/version:/g) ?? []).length;
  const counselIndex = app.indexOf("Counsel mode");
  const uiIndex = app.indexOf("user-friendly UI");

  assert.equal(featureCount, 1);
  assert.ok(uiIndex < counselIndex);
  assert.ok(updateCount > 0);
  assert.ok(updateCount <= 5);
});

test("homepage current release and recent updates announce v0.10.1 /init onboarding", () => {
  assert.match(app, /<strong className="my-3 block text-4xl text-astraea-amber">v0\.10\.1<\/strong>/);
  assert.match(app, /version: "0\.10\.1"/);
  assert.match(app, /\/init/);
  assert.match(app, /AGENTS\.md/);
  assert.match(app, /scan a repo/);
  assert.match(app, /扫描仓库/);
});

test("navigation exposes a Chinese and English language switcher", () => {
  assert.match(app, /const languages = \[/);
  assert.match(app, /中文/);
  assert.match(app, /English/);
  assert.match(app, /aria-label="Language selector"/);
  assert.match(app, /localStorage\.getItem\("astraea-language"\)/);
  assert.match(app, /localStorage\.setItem\("astraea-language"/);
});

test("docs content is wired through the same Chinese and English localization path", () => {
  assert.match(app, /function textFor\(value, language\)/);
  assert.match(app, /function DocsPage\(\{ language \}\)/);
  assert.match(app, /<DocsPage language=\{language\} \/>/);
  assert.match(app, /docsTitle: "Getting Started"/);
  assert.match(app, /docsTitle: "快速开始"/);
  assert.match(app, /startHere: "Start here"/);
  assert.match(app, /startHere: "开始"/);
  assert.match(app, /commandsTitle: "Important commands"/);
  assert.match(app, /commandsTitle: "重要命令"/);
  assert.match(app, /bestForLabel: "Best for:"/);
  assert.match(app, /bestForLabel: "适合场景："/);
  assert.match(app, /title: \{\s*zh: "安装 Bun"/);
  assert.match(app, /purpose: \{\s*zh: "选择 provider、model 和 API key。"/);
  assert.match(app, /summary: \{\s*zh: "MCP server 可以把数据库、Sentry、文件系统适配器或内部 API 这类外部工具交给 Astraea 使用。"/);
  assert.match(app, /summary: \{ zh: "日常模式。/);
});

test("compact docs explain provider-specific threshold ratios", () => {
  assert.match(app, /DeepSeek context thresholds/);
  assert.match(app, /80%/);
  assert.match(app, /90%/);
  assert.match(app, /95%/);
  assert.match(app, /DEEPSEEK_CONTEXT_WINDOW=1000000/);
  assert.match(app, /DEEPSEEK_MAX_TOKENS=8192/);
  assert.match(app, /通用默认阈值/);
  assert.match(app, /warning 0\.80/);
  assert.match(app, /stage 0\.75/);
  assert.match(app, /commit 0\.85/);
  assert.match(app, /autocompact 0\.92/);
  assert.match(app, /blocking collapse 0\.95/);
});

test("docs expose a Model Provider section with DeepSeek V4 adaptations", () => {
  assert.match(app, /modelProviderTitle: "Model Provider"/);
  assert.match(app, /modelProviderTitle: "Model Provider"/);
  assert.match(app, /DeepSeek V4/);
  assert.match(app, /provider-deepseek/);
  assert.match(app, /href="#provider-deepseek"/);
  assert.match(app, /deepseek-v4-flash/);
  assert.match(app, /deepseek-v4-pro/);
  assert.match(app, /\/reason high/);
  assert.match(app, /thinking\.type/);
  assert.match(app, /reasoning_effort/);
  assert.match(app, /\/login/);
  assert.match(app, /cache-hit/);
  assert.match(app, /DEEPSEEK_SMALL_MODEL/);
  assert.match(app, /structuredResponse: 'json'/);
  assert.match(app, /response_format: \{ type: 'json_object' \}/);
  assert.match(app, /DEEPSEEK_STRICT_TOOLS/);
  assert.match(app, /ordinary tool calls/);
});

test("getting started route is handled inside the React app", () => {
  assert.match(app, /window\.location\.pathname/);
  assert.match(app, /Getting Started/);
  assert.match(app, /\/docs\/getting-started/);
  assert.match(app, /macOS/);
  assert.match(app, /Windows/);
  assert.match(app, /\/login/);
  assert.match(app, /\/mode/);
  assert.match(app, /When to use/);
});

test("docs sidebar links directly to commands and key configuration topics", () => {
  for (const anchor of [
    "cmd-login",
    "cmd-internet",
    "cmd-language",
    "cmd-reason",
    "cmd-mode",
    "cmd-goal",
    "cmd-vigil",
    "cmd-mcp",
    "config-mcp",
    "config-skill",
    "config-agents",
    "config-transcripts",
  ]) {
    assert.match(app, new RegExp(`id: "${anchor}"|id="${anchor}"`));
  }

  for (const modeAnchor of [
    "mode-default",
    "mode-orbit",
    "mode-cruise",
    "mode-forge",
    "mode-counsel",
  ]) {
    assert.match(app, new RegExp(`id: "${modeAnchor}"|id="${modeAnchor}"`));
  }

  assert.match(app, /href=\{`#\$\{item\.id\}`\}/);
  assert.match(app, /id=\{item\.id\}/);
  assert.match(app, /<details/);
  assert.match(app, /<summary/);
  assert.match(app, /Commands overview/);
  assert.match(app, /SubAgent/);
  assert.match(app, /cmd-model/);
  assert.match(app, /cmd-rewind/);
  assert.match(app, /cmd-audit/);
  assert.match(app, /cmd-reload-plugins/);
  assert.match(app, /cmd-wechat/);
  assert.match(app, /Agent\(/);
  assert.match(app, /TaskGet\(/);
  assert.match(app, /TaskOutput\(/);
  assert.match(app, /TaskStop\(/);
  assert.match(app, /config-notify/);
  assert.match(app, /config-wechat/);
  assert.match(app, /config-hooks/);
  assert.match(app, /config-vigil/);
  assert.match(app, /cleanupPeriodDays/);
  assert.match(app, /Key configuration/);
  assert.doesNotMatch(app, /TaskCreate \/ TaskUpdate 支持 dependencies/);
  assert.doesNotMatch(app, /React Ink TUI、命令补全/);
  assert.doesNotMatch(app, /safe turn boundary/);
  assert.match(app, /Best for/);
  assert.match(app, /Concrete scenario/);
  assert.match(app, /\.mcp\.json/);
  assert.match(app, /SKILL\.md/);
  assert.match(app, /AGENTS\.local\.md/);
  assert.match(app, /~\/\.astraea\/projects/);
  assert.match(app, /sessionId.*jsonl/);
});
