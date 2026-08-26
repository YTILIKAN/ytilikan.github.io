import Symbols from './components/Symbols';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Essence from './components/Essence';
import CommentParticiper from './components/CommentParticiper';
import Stats from './components/Stats';
import Marquee from './components/Marquee';
import Emissions from './components/Emissions';
import Programmes from './components/Programmes';
import Projets from './components/Projets';
import Evenements from './components/Evenements';
import Equipe from './components/Equipe';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ClientScripts from './components/ClientScripts';
import {
  EMPTY_SITE,
  fetchPublicEvents,
  fetchPublicSite,
  fetchShowcaseProjects,
} from '@/lib/api';
import type { PublicEvent, PublicSite, ShowcaseProject } from '@/lib/api';

export default async function Home() {
  let site: PublicSite = EMPTY_SITE;
  let projects: ShowcaseProject[] = [];
  let events: PublicEvent[] = [];

  try {
    [site, projects, events] = await Promise.all([
      fetchPublicSite(),
      fetchShowcaseProjects(),
      fetchPublicEvents(),
    ]);
  } catch {
    // Fallback sur donnees hardcodees dans les composants
  }

  return (
    <>
      <Symbols />
      <Nav />
      <main id="main">
        <Hero />
        <Essence />
        <CommentParticiper />
        <Stats />
        <Marquee />
        <Emissions items={site.emissions} />
        <Programmes items={site.programmes} />
        <Evenements events={events} />
        <Projets apiProjects={projects} />
        <Equipe members={site.team} />
        <FAQ items={site.faq} />
        <Contact />
      </main>
      <ClientScripts />
    </>
  );
}
