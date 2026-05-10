# AI-900 Study (Español)

Plataforma de estudio para preparar el examen Microsoft Azure AI Fundamentals (AI-900), construida con Astro, Vue y Tailwind CSS.

## Sitio en producción

https://ai-900-study.vercel.app/

## Objetivo

Este repositorio contiene una web de estudio con:
- Contenido teórico por módulos
- Quiz interactivo por tema
- Simulacro final tipo examen
- Seguimiento de progreso en el navegador

## Stack tecnológico

- Astro 5
- Vue 3
- Tailwind CSS 3
- MDX

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:

npm install

## Comandos disponibles

- npm run dev: Inicia el entorno de desarrollo
- npm start: Alias de desarrollo
- npm run build: Genera la versión de producción en la carpeta dist
- npm run preview: Sirve localmente la build de producción

## Estructura principal

- src/pages: Rutas de la aplicación (Astro file-based routing)
- src/components: Componentes Astro y Vue
- src/layouts: Layouts compartidos
- src/styles: Estilos globales
- public/recursos: Recursos descargables

## Rutas incluidas

- / (Inicio)
- /fundamentos
- /machine-learning
- /computer-vision
- /nlp
- /exam/simulacro
- /recursos

## Persistencia local

La aplicación guarda estado en localStorage con estas claves:
- theme
- ai900-progress
- ai900-module-progress
- ai900-exam-history

## Contacto

- Email: jesusprodriguez@gmail.com
- WhatsApp: +34 670 40 24 50
- LinkedIn: https://www.linkedin.com/in/jes%C3%BAs-pedro-rodr%C3%ADguez-castro
- GitHub: https://github.com/jesusprodriguezUnir

## Convenciones de contenido

- El contenido está en español
- Mantener consistencia en nombres de rutas y módulos
- Evitar cambios de estilo fuera del sistema visual definido en src/styles/global.css

## Build y despliegue

1. Ejecutar build:

npm run build

2. Verificar localmente:

npm run preview

La salida para despliegue está en la carpeta dist.

## Licencia

Pendiente de definir.
