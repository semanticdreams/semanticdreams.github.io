# Repository Guidelines

## Project Structure

- `.vitepress/` — VitePress site config and theme code.
  - `.vitepress/config.mjs` — site navigation, Markdown plugins, RSS/Atom feed generation.
  - `.vitepress/theme/` — custom layout, Vue components, and CSS.
- `posts/` — blog posts (`.md`) with frontmatter (e.g., `title`, `date`, `description`, optional `draft: true`).
- `projects/` — project pages and related assets (images live alongside the Markdown).
- `public/` — static assets served from the site root (e.g., `public/logo.png` → `/logo.png`).

Note: build outputs (`.vitepress/dist/`) and caches (`.vitepress/cache/`) are generated and should not be committed (both are gitignored).

## Build, Test, and Development Commands

Use `pnpm` (see `pnpm-lock.yaml`). CI uses Node `22`.

- `pnpm install` — install dependencies.
- `make dev` (or `pnpm docs:dev`) — run the local dev server.
- `make build` (or `pnpm docs:build`) — production build to `.vitepress/dist/` (also generates `rss.xml`/`atom.xml`).
- `make preview` (or `pnpm docs:preview`) — serve the production build locally.
- `make post "My New Post"` — create a new file in `posts/` with starter frontmatter.

## Coding Style & Naming Conventions

- Follow the existing style in the file you’re editing (indentation and quotes are not fully standardized).
- Vue components use Single File Components with `<script setup>` (see `.vitepress/theme/components/`).
- Prefer Tailwind utility classes for styling; site-level tweaks belong in `.vitepress/theme/custom.css`.
- Content filenames are kebab-case (e.g., `posts/my-new-post.md`).

## Testing Guidelines

There is no dedicated test suite in this repo. Validate changes by:

- Running `pnpm docs:build` and ensuring it completes without errors.
- Reviewing pages in `pnpm docs:preview`, especially after layout/CSS changes.

## Commit & Pull Request Guidelines

- Commit messages in history are short and imperative (e.g., `Update theme`, `Add atom feed`). Keep them concise but specific.
- PRs should include a summary of changes and, for visual updates, screenshots or a short before/after description.
- Ensure the site builds locally (`pnpm docs:build`) before requesting review.
