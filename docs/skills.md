# Agent skills

Installed in `.claude/skills/` for Claude Code sessions in this project.

| Skill | Source | Install |
| --- | --- | --- |
| scroll-craft | `nateherkai/scroll-craft` (skills.sh) | `npx skills add nateherkai/scroll-craft@scroll-craft -a claude-code -y` (copied) |
| tanstack-start, parallax, tailwindcss, responsive-web, seo, wcag | `~/side-projects/skills`, `frontend-start` collection | `./install.sh --only <skill> ... <this project> frontend-start` (symlinked) |

scroll-craft's bundled scripts (`doctor.mjs`, `shoot.mjs`, `kie.mjs`) were not run. Its kie.ai asset
generation needs `KIE_AI_API_KEY` and was not used.
