import React from 'react';
import { Check, Shield, Cpu, RefreshCw, HardDrive, Smartphone, Store, UtensilsCrossed, MonitorCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DetailedSpecialties: React.FC = () => {
  const { language } = useApp();

  const isEs = language === 'ES';

  return (
    <section className="py-20 bg-white dark:bg-[#0B0F17] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Specialty 1: Soporte Técnico Informático */}
        <div className="grid lg:grid-cols-12 gap-12 items-center" id="soporte-tecnico">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-wider text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/60 px-3 py-1 rounded-md border border-pink-200 dark:border-pink-800/80">
              {isEs ? 'Soporte Informático' : 'IT & Computer Support'}
            </span>

            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              {isEs
                ? 'Soporte Técnico, Optimización y Reparación de Computadores'
                : 'Computer Technical Support, Optimization & Hardware Repair'}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEs ? (
                <>
                  En <strong className="text-slate-900 dark:text-white">Tu Poder Virtual</strong> resolvemos fallas de hardware y software en notebooks y PC de escritorio, garantizando un servicio honesto y de alto rendimiento.
                </>
              ) : (
                <>
                  At <strong className="text-slate-900 dark:text-white">Tu Poder Virtual</strong> we solve hardware and software issues on laptops and desktop PCs, guaranteeing honest and high-performance repair.
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
                      ? 'Reparación y mantenimiento de computadores (PC y Notebooks)'
                      : 'Computer Repair & Preventative Maintenance (PC & Laptops)'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Mantenimiento preventivo, limpieza interna y solución a sobrecalentamiento.'
                      : 'Thermal paste application, internal fan cleaning, and overheating solutions.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-pink-200 dark:border-pink-800">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isEs ? 'Formateo e instalación de Windows' : 'Windows Clean Installation & Drivers'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Sistemas operativos estables, limpios y configurados a la medida.'
                      : 'Clean, verified Windows installation configured with updated official drivers.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-pink-200 dark:border-pink-800">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isEs ? 'Optimización y eliminación de virus o malware' : 'Optimization & Malware Removal'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Aceleración del sistema y limpieza completa de amenazas que ralentizan tu equipo.'
                      : 'Deep scan isolation of background threats to restore swift responsiveness.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-pink-200 dark:border-pink-800">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isEs ? 'Recuperación de datos y solución de problemas' : 'Data Recovery & Diagnostic Troubleshooting'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Recuperación de archivos esenciales y diagnósticos certeros.'
                      : 'Retrieval of inaccessible files, damaged sectors, and accurate root-cause analysis.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-pink-600 hover:bg-slate-800 dark:hover:bg-pink-700 text-white text-sm font-semibold transition-colors shadow-md"
                href="#contacto"
              >
                {isEs ? 'Agendar Diagnóstico Técnico' : 'Book Diagnostic Check'}
              </a>
              <a
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors shadow-md"
                href="https://wa.me/56912345678"
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
                alt="Mantenimiento de hardware y optimización computacional"
                className="rounded-2xl shadow-md w-full object-cover aspect-[4/3] group-hover:scale-[1.01] transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVNfS3dlHkwi6jx_rdOJuwFky1X_drXFGMHH1mXlmjlg3IowaTE1CSlL06XQZ56Z_oU12-TJBuDbsp7rN_9UqPXuR8yEEJOm-jINYVxPk0lvTWSC55G60Bey4j8V2N6bzwT6Mz9HE6qbEFqHxHFd31C1nF-rJY2sZXr6-U5px4543TV4scPLKyTbz3C58Ah5XqbCM1WOw7iG03POFeqeHz7CxYc3voKCaBSUhJ1CGEOh0b80Y4IH0N"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono px-2">
                <span>📍 Taller Técnico: Ecuador 1438, Antofagasta</span>
                <span className="text-emerald-500 font-bold">Garantizado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specialty 2: Soluciones Web & Menús QR */}
        <div className="grid lg:grid-cols-12 gap-12 items-center" id="desarrollo-web">
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
                      ? 'Creación de páginas web para empresas y negocios'
                      : 'Corporate & Business Web Development'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Diseños modernos, directos y adaptados a la identidad visual de tu marca.'
                      : 'Clean, modern layouts crafted around your brand identity.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-amber-200 dark:border-amber-800">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isEs
                      ? 'Menús digitales QR para restaurantes'
                      : 'Interactive QR Menus for Restaurants & Cafés'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Cartas atractivas, rápidas de cargar en smartphones, fáciles de actualizar sin reimpresiones.'
                      : 'Blazing fast mobile menus, effortless live updates without reprinting costs.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-amber-200 dark:border-amber-800">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isEs ? 'Soluciones web personalizadas para PyMEs' : 'Tailored Digital Solutions for SMEs'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Funcionalidades hechas a la medida de tu flujo de atención y ventas.'
                      : 'Customized features specifically aligned with your workflow and booking needs.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-amber-200 dark:border-amber-800">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isEs ? 'Sitios 100% responsivos optimizados para celulares' : '100% Mobile-First Responsive Design'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs
                      ? 'Navegación fluida y visualización impecable en cualquier dispositivo.'
                      : 'Fluid interactions and flawless presentation on phones, tablets, and desktops.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-sm font-semibold transition-colors shadow-md shadow-pink-600/20"
                href="#contacto"
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
