export interface ExperienceEntry {
  company: string
  role: string
  period: string
  description: string
  bullets: string[]
  tags: string[]
}

export const experienceData: ExperienceEntry[] = [
  {
    company: 'Freelance',
    role: 'Frontend Architect',
    period: '2024 – present',
    description: 'Building custom frontend platforms and developer tools for various clients.',
    bullets: [
      'Designed plugin-based CLI engine for a browser terminal portfolio',
      'Led migration of legacy Angular apps to React + Vite',
      'Created reusable component libraries with TailwindCSS + shadcn/ui',
      'Implemented CI/CD pipelines and automated testing strategies',
    ],
    tags: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
  },
  {
    company: 'Open Source',
    role: 'Contributor & Maintainer',
    period: '2023 – present',
    description: 'Active contributions to the TypeScript and frontend ecosystem.',
    bullets: [
      'Maintained several developer tooling packages on npm',
      'Contributed performance improvements to open source CLI frameworks',
      'Authored technical articles on advanced TypeScript patterns',
    ],
    tags: ['TypeScript', 'Node.js', 'Open Source'],
  },
]
