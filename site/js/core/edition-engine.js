const STORAGE_KEY = "belentani.omega.editions.v1";

function readEditions() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}

function writeEditions(editions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(editions.slice(0, 12)));
}

function id() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
}

export function mountEditionEngine() {
  const home = document.querySelector("#home");
  if (!home || document.querySelector(".omega-edition-engine")) return;

  const panel = document.createElement("section");
  panel.className = "omega-panel omega-edition-engine";
  panel.setAttribute("aria-labelledby", "edition-title");
  panel.innerHTML = '<p class="omega-panel__eyebrow">Archivo personal / local</p><h2 id="edition-title">TU VERSIÓN DEL UNIVERSO</h2><p class="omega-panel__copy">Guarda una entrada propia en este dispositivo. El universo recuerda tu nombre y el recuerdo que eliges dejar.</p><form class="omega-form"><label>Nombre<input name="alias" maxlength="48" autocomplete="nickname" required></label><label>Memoria / clave<input name="memory" maxlength="140" required></label><button class="omega-action" type="submit">Guardar edición</button></form><p class="omega-edition-engine__status" aria-live="polite"></p><ul class="omega-edition-engine__list" aria-label="Ediciones guardadas"></ul>';
  home.insertAdjacentElement("afterend", panel);

  const form = panel.querySelector("form");
  const status = panel.querySelector(".omega-edition-engine__status");
  const list = panel.querySelector("ul");
  const render = () => {
    const editions = readEditions();
    list.replaceChildren(...editions.map((edition) => {
      const item = document.createElement("li");
      item.className = "omega-edition-engine__item";
      const name = document.createElement("strong");
      name.textContent = edition.alias;
      const memory = document.createElement("small");
      memory.textContent = edition.memory;
      item.append(name, memory);
      return item;
    }));
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const alias = String(data.get("alias") || "").trim();
    const memory = String(data.get("memory") || "").trim();
    if (!alias || !memory) return;
    writeEditions([{ id: id(), alias, memory, savedAt: new Date().toISOString() }, ...readEditions()]);
    status.textContent = "Edición guardada solo en este navegador.";
    form.reset();
    render();
  });
  render();
}
