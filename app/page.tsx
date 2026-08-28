import Symbols from './components/Symbols';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Essence from './components/Essence';
import CommentParticiper from './components/CommentParticiper';
import Stats from './components/Stats';
import Marquee from './components/Marquee';
import Emissions from './components/Emissions';
import Programmes from './components/Programmes';
import Evenements from './components/Evenements';
import Projets from './components/Projets';
import Equipe from './components/Equipe';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ClientScripts from './components/ClientScripts';
import { fetchPublicSite, fetchShowcaseProjects, fetchPublicEvents } from '@/lib/api';

export default async function Home() {
  const [site, projects, events] = await Promise.all([
    fetchPublicSite(),
    fetchShowcaseProjects(),
    fetchPublicEvents(),
  ]);

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