export interface ExperienceEntry {
  company: string
  role: string
  period: string
  description: string
  bullets: string[]
  tags: string[]
}

export const experienceData: ExperienceEntry[] = [
  // {
  //   company: 'Freelance',
  //   role: 'Frontend Architect',
  //   period: '2024 – present',
  //   description: 'Building custom frontend platforms and developer tools for various clients.',
  //   bullets: [
  //     'Designed plugin-based CLI engine for a browser terminal portfolio',
  //     'Led migration of legacy Angular apps to React + Vite',
  //     'Created reusable component libraries with TailwindCSS + shadcn/ui',
  //     'Implemented CI/CD pipelines and automated testing strategies',
  //   ],
  //   tags: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
  // },
  {
    company:  "GYS France - Laval",
    role: "Alternant Informatique Industrielle",
    period: " Septembre 2022 – Septembre2024",
    description: "Conception et développement d'applications internes du bureau d'études tels qu'un sniffer de réseaux ainsi qu'un logiciel de monitoring et de tests de produits.'",
    bullets: [
      "Développement d'un sniffer de réseaux pour analyser les communications entre les produits et les serveurs",
      "Création d'un logiciel de monitoring pour les cartes électroniques en temps réel",
      "Maintenance et amélioration des outils existants pour assurer leur efficacité et leur fiabilité",
      "Collaboration avec les équipes de développement et de support pour améliorer les outils internes",
    ],
    tags: ["C++", "Qt", "Java", "Automatisation"],
  },
  {
    company: "Andros - Biars-sur-Cère",
    role: "Alternant Informatique Industrielle",
    period: " Septembre 2024 – Septembre 2026",
    description: "Conception, développement et maintenance d'applications industrielles.",
    bullets: [
      "Participation à la conception et au développement de nouvelles fonctionnalités pour les outils internes",
      "Collaboration avec les équipes de développement pour identifier et résoudre les problèmes techniques",
      "Contribution à la documentation technique et aux guides d'utilisation des outils développés",
    ],
    tags: ["Javascript", "Node.js", "PHP - Laravel", "SQL Server", "ASP.NET", "Visual Basic"],
  }
]
