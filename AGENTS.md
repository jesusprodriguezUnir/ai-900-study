# AGENTS.md

Guia operativa para agentes de codigo en este repositorio.

## Objetivo del proyecto

Plataforma de estudio para AI-900 (Azure AI Fundamentals) con contenido y evaluaciones en espanol.

## Stack y ejecucion

- Framework: Astro 5
- UI interactiva: Vue 3 (componentes hidratados)
- Estilos: Tailwind CSS + variables CSS en `src/styles/global.css`

Comandos principales:

- `npm run dev` (o `npm start`): desarrollo local
- `npm run build`: build de produccion
- `npm run preview`: previsualizar build

## Mapa del codigo

- `src/pages/`: rutas de Astro (file-based routing)
- `src/components/`: componentes Astro y Vue
- `src/layouts/Layout.astro`: layout principal, carga de tema y estilos globales
- `src/styles/global.css`: tokens visuales y clases reutilizables
- `src/data/questions/`: banco de preguntas en archivos JSON (externalizados)

Archivos de referencia rapida:

- `src/pages/fundamentos.astro` (patron de pagina de modulo + quiz)
- `src/components/Quiz.vue` (interaccion de preguntas por modulo)
- `src/components/ExamMode.vue` (simulacro con temporizador)
- `src/components/Sidebar.astro` (navegacion + progreso)

## Convenciones del repositorio

- Mantener contenido, rutas y copy en espanol.
- Nombres de componentes en PascalCase; variables en camelCase.
- Para componentes Vue en paginas Astro, usar directiva de hidratacion (ejemplo: `client:visible` para componentes al final de la pagina, `client:load` solo para paginas dedicadas)
- Mantener consistencia visual con variables CSS existentes (`--color-*`) y utilidades actuales.
- Evitar refactors grandes no solicitados: aplicar cambios minimos y puntuales.

## Estado y persistencia

La app usa `localStorage` para estado cliente. Claves actuales:

- `theme`
- `ai900-progress`
- `ai900-module-progress`
- `ai900-exam-history`

Si agregas nuevas claves, documenta el nombre y proposito en este archivo.

## Validacion antes de terminar cambios

Siempre ejecutar al menos:

1. `npm run build`
2. Revisar que no se rompan rutas de `src/pages/`
3. Si cambias Vue interactivo, probar flujo basico en `npm run dev`

## Pitfalls conocidos

- Cualquier archivo nuevo en `src/pages/` crea una ruta publica automaticamente.
- El contenido de preguntas esta externalizado en `src/data/questions/*.json`; editar archivos JSON para modificar bancos de preguntas.
- La UI depende de variables CSS y clases utilitarias compartidas; no mezclar esquemas de color fuera del sistema actual sin solicitud explicita.

## Estilo de colaboracion esperado para agentes

- Explicar brevemente que se va a cambiar antes de editar.
- Referenciar rutas de archivo especificas en las respuestas.
- Si hay ambiguedad funcional, preguntar antes de alterar comportamiento.