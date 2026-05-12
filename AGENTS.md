# AGENTS.md

Guia operativa para agentes de codigo en este repositorio.

## Objetivo

Plataforma de estudio para AI-900 (Azure AI Fundamentals) con contenido y evaluaciones en espanol.

Contexto funcional y alcance del producto: ver [README.md](README.md).

## Inicio rapido para agentes

- Stack: Astro 5 + Vue 3 + Tailwind CSS.
- Desarrollo: `npm run dev` (alias: `npm start`).
- Verificacion obligatoria antes de cerrar cambios: `npm run build`.
- Preview de produccion: `npm run preview`.

## Mapa minimo del codigo

- `src/pages/`: rutas publicas (Astro file-based routing).
- `src/components/`: componentes Astro y Vue reutilizables.
- `src/layouts/Layout.astro`: layout principal, SEO base, tema y estructura global.
- `src/styles/global.css`: tokens visuales y utilidades compartidas.
- `src/data/questions/*.json`: bancos de preguntas por modulo.

Referencias rapidas de patron:

- `src/pages/fundamentos.astro`: modulo teorico + quiz hidratado.
- `src/components/Quiz.vue`: quiz por modulo y persistencia de progreso.
- `src/components/ExamMode.vue`: simulacro final con temporizador e historial.
- `src/components/Sidebar.astro`: navegacion y barra de progreso global.

## Convenciones obligatorias

- Mantener contenido, rutas y copy en espanol.
- Cambios minimos y puntuales; evitar refactors amplios no solicitados.
- Componentes en PascalCase; variables y funciones en camelCase.
- En Astro + Vue, usar hidratacion solo cuando sea necesaria:
	- `client:visible` para componentes no criticos al inicio.
	- `client:load` solo para experiencias que deban estar activas desde el primer render.
- Mantener coherencia visual con tokens y estilos existentes en `src/styles/global.css`.

## Estado cliente (localStorage)

Claves actuales:

- `theme`
- `ai900-progress`
- `ai900-module-progress`
- `ai900-exam-history`

Si agregas una nueva clave, documentala aqui (nombre, estructura y proposito).

## Validacion minima antes de finalizar

1. Ejecutar `npm run build` y resolver errores.
2. Confirmar que no se rompieron rutas en `src/pages/`.
3. Si cambias Vue interactivo, validar flujo basico en desarrollo (`npm run dev`).

## Pitfalls del repositorio

- Todo archivo nuevo en `src/pages/` crea una ruta publica automaticamente.
- Los contenidos de evaluacion viven en `src/data/questions/*.json`; editar ahi, no hardcodear preguntas en componentes.
- El progreso de sidebar depende de `ai900-module-progress` y `ai900-exam-history`.

## Forma de trabajo del agente

- Explicar brevemente el cambio antes de editar.
- Referenciar rutas concretas en respuestas.
- Si hay ambiguedad funcional, preguntar antes de cambiar comportamiento.