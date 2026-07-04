# Y'TILIKAN — Site vitrine

Site officiel de Y'TILIKAN — communauté de vulgarisation de l'IA pour l'Afrique francophone et sa diaspora.

**« Y'tilikan »**, en mooré : *ce n'est pas sorcier.*

## Stack

- [Astro](https://astro.build) — site statique
- Design system maison (dark premium, palette or/ink) — voir `YTILIKAN/brand-kit`
- Polices : Inter, JetBrains Mono, Playfair Display (Google Fonts)

## Développement

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run preview  # prévisualise le build
```

## Déploiement

Push sur `main` → GitHub Actions build et déploie sur GitHub Pages
(`.github/workflows/deploy.yml`). URL : https://ytilikan.github.io

## Structure

```
src/
├── layouts/Base.astro       Layout + reveal on scroll
├── components/
│   ├── Nav.astro            Navigation sticky
│   ├── Hero.astro           Titre + stats
│   ├── Mission.astro        4 axes de mission
│   ├── Vision.astro         Ambitions + valeurs
│   ├── Programmes.astro     3 formats d'émission
│   ├── Equipe.astro         Fondateurs + équipe élargie
│   ├── Projets.astro        AfriBench, Dira, Formation
│   └── Contact.astro        CTA + footer
├── pages/index.astro
└── styles/global.css        Design tokens
```
