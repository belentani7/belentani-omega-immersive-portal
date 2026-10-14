import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execFile);
const root = new URL("..", import.meta.url).pathname;
const manifest = JSON.parse(await readFile(join(root, "manifest.json"), "utf8"));
const serviceWorker = await readFile(join(root, "sw.js"), "utf8");

if (!manifest.name || !manifest.start_url || manifest.display !== "standalone") {
  throw new Error("manifest.json must define name, start_url and standalone display");
}
if (!serviceWorker.includes("addEventListener")) {
  throw new Error("sw.js does not look like a service worker");
}

const files = ["sw.js", ...Array.from({ length: 12 }, (_, i) => `js/${String(i + 1).padStart(2, "0")}-${["boot", "scroll", "webgl", "matrix", "audio", "ai", "portal", "content", "terminal", "v13", "unified", "hero-media"][i]}.js`), "js/13-portal-experience.js", "js/sw-register.js"];
for (const file of files) {
  await access(join(root, file));
  await exec(process.execPath, ["--check", join(root, file)]);
}
await access(join(root, "index.html"));
console.log(`static-assets: ok (${files.length + 2} checked)`);
