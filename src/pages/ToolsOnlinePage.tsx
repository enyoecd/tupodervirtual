import React, { useState } from 'react';
import {
  Wrench,
  ExternalLink,
  Youtube,
  Download,
  Terminal,
  Shield,
  Layers,
  Sparkles,
  ArrowLeft,
  Cpu,
  Monitor,
  Code,
  Globe,
  Wifi,
  HardDrive,
  FileCheck,
  CheckCircle2,
  Bookmark,
  Share2,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MatrixPasswordGate } from '../components/matrix/MatrixPasswordGate';

interface ToolLink {
  title: string;
  url: string;
  description: string;
  tag: string;
  badgeColor?: string;
  icon?: string;
}

const ONLINE_UTILITIES: ToolLink[] = [
  {
    title: 'VirusTotal',
    url: 'https://www.virustotal.com/',
    description: 'Analizador online de archivos, URLs, dominios y direcciones IP contra más de 70 motores antivirus.',
    tag: 'Seguridad / Antivirus',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  },
  {
    title: 'Speedtest by Ookla',
    url: 'https://www.speedtest.net/',
    description: 'Medición precisa de velocidad de bajada, subida, latencia y jitter de tu conexión a Internet.',
    tag: 'Redes / Conectividad',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
  },
  {
    title: 'Can I Use',
    url: 'https://caniuse.com/',
    description: 'Tablas de soporte actualizado de tecnologías HTML5, CSS3 y JavaScript en todos los navegadores.',
    tag: 'Desarrollo Web',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
  },
  {
    title: 'TinyPNG / TinyJPG',
    url: 'https://tinypng.com/',
    description: 'Compresión inteligente con pérdida de peso para imágenes WebP, PNG y JPEG sin perder calidad perceptible.',
    tag: 'Optimización Web',
    badgeColor: 'border-pink-500/30 text-pink-400 bg-pink-500/10',
  },
  {
    title: 'ILovePDF',
    url: 'https://www.ilovepdf.com/es',
    description: 'Herramientas completas para unir, dividir, comprimir y convertir archivos PDF en el navegador.',
    tag: 'Utilidad Documentos',
    badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
  },
  {
    title: 'DNS Checker',
    url: 'https://dnschecker.org/',
    description: 'Verificación global de propagación de registros DNS (A, MX, CNAME, TXT, NS) en servidores mundiales.',
    tag: 'Dominios / Servidores',
    badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
  },
  {
    title: 'Regex101',
    url: 'https://regex101.com/',
    description: 'Probador interactivo de expresiones regulares con desglose sintáctico, depurador y explicaciones.',
    tag: 'Herramienta Dev',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
  },
  {
    title: 'Have I Been Pwned',
    url: 'https://haveibeenpwned.com/',
    description: 'Comprueba si alguna de tus cuentas de correo o contraseñas ha sufrido filtraciones de seguridad conocidas.',
    tag: 'Ciberseguridad',
    badgeColor: 'border-red-500/30 text-red-400 bg-red-500/10',
  },
];

const SOFTWARE_DOWNLOADS: ToolLink[] = [
  {
    title: 'AnyDesk',
    url: 'https://anydesk.com/es/downloads',
    description: 'Software ligero de escritorio remoto multiplataforma. Ideal para soporte técnico a distancia de alta velocidad.',
    tag: 'Soporte Remoto',
    badgeColor: 'border-red-500/30 text-red-400 bg-red-500/10',
  },
  {
    title: 'TeamViewer',
    url: 'https://www.teamviewer.com/es/descarga/',
    description: 'Solución empresarial de acceso remoto, colaboración y mantenimiento seguro con soporte bidireccional.',
    tag: 'Soporte Remoto',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  },
  {
    title: 'HWiNFO (Hardware Info & Diagnostics)',
    url: 'https://www.hwinfo.com/download/',
    description: 'Monitoreo profesional de hardware en tiempo real: temperaturas, voltajes, salud de batería y sensores.',
    tag: 'Diagnóstico Hardware',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
  },
  {
    title: 'CrystalDiskInfo',
    url: 'https://crystalmark.info/en/software/crystaldiskinfo/',
    description: 'Utilidad indispensable para evaluar la salud S.M.A.R.T. y temperatura de discos duros HDD y unidades SSD / NVMe.',
    tag: 'Almacenamiento / SSD',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  },
  {
    title: 'Rufus',
    url: 'https://rufus.ie/es/',
    description: 'Herramienta de creación de medios USB booteables para formateo e instalación de Windows, Linux y UEFI.',
    tag: 'Sistemas Operativos',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
  },
  {
    title: '7-Zip',
    url: 'https://www.7-zip.org/',
    description: 'Compresor y descompresor libre de archivos con ratio de compresión ultra alto (.7z, .zip, .rar, .tar, .iso).',
    tag: 'Utilidad Esencial',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
  },
  {
    title: 'Revo Uninstaller Free',
    url: 'https://www.revouninstaller.com/products/revo-uninstaller-free/',
    description: 'Desinstalador avanzado que rastrea y borra claves de registro huérfanas y restos de programas resistentes.',
    tag: 'Mantenimiento PC',
    badgeColor: 'border-teal-500/30 text-teal-400 bg-teal-500/10',
  },
  {
    title: 'Visual Studio Code',
    url: 'https://code.visualstudio.com/Download',
    description: 'Editor de código fuente multiplataforma y extensible para desarrollo web, scripts y terminal integrada.',
    tag: 'Desarrollo / Código',
    badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
  },
];

const YOUTUBE_CHANNELS: ToolLink[] = [
  {
    title: 'Canal de YouTube Oficial / Referencias',
    url: 'https://www.youtube.com',
    description: 'Plataforma de video para tutoriales prácticos, guías de reparación de computadores y proyectos web.',
    tag: 'Canal Principal',
    badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
  },
  {
    title: 'Guías de Hardware & Reparación PC',
    url: 'https://www.youtube.com/results?search_query=reparacion+de+computadoras+diagnostico',
    description: 'Desmontajes, cambio de pasta térmica, diagnósticos de placa madre y optimizaciones de Windows.',
    tag: 'Hardware & Taller',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
  },
  {
    title: 'Desarrollo Web & Tecnologías Modernas',
    url: 'https://www.youtube.com/results?search_query=desarrollo+web+react+tailwind+typescript',
    description: 'Novedades de diseño web responsive, menús digitales con códigos QR e interfaces avanzadas.',
    tag: 'Programación & Web',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  },
];

export const ToolsOnlinePage: React.FC = () => {
  const { navigateTo } = useApp();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('enyo_authorized') === 'true';
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  // Si no está autenticado, muestra la pantalla negra estilo Matrix de Neo
  if (!isAuthorized) {
    return <MatrixPasswordGate onUnlock={() => setIsAuthorized(true)} />;
  }

  return (
    <div className="py-10 sm:py-16 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Secret Access Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la Página Principal
          </button>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acceso Privado [enyo]</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <button
              onClick={() => {
                try {
                  sessionStorage.removeItem('enyo_authorized');
                } catch (e) {
                  // ignore
                }
                setIsAuthorized(false);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg border border-rose-500/30 transition-colors cursor-pointer"
              title="Bloquear acceso y volver a la pantalla Matrix"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Bloquear</span>
            </button>
          </div>
        </div>

        {/* Main Header */}
        <div className="mb-12 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Plataforma Personal de Gestión
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Herramientas y utilidades online
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Centro de comando y panel personal con accesos directos seleccionados para diagnóstico informático,
            servicios web esenciales, enlaces de descarga de software verificado y canales de video para soporte técnico continuo.
          </p>
        </div>

        {/* Section 1: Enlaces a otras páginas que son útiles */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Páginas y Utilidades Web Online
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Herramientas en la nube para análisis rápido, verificación de red, archivos y seguridad.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ONLINE_UTILITIES.map((tool, idx) => (
              <a
                key={idx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:shadow-emerald-950/20"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${tool.badgeColor}`}>
                      {tool.tag}
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Abrir utilidad</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Section 2: Enlaces a software de descarga */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Software de Descarga Esencial
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Enlaces directos a los instaladores oficiales y utilidades de soporte y diagnóstico técnico.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOFTWARE_DOWNLOADS.map((soft, idx) => (
              <a
                key={idx}
                href={soft.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:shadow-cyan-950/20"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${soft.badgeColor}`}>
                      {soft.tag}
                    </span>
                    <Download className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {soft.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {soft.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Ir a descarga oficial</span>
                  <span>↓</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Section 3: Enlaces a canal de YouTube */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Youtube className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Canal de YouTube & Recursos Multimedia
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Tutoriales técnicos, demostraciones prácticas, procedimientos paso a paso y guías de servicio.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {YOUTUBE_CHANNELS.map((yt, idx) => (
              <a
                key={idx}
                href={yt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:shadow-rose-950/20"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${yt.badgeColor}`}>
                      {yt.tag}
                    </span>
                    <Youtube className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-300 transition-colors">
                    {yt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {yt.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-rose-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Ver contenido en YouTube</span>
                  <span>▶</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer info note */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Espacio reservado para expansión continua de recursos personales.</span>
          </div>
          <button
            onClick={() => navigateTo('home')}
            className="text-emerald-400 hover:underline cursor-pointer"
          >
            ← Volver al sitio web principal
          </button>
        </div>
      </div>
    </div>
  );
};
