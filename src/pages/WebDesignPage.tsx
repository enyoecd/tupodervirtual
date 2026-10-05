import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  Monitor,
  Smartphone,
  Server,
  Lock,
  RefreshCw,
  Check,
  Send,
  MessageSquare,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Utensils,
  Building2,
  Layers,
  Zap,
  Globe,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WebDesignPage: React.FC = () => {
  const { language, navigateTo, triggerSpill } = useApp();
  const isEs = language === 'ES';

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    tipoProyecto: 'qr',
    mensaje: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.telefono) return;

    setIsSubmitting(true);
    triggerSpill(window.innerHeight / 2, true);

    const generatedTicket = `TPV-WEB-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedTicket);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        nombre: '',
        telefono: '',
        tipoProyecto: 'qr',
        mensaje: '',
      });
      setTimeout(() => setShowSuccess(false), 8000);
    }, 1000);
  };

  const scrollToForm = (projectType?: string) => {
    if (projectType) {
      setFormData(prev => ({ ...prev, tipoProyecto: projectType }));
    }
    const el = document.getElementById('formulario-cotizacion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-[#0B0F17] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Glow Ambient Lights */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-pink-500/10 dark:bg-pink-500/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-amber-500/10 dark:bg-sky-500/15 blur-3xl pointer-events-none" />

      {/* TOP COMMAND HERO SECTION */}
      <section className="relative w-full pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200 dark:border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{isEs ? 'Inicio' : 'Home'}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => navigateTo('home', 'servicios')}
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors cursor-pointer"
            >
              {isEs ? 'Servicios' : 'Services'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-pink-600 dark:text-pink-400 font-semibold">
              {isEs ? 'Diseño y Desarrollo Web' : 'Web Design & Development'}
            </span>
          </nav>

          {/* Badge System */}
          <div className="flex items-center flex-wrap gap-2.5 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800/80 text-pink-700 dark:text-pink-300 text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              {isEs ? 'Desarrollo a Medida // Software & Presencia Digital' : 'Custom Web Development // Software & Digital Presence'}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              STACK V4.9 FAST-EDGE
            </div>
          </div>

          {/* Main Headline */}
          <div className="max-w-4xl space-y-4 mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              {isEs ? (
                <>
                  Diseño Web Profesional,{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 dark:from-pink-500 dark:to-amber-400">
                    Rápido
                  </span>{' '}
                  y Optimizado para Impulsar tu Negocio
                </>
              ) : (
                <>
                  Professional Web Design,{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 dark:from-pink-500 dark:to-amber-400">
                    Fast
                  </span>{' '}
                  and Optimized to Boost Your Business
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {isEs
                ? 'Creamos soluciones digitales con arquitectura moderna, carga instantánea y diseño responsive a medida en Antofagasta y todo Chile. Desde sitios informativos hasta menús QR interactivos y plataformas corporativas.'
                : 'We build digital solutions with modern architecture, instant loading, and tailored responsive design in Antofagasta and throughout Chile. From corporate showcases to interactive QR menus and business platforms.'}
            </p>
          </div>

          {/* Value Metric Badges (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3.5 p-4 bg-slate-50 dark:bg-[#0F172A] rounded-2xl border border-slate-200/80 dark:border-[#1E293B] shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 dark:text-white text-sm">100% Responsive</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{isEs ? 'Móviles, Tablets, Desktop' : 'Mobiles, Tablets, Desktop'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 bg-slate-50 dark:bg-[#0F172A] rounded-2xl border border-slate-200/80 dark:border-[#1E293B] shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 dark:text-white text-sm">{isEs ? 'Dominio + Hosting SSD' : 'Domain + SSD Hosting'}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{isEs ? 'Alta velocidad incluida' : 'High speed included'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 bg-slate-50 dark:bg-[#0F172A] rounded-2xl border border-slate-200/80 dark:border-[#1E293B] shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 dark:text-white text-sm">{isEs ? 'Certificado SSL' : 'SSL Certificate'}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{isEs ? 'Cifrado TLS Gratuito' : 'Free TLS Encryption'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 bg-slate-50 dark:bg-[#0F172A] rounded-2xl border border-slate-200/80 dark:border-[#1E293B] shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 dark:text-white text-sm">{isEs ? 'Revisiones Continuas' : 'Continuous Reviews'}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{isEs ? 'Hasta tu total aprobación' : 'Until total approval'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN SERVICES: ALTERNATING SPLIT SCREEN PANELS */}
      <section className="py-20 bg-slate-50/70 dark:bg-[#070B12]/80 border-b border-slate-200 dark:border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24">
          {/* FILA 1: Páginas Web Informativas (Texto Izquierda, Imagen Derecha) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-200 dark:border-pink-800">
                {isEs ? 'PRESENCIA DIGITAL DE ALTO IMPACTO' : 'HIGH-IMPACT DIGITAL PRESENCE'}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {isEs ? 'Páginas Web Informativas y Portafolios Profesionales' : 'Informative Websites & Professional Portfolios'}
              </h2>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? 'Transmite el valor real de tus servicios con una presencia web moderna, limpia y ultra rápida. Diseñadas para proyectar máxima solidez y convertir visitantes en cotizaciones y clientes directos.'
                  : 'Communicate the true value of your services with a modern, clean, and ultra-fast web presence. Designed to build solid trust and convert visitors into active inquiries and clients.'}
              </p>

              <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-pink-100 dark:bg-pink-950/70 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {isEs ? 'Diseño 100% Personalizado:' : '100% Custom Design:'}
                    </strong>{' '}
                    {isEs
                      ? 'Catálogo interactivo de servicios, biografía comercial y vitrina de proyectos profesionales.'
                      : 'Interactive services catalog, company bio, and professional project showcase.'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-pink-100 dark:bg-pink-950/70 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {isEs ? 'Velocidad Instantánea:' : 'Instant Speed:'}
                    </strong>{' '}
                    {isEs
                      ? 'Carga optimizada en servidores SSD NVMe con rendimiento superior en dispositivos móviles.'
                      : 'Optimized loading on SSD NVMe servers with blazing performance on mobile devices.'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-pink-100 dark:bg-pink-950/70 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {isEs ? 'Contacto Inmediato:' : 'Direct Contact:'}
                    </strong>{' '}
                    {isEs
                      ? 'Botón directo a WhatsApp, formulario enlazado y llamada con un solo toque.'
                      : 'Direct WhatsApp integration, connected inquiry form, and one-tap calling.'}
                  </span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => scrollToForm('informativa')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-pink-600/25 hover:scale-105 cursor-pointer"
                >
                  <span>{isEs ? 'Cotizar Sitio Informativo' : 'Quote Informative Site'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Imagen Fila 1 */}
            <div className="lg:col-span-6 w-full">
              <div className="relative p-2.5 sm:p-4 rounded-3xl bg-gradient-to-t from-slate-200/80 dark:from-[#1E293B]/80 to-slate-100 dark:to-[#0F172A] border border-slate-200 dark:border-[#1E293B] shadow-xl group">
                <div className="relative h-72 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    alt="Portafolio y diseño web informativo multidispositivo"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1WJVdW9kqFTb2VI5W2evWoaW1GW6m_mS5dEzO7AFf6E5AruaimoHkznE0YfPa-BnS7sQNTGoYlOMJw6JydvgrPPzmGCQlHC7KaR4CkxlxJtQoWSflXqUfKeT5l4uefB3VOEMrvCB9ZMue0a1XP_CJSQm26rmdMrSVBfzdLesKrz79Ns9J8qsiIorZpzGxaShCDvPcPT92ZNT4YcyyfBmMyFVu3bgh8nFH7ed15OuXzwSW0A_Fm02vXESUE"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-white text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                      <span className="font-mono font-semibold">PORTFOLIO // RESPONSIVE SUITE</span>
                    </div>
                    <span className="font-mono text-pink-400">Multi-Device Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FILA 2: Menús QR para Gastronomía (Imagen Izquierda, Texto Derecha) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Imagen Fila 2 (Izquierda en desktop) */}
            <div className="lg:col-span-6 w-full order-2 lg:order-1">
              <div className="relative p-2.5 sm:p-4 rounded-3xl bg-gradient-to-t from-amber-500/20 dark:from-amber-500/10 to-slate-100 dark:to-[#0F172A] border border-amber-200 dark:border-amber-900/40 shadow-xl group">
                <div className="relative h-72 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    alt="Menú digital interactivo QR para restaurantes"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1WWLDBJdkfk7_J8jRjaO3ILWthE2dJFbwz1KnecRfTaqLqrQzaN675q8xVJvNrVkAMvWK4kX3HFaysl7bELQaPiBivXomJxsK_YIAAY17m0zM2LNQY5S9ftXbjwKcvQ16OtlJZtOeyZ6AfnY3AcUoqtm-VzScIWQ2AcMnC1iM6mPz-cv-dBGF87WFCArMf9daqvwNiae_gR7xnrxKQl-lw3B8mNaco0GyaGR4i28U7c1vJSonvSqNuCWgw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-white text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className="font-mono font-semibold">QR GOURMET // DINE-IN & TAKE-AWAY</span>
                    </div>
                    <span className="font-mono text-amber-400">Zero App Download</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Texto Fila 2 (Derecha en desktop) */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-200 dark:border-amber-800">
                {isEs ? 'PLAN DISEÑO WEB RESTAURANTES & GASTRONOMÍA' : 'RESTAURANTS & GASTRONOMY WEB DESIGN PLAN'}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {isEs ? 'Menús Digitales Interactivos y Cartas con Código QR' : 'Interactive QR Digital Menus & Food Catalogs'}
              </h2>
              <p className="text-sm font-semibold font-mono text-amber-600 dark:text-amber-400">
                {isEs ? 'Google Maps, SEO Local, Atracción de Clientes y Fidelización' : 'Google Maps, Local SEO, Customer Acquisition & Loyalty'}
              </p>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? 'Transforma la experiencia gastronómica de tus comensales con cartas visuales de alta definición, menús interactivos, reservas online y acceso inmediato desde cualquier teléfono sin descargas obligatorias.'
                  : 'Transform your guests dining experience with high-definition digital menus, online reservations, and instant smartphone access with no app download required.'}
              </p>

              <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Utensils className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {isEs ? 'Carta Digital Interactiva:' : 'Interactive Digital Menu:'}
                    </strong>{' '}
                    {isEs
                      ? 'Menús visuales con fotos en alta definición, descripción de ingredientes, calorías, maridajes y recomendaciones del chef.'
                      : 'Visual menus with high-def photos, ingredients, allergens, pairings, and chef recommendations.'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {isEs ? 'Edición en Tiempo Real:' : 'Real-Time Updates:'}
                    </strong>{' '}
                    {isEs
                      ? 'Modifica platos agotados, valores o promociones del día al instante sin reimprimir papel.'
                      : 'Update sold-out items, pricing, or daily promos instantly without reprinting paper.'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Smartphone className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {isEs ? 'Reservas Online, Take Away y Pedidos WhatsApp:' : 'Online Reservations, Take Away & WhatsApp Orders:'}
                    </strong>{' '}
                    {isEs
                      ? 'Calendario de reservas, pedidos para retiro en local y derivación directa al WhatsApp de cocina o barra.'
                      : 'Table reservations calendar, take away management, and direct kitchen WhatsApp orders.'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {isEs ? 'SEO Local, Google Maps y Fidelización:' : 'Local SEO, Google Maps & Loyalty:'}
                    </strong>{' '}
                    {isEs
                      ? 'Optimización geolocalizada para que turistas y clientes locales encuentren tu local primero en Google Maps.'
                      : 'Geolocated optimization so tourists and local customers find your venue first on Google Maps.'}
                  </span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => scrollToForm('qr')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-600/25 hover:scale-105 cursor-pointer"
                >
                  <span>{isEs ? 'Solicitar Menú QR para Restaurant' : 'Request QR Menu for Restaurant'}</span>
                  <Utensils className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* FILA 3: Páginas Web Corporativas (Texto Izquierda, Imagen Derecha) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-800">
                {isEs ? 'EMPRESAS, MINERÍA & SERVICIOS INDUSTRIALES' : 'ENTERPRISE, MINING & INDUSTRIAL SERVICES'}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {isEs ? 'Páginas Web Corporativas y Empresariales' : 'Corporate & Enterprise Websites'}
              </h2>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? 'Arquitectura digital robusta orientada a contratistas mineros, consultorías y empresas de la zona norte que necesitan proyectar solvencia corporativa, rigurosidad técnica y captar contratos de gran envergadura.'
                  : 'Robust digital architecture engineered for mining contractors, consultancies, and enterprises in northern Chile that need to demonstrate corporate solvency, technical rigor, and secure major bids.'}
              </p>

              <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {isEs ? 'Ciberseguridad y Datos Cifrados:' : 'Cybersecurity & Encrypted Forms:'}
                    </strong>{' '}
                    {isEs
                      ? 'Formularios seguros de licitaciones, blindaje contra spam y cumplimiento de estándares corporativos.'
                      : 'Secure tender submission forms, anti-spam shielding, and corporate compliance.'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {isEs ? 'SEO Local Georreferenciado:' : 'Georeferenced Local SEO:'}
                    </strong>{' '}
                    {isEs
                      ? 'Posicionamiento natural para liderar búsquedas orgánicas en Antofagasta, Calama y todo Chile.'
                      : 'Organic positioning to dominate search queries in Antofagasta, Calama, and throughout Chile.'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {isEs ? 'Integraciones Empresariales:' : 'Enterprise Integraciones:'}
                    </strong>{' '}
                    {isEs
                      ? 'Enlace con Webpay Plus, pasarelas bancarias seguras, plataformas CRM y correos corporativos.'
                      : 'Seamless links with Webpay Plus, payment gateways, CRMs, and custom corporate email suites.'}
                  </span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => scrollToForm('corporativa')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/25 hover:scale-105 cursor-pointer"
                >
                  <span>{isEs ? 'Cotizar Web Corporativa' : 'Quote Corporate Website'}</span>
                  <Building2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Imagen Fila 3 */}
            <div className="lg:col-span-6 w-full">
              <div className="relative p-2.5 sm:p-4 rounded-3xl bg-gradient-to-t from-blue-500/20 dark:from-blue-500/10 to-slate-100 dark:to-[#0F172A] border border-blue-200 dark:border-blue-900/40 shadow-xl group">
                <div className="relative h-72 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    alt="Plataforma web empresarial en monitor de oficina ejecutiva"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1WXLzr6zW-kiJ7wfSPp7s9DeFi0RBdXKzreYP1qPyAUjwsDwm59-TxQSSel3ifc0C2CKEY0uiUsDj9uHxXlruKW8CoORUL0v6Qj8aTUciCdhOGo_EYC3-4HO17NJgzPRE7cJJUgWkSzxHM0eHfzdK20eWnQzOrAloHxkhgP8olgwkMxQej5tX22umSy06zSQ-kEvy2sW5sY0fIcv5byws5qwsPX9Vqrk-hwMGQS9b7bK57YZrySUo9pLQ"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-white text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                      <span className="font-mono font-semibold">ENTERPRISE // B2B READY</span>
                    </div>
                    <span className="font-mono text-sky-400">TLS 1.3 / ISO-SEC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL STANDARDS / VALUE ADDED GRID */}
      <section className="py-20 bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest">
                {isEs ? 'ESTÁNDAR DE INGENIERÍA' : 'ENGINEERING STANDARD'}
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                {isEs ? 'Todo Incluido en Cada Desarrollo' : 'All-Inclusive in Every Build'}
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-md">
              {isEs
                ? 'Sin costos ocultos ni configuraciones pendientes. Entregamos plataformas llaves en mano totalmente operativas desde el día uno.'
                : 'No hidden costs or pending configurations. We deliver turnkey digital platforms ready to operate from day one.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-6 bg-slate-50 dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-[#1E293B] hover:border-pink-500/50 transition-all hover:shadow-lg flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Monitor className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">100% Responsive</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Adaptabilidad milimétrica en smartphones, notebooks, tablets y monitores ultra-wide sin quiebre de componentes.'
                    : 'Pixel-perfect adaptability on smartphones, laptops, tablets, and ultrawide screens.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-[#1E293B] font-mono text-[11px] text-pink-600 dark:text-pink-400 font-semibold">
                TESTED: iOS & Android
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-slate-50 dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-[#1E293B] hover:border-blue-500/50 transition-all hover:shadow-lg flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">{isEs ? 'Dominio & Hosting SSD' : 'Domain & SSD Hosting'}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Gestión completa del dominio .cl o .com con servidores NVMe de alta velocidad, DNS gestionadas y 99.9% de uptime garantizado.'
                    : 'Complete management of your .cl or .com domain with high-speed NVMe servers, managed DNS, and 99.9% uptime.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-[#1E293B] font-mono text-[11px] text-blue-600 dark:text-sky-400 font-semibold">
                NVME SSD SERVERS
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-slate-50 dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-[#1E293B] hover:border-emerald-500/50 transition-all hover:shadow-lg flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">{isEs ? 'Seguridad SSL & HTTPS' : 'SSL & HTTPS Security'}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Instalación de cifrado TLS para proteger datos, generar absoluta credibilidad comercial y evitar penalizaciones de Google.'
                    : 'TLS encryption install to guard data, generate immediate commercial trust, and avoid Google penalties.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-[#1E293B] font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                CERT-SSL TLS 1.3
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-slate-50 dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-[#1E293B] hover:border-amber-500/50 transition-all hover:shadow-lg flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">{isEs ? 'Revisiones & Soporte' : 'Reviews & Support'}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Ajustes hasta tu aprobación final, copias de seguridad de respaldo y planes continuos de mantención y actualización.'
                    : 'Iterative adjustments until your approval, backups, and ongoing support and update plans.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-[#1E293B] font-mono text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                ANTOFAGASTA LOCAL SUPPORT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE QUOTATION / DIRECT CONTACT FORM SECTION */}
      <section className="py-20 bg-slate-50/70 dark:bg-[#070B12]/80" id="formulario-cotizacion">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 rounded-md bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-mono font-bold uppercase tracking-wider mb-3 border border-pink-200 dark:border-pink-800">
              {isEs ? 'DESPACHO DE PROYECTO INMEDIATO' : 'INSTANT PROJECT DISPATCH'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {isEs ? 'Cuéntanos tu Proyecto y Recibe una Propuesta en Menos de 24 Horas' : 'Tell Us About Your Project & Receive a Proposal Under 24h'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              {isEs
                ? 'Sin compromisos. Evaluamos tus requerimientos técnicos y te asesoramos con la arquitectura adecuada para tu negocio.'
                : 'No commitments. We evaluate your technical requirements and advise you on the best architecture for your business.'}
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white dark:bg-[#0F172A] p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-[#1E293B] shadow-2xl relative overflow-hidden">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input 1: Nombre */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300" htmlFor="cliente-nombre">
                  {isEs ? 'Nombre o Razón Social *' : 'Name or Company *'}
                </label>
                <input
                  id="cliente-nombre"
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder={isEs ? 'Ej: Minera del Norte SpA o María Silva' : 'e.g. Acme Mining Corp or John Doe'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-colors"
                />
              </div>

              {/* Input 2: Teléfono */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300" htmlFor="cliente-telefono">
                  {isEs ? 'Teléfono / WhatsApp de Contacto *' : 'Phone / WhatsApp Contact *'}
                </label>
                <input
                  id="cliente-telefono"
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="+56 9 8767 6879"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-colors"
                />
              </div>

              {/* Select 3: Tipo de Proyecto */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300" htmlFor="tipo-proyecto">
                  {isEs ? 'Tipo de Proyecto Web *' : 'Type of Web Project *'}
                </label>
                <select
                  id="tipo-proyecto"
                  required
                  value={formData.tipoProyecto}
                  onChange={e => setFormData({ ...formData, tipoProyecto: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-colors cursor-pointer"
                >
                  <option value="qr">{isEs ? 'Menú Digital QR para Restaurante o Gastronomía' : 'Digital QR Menu for Restaurant / Gastronomy'}</option>
                  <option value="informativa">{isEs ? 'Página Web Informativa / Catálogo / Portafolio' : 'Informative Website / Catalog / Portfolio'}</option>
                  <option value="corporativa">{isEs ? 'Sitio Web Corporativo / Empresa Minera / Pyme' : 'Corporate Website / Mining Supplier / SME'}</option>
                  <option value="otro">{isEs ? 'Desarrollo a Medida / Integración de Sistemas' : 'Custom Development / System Integration'}</option>
                </select>
              </div>

              {/* Textarea 4: Mensaje */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300" htmlFor="cliente-mensaje">
                  {isEs ? 'Breve descripción de lo que necesitas' : 'Brief description of your requirements'}
                </label>
                <textarea
                  id="cliente-mensaje"
                  rows={3}
                  value={formData.mensaje}
                  onChange={e => setFormData({ ...formData, mensaje: e.target.value })}
                  placeholder={
                    isEs
                      ? 'Indícanos si tienes logotipo, cantidad estimada de platos o secciones, y fecha estimada en que te gustaría lanzar tu sitio...'
                      : 'Let us know if you have a logo, estimated sections or dishes, and target launch timeframe...'
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-colors resize-none"
                />
              </div>

              {/* Submission Feedback */}
              {showSuccess && (
                <div className="md:col-span-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-3 animate-fade-in text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="font-bold">
                      {isEs ? `¡Solicitud ${ticketId} registrada con éxito!` : `Request ${ticketId} registered successfully!`}
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                      {isEs
                        ? 'Nos comunicaremos directamente a tu WhatsApp en breve para coordinar tu propuesta.'
                        : 'We will reach out to your WhatsApp shortly with your customized proposal.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-pink-600/30 hover:scale-105 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? (isEs ? 'Enviando Solicitud...' : 'Sending Request...')
                      : (isEs ? 'Enviar Solicitud y Cotizar Proyecto' : 'Send Request & Get Quote')}
                  </span>
                </button>

                <a
                  href={`https://wa.me/56987676879?text=${encodeURIComponent(
                    isEs
                      ? 'Hola Tu Poder Virtual, quisiera cotizar un servicio de desarrollo web para mi negocio.'
                      : 'Hello Tu Poder Virtual, I would like to get a quote for web development services.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/25 hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Directo (+56 9 8767 6879)</span>
                </a>
              </div>
            </form>

            {/* Location & Trust Footer */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0" />
                <span>
                  {isEs ? 'Taller Técnico & Operaciones: ' : 'Technical Lab & Operations: '}
                  <strong className="text-slate-700 dark:text-slate-300">Ecuador 1438, Antofagasta, Chile</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isEs ? 'RESPUESTA MEDIA: < 2 HORAS' : 'AVG RESPONSE: < 2 HOURS'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
