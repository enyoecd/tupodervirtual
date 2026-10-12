import React from 'react';
import {
  ExternalLink,
  Youtube,
  Download,
  Terminal,
  Sparkles,
  ArrowLeft,
  Globe,
  CheckCircle2,
  Lock,
  Cloud,
  Send,
  MessageCircle,
  Music,
  Radio,
  BookOpen,
  Film,
  FileText,
  Smartphone,
  FolderDown,
  Layers,
  Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MatrixPasswordGate } from '../components/matrix/MatrixPasswordGate';

interface ToolLink {
  title: string;
  url: string;
  description: string;
  tag: string;
  badgeColor?: string;
}

// 1. Herramientas existentes
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

// 2. Software de descarga existente
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
    tag: 'Diagnóstico & Sensores',
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

// 3. Sección Software del blog en LISTA VERTICAL (uno debajo del otro)
interface BlogSoftwareItem {
  name: string;
  url: string;
  provider: 'Google Drive' | 'Mega' | 'OneDrive' | 'Telegram';
  category: string;
  description: string;
  color: string;
}

const BLOG_SOFTWARE_LIST: BlogSoftwareItem[] = [
  {
    name: 'Programas (Drive)',
    url: 'https://drive.google.com/drive/folders/1jPkERPLwzNpYKUigAZMQg_xiM7lHYf6U?usp=sharing',
    provider: 'Google Drive',
    category: 'Software General',
    description: 'Carpeta compartida con instaladores y utilidades de software esencial.',
    color: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
  },
  {
    name: 'Programas (Mega)',
    url: 'https://mega.nz/folder/eyB1BBpI#m6_JZpwUoZMfNiJcs2hLjg',
    provider: 'Mega',
    category: 'Software General',
    description: 'Repositorio en la nube Mega con paquetes de programas y herramientas para PC.',
    color: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
  },
  {
    name: 'Programas (OneDrive)',
    url: 'https://1drv.ms/f/c/291b8c9113bdeaf1/IgDx6r0TkYwbIIAp6gAAAAAAAc1y5LjWV5VQRgaKng16EA8?e=HzjYly',
    provider: 'OneDrive',
    category: 'Software General',
    description: 'Colección de utilidades y herramientas alojadas en Microsoft OneDrive.',
    color: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
  },
  {
    name: 'Programas (Telegram)',
    url: 'https://t.me/softwareenyo',
    provider: 'Telegram',
    category: 'Canal de Telegram',
    description: 'Canal oficial @softwareenyo para acceso directo a instaladores y novedades.',
    color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
  },
  {
    name: 'Programas 2 (Drive)',
    url: 'https://drive.google.com/drive/folders/14gzB_RONZAUgbSaRz3_xx0oV4zUQfS_t?usp=drive_link',
    provider: 'Google Drive',
    category: 'Software Adicional',
    description: 'Segunda carpeta en Google Drive con software complementario y utilidades.',
    color: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
  },
  {
    name: 'Programas 2 (Mega)',
    url: 'https://mega.nz/folder/jIpRBQbZ#iaRtDjMekc0Je7Tg7lsemg',
    provider: 'Mega',
    category: 'Software Adicional',
    description: 'Segundo directorio en Mega con utilidades técnicas y herramientas de diagnóstico.',
    color: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
  },
  {
    name: '0-f-f-1-c-e',
    url: 'https://drive.google.com/drive/u/3/folders/1mrZ02LkroFNT4yupM4TiAGUSYk48ASqM',
    provider: 'Google Drive',
    category: 'Ofimática',
    description: 'Carpeta en Google Drive con suites de oficina y herramientas de productividad.',
    color: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  },
  {
    name: 'ISOS (Mega)',
    url: 'https://mega.nz/folder/yR4kwRQD#v3QTGXfRR_EFTGdHvS68Kg',
    provider: 'Mega',
    category: 'Imágenes ISO',
    description: 'Repositorio en Mega con imágenes ISO de sistemas y utilidades de rescate.',
    color: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
  },
  {
    name: 'ISOS: Herramientas y Android (Drive)',
    url: 'https://drive.google.com/drive/folders/1zZPihMOG9PvUhEwePvFm9CdQ_1k8mS10?usp=drive_link',
    provider: 'Google Drive',
    category: 'Herramientas / Android',
    description: 'ISOS de diagnóstico, herramientas de flasheo y utilidades para Android en Drive.',
    color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  },
  {
    name: 'ISOS: WIN (Drive)',
    url: 'https://drive.google.com/drive/folders/1GyK7-kR_9WWY-tJtNUnj9CswVcbvzw0m?usp=sharing',
    provider: 'Google Drive',
    category: 'Sistemas Windows',
    description: 'Imágenes ISO oficiales de Windows preparadas para formateo y booteo limpio.',
    color: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
  },
  {
    name: 'APK (Drive)',
    url: 'https://drive.google.com/drive/folders/1twawzf1C3PVxUzQUOD0eZb6k6Q2YxuUw?usp=sharing',
    provider: 'Google Drive',
    category: 'Aplicaciones Android',
    description: 'Colección de archivos APK verificados para teléfonos y tablets Android.',
    color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  },
  {
    name: 'APK (Mega)',
    url: 'https://mega.nz/folder/TchTwIwJ#RK4tCF-KozqklKtKjxV9Ow',
    provider: 'Mega',
    category: 'Aplicaciones Android',
    description: 'Directorio en Mega con aplicaciones APK para dispositivos Android y Smart TV Box.',
    color: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
  },
];

// 4. Sección Web Favoritas del blog (en formato tarjetitas)
const FAVORITE_WEBSITES: ToolLink[] = [
  {
    title: 'Ninite',
    url: 'https://ninite.com/',
    description: 'Instalador y actualizador masivo de aplicaciones esenciales sin barras ni software no deseado.',
    tag: 'Instalador Masivo',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  },
  {
    title: 'CD-Libre',
    url: 'https://www.cdlibre.org/',
    description: 'Catálogo de software libre y de código abierto para Windows clasificado por áreas y temáticas.',
    tag: 'Software Libre',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  },
  {
    title: 'Winstall',
    url: 'https://winstall.app/',
    description: 'Interfaz gráfica web para crear paquetes y scripts para Windows Package Manager (winget).',
    tag: 'Herramienta Windows',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
  },
  {
    title: 'Intercambios Virtuales',
    url: 'http://www.intercambiosvirtuales.org/',
    description: 'Comunidad de tecnología, noticias, utilidades y aportes digitales.',
    tag: 'Comunidad Tech',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
  },
  {
    title: 'OldVersion',
    url: 'http://www.oldversion.com/',
    description: 'Repositorio histórico de versiones anteriores de programas cuando las versiones actuales fallan.',
    tag: 'Versiones Anteriores',
    badgeColor: 'border-violet-500/30 text-violet-400 bg-violet-500/10',
  },
  {
    title: 'Software Libre (Google Sites)',
    url: 'https://sites.google.com/view/todosoftwarelibre/software?authuser=0',
    description: 'Compilado curado en Google Sites de utilidades libres para PC y productividad.',
    tag: 'Software Libre',
    badgeColor: 'border-teal-500/30 text-teal-400 bg-teal-500/10',
  },
  {
    title: 'Hipertextual',
    url: 'http://hipertextual.com/',
    description: 'Medio de noticias de tecnología, ciencia, cultura digital, hardware y videojuegos.',
    tag: 'Noticias Tech',
    badgeColor: 'border-pink-500/30 text-pink-400 bg-pink-500/10',
  },
  {
    title: 'Alta Densidad',
    url: 'http://www.altadensidad.com/',
    description: 'Portal de actualidad sobre tecnología, tendencias digitales, gadgets e informática.',
    tag: 'Actualidad Tech',
    badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
  },
  {
    title: 'MalaVida',
    url: 'http://www.malavida.com/',
    description: 'Guías de descarga, análisis y tutoriales paso a paso de aplicaciones para PC y móvil.',
    tag: 'Guías & Apps',
    badgeColor: 'border-lime-500/30 text-lime-400 bg-lime-500/10',
  },
  {
    title: 'Will My Phone Work',
    url: 'https://willmyphonework.net/',
    description: 'Comprobador de compatibilidad de frecuencias y bandas móviles (2G, 3G, 4G, 5G) por país.',
    tag: 'Móvil / Bandas',
    badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
  },
  {
    title: 'Fútbol Libre',
    url: 'http://librefutboltv.su',
    description: 'Transmisiones deportivas y seguimiento en vivo de partidos de fútbol internacional.',
    tag: 'Deportes / En Vivo',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  },
  {
    title: 'Radio Garden',
    url: 'http://radio.garden',
    description: 'Globo interactivo 3D para escuchar miles de emisoras de radio en directo alrededor del mundo.',
    tag: 'Radio Mundial',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  },
  {
    title: 'Snapdrop',
    url: 'https://snapdrop.net/#',
    description: 'Transferencia directa de archivos estilo AirDrop entre dispositivos en la misma red local.',
    tag: 'Compartir Archivos',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
  },
  {
    title: 'Libros... (Mega)',
    url: 'https://mega.nz/folder/Pc4DkTzB#lJVKJXwWIzv9Hlkn96LYjw',
    description: 'Biblioteca y repositorio de libros digitales, manuales y lecturas en la nube de Mega.',
    tag: 'Biblioteca Digital',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
  },
  {
    title: '🎬 Películas y Series (Recomendaciones)',
    url: 'https://photos.app.goo.gl/kQDpCkjY3Wtem1pb6',
    description: 'Colección fotográfica y recomendaciones destacadas de películas y series de televisión.',
    tag: 'Cine & Series',
    badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
  },
  {
    title: 'Borrador (Google Docs)',
    url: 'https://docs.google.com/document/d/12Y9pOy8TbagtgKi6ZKFg9zl1QuvjdoC-QUKXiojm-74/edit?usp=sharing',
    description: 'Documento en Google Docs para apuntes rápidos, notas técnicas y borradores en la nube.',
    tag: 'Documentos en Nube',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  },
  {
    title: 'Agrega tu Página Web Favorita',
    url: 'http://spreadsheets.google.com/viewform?formkey=dGxYSGRESE80VlZFX19vUHN2VGtwSXc6MA',
    description: 'Formulario oficial para postular y sugerir nuevos sitios web útiles para añadir a la colección.',
    tag: 'Sugerir Enlace',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
  },
];

// 5. Canal de YouTube oficial + guías
const YOUTUBE_CHANNELS: ToolLink[] = [
  {
    title: 'Tu Poder Virtual (Canal Oficial)',
    url: 'https://www.youtube.com/@TuPoderVirtual',
    description: 'Canal oficial de YouTube con guías de sistemas, soporte computacional, software y tecnología.',
    tag: 'Canal Oficial YouTube',
    badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
  },
  {
    title: 'Guías de Software, Optimización & Mantenimiento PC',
    url: 'https://www.youtube.com/results?search_query=optimizacion+windows+soporte+tecnico',
    description: 'Aceleración de Windows, eliminación de amenazas, respaldo seguro de archivos y configuración de sistemas.',
    tag: 'Software & Sistemas',
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

// 6. Plataformas de música del blog
interface MusicPlatform {
  name: string;
  url: string;
  platform: string;
  description: string;
  badgeColor: string;
}

const MUSIC_PLATFORMS: MusicPlatform[] = [
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/user/313nj2hnqo74iqsptlds6s3wczva?si=xjAHInD_TTuVCAlRnQTNLA',
    platform: 'Spotify Profile',
    description: 'Perfil y playlists musicales seleccionadas en Spotify.',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  },
  {
    name: 'Deezer',
    url: 'https://www.deezer.com/en/profile/1172086726/playlists',
    platform: 'Deezer Profile',
    description: 'Listas de reproducción y colecciones musicales en Deezer.',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
  },
  {
    name: 'SoundCloud',
    url: 'https://soundcloud.com/enyoecd',
    platform: 'SoundCloud (@enyoecd)',
    description: 'Música, pistas y sesiones en el canal de SoundCloud.',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
  },
  {
    name: 'YouTube Playlists',
    url: 'https://www.youtube.com/user/enyoecd/playlists',
    platform: 'YouTube (enyoecd)',
    description: 'Playlists y recopilaciones de música en video en YouTube.',
    badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
  },
  {
    name: 'Mega (Música)',
    url: 'https://mega.nz/folder/KRARyQLC#w-QEzHs-zrWSRRVWF0Vplg',
    platform: 'Mega Cloud',
    description: 'Directorio en Mega con archivos de audio y colecciones musicales.',
    badgeColor: 'border-red-500/30 text-red-400 bg-red-500/10',
  },
  {
    name: 'OneDrive (Música)',
    url: 'https://1drv.ms/u/s!AvHqvRORjBspgcpzDfLLAI8jaMI_5g?e=ujC4p3',
    platform: 'Microsoft OneDrive',
    description: 'Biblioteca musical y álbumes compartidos en Microsoft OneDrive.',
    badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
  },
];

export const ToolsOnlinePage: React.FC = () => {
  const { navigateTo, isEnyoAuthorized, isPreUnlocked, unlockEnyo, lockEnyo } = useApp();

  // Si no está autenticado, muestra la pantalla negra estilo Matrix de Neo
  if (!isEnyoAuthorized) {
    return <MatrixPasswordGate onUnlock={unlockEnyo} autoBypass={isPreUnlocked} />;
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
              onClick={() => lockEnyo()}
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
            servicios web esenciales, repositorios de software en la nube del blog, sitios favoritos, canales y música.
          </p>
        </div>

        {/* Sección: Blog Oficial, Telegram & WhatsApp (Accesos Principales) */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Blog Oficial & Canales de Contacto Directo
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Enlaces al blog Tu Poder Virtual, atención directa por Telegram y WhatsApp.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tarjeta Blog Oficial */}
            <a
              href="https://tupodervirtual.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 hover:border-amber-400 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-amber-950/30"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-amber-500/30 text-amber-400 bg-amber-500/10">
                    Blog Oficial
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors shrink-0" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  Tu Poder Virtual (Blogspot)
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Blog oficial con guías técnicas, artículos de informática, descargas de software y recomendaciones.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Visitar blog oficial</span>
                <span>→</span>
              </div>
            </a>

            {/* Tarjeta Telegram Personal */}
            <a
              href="https://t.me/enyoecd"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/40 hover:border-cyan-400 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/30"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
                    Mensajería Segura
                  </span>
                  <Send className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Telegram (@enyoecd)
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Contacto directo en Telegram para soporte inmediato, consultas de proyectos y asistencia rápida.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Escribir por Telegram</span>
                <span>→</span>
              </div>
            </a>

            {/* Tarjeta WhatsApp */}
            <a
              href="https://wa.me/56987676879"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-950/30"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                    WhatsApp Directo
                  </span>
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  WhatsApp (+56 9 8767 6879)
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Chat de atención presencial y remota para empresas y particulares en Antofagasta.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Abrir chat de WhatsApp</span>
                <span>→</span>
              </div>
            </a>

            {/* Tarjeta Canal Telegram Software */}
            <a
              href="https://t.me/softwareenyo"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/40 hover:border-blue-400 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-blue-950/30"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-blue-500/30 text-blue-400 bg-blue-500/10">
                    Canal de Descargas
                  </span>
                  <Send className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform shrink-0" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  Canal Telegram Software
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Canal @softwareenyo con enlaces a instaladores, actualizaciones de paquetes y recursos directos.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>Unirse al canal</span>
                <span>→</span>
              </div>
            </a>
          </div>
        </section>

        {/* Sección: Repositorios de Software del Blog (EN LISTA VERTICAL, uno debajo de otro) */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FolderDown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Software y Repositorios en la Nube (Tu Poder Virtual)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Enlaces directos a los directorios de software, suites, imágenes ISO y APKs alojados en Drive, Mega, OneDrive y Telegram.
              </p>
            </div>
          </div>

          {/* LISTA VERTICAL: una debajo de la otra */}
          <div className="flex flex-col gap-2.5">
            {BLOG_SOFTWARE_LIST.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/60 hover:bg-slate-900 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-md hover:shadow-cyan-950/20"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:text-cyan-300 transition-all shrink-0 mt-0.5 sm:mt-0">
                    <Cloud className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-sm sm:text-base text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {item.name}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${item.color}`}>
                        {item.provider}
                      </span>
                      <span className="hidden md:inline text-[10px] font-mono text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 sm:mt-0.5 truncate max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 shrink-0 self-end sm:self-center group-hover:translate-x-1 transition-transform">
                  <span className="hidden sm:inline">Abrir enlace</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Sección: Web Favoritas del Blog (EN FORMATO TARJETITAS) */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Sitios Web Favoritos
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Selección de páginas y recursos web recomendados del blog para utilidades, noticias, software y entretenimiento.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FAVORITE_WEBSITES.map((tool, idx) => (
              <a
                key={idx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:shadow-amber-950/20"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${tool.badgeColor}`}>
                      {tool.tag}
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0" />
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-amber-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Abrir sitio</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Sección: Páginas y Utilidades Web Online (Existentes) */}
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

        {/* Sección: Software de Descarga Esencial (Existentes) */}
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

        {/* Sección: Canal de YouTube & Multimedia */}
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
                Canal oficial Tu Poder Virtual, tutoriales técnicos y guías de servicio.
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
                  <span>Ver en YouTube</span>
                  <span>▶</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Sección: Mi Música en Plataformas */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Mi Música en Plataformas
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Playlists, selecciones musicales y colecciones de audio disponibles en Spotify, Deezer, SoundCloud y almacenamiento en nube.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MUSIC_PLATFORMS.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:shadow-purple-950/20"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${item.badgeColor}`}>
                      {item.platform}
                    </span>
                    <Music className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-purple-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Escuchar música</span>
                  <span>♫</span>
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
