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
import { fetchShowcaseProjects, fetchPublicEvents } from '@/lib/api';
import type { ShowcaseProject, PublicEvent } from '@/lib/api';

export default async function Home() {
  let projects: ShowcaseProject[] = [];
  let events: PublicEvent[] = [];

  try {
    [projects, events] = await Promise.all([
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
        <Emissions />
        <Programmes />
        <Evenements events={events} />
        <Projets apiProjects={projects} />
        <Equipe />
        <FAQ />
        <Contact />
      </main>
      <ClientScripts />
    </>
  );
}