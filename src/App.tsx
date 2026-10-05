import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MatrixBackground } from './components/matrix/MatrixBackground';
import { MatrixClickSpill } from './components/matrix/MatrixClickSpill';
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
import { WebDesignPage } from './pages/WebDesignPage';
import { TechnicalSupportPage } from './pages/TechnicalSupportPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen relative bg-white dark:bg-[#0B0F17] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* 1. Global Subtle Matrix Rain Background Layer */}
      <MatrixBackground />

      {/* 2. & 3. Right-Flank Click Spill & Dense Form Submit Cascade */}
      <MatrixClickSpill />

      {/* Application Header */}
      <Header />

      {/* Main Content Sections Based on Current Page */}
      <main className="relative z-10">
        {currentPage === 'home' && (
          <>
            <Hero />
            <ServicesOverview />
            <DetailedSpecialties />
            <CoverageSection />
            <CtaBanner />
            <LocationMap />
            <InteractiveConsole />
            <ContactForm />
            <ClientMarquee />
          </>
        )}

        {currentPage === 'web-design' && <WebDesignPage />}

        {currentPage === 'technical-support' && <TechnicalSupportPage />}
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Floating Action Controls */}
      <FloatingControls />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

