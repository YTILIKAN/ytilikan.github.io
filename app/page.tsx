import Symbols from './components/Symbols';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Essence from './components/Essence';
import CommentParticiper from './components/CommentParticiper';
import Stats from './components/Stats';
import Emissions from './components/Emissions';
import Programmes from './components/Programmes';
import Projets from './components/Projets';
import Equipe from './components/Equipe';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ClientScripts from './components/ClientScripts';

export default function Home() {
  return (
    <>
      <Symbols />
      <Nav />
      <main id="main">
        <Hero />
        <Essence />
        <CommentParticiper />
        <Stats />
        <Emissions />
        <Programmes />
        <Projets />
        <Equipe />
        <FAQ />
        <Contact />
      </main>
      <ClientScripts />
    </>
  );
}
