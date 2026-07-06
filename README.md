# Y'TILIKAN — Site vitrine

Site officiel de Y'TILIKAN — communauté de vulgarisation de l'IA pour l'Afrique francophone et sa diaspora.

**« Y'tilikan »**, en mooré : *ce n'est pas sorcier.*

## Stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- Design system maison (palette noir / charbon / ivoire + orange) — CSS global (`app/globals.css`)
- Police : Sora (Google Fonts)

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run start    # sert le build de production
```

## Déploiement (Vercel)

Le projet est prêt pour [Vercel](https://vercel.com), qui détecte Next.js automatiquement
(aucune configuration nécessaire).

1. Pousser le dépôt sur GitHub.
2. Sur Vercel : **New Project → Import** le dépôt.
3. Framework Preset : **Next.js** (auto-détecté), puis **Deploy**.

Variable d'environnement optionnelle :

- `NEXT_PUBLIC_SITE_URL` — URL canonique du site (ex. `https://ytilikan.com`),
  utilisée pour les balises SEO / Open Graph. Valeur par défaut : `https://ytilikan.vercel.app`.

## Assets images

Déposer les fichiers suivants dans `public/` (référencés par le site) :

- `public/logo.jpeg` — logo (fond clair)
- `public/logo-white.jpg` — logo (fond sombre)
- `public/hero-bg.jpg` — image de fond du hero

## Structure

```
app/
├── layout.tsx              Layout racine (SEO, polices, JSON-LD)
├── page.tsx                Assemble toutes les sections
├── globals.css            Design tokens + styles
└── components/
    ├── Symbols.tsx         Défs SVG (masque / œil / motif)
    ├── Nav.tsx             Navigation sticky
    ├── Hero.tsx            Titre + preuve sociale
    ├── Essence.tsx         Mission, vision, valeurs
    ├── CommentParticiper.tsx
    ├── Stats.tsx           Compteurs animés
    ├── Emissions.tsx       Vidéos YouTube
    ├── Programmes.tsx      Formats d'émission
    ├── Projets.tsx         Projets open-source
    ├── Equipe.tsx          Équipe
    ├── FAQ.tsx             Questions fréquentes
    ├── Contact.tsx         Formulaire + footer
    └── ClientScripts.tsx   Interactions (reveal, nav, compteurs, formulaire)
lib/
└── site.ts                 Constantes partagées
```
