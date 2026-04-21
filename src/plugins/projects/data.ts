export interface Project {
  name: string
  description: string
  longDescription: string
  tags: string[]
  url?: string
  repo?: string
}

export const projectsData: Project[] = [
  {
    name: 'portfolio-terminal',
    description: 'This portfolio — a fully interactive browser terminal with a plugin-based CLI engine.',
    longDescription:
      'Built with Vite, TypeScript, TailwindCSS, and Zustand. Features a plugin system, command DSL, middleware pipeline, autocomplete, theming, and easter eggs.',
    tags: ['TypeScript', 'React', 'Vite', 'TailwindCSS', 'CLI'],
    repo: 'https://github.com/tristangautier/portfolio-terminal',
  },
  {
    name: 'cli-framework',
    description: 'A reusable, framework-agnostic CLI engine for browser applications.',
    longDescription:
      'Extracted from the portfolio terminal. Provides a command registry, middleware pipeline, flag resolver, and plugin loader. Zero dependencies.',
    tags: ['TypeScript', 'Library', 'CLI', 'Open Source'],
    repo: 'https://github.com/tristangautier/cli-framework',
  },
  {
    name: 'design-system',
    description: 'A component library built on top of shadcn/ui with custom terminal aesthetics.',
    longDescription:
      'Monospace-first design system with dark mode, CSS variable theming, and keyboard-driven interaction patterns.',
    tags: ['React', 'TailwindCSS', 'shadcn/ui', 'Design System'],
    url: 'https://ds.tristangautier.dev',
  },
]
