import React, { useState, useEffect } from 'react';
import {
  Home,
  ChevronRight,
  Terminal,
  Shield,
  Clock,
  CheckCircle2,
  HardDrive,
  Cpu,
  Zap,
  Lock,
  MapPin,
  Globe,
  Send,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Layers,
  Wrench,
  Check,
  FileCheck,
  RefreshCw,
  Sliders,
  Laptop,
  Network,
  Camera,
  BellRing,
  Server,
  Boxes,
  Monitor,
  Building2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TechnicalSupportPage: React.FC = () => {
  const { language, navigateTo, triggerSpill } = useApp();
  const isEs = language === 'ES';

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    modalidad: 'remoto',
    tipoRequerimiento: 'optimizacion',
    detalle: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Terminal active stream simulation
  const [activeLogIndex, setActiveLogIndex] = useState(6);
  const logLines = [
    { time: '09:41:02', text: 'Invocando agente de análisis Tu Poder Virtual v4.2...', color: 'text-slate-400' },
    { time: '09:41:03', text: '> Iniciando lectura de registro de sistema: Windows 11 Pro 23H2 / 64-bit', color: 'text-sky-400' },
    { time: '09:41:05', text: 'Detección de bloatware: 27 procesos residentes en segundo plano.', color: 'text-slate-200' },
    { time: '09:41:07', text: '> Consumo pasivo de RAM liberable: ~3.8 GB detectados.', color: 'text-pink-400' },
    { time: '09:41:09', text: 'Auditoría de seguridad: 0 rootkits críticos. 3 secuestradores adware en caché navegador.', color: 'text-slate-200' },
    { time: '09:41:12', text: '> Canales de asistencia disponibles: AnyDesk (AES-256) / RustDesk cifrado directo.', color: 'text-amber-400' },
    { time: '09:41:14', text: 'Preparado para optimización remota y limpieza profunda sin pérdida de datos.', color: 'text-emerald-400' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLogIndex(prev => (prev < logLines.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, [logLines.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.telefono) return;

    setIsSubmitting(true);
    triggerSpill(window.innerHeight / 2, true);

    const generatedTicket = `TPV-SOP-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedTicket);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        nombre: '',
        telefono: '',
        modalidad: 'remoto',
        tipoRequerimiento: 'optimizacion',
        detalle: '',
      });
      setTimeout(() => setShowSuccess(false), 8000);
    }, 1000);
  };

  const scrollToContact = (reqType?: string, mod?: string) => {
    if (reqType) {
      setFormData(prev => ({ ...prev, tipoRequerimiento: reqType }));
    }
    if (mod) {
      setFormData(prev => ({ ...prev, modalidad: mod }));
    }
    const el = document.getElementById('contacto-rapido');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-[#0B0F17] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* HERO SECTION WITH BENTO SPLIT */}
      <section className="relative w-full pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200 dark:border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{isEs ? 'Inicio' : 'Home'}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => navigateTo('home', 'servicios')}
              className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
            >
              {isEs ? 'Servicios' : 'Services'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-blue-600 dark:text-sky-400 font-semibold">
              {isEs ? 'Soporte Técnico y Optimización' : 'Technical Support & Optimization'}
            </span>
          </nav>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline, Subtitle, Badges, CTAs */}
            <div className="xl:col-span-7 space-y-6">
              {/* Operational Status Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  {isEs ? 'Laboratorio Activo · Presencial y Remoto' : 'Active Lab · On-Site & Remote'}
                </div>
                <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
                  100% Software & Seguridad Lógica
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                {isEs ? (
                  <>
                    Soporte Técnico de Software,{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 dark:from-sky-400 dark:to-teal-300">
                      Respaldo Seguro
                    </span>{' '}
                    & Tickets TI
                  </>
                ) : (
                  <>
                    Software Technical Support,{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 dark:from-sky-400 dark:to-teal-300">
                      Secure Backup
                    </span>{' '}
                    & Corporate IT
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {isEs
                  ? 'Reparación y mantenimiento de software para PC de escritorio y notebooks, con respaldo seguro de datos y sistemas. Atendemos actividades remotas para problemas en equipos en todo Chile y tickets de atención presencial en Antofagasta para empresas (informática, cableado de redes, tótems, roll out, periféricos y CCTV).'
                  : 'Software repair and maintenance for desktop PCs and laptops, with secure data and system backup. We provide remote assistance for computer issues nationwide and on-site corporate tickets in Antofagasta (IT systems, network cabling, kiosks, roll out, peripherals, and CCTV).'}
              </p>

              {/* 3 Value Commitment Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200/80 dark:border-[#1E293B]">
                  <Clock className="w-5 h-5 text-sky-500 shrink-0" />
                  <div>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">{isEs ? 'Respuesta' : 'Response'}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">15-30 min</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200/80 dark:border-[#1E293B]">
                  <Shield className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">{isEs ? 'Garantía Técnica' : 'Warranty'}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{isEs ? '30 a 90 días' : '30 to 90 days'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200/80 dark:border-[#1E293B]">
                  <FileCheck className="w-5 h-5 text-pink-500 shrink-0" />
                  <div>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">{isEs ? 'Archivos Protegidos' : 'Files Protected'}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{isEs ? '100% Sin Pérdida' : '100% Zero Loss'}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToContact('optimizacion', 'remoto')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 hover:scale-105 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>{isEs ? 'Solicitar Asistencia Remota' : 'Request Remote Support'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToContact('optimizacion', 'antofagasta')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1E293B] dark:hover:bg-[#283852] text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider border border-slate-200 dark:border-slate-700 transition-all hover:scale-105 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-pink-500" />
                  <span>{isEs ? 'Agendar en Antofagasta' : 'Book Lab in Antofagasta'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: High-Tech Telemetry Terminal */}
            <div className="xl:col-span-5 flex flex-col">
              <div className="w-full rounded-2xl bg-[#060A10] border border-slate-700/80 shadow-2xl overflow-hidden relative font-mono text-xs">
                {/* Console Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0E1626] border-b border-slate-700/80">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Lock className="w-3 h-3 text-sky-400" />
                    <span>ops@tpv-lab: ~ /diagnostico</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#060A10] text-[10px] text-sky-400 border border-sky-500/30">
                    SSH-TLS
                  </span>
                </div>

                {/* Telemetry Strip */}
                <div className="grid grid-cols-3 gap-1 p-2.5 bg-[#0A101C] border-b border-slate-800">
                  <div className="p-2 rounded bg-[#060A10] flex flex-col">
                    <span className="text-[10px] text-slate-500">LATENCIA NOC</span>
                    <span className="text-xs font-bold text-sky-400">8.4 ms (CHL)</span>
                  </div>
                  <div className="p-2 rounded bg-[#060A10] flex flex-col">
                    <span className="text-[10px] text-slate-500">ESTADO TÚNEL</span>
                    <span className="text-xs font-bold text-blue-400">ACTIVO / VNC</span>
                  </div>
                  <div className="p-2 rounded bg-[#060A10] flex flex-col">
                    <span className="text-[10px] text-slate-500">INTEGRIDAD SO</span>
                    <span className="text-xs font-bold text-pink-400">99.8% LÓGICA</span>
                  </div>
                </div>

                {/* Streamed Diagnostic Output */}
                <div className="p-4 space-y-2 h-64 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-[11px] leading-relaxed select-none">
                  {logLines.slice(0, activeLogIndex + 1).map((log, idx) => (
                    <p key={idx} className={log.color}>
                      <span className="text-slate-600">[{log.time}]</span> {log.text}
                    </p>
                  ))}
                  <div className="flex items-center gap-1.5 text-sky-400 pt-2">
                    <span className="text-pink-400">ops@tpv-lab:~$</span>
                    <span className="text-slate-200">telemetria --optimizar-rendimiento --sin-perdida</span>
                    <span className="w-2 h-3.5 bg-sky-400 animate-pulse inline-block" />
                  </div>
                </div>

                {/* Terminal Footer */}
                <div className="px-4 py-2 bg-[#0E1626] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-sky-400" /> Terminal Remota TPV
                  </span>
                  <div className="flex items-center gap-1.5 text-pink-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                    <span>MODO SEGURO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOS 3 SERVICIOS PRINCIPALES DE SOFTWARE */}
      <section className="py-20 bg-slate-50/70 dark:bg-[#070B12]/80 border-b border-slate-200 dark:border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">
                {isEs ? 'CATÁLOGO OPERATIVO ESPECIALIZADO' : 'SPECIALIZED OPERATIONAL CATALOG'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                {isEs ? 'Los 3 Servicios Principales de Software' : 'Top 3 Software Services'}
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-md">
              {isEs
                ? 'Intervenciones de máxima precisión orientadas exclusivamente a la arquitectura lógica, integridad de datos y velocidad del sistema.'
                : 'High-precision technical interventions exclusively focused on logical system architecture, data safety, and raw speed.'}
            </p>
          </div>

          {/* 3 Symmetrical Bento Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1: Soporte Técnico y Teleasistencia Remota */}
            <div className="bg-white dark:bg-[#0F172A] rounded-3xl p-8 border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-xl hover:border-sky-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 dark:bg-[#1E293B] text-sky-600 dark:text-sky-300 border border-slate-200 dark:border-slate-700">
                    TELEASISTENCIA EN VIVO
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isEs ? 'Soporte Técnico y Teleasistencia Remota' : 'Technical Support & Remote Teleassistance'}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Atenciones de actividades remotas para problemas con los equipos: resolución ágil de lentitud extrema, errores de software, pantallas azules, desinfección de malware y soporte en tiempo real vía herramientas seguras y cifradas (AnyDesk, TeamViewer, RustDesk).'
                    : 'Remote support for computer issues: swift resolution of extreme lag, software crashes, blue screens, malware disinfection, and live assistance via encrypted tools (AnyDesk, TeamViewer, RustDesk).'}
                </p>

                {/* Capacity Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-400">
                    AnyDesk / RustDesk
                  </span>
                  <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-400">
                    Solución de Lentitud
                  </span>
                  <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-400">
                    Depuración RAM & SO
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-[#1E293B] flex items-center justify-between">
                <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold">
                  {isEs ? 'Modalidad: Remoto' : 'Modality: Remote'}
                </span>
                <button
                  type="button"
                  onClick={() => scrollToContact('soporte-remoto', 'remoto')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-sky-400 hover:text-pink-500 cursor-pointer"
                >
                  <span>{isEs ? 'Solicitar' : 'Request'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Reparación de Software y Respaldo Seguro */}
            <div className="bg-white dark:bg-[#0F172A] rounded-3xl p-8 border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <HardDrive className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 dark:bg-[#1E293B] text-blue-600 dark:text-sky-300 border border-slate-200 dark:border-slate-700">
                    RESPALDO SEGURO
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isEs ? 'Reparación de Software y Respaldo de Sistemas' : 'Software Repair & Secure System Backup'}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Reparación y mantenimiento de software para PC de escritorio y notebooks con respaldo seguro de datos y sistemas. Instalación limpia de Windows 11/10 o Linux con activación oficial, eliminación de troyanos/virus y preservación 100% íntegra de archivos personales.'
                    : 'Software repair and maintenance for desktop PCs and laptops with secure data and system backup. Clean installation of Windows 11/10 or Linux with genuine licensing, malware eradication, and 100% data preservation.'}
                </p>

                {/* Capacity Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-400">
                    Respaldo Seguro
                  </span>
                  <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-400">
                    Windows 11 / Linux
                  </span>
                  <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-400">
                    Desinfección Total
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-[#1E293B] flex items-center justify-between">
                <span className="text-xs font-mono text-blue-600 dark:text-sky-400 font-semibold">
                  {isEs ? 'Modalidad: Laboratorio / Remoto' : 'Modality: Lab / Remote'}
                </span>
                <button
                  type="button"
                  onClick={() => scrollToContact('reparacion-software', 'antofagasta')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-sky-400 hover:text-pink-500 cursor-pointer"
                >
                  <span>{isEs ? 'Solicitar' : 'Request'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Tickets Presenciales para Empresas en Antofagasta */}
            <div className="bg-white dark:bg-[#0F172A] rounded-3xl p-8 border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-xl hover:border-pink-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 dark:bg-[#1E293B] text-pink-600 dark:text-pink-300 border border-slate-200 dark:border-slate-700">
                    COBERTURA EMPRESAS
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isEs ? 'Tickets Presenciales Empresas en Antofagasta' : 'On-Site Corporate Tickets in Antofagasta'}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Atención técnica en terreno para empresas en informática, sistemas, cableado estructurado de redes, soporte a tótems, equipamiento computacional, roll out, mantenimientos preventivos y correctivos, instalación de periféricos, cámaras de seguridad (CCTV) y alarmas.'
                    : 'On-site technical support for companies in IT systems, network cabling, self-service kiosks, computer equipment, roll out, preventive/corrective maintenance, peripherals, security cameras (CCTV), and alarm systems.'}
                </p>

                {/* Capacity Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-400">
                    Redes & Conectividad
                  </span>
                  <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-400">
                    Tótems & Roll Out
                  </span>
                  <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-400">
                    CCTV & Alarmas
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-[#1E293B] flex items-center justify-between">
                <span className="text-xs font-mono text-pink-600 dark:text-pink-400 font-semibold">
                  {isEs ? 'Modalidad: En Terreno Antofagasta' : 'Modality: On-Site Antofagasta'}
                </span>
                <button
                  type="button"
                  onClick={() => scrollToContact('ticket-empresas', 'terreno-empresas')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-sky-400 hover:text-pink-500 cursor-pointer"
                >
                  <span>{isEs ? 'Solicitar' : 'Request'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DETALLADA: TICKETS DE ATENCIÓN PRESENCIAL EN ANTOFAGASTA PARA EMPRESAS */}
      <section className="py-20 bg-slate-50/80 dark:bg-[#070B12] border-b border-slate-200 dark:border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800">
              {isEs ? 'COBERTURA CORPORATIVA & EN TERRENO' : 'CORPORATE & ON-SITE COVERAGE'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-4">
              {isEs
                ? 'Tickets de Atención Presencial en Antofagasta para Empresas'
                : 'On-Site Corporate Tickets in Antofagasta for Businesses'}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {isEs
                ? 'Brindamos soporte técnico in situ para empresas, comercios e industrias de Antofagasta. Atendemos requerimientos críticos de informática, sistemas, infraestructura de red, tótems y seguridad con total garantía y respuesta oportuna.'
                : 'We provide on-site technical support for companies, retail, and industry across Antofagasta. We resolve critical IT, systems, network cabling, kiosk, and electronic security needs with full warranty.'}
            </p>
          </div>

          {/* Grid de 8 Especialidades de Terreno */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Informática y Sistemas */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-lg hover:border-blue-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Server className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E293B] text-blue-600 dark:text-sky-300 border border-slate-200 dark:border-slate-700">
                    SISTEMAS
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {isEs ? 'Informática y Sistemas' : 'IT & Enterprise Systems'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Soporte y diagnóstico in situ para estaciones operativas, entornos de trabajo corporativos, configuración de dominios y continuidad de sistemas.'
                    : 'On-site diagnosis and support for workstations, corporate environments, domain setup, and operational continuity.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-blue-500" />
                <span>Estaciones de trabajo & SO</span>
              </div>
            </div>

            {/* 2. Cableado de Redes y Conectividad */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-lg hover:border-sky-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Network className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E293B] text-sky-600 dark:text-sky-300 border border-slate-200 dark:border-slate-700">
                    CONECTIVIDAD
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {isEs ? 'Cableado de Redes' : 'Structured Cabling'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Tendido y ordenamiento de cableado estructurado (Cat 6/6A), armado de racks, patch panels, switches, routers y antenas Wi-Fi comerciales.'
                    : 'Structured cabling installation (Cat 6/6A), rack dressing, patch panels, switches, routers, and commercial Wi-Fi APs.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-sky-500" />
                <span>Puntos de red & Racks</span>
              </div>
            </div>

            {/* 3. Atención con Tótems */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-lg hover:border-purple-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E293B] text-purple-600 dark:text-purple-300 border border-slate-200 dark:border-slate-700">
                    TÓTEMS
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {isEs ? 'Atención con Tótems' : 'Self-Service Kiosks'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Mantenimiento preventivo, correctivo y configuración de tótems interactivos de autoservicio, terminales de pago y pantallas de turno.'
                    : 'Preventive/corrective maintenance and setup for interactive self-service kiosks, payment portals, and ticketing displays.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-purple-500" />
                <span>Mantenimiento & calibración</span>
              </div>
            </div>

            {/* 4. Equipos Computacionales */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-lg hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E293B] text-emerald-600 dark:text-emerald-300 border border-slate-200 dark:border-slate-700">
                    EQUIPOS
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {isEs ? 'Equipos Computacionales' : 'Computer Equipment'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Puesta a punto, configuración corporativa y soporte de software para computadores de escritorio y notebooks de uso administrativo y técnico.'
                    : 'Tuning, corporate configuration, and software support for desktop PCs and notebooks across administrative and operational teams.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>PCs & Notebooks corporativos</span>
              </div>
            </div>

            {/* 5. Roll Out Tecnológico */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-lg hover:border-pink-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E293B] text-pink-600 dark:text-pink-300 border border-slate-200 dark:border-slate-700">
                    ROLL OUT
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {isEs ? 'Roll Out de Equipos' : 'Equipment Roll Out'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Despliegue masivo y coordinado de nuevos equipos, migración de perfiles, enrolamiento en redes y traspaso seguro de información.'
                    : 'Mass deployment of machines, user profile migration, network domain joining, and secure business data transfer.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-pink-500" />
                <span>Renovación tecnológica</span>
              </div>
            </div>

            {/* 6. Mantenimientos Preventivos y Correctivos */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-lg hover:border-amber-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E293B] text-amber-600 dark:text-amber-300 border border-slate-200 dark:border-slate-700">
                    MANTENCIÓN
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {isEs ? 'Mantenimiento Preventivo & Correctivo' : 'Preventive & Corrective'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Planes de revisión periódica para evitar interrupciones de faena y atención rápida ante fallas críticas o paradas de sistema.'
                    : 'Scheduled maintenance plans to avoid business downtime and fast response to critical incidents.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-500" />
                <span>Planes periódicos y urgencias</span>
              </div>
            </div>

            {/* 7. Instalación de Equipos Nuevos & Periféricos */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-lg hover:border-teal-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E293B] text-teal-600 dark:text-teal-300 border border-slate-200 dark:border-slate-700">
                    PERIFÉRICOS
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {isEs ? 'Instalación de Equipos & Periféricos' : 'New Equipment & Peripherals'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Puesta en marcha de computadores nuevos, impresoras en red, escáneres, lectores de código de barra y periféricos comerciales.'
                    : 'Setup of new computers, network printers, scanners, barcode readers, and retail point-of-sale peripherals.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-teal-500" />
                <span>Impresoras, lectores & escáneres</span>
              </div>
            </div>

            {/* 8. Cámaras de Seguridad (CCTV) & Sistemas de Alarma */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] shadow-sm hover:shadow-lg hover:border-rose-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E293B] text-rose-600 dark:text-rose-300 border border-slate-200 dark:border-slate-700">
                    SEGURIDAD
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {isEs ? 'Cámaras de Seguridad & CCTV' : 'Security Cameras & CCTV'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Instalación y configuración de circuitos cerrados CCTV, grabadores DVR/NVR, visualización remota en teléfonos y sistemas de alarma disuasiva.'
                    : 'Installation and setup of closed-circuit CCTV, DVR/NVR recorders, mobile remote monitoring, and alarm deterrent systems.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-rose-500" />
                <span>DVR/NVR, cableado & alarmas</span>
              </div>
            </div>
          </div>

          {/* Action Callout for Corporate Tickets */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/90 via-slate-900 to-indigo-950 text-white border border-blue-700/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-300 uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>{isEs ? 'Atención a Empresas en Antofagasta' : 'Corporate Service in Antofagasta'}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                {isEs
                  ? '¿Necesitas coordinar un ticket de soporte presencial para tu empresa?'
                  : 'Need to coordinate an on-site corporate support ticket for your business?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                {isEs
                  ? 'Coordinamos visitas técnicas en terreno para evaluación, ejecución de tickets puntuales o convenios de mantenimiento recurrente.'
                  : 'We schedule on-site technical visits for assessments, single ticket resolution, or recurring maintenance service agreements.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => scrollToContact('ticket-empresas', 'terreno-empresas')}
                className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 cursor-pointer"
              >
                {isEs ? 'Abrir Ticket Corporativo' : 'Open Corporate Ticket'}
              </button>
              <a
                href="https://wa.me/56987676879?text=Hola%2C%20necesito%20coordinar%20un%20ticket%20presencial%20para%20mi%20empresa%20en%20Antofagasta"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isEs ? 'WhatsApp Empresas' : 'Business WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCEDIMIENTOS CLAVE DE SOFTWARE */}
      <section className="py-20 bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest">
                {isEs ? 'PROTOCOLO TÉCNICO LÓGICO' : 'LOGICAL TECHNICAL PROTOCOL'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                {isEs ? 'Procedimientos Clave de Software' : 'Key Software Procedures'}
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">PROCESO ESTANDARIZADO</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Proc 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  01. PROCEDIMIENTO
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isEs ? 'Limpieza y Desinfección de Software' : 'Deep Software Cleaning & Disinfection'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Eliminación profunda de archivos temporales acumulados, caché del sistema, corrección de inconsistencias en el registro de Windows y purga de software no deseado o malicioso.'
                    : 'System temporary cache purging, Windows registry correction, and deep uninstallation of resident adware, toolbars, and malware.'}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#1E293B] flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEs ? 'Registro Saneado' : 'Clean Registry'}</span>
              </div>
            </div>

            {/* Proc 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  02. PROCEDIMIENTO
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isEs ? 'Optimización y Aceleración de Arranque' : 'Startup Acceleration & OS Tuning'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Ajuste fino de programas de inicio, calibración de servicios del sistema, reducción sustancial del tiempo de encendido y recuperación inmediata de memoria RAM activa disponible.'
                    : 'Fine-tuning startup processes, calibrating background services, drastically decreasing boot times, and freeing active RAM.'}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#1E293B] flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                <Zap className="w-4 h-4" />
                <span>{isEs ? 'Máxima Fluidez' : 'Peak Fluidity'}</span>
              </div>
            </div>

            {/* Proc 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                  03. PROCEDIMIENTO
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isEs ? 'Instalación y Configuración Limpia' : 'Clean Installation & Setup'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Restablecimiento integral del sistema operativo preservando documentos, instalación de drivers nativos del fabricante y despliegue del entorno de programas base para uso inmediato.'
                    : 'Full OS reinstall preserving user data, official OEM drivers deployment, and setup of foundational work software suites.'}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#1E293B] flex items-center gap-2 text-xs font-mono text-pink-600 dark:text-pink-400 font-semibold">
                <Shield className="w-4 h-4" />
                <span>{isEs ? 'Archivos Seguros' : 'Safe Files'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COBERTURA Y MODALIDADES (ANTOFAGASTA VS TODO CHILE) */}
      <section className="py-20 bg-slate-50/70 dark:bg-[#070B12]/80 border-b border-slate-200 dark:border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
              {isEs ? 'MODALIDADES FLEXIBLES' : 'FLEXIBLE MODALITIES'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              {isEs ? 'Cobertura y Puntos de Atención' : 'Coverage & Service Points'}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              {isEs
                ? 'Elige entre atención directa en nuestro laboratorio técnico o conexión remota segura sin importar en qué punto del país te encuentres.'
                : 'Choose between direct service at our physical lab or encrypted remote teleassistance from anywhere in Chile.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bloque Presencial Antofagasta */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] shadow-xl flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {isEs ? 'Presencial en Antofagasta' : 'On-Site in Antofagasta'}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E293B] text-pink-600 dark:text-pink-300 border border-slate-200 dark:border-slate-700">
                    LABORATORIO
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Atención personalizada en laboratorio para evaluación detallada, formateos integrales con respaldo seguro de información y diagnósticos de software in situ.'
                    : 'Personalized attention at our lab for detailed checks, clean reinstalls with secure mass data backup, and software diagnostics.'}
                </p>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                    <MapPin className="w-4 h-4 text-pink-500" />
                    <span>Calle Ecuador 1438, Antofagasta</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 pl-6">Sector Centro-Norte · Fácil acceso</p>
                  <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 pl-6 pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Lunes a Sábado: 09:30 - 19:30 hrs</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => scrollToContact(undefined, 'antofagasta')}
                  className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1E293B] dark:hover:bg-[#283852] text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  {isEs ? 'Agendar Turno en Laboratorio' : 'Book Lab Appointment'}
                </button>
              </div>
            </div>

            {/* Bloque Soporte Remoto Todo Chile */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] shadow-xl flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {isEs ? 'Soporte Remoto en Todo Chile' : 'Remote Support Across Chile'}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E293B] text-blue-600 dark:text-sky-300 border border-slate-200 dark:border-slate-700">
                    TELEASISTENCIA
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Teleasistencia instantánea cifrada para Santiago, Concepción, Valparaíso, regiones extremas y faenas mineras. Resolución inmediata sin traslados con control encriptado de extremo a extremo.'
                    : 'Instant encrypted teleassistance for Santiago, Concepción, Valparaíso, mining operations, and remote locations. Quick fix with zero travel.'}
                </p>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-900 dark:text-white font-bold">
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-sky-400" />
                      <span>Conexión Inmediata TLS / 256-bit</span>
                    </span>
                    <span className="text-emerald-500">&lt; 15 min</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 pl-6">Compatible con Windows 10, 11 y Linux</p>
                  <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 pl-6 pt-1">
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Supervisión en tu pantalla en todo momento</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => scrollToContact(undefined, 'remoto')}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 hover:scale-105 cursor-pointer"
                >
                  {isEs ? 'Iniciar Sesión Remota Ahora' : 'Start Remote Session Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROTOCOLO EN 4 PASOS */}
      <section className="py-20 bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">
              {isEs ? 'METODOLOGÍA ÁGIL Y TRANSPARENTE' : 'AGILE & TRANSPARENT METHODOLOGY'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              {isEs ? 'Protocolo en 4 Pasos' : '4-Step Protocol'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-sky-500">01</span>
                <span className="text-xs font-mono text-slate-400">PASO</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isEs ? 'Conexión o Recepción' : 'Connection or Check-In'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? 'Coordinación rápida vía WhatsApp, enlace seguro de control remoto temporal o ingreso de equipo físico en el laboratorio de Antofagasta.'
                  : 'Fast coordination on WhatsApp, secure one-time remote link, or device intake at the Antofagasta workshop.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-blue-500">02</span>
                <span className="text-xs font-mono text-slate-400">PASO</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isEs ? 'Diagnóstico Rápido' : 'Rapid Diagnosis'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? 'Auditoría del estado lógico en 15 a 30 minutos: consumo de recursos, amenazas latentes, saturación de disco y fallas de dependencias.'
                  : 'Logical system audit in 15 to 30 min: resource hogging, latent threats, disk fragmentation, and software crashes.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-pink-500">03</span>
                <span className="text-xs font-mono text-slate-400">PASO</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isEs ? 'Solución y Optimización' : 'Resolution & Tuning'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? 'Ejecución quirúrgica de software: desinfección, aceleración de inicio, parches o instalación de sistema sin tocar ni arriesgar tus archivos.'
                  : 'Surgical software execution: disinfection, startup boost, patch installs without touching or risking your data.'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-emerald-500">04</span>
                <span className="text-xs font-mono text-slate-400">PASO</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isEs ? 'Verificación y Garantía' : 'Verification & Warranty'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? 'Comprobación de rendimiento junto a ti en pantalla, cierre seguro de sesión y respaldo con garantía técnica de 30 a 90 días.'
                  : 'Joint performance test on your screen, session termination, and warranty backed for 30 to 90 days.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO RÁPIDO & CONTACTO DIRECTO */}
      <section className="py-20 bg-slate-50/70 dark:bg-[#070B12]/80" id="contacto-rapido">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#0F172A] p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-[#1E293B] shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isEs ? 'ATENCIÓN INMEDIATA' : 'IMMEDIATE ATTENTION'}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {isEs ? 'Inicia tu Soporte Hoy Mismo' : 'Start Your Support Today'}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                    {isEs
                      ? 'Completa el formulario y un especialista técnico se pondrá en contacto contigo vía WhatsApp para iniciar el diagnóstico express o agendar tu ingreso en Antofagasta.'
                      : 'Fill out this brief form and our technical team will contact you directly on WhatsApp to initiate remote diagnosis or book an in-person slot.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white text-sm font-bold">
                    <MessageSquare className="w-4 h-4 text-emerald-500" />
                    <span>WhatsApp de Guardia TI:</span>
                  </div>
                  <a
                    href="https://wa.me/56987676879"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-mono text-base font-bold text-emerald-600 dark:text-emerald-400 hover:underline pl-6"
                  >
                    +56 9 8767 6879
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pl-6 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{isEs ? 'Respuesta típica en menos de 15 minutos' : 'Typical reply in under 15 minutes'}</span>
                  </p>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300">
                        {isEs ? 'Nombre Completo *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder={isEs ? 'Ej: Marcela González' : 'e.g. Michael Scott'}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300">
                        {isEs ? 'WhatsApp de Contacto *' : 'Contact WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.telefono}
                        onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="+56 9 8767 6879"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300">
                        {isEs ? 'Ubicación / Modalidad *' : 'Location / Modality *'}
                      </label>
                      <select
                        value={formData.modalidad}
                        onChange={e => setFormData({ ...formData, modalidad: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors cursor-pointer"
                      >
                        <option value="remoto">{isEs ? 'Soporte Remoto Online (Cualquier ubicación)' : 'Remote Support Online (Any location)'}</option>
                        <option value="antofagasta">{isEs ? 'Presencial en Laboratorio (Ecuador 1438, Antofagasta)' : 'On-Site Lab (Ecuador 1438, Antofagasta)'}</option>
                        <option value="terreno-empresas">{isEs ? 'Ticket en Terreno para Empresas (Antofagasta)' : 'On-Site Corporate Ticket (Antofagasta)'}</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300">
                        {isEs ? 'Tipo de Requerimiento *' : 'Requirement Type *'}
                      </label>
                      <select
                        value={formData.tipoRequerimiento}
                        onChange={e => setFormData({ ...formData, tipoRequerimiento: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors cursor-pointer"
                      >
                        <option value="reparacion-software">{isEs ? 'Reparación de Software y Respaldo Seguro' : 'Software Repair & Secure Backup'}</option>
                        <option value="soporte-remoto">{isEs ? 'Soporte Remoto Inmediato (Problemas en Equipos / Lentitud)' : 'Immediate Remote Support (Computer Lag / Crashes)'}</option>
                        <option value="ticket-empresas">{isEs ? 'Ticket Presencial Empresas: Informática & Sistemas' : 'Corporate Ticket: IT & Systems'}</option>
                        <option value="redes-cableado">{isEs ? 'Cableado Estructurado de Redes & Conectividad' : 'Structured Network Cabling & Connectivity'}</option>
                        <option value="totems-rollout">{isEs ? 'Tótems de Autoservicio, Equipos & Roll Out' : 'Self-Service Kiosks, PCs & Tech Roll Out'}</option>
                        <option value="mantenimiento-empresas">{isEs ? 'Mantenimiento Preventivo / Correctivo Empresarial' : 'Preventive / Corrective Corporate Maintenance'}</option>
                        <option value="perifericos-nuevos">{isEs ? 'Instalación de Equipos Nuevos & Periféricos' : 'New Equipment Setup & Peripherals'}</option>
                        <option value="cctv-alarmas">{isEs ? 'Cámaras de Seguridad, CCTV & Sistemas de Alarma' : 'Security Cameras, CCTV & Alarm Systems'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300">
                      {isEs ? 'Detalle Breve del Problema (Opcional)' : 'Brief Problem Details (Optional)'}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.detalle}
                      onChange={e => setFormData({ ...formData, detalle: e.target.value })}
                      placeholder={
                        isEs
                          ? 'Ej: Mi computador demora mucho en iniciar y aparecen ventanas emergentes extrañas...'
                          : 'e.g. My computer takes very long to boot and weird popups appear...'
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors resize-none"
                    />
                  </div>

                  {showSuccess && (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-3 animate-fade-in text-sm">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <p className="font-bold">
                          {isEs ? `✓ Solicitud ${ticketId} recibida.` : `✓ Request ${ticketId} received.`}
                        </p>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                          {isEs
                            ? 'Un técnico de Tu Poder Virtual te contactará en breves minutos.'
                            : 'A technician will contact you via WhatsApp in a few minutes.'}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isSubmitting
                          ? (isEs ? 'Enviando...' : 'Sending...')
                          : (isEs ? 'Enviar Solicitud' : 'Send Request')}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
