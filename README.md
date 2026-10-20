# Omega Immersive Portal

Portal inmersivo 3D del universo Belentani.

## Qué es

La versión **experiencial** del universo: en vez de navegar páginas, se entra en un espacio.
Escena 3D, portal de acceso y el organismo Omega alrededor.

En línea: <https://belentani-omega-immersive-portal.vercel.app>

## Estructura

| Ruta | Contenido |
|---|---|
| `index.html` | Entrada al portal |
| `assets/` · `img/` | Recursos |
| `css/` · `js/` | Estilo y lógica |
| `magic/` | Efectos |
| `ecosistema.html` | Vista del ecosistema |
| `ecosystem.json` | Datos del ecosistema |

## Documentación

`BLUEPRINT-MAESTRO-BELENTANI-JUDAS.md` describe el plano de la obra.

## Licencia

MIT — ver `LICENSE`.

## Validación

Con Node.js 20, ejecuta:

```sh
node scripts/validate.mjs
node --test scripts/*.test.mjs
```

El workflow Quality ejecuta ambas comprobaciones en cada push y pull request.

## Publicación

La versión de producción se sirve desde el proyecto Vercel asociado a este repositorio: <https://belentani-omega-immersive-portal.vercel.app>.
