import React from 'react';
import { AppProvider } from './context/AppContext';
import { MatrixBackground } from './components/matrix/MatrixBackground';
import { MatrixClickSpill } from './components/matrix/MatrixClickSpill';
import { MatrixEndWave } from './components/matrix/MatrixEndWave';
import { InteractiveConsole } from './components/matrix/InteractiveConsole';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ClientMarquee } from './components/ClientMarquee';
import { ServicesOverview } from './components/ServicesOverview';
import { DetailedSpecialties } from './components/DetailedSpecialties';
import { CoverageSection } from './components/CoverageSection';
import { CtaBanner } from './components/CtaBanner';
import { LocationMap } from './components/LocationMap';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { FloatingControls } from './components/FloatingControls';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen relative bg-white dark:bg-[#0B0F17] text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* 1. Global Subtle Matrix Rain Background Layer */}
        <MatrixBackground />

        {/* 2. & 3. Right-Flank Click Spill & Dense Form Submit Cascade */}
        <MatrixClickSpill />

        {/* 4. Page End Wave Indicator Rising from Bottom */}
        <MatrixEndWave />

        {/* Application Header */}
        <Header />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero />
          <ClientMarquee />
          <ServicesOverview />
          <DetailedSpecialties />
          <CoverageSection />
          <CtaBanner />
          <LocationMap />
          <ContactForm />

          {/* 5. Interactive Matrix Command Console (Recuadro inferior) */}
          <InteractiveConsole />
        </main>

        {/* Site Footer */}
        <Footer />

        {/* Floating Action Controls */}
        <FloatingControls />
      </div>
    </AppProvider>
  );
}
