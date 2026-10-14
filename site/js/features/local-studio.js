const STUDIO_KEY = "belentani.omega.studio.v1";
const DIRECTION = {
  narrativa: ["confesión en primera persona", "una decisión irreversible", "cierre en una frase ritual"],
  imagen: ["retrato editorial nocturno", "rojo profundo, negro mineral y oro viejo", "una reliquia física que ancle el plano"],
  texto: ["titular de siete palabras", "manifiesto breve y concreto", "una pregunta que el público se lleve"],
  simbolo: ["cruz, llave, espejo o agua", "contraste entre herida y transformación", "significado legible sin explicación externa"]
};

export function mountLocalStudio() {
  const host = document.querySelector("#studio");
  if (!host || host.querySelector(".omega-studio")) return;
  const studio = document.createElement("section");
  studio.className = "omega-panel omega-studio";
  studio.setAttribute("aria-labelledby", "studio-local-title");
  studio.innerHTML = '<p class="omega-panel__eyebrow">Estudio local / sin API</p><h2 id="studio-local-title">LABORATORIO DE CONCEPTO</h2><p class="omega-panel__copy">Genera un brief de creación desde el navegador. No llama modelos ni sube archivos.</p><form class="omega-studio__form"><label>Plano<select name="mode"><option value="narrativa">Narrativa</option><option value="imagen">Imagen</option><option value="texto">Texto</option><option value="simbolo">Simbología</option></select></label><label>Núcleo<textarea name="prompt" maxlength="800" required placeholder="Ejemplo: Judas enfrenta el recuerdo que dejó atrás."></textarea></label><button class="omega-action" type="submit">Construir brief</button></form><output class="omega-studio__output" aria-live="polite">Elige un plano y escribe un núcleo.</output><div class="omega-studio__actions"><button class="omega-action omega-action--ghost" type="button" data-copy>Copiar brief</button><button class="omega-action omega-action--ghost" type="button" data-save>Guardar local</button></div>';
  host.append(studio);
  const form = studio.querySelector("form");
  const output = studio.querySelector("output");
  const build = () => {
    const data = new FormData(form);
    const mode = String(data.get("mode"));
    const core = String(data.get("prompt") || "").trim();
    if (!core) return "";
    const points = DIRECTION[mode].map((point, index) => String(index + 1).padStart(2, "0") + ". " + point).join("\n");
    return "JUDAS ERA / " + mode.toUpperCase() + "\n\nNÚCLEO\n" + core + "\n\nDIRECCIÓN\n" + points + "\n\nREGLA\nCada elemento debe servir a la historia, no decorar el vacío.";
  };
  form.addEventListener("submit", (event) => { event.preventDefault(); output.value = build(); output.textContent = output.value || "Escribe un núcleo para construir el brief."; });
  studio.querySelector("[data-save]").addEventListener("click", () => { localStorage.setItem(STUDIO_KEY, output.value); });
  studio.querySelector("[data-copy]").addEventListener("click", async () => { if (output.value) await navigator.clipboard?.writeText(output.value).catch(() => {}); });
  const saved = localStorage.getItem(STUDIO_KEY);
  if (saved) { output.value = saved; output.textContent = saved; }
}
