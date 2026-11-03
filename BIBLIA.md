# BIBLIA.md — belentani-omega-immersive-portal

Doctrina del producto: visión, misión, reglas de desarrollo, arquitectura, stack, decisiones de diseño y convenciones del ecosistema belentani7.

---

## 1. Visión

Ser el portal inmersivo 3D del universo Belentani ("Omega"): en vez de navegar páginas, el usuario entra en un espacio con escena 3D, portal de acceso y el organismo Omega alrededor, con calidad experiencial/cinematográfica.

## 2. Misión

Ofrecer `belentani-omega-immersive-portal`, un portal web estático (HTML/CSS/JS) que:
- Sirva de entrada al portal inmersivo (`index.html`) y vista del ecosistema (`ecosistema.html`).
- Use escena 3D (Three.js), GSAP + ScrollTrigger + ScrollToPlugin, Tone.js (audio), Lenis (scroll suave).
- Tenga diseño "rojo neon glass", tipografía Orbitron/Cinzel Decorative/Cormorant Garamond/Chakra Petch/JetBrains Mono.
- Sea accesible: `lang="es"`, viewport, `:focus-visible` (#ff073a), `prefers-reduced-motion`, objetivos táctiles >= 44px.
- Incluya pruebas E2E (Playwright) y de unidad (Vitest), validación con `node scripts/validate.mjs` y `node --test scripts/*.test.mjs`.
- Se sirva en producción desde Vercel (`vercel.json`).

## 3. Reglas de desarrollo

- Protocolo spec-first: PRD → SRS → Design Doc → ADR → Plan → Tests GWT.
- Impeccable (diseño frontend): pre-ship checklist obligatoria (sin gradient text, sin side-stripe borders, sin eyebrow en cada sección, hero heading <= 6rem, foco visible, estados vacío/error/carga, touch targets >= 44px, `prefers-reduced-motion`, no bounce ni elastic easing).
- Cambios reversibles, uno a uno. No romper nada.
- No commitear secretos. Ejecutar gitleaks antes de cada push.
- CODEOWNERS: `@belentani7` revisión requerida en cada PR.
- Commits: `type(scope): summary`.
- Formato con Prettier (`.prettierrc`), lint con ESLint + Biome.

## 4. Arquitectura

```
index.html          (entrada al portal, lang="es", :focus-visible #ff073a)
ecosistema.html     (vista del ecosistema, circuit HBO rojo neon glass)
ecosystem.json      (datos del ecosistema)
css/main.css        (estilos principales)
js/                 (lógica del portal, Three.js, GSAP, Tone.js, Lenis)
assets/ · img/      (recursos)
magic/              (efectos especiales)
site/               (sitio adicional)
src/                (código fuente adicional)
sw.js               (service worker)
e2e/                (pruebas Playwright)
scripts/            (validate.mjs, pruebas *.test.mjs)
manifest.json, vercel.json, Dockerfile, docker-compose.yml
```

## 5. Stack tecnológico

- HTML5, CSS3, JavaScript vanilla (módulos ES).
- Three.js r128 (3D), GSAP 3.12.5 (ScrollTrigger, ScrollToPlugin), Tone.js 14.8.49 (audio), Lenis 1.1.18 (scroll).
- Pruebas: Playwright (E2E), Vitest (unidad).
- Validación: `node scripts/validate.mjs`, `node --test scripts/*.test.mjs`.
- Build/despliegue: Vite, Vercel (`vercel.json`), Docker (`Dockerfile`, `docker-compose.yml`).
- Calidad: ESLint + Biome + Prettier.
- TypeScript: `tsconfig.json`, `tsconfig.node.json` (para scripts de configuración).

## 6. Tokens de diseño (CANON) — Belentani

- Negro vacío: `#05030a`
- Rojo neón: `#ff073a` (foco visible, tema rojo neon)
- Dorado Zion: `#d4af37`
- Cyan señal: `#4de8e0`

Nota: el portal usa además su propia paleta inmersiva (fondo `#070707`, texto `#F5F1EC`, primario `#FF2B2B`) respetada como decisión de marca.

## 7. Convenciones de commit

`type(scope): summary` donde `type ∈ {feat, fix, docs, chore, refactor, test, perf, style}`.

Ejemplo: `fix(index): corregir focus-visible a token CANON #ff073a`.

## 8. Seguridad

- Secret scanning mediante gitleaks (`.gitleaks.toml` con reglas propias del ecosistema Belentani).
- CodeQL para análisis estático, Dependabot para actualizaciones de dependencias.
- Firma de commits requerida; mínimo 2 revisores (`@belentani7`).
- `ecosistema.html` usa colores propios de marca (`#FF2B2B`, `#070707`); tokens CANON aplicados en `focus-visible`.
