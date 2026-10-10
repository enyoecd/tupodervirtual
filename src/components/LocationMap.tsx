import React from 'react';
import { MapPin, Clock, Car, Laptop, ExternalLink, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LocationMap: React.FC = () => {
  const { language } = useApp();
  const isEs = language === 'ES';

  return (
    <section
      className="py-20 bg-white dark:bg-[#0B0F17] transition-colors duration-300"
      id="mapa-ubicacion"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-wider text-pink-700 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/60 px-3 py-1 rounded-md border border-pink-200 dark:border-pink-800/80">
            {isEs ? 'Presencial Antofagasta' : 'On-Site Workshop Antofagasta'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
            {isEs ? 'Ubicación y Atención Presencial' : 'Workshop Location & In-Person Care'}
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
            {isEs
              ? 'Visítanos directamente en nuestro taller técnico en el corazón de Antofagasta.'
              : 'Visit us directly at our hardware diagnostic lab located in the heart of Antofagasta.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Columna Izquierda: Información de Atención Presencial */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] rounded-3xl p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/60 text-pink-700 dark:text-pink-300 flex items-center justify-center font-bold text-lg">
                  📍
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-50 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                    {isEs ? 'Recepción y Diagnóstico en Taller' : 'Reception & Lab Diagnostic'}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    {isEs ? 'Visítanos en Antofagasta' : 'Visit Us in Antofagasta'}
                  </h3>
                </div>
              </div>

              <div className="border-l-4 border-pink-600 pl-4 py-1">
                <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  {isEs ? 'Servicio Técnico & Desarrollo' : 'Tech Support & Web Agency'}
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">Tu Poder Virtual</p>
                <p className="text-base text-pink-700 dark:text-pink-400 font-semibold mt-1">
                  Ecuador 1438, Antofagasta, Chile
                </p>
              </div>

              <div className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {isEs ? 'Horarios de Atención:' : 'Opening Hours:'}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {isEs ? 'Lunes a Viernes: 09:30 - 19:30 hrs' : 'Monday to Friday: 09:30 - 19:30 hrs'}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {isEs ? 'Sábados: 10:00 - 16:00 hrs' : 'Saturdays: 10:00 - 16:00 hrs'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {isEs ? 'Facilidad de Acceso:' : 'Convenient Access:'}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {isEs
                        ? 'Fácil estacionamiento y locomoción expedita en calle Ecuador.'
                        : 'Convenient street parking and fast public transit along Ecuador Street.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Laptop className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {isEs ? 'Modalidad en Taller:' : 'Drop-off Procedure:'}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {isEs
                        ? 'Recepción para chequeo de hardware, cambio de piezas y presupuesto sin sorpresas.'
                        : 'Hardware intake voucher, clear diagnostic estimate, no surprise costs.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-200 dark:border-[#1E293B] flex flex-col sm:flex-row gap-3">
              <a
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-pink-600 hover:bg-slate-800 dark:hover:bg-pink-700 text-white font-bold text-sm shadow-md transition-all group"
                href="https://maps.google.com/?q=Ecuador+1438,+Antofagasta,+Chile"
                rel="noopener noreferrer"
                target="_blank"
              >
                <MapPin className="w-4 h-4 text-amber-400 dark:text-white group-hover:scale-110 transition-transform" />
                {isEs ? 'Cómo llegar con Google Maps' : 'Open in Google Maps'}
              </a>
            </div>
          </div>

          {/* Columna Derecha: Contenedor estilizado de Google Maps */}
          <div className="lg:col-span-7 bg-slate-100 dark:bg-[#152238] rounded-3xl border border-slate-200 dark:border-[#1E293B] overflow-hidden relative shadow-inner min-h-[380px] flex flex-col">
            {/* Barra superior simulada de Google Maps */}
            <div className="bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-[#1E293B] flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 ml-2">
                  Google Maps • Ecuador 1438, Antofagasta
                </span>
              </div>
              <a
                className="text-xs font-bold text-pink-700 dark:text-pink-400 hover:underline flex items-center gap-1"
                href="https://maps.google.com/?q=Ecuador+1438,+Antofagasta,+Chile"
                rel="noopener noreferrer"
                target="_blank"
              >
                {isEs ? 'Ampliar el mapa ↗' : 'View larger map ↗'}
              </a>
            </div>

            {/* Mapa visual estilizado con Pin exacto */}
            <div className="relative flex-1 bg-[#e5e3df] dark:bg-[#131c31] overflow-hidden flex items-center justify-center min-h-[320px]">
              <svg
                className="w-full h-full absolute inset-0 opacity-40 dark:opacity-20"
                preserveAspectRatio="none"
                viewBox="0 0 600 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect fill="#F4F3F0" height="400" width="600"></rect>
                <path d="M-20,80 L620,120 M-20,240 L620,220 M-20,320 L620,340" stroke="#FFFFFF" strokeWidth="26"></path>
                <path d="M-20,80 L620,120 M-20,240 L620,220 M-20,320 L620,340" stroke="#FFEBA8" strokeWidth="14"></path>
                <path d="M120,-20 L160,420 M310,-20 L290,420 M480,-20 L510,420" stroke="#FFFFFF" strokeWidth="24"></path>
                <path d="M120,-20 L160,420 M310,-20 L290,420 M480,-20 L510,420" stroke="#E6E3DB" strokeWidth="12"></path>
                <path d="M0,0 Q60,200 10,400 L0,400 Z" fill="#C8DCF0"></path>
              </svg>

              {/* Tarjeta flotante simulada de negocio en Google Maps */}
              <div className="absolute top-3 left-3 right-3 sm:right-auto sm:top-5 sm:left-5 z-10 bg-white dark:bg-[#0B0F17] p-3 sm:p-3.5 rounded-2xl shadow-xl border border-slate-200 dark:border-[#1E293B] max-w-full sm:max-w-xs">
                <div className="flex items-start gap-3">
                  <img
                    alt="Tu Poder Virtual"
                    className="w-8 h-8 object-contain shrink-0 mt-0.5"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3FA3rP86ySVj5K_c_sNelr0qX1gTQAcf-GLgRnC3Ds4C61zqOIEecuwE-IKDJordnLlMOK_myeyv2nWopwcyBn9M5PyLt73eV4ZccvgZpgJRXzbjS02e6isKIFIMXN33dVsN6dUVFTe2Ezi6S_GkL3_yjJGsidSlvmlaEL1Wst2zfg2ppKebiwn9T67XtQCEai-erinUt-h_cZSRSSF-v4Cj5knxlHJbEyqr0u9fHiCSivXRy8aUFfd4Mxi5u9jR_gQ"
                  />
                  <div>
                    <h5 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                      Tu Poder Virtual
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Ecuador 1438, Antofagasta
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-500 font-bold">
                      <span>5.0</span>
                      <div className="flex text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400" />
                      </div>
                      <span className="text-slate-400 font-normal">
                        ({isEs ? '50+ opiniones' : '50+ reviews'})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{' '}
                    {isEs ? 'Abierto hoy' : 'Open today'}
                  </span>
                  <a
                    className="text-pink-600 dark:text-pink-400 font-bold hover:underline"
                    href="https://maps.google.com/?q=Ecuador+1438,+Antofagasta,+Chile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {isEs ? 'Indicaciones' : 'Directions'}
                  </a>
                </div>
              </div>

              {/* Pin centralizado en Ecuador 1438 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-pink-600/30 animate-bounce">
                  <MapPin className="w-6 h-6 fill-current" />
                </div>
                <span className="mt-1 px-3 py-1 bg-slate-900 text-white text-[11px] font-extrabold rounded-full shadow-lg border border-amber-500 whitespace-nowrap">
                  📍 Ecuador 1438, Antofagasta
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
