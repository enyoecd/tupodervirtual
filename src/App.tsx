import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MatrixBackground } from './components/matrix/MatrixBackground';
import { MatrixClickSpill } from './components/matrix/MatrixClickSpill';
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
import { ToolsOnlinePage } from './pages/ToolsOnlinePage';
import { MatrixPasswordGate } from './components/matrix/MatrixPasswordGate';

const AppContent: React.FC = () => {
  const { currentPage, isEnyoAuthorized, unlockEnyo } = useApp();

  // Prevención de indexación web para /enyo (noindex, nofollow)
  useEffect(() => {
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (currentPage === 'tools-online') {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.content = 'noindex, nofollow, noarchive, nosnippet';
    } else if (robotsMeta) {
      robotsMeta.content = 'index, follow';
    }
  }, [currentPage]);

  // Cuando se accede a /enyo sin autenticar, se muestra SOLAMENTE la pantalla en negro estilo Neo Matrix.
  // Sin header, sin footer, sin controles flotantes ni contenedores externos.
  if (currentPage === 'tools-online' && !isEnyoAuthorized) {
    return <MatrixPasswordGate onUnlock={unlockEnyo} />;
  }

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden bg-white dark:bg-[#0B0F17] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* 1. Global Subtle Matrix Rain Background Layer */}
      <MatrixBackground />

      {/* 2. & 3. Right-Flank Click Spill & Dense Form Submit Cascade */}
      <MatrixClickSpill />

      {/* Application Header */}
      <Header />

      {/* Main Content Sections Based on Current Page */}
      <main className="relative z-10 w-full overflow-x-hidden">
        {currentPage === 'home' && (
          <>
            <Hero />
            <ServicesOverview />
            <DetailedSpecialties />
            <CoverageSection />
            <CtaBanner />
            <LocationMap />
            <ContactForm />
            <ClientMarquee />
          </>
        )}

        {currentPage === 'web-design' && <WebDesignPage />}

        {currentPage === 'technical-support' && <TechnicalSupportPage />}

        {currentPage === 'tools-online' && <ToolsOnlinePage />}
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

