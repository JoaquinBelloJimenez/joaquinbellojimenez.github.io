# AGENTS.md — joaquinbellojimenez.github.io

Portfolio personal estático (vanilla HTML/CSS). Sin build tools, dependencias npm, linters ni tests.

## Estructura

```
index.html          → Página principal (única)
styles/main.css     → Todos los estilos
assets/             → Imágenes de preview y foto de perfil
projects/
  todo-list/        → Proyecto demo (HTML/CSS/JS vanilla)
  movie-search/     → Proyecto demo (HTML/CSS/JS vanilla)
```

## Preview

Abrir `index.html` en el navegador. No hay servidor de desarrollo.

## Convenciones de desarrollo

- Utilizar las convenciones ARIA para mayor integración.

## Convenciones CSS

- Clases semánticas: `.section`, `.container`, `.btn`, `.project-card`, `.skills-grid`, `.skill`
- Variables CSS en `:root` (`--primary-color`, `--secondary-color`, etc.)
- `@media (max-width: 600px)` para responsive
- Botones con clase `.btn`
- Uso de paleta de colores menta y tonos estilo blanco roto para contraste.

## Proyectos vinculados

Cada `.project-card` enlaza a su subdirectorio en `projects/` o a sitio externo. Agregar un proyecto nuevo requiere:
1. Carpeta en `projects/` con `index.html`
2. Preview image en `assets/`
3. Nuevo `.project-card` en `index.html`

## Contacto

Los datos serán añadidos más tarde por el creador.

## Deploy

No debe gestionarse ningún tipo de deploy.

## No hagas
- No generes nuevos archivos.
- Cero uso de javascript o lenguaje de programación.
- Evita usar nombres complejos o confusos para clases e IDs.
