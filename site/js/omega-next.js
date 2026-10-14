import { mountEditionEngine } from "./core/edition-engine.js";
import { mountBackgroundMedia } from "./features/background-media.js";
import { mountLocalStudio } from "./features/local-studio.js";

function start() {
  mountBackgroundMedia();
  mountEditionEngine();
  mountLocalStudio();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
