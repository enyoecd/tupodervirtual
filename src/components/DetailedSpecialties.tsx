import React from 'react';
import { Check, Shield, Cpu, RefreshCw, HardDrive, Smartphone, Store, UtensilsCrossed, MonitorCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DetailedSpecialties: React.FC = () => {
  const { language, navigateTo } = useApp();

  const isEs = language === 'ES';

  return (
    <section className="py-20 bg-white dark:bg-[#0B0F17] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Specialty 1: Soporte Técnico Informático */}
        <div className="grid lg:grid-cols-12 gap-12 items-center scroll-mt-24" id="soporte-tecnico">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-wider text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/60 px-3 py-1 rounded-md border border-pink-200 dark:border-pink-800/80">
              {isEs ? 'Soporte Informático' : 'IT & Computer Support'}
            </span>

            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              {isEs
                ? 'Soporte Técnico, Mantenimiento de Software y Respaldo Seguro'
                : 'Computer Technical Support, Software Maintenance & Secure Backup'}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEs ? (
                <>
                  En <strong className="text-slate-900 dark:text-white">Tu Poder Virtual</strong> resolvemos fallas de software, lentitud y configuración en notebooks y PC de escritorio, garantizando un servicio confiable con respaldo seguro de datos, así como atención presencial de tickets para empresas en Antofagasta.
                </>
              ) : (
                <>
                  At <strong className="text-slate-900 dark:text-white">Tu Poder Virtual</strong> we resolve software failures, lag, and configuration issues on laptops and desktop PCs, ensuring reliable service with secure data backups and corporate ticketing in Antofagasta.
                </>
              )}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-pink-200 dark:border-pink-800">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isEs
                      ? 'Formateo e instalación de Windows, Linux, macOS y Android.'
                      : 'Formatting & Installation of Windows, Linux, macOS & Android.'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Sistemas operativos estables, limpios y configurados a la medida.'
                      : 'Clean, stable operating systems configured to your needs.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-pink-200 dark:border-pink-800">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isEs ? 'Optimización y eliminación de virus' : 'Optimization & Virus Removal'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Limpieza completa de amenazas que ralentizan tu equipo.'
                      : 'Complete removal of threats that slow down your computer.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-pink-200 dark:border-pink-800">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isEs ? 'Recuperación de datos y solución de problemas' : 'Data Recovery & Troubleshooting'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Diagnósticos certeros.'
                      : 'Accurate diagnostics.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-pink-200 dark:border-pink-800">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isEs
                      ? 'Soporte técnico remoto'
                      : 'Remote Technical Support'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Resolución de fallas, problemas de configuración e instalación de programas.'
                      : 'Troubleshooting errors, configuration issues, and software installation.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-pink-600 hover:bg-slate-800 dark:hover:bg-pink-700 text-white text-sm font-semibold transition-colors shadow-md text-center"
                href="#solicitar-cotizacion"
                onClick={(e) => {
                  e.preventDefault();
                  const target =
                    document.getElementById('solicitar-cotizacion') ||
                    document.getElementById('formulario-cotizacion');
                  if (target) {
                    const headerOffset = 90;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth',
                    });
                  } else {
                    navigateTo('home', 'solicitar-cotizacion');
                  }
                }}
              >
                {isEs ? 'Agendar Diagnóstico Técnico' : 'Book Diagnostic Check'}
              </a>
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors shadow-md text-center"
                href="https://wa.me/56987676879"
                target="_blank"
                rel="noopener noreferrer"
              >
                {isEs ? 'Consultar por WhatsApp' : 'Inquire on WhatsApp'}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-slate-100 dark:bg-[#0F172A] rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-[#1E293B] shadow-lg relative group">
              <img
                alt="Mantenimiento de software, respaldo seguro y soporte técnico para computadores"
                className="rounded-2xl shadow-md w-full object-cover aspect-[4/3] group-hover:scale-[1.01] transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVNfS3dlHkwi6jx_rdOJuwFky1X_drXFGMHH1mXlmjlg3IowaTE1CSlL06XQZ56Z_oU12-TJBuDbsp7rN_9UqPXuR8yEEJOm-jINYVxPk0lvTWSC55G60Bey4j8V2N6bzwT6Mz9HE6qbEFqHxHFd31C1nF-rJY2sZXr6-U5px4543TV4scPLKyTbz3C58Ah5XqbCM1WOw7iG03POFeqeHz7CxYc3voKCaBSUhJ1CGEOh0b80Y4IH0N"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono px-2">
                <span>📍 Taller Técnico: Ecuador 1438, Antofagasta, Chile</span>
                <span className="text-emerald-500 font-bold">Garantizado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specialty 2: Soluciones Web & Menús QR */}
        <div className="grid lg:grid-cols-12 gap-12 items-center scroll-mt-24" id="desarrollo-web">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-slate-100 dark:bg-[#0F172A] rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-[#1E293B] shadow-lg relative group">
              <img
                alt="Diseño Web y Menú QR digital moderno"
                className="rounded-2xl shadow-md w-full object-cover aspect-[4/3] group-hover:scale-[1.01] transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhFtMxfael_9nrpu4SWqASDKppsJsMwe7rBLV7Xiuizzq68dN-2DOocA3ry5Q265ldqNU2dPH_Dvtlrd8D2aDDqEABYC5pIu2b_VHSQsT0_1LQILqqGi97pfUT2K2Ia7SfjLdi1uAvBe-5JPKkp8GaqAcNVzyNUPSnzWZrGm7OeQw4haPSwiqGy4PC6troLxmtz9XO8KKCVxgQkcdfz2EHTCpXtWllObgjzhYzdwRkAq4WrjmZm0g0"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono px-2">
                <span>⚡ Menús QR Interactivos & Sitios Web PyMEs</span>
                <span className="text-pink-500 font-bold">100% Responsivo</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-md border border-amber-200 dark:border-amber-800/60">
              {isEs ? 'Desarrollo Web' : 'Web Development'}
            </span>

            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              {isEs
                ? 'Creación de Páginas Web Profesionales y Menús Digitales'
                : 'Professional Web Design & Interactive QR Digital Menus'}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEs
                ? 'Impulsamos la presencia de pequeños y medianos negocios con sitios web responsivos y menús digitales interactivos diseñados para cautivar a tus clientes.'
                : 'We empower small and medium enterprises with responsive websites and digital QR menus built to capture and delight your customers.'}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-amber-200 dark:border-amber-800">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isEs
                      ? 'Menús digitales QR y NFC para restaurantes'
                      : 'Interactive QR & NFC Menus for Restaurants & Cafés'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Acceso instantáneo mediante código QR o al acercar el teléfono con NFC. Cartas atractivas y fáciles de actualizar.'
                      : 'Instant access via QR code or NFC tap. Blazing fast mobile menus, effortless live updates without reprinting.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-amber-200 dark:border-amber-800">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isEs ? 'Sitios 100% responsivos optimizados para PC, celulares y tablets' : '100% Responsive Design for PCs, Phones & Tablets'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Navegación fluida y visualización impecable en cualquier dispositivo (PC, celulares y tablets).'
                      : 'Fluid interactions and flawless presentation on PCs, phones, and tablets.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-sm font-semibold transition-colors shadow-md shadow-pink-600/20"
                href="#solicitar-cotizacion"
                onClick={(e) => {
                  e.preventDefault();
                  const target =
                    document.getElementById('solicitar-cotizacion') ||
                    document.getElementById('formulario-cotizacion');
                  if (target) {
                    const headerOffset = 90;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth',
                    });
                  } else {
                    navigateTo('home', 'solicitar-cotizacion');
                  }
                }}
              >
                {isEs ? 'Cotizar Mi Sitio Web o Menú QR' : 'Quote Website or QR Menu'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
