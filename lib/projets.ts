export type Projet = {
  slug: string;
  name: string;
  tag: string;
  status: string;
  desc: string;
  detail: string;
  highlights: string[];
  stack: string[];
  authors: string;
  github: string;
  site: string | null;
};

export const PROJETS: Projet[] = [
  {
    slug: 'afribench',
    name: 'AfriBench',
    tag: 'ML · Benchmark',
    status: 'Open-source',
    desc: 'Évaluer les LLM sur des connaissances africaines francophones — QCM multi-catégories, protocole reproductible.',
    detail:
      "Les LLM sont souvent évalués sur des corpus occidentaux. AfriBench mesure ce qu'ils savent vraiment du continent francophone : histoire, culture, institutions, réalités locales. Résultats publics, protocole reproductible.",
    highlights: [
      'QCM multi-catégories (culture, histoire, institutions…)',
      'Protocole d’évaluation reproductible',
      'Résultats publics et comparables',
    ],
    stack: ['Python', 'LLM eval', 'Francophonie'],
    authors: 'Christian NEBOT (Lead) · Michel Azarias',
    github: 'https://github.com/YTILIKAN/AfriBench',
    site: 'https://afribench.vercel.app',
  },
  {
    slug: 'afrolang-library',
    name: 'AfroLang-Library',
    tag: 'Data · NLP',
    status: 'Public',
    desc: 'Bibliothèque de datasets de langues africaines : navigable, filtrable, ouverte aux contributions.',
    detail:
      'Sans données, pas de modèles utiles pour nos langues. AfroLang-Library centralise et organise des jeux de données : contribution, filtrage, et réutilisation pour la recherche et les produits.',
    highlights: [
      'Catalogue filtrable de datasets',
      'Focus langues africaines',
      'Contributions communautaires bienvenues',
    ],
    stack: ['NLP', 'Datasets', 'Open data'],
    authors: 'Stelle Matha (Lead) · Balla Moussa Keita · Bayard Ombgwa Kuddy',
    github: 'https://github.com/YTILIKAN/AfroLang-Library',
    site: null,
  },
  {
    slug: 'afrotech-pulse',
    name: 'AfroTech-Pulse',
    tag: 'Veille · Newsletter',
    status: 'Public',
    desc: 'Dashboard de veille IA Afrique + newsletter automatisée chaque lundi.',
    detail:
      "Une veille structurée sur l'IA en Afrique : signaux, acteurs, annonces. Dashboard + newsletter du lundi pour rester informé sans noyer sous le bruit.",
    highlights: [
      'Dashboard de signaux IA continentaux',
      'Newsletter hebdomadaire (lundi)',
      'Pipeline automatisé',
    ],
    stack: ['Veille', 'Automation', 'Newsletter'],
    authors: 'Hilary Cynthia (Lead) · Hamel Brayan · Steeve Junix',
    github: 'https://github.com/YTILIKAN/AfroTech-Pulse',
    site: null,
  },
  {
    slug: 'dira-browser',
    name: 'Dira Browser',
    tag: 'Navigateur · Apprentissage',
    status: 'En dev',
    desc: 'Laboratoire Chromium pour comprendre un navigateur, avec un focus confidentialité. Dira = boussole en swahili.',
    detail:
      "Dira n'est pas un produit fini : c'est un laboratoire. En partant de Chromium, on apprend l'architecture d'un navigateur et on explore la confidentialité. Ouvert à ceux qui veulent comprendre « sous le capot ».",
    highlights: [
      'Fork pédagogique basé sur Chromium',
      'Focus confidentialité',
      'Apprentissage « sous le capot »',
    ],
    stack: ['Chromium', 'Privacy', 'C++'],
    authors: 'Christian NEBOT (Lead) · YTILIKAN',
    github: 'https://github.com/YTILIKAN/brave-core',
    site: null,
  },
];
