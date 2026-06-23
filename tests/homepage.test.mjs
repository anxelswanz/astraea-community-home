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
  assert.match(app, /Agent\(/);
  assert.match(app, /TaskGet\(/);
  assert.match(app, /TaskOutput\(/);
  assert.match(app, /TaskStop\(/);
  assert.match(app, /Key configuration/);
  assert.doesNotMatch(app, /TaskCreate \/ TaskUpdate 支持 dependencies/);
  assert.doesNotMatch(app, /React Ink TUI、命令补全/);
  assert.match(app, /Best for/);
  assert.match(app, /Concrete scenario/);
  assert.match(app, /\.mcp\.json/);
  assert.match(app, /SKILL\.md/);
  assert.match(app, /AGENTS\.local\.md/);
  assert.match(app, /~\/\.astraea\/projects/);
  assert.match(app, /sessionId.*jsonl/);
});
