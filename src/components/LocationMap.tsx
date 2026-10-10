import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Car,
  Laptop,
  ExternalLink,
  Star,
  Navigation,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LocationMap: React.FC = () => {
  const { language } = useApp();
  const isEs = language === 'ES';

  // Controles de vista interactivos para Google Maps
  // Zoom 15 es el punto justo pedido: no muy lejos ni muy cerca, se ve mar, cordillera y calles aledañas
  const [zoomLevel, setZoomLevel] = useState<number>(15);
  const [mapType, setMapType] = useState<'m' | 'p' | 'k' | 'h'>('m');
  const [copied, setCopied] = useState<boolean>(false);
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);

  const addressText = 'Ecuador 1438, Antofagasta, Chile';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Ecuador+1438,+Antofagasta,+Chile';
  const wazeUrl = 'https://waze.com/ul?q=Ecuador%201438,%20Antofagasta';

  // URL del iframe embebido de Google Maps con parámetros reales de ubicación y zoom
  const embedUrl = `https://maps.google.com/maps?q=Ecuador+1438,+Antofagasta,+Chile&t=${mapType}&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;

  const handleCopyAddress = () => {
    try {
      navigator.clipboard.writeText(addressText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 13));
  };

  const handleResetZoom = () => {
    setZoomLevel(15);
    setMapType('m');
  };

  return (
    <section
      className="py-20 bg-white dark:bg-[#0B0F17] transition-colors duration-300 relative"
      id="mapa-ubicacion"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-wider text-pink-700 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/60 px-3 py-1 rounded-md border border-pink-200 dark:border-pink-800/80">
            {isEs ? 'Presencial Antofagasta' : 'On-Site Workshop Antofagasta'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
            {isEs ? 'Ubicación y Atención Presencial' : 'Workshop Location & In-Person Care'}
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
            {isEs
              ? 'Visítanos directamente en nuestro taller técnico en el corazón de Antofagasta. Fácil acceso por Av. Argentina y Costanera.'
              : 'Visit us directly at our tech workshop located in the heart of Antofagasta. Convenient access from coastal highway & Av. Argentina.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Columna Izquierda: Información de Atención Presencial */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-sm">
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
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-base text-pink-700 dark:text-pink-400 font-bold">
                    Ecuador 1438, Antofagasta
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    title={isEs ? 'Copiar dirección' : 'Copy address'}
                    className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isEs
                    ? 'Sector Centro-Sur (Entre Av. Argentina y Galleguillos Lorca)'
                    : 'South-Central District (Between Av. Argentina & Galleguillos Lorca)'}
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
                      {isEs ? 'Facilidad de Acceso y Locomoción:' : 'Convenient Access & Transit:'}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {isEs
                        ? 'Fácil estacionamiento en calle Ecuador y rápida conectividad por Av. Argentina y Costanera.'
                        : 'Convenient street parking on Ecuador street and rapid transit connection via Av. Argentina.'}
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
                        ? 'Chequeo de hardware, diagnóstico en banco de pruebas y presupuesto transparente.'
                        : 'Hardware bench diagnostic, test checks, clear estimate with no surprises.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-[#1E293B] flex flex-col sm:flex-row gap-3">
              <a
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm shadow-md transition-all group"
                href={googleMapsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <MapPin className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                {isEs ? 'Abrir en Google Maps' : 'Open in Google Maps'}
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm transition-all"
                href={wazeUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Navigation className="w-4 h-4 text-sky-400" />
                {isEs ? 'Waze' : 'Waze'}
              </a>
            </div>
          </div>

          {/* Columna Derecha: Vista Real de Google Maps con Zoom Equilibrado */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200 dark:border-[#1E293B] overflow-hidden relative shadow-lg flex flex-col min-h-[460px] sm:min-h-[500px]">
            {/* Barra superior de control y visualización de Google Maps */}
            <div className="bg-slate-50/95 dark:bg-[#0F172A]/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-[#1E293B] flex flex-wrap items-center justify-between gap-2 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-pink-600" />
                  <span>Google Maps • Ecuador 1438, Antofagasta</span>
                </div>
              </div>

              {/* Controles de visualización y zoom interactivos */}
              <div className="flex items-center gap-1.5">
                {/* Selector de tipo de mapa */}
                <div className="flex items-center bg-slate-200 dark:bg-slate-800/80 rounded-lg p-0.5 text-[11px] font-semibold">
                  <button
                    onClick={() => setMapType('m')}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      mapType === 'm'
                        ? 'bg-white dark:bg-pink-600 text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={isEs ? 'Mapa estándar con calles' : 'Roadmap'}
                  >
                    {isEs ? 'Calles' : 'Streets'}
                  </button>
                  <button
                    onClick={() => setMapType('p')}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      mapType === 'p'
                        ? 'bg-white dark:bg-pink-600 text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={isEs ? 'Mapa con relieve y cerros' : 'Terrain'}
                  >
                    {isEs ? 'Relieve' : 'Terrain'}
                  </button>
                  <button
                    onClick={() => setMapType('h')}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      mapType === 'h'
                        ? 'bg-white dark:bg-pink-600 text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={isEs ? 'Vista híbrida' : 'Hybrid'}
                  >
                    {isEs ? 'Híbrido' : 'Hybrid'}
                  </button>
                </div>

                {/* Controles de zoom */}
                <div className="flex items-center bg-slate-200 dark:bg-slate-800/80 rounded-lg p-0.5">
                  <button
                    onClick={handleZoomOut}
                    title={isEs ? 'Alejar mapa' : 'Zoom out'}
                    className="p-1 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    title={isEs ? 'Restablecer zoom recomendado (Calles + Mar + Cerros)' : 'Reset ideal zoom'}
                    className="px-1.5 py-0.5 text-[11px] font-bold text-pink-600 dark:text-pink-400 hover:underline"
                  >
                    {zoomLevel === 15 ? 'Ideal' : `z:${zoomLevel}`}
                  </button>
                  <button
                    onClick={handleZoomIn}
                    title={isEs ? 'Acercar mapa' : 'Zoom in'}
                    className="p-1 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <a
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 rounded-md transition-colors"
                  href={googleMapsUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  title={isEs ? 'Abrir en pantalla completa' : 'Open full map'}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Iframe Real de Google Maps con carga nativa */}
            <div className="relative flex-1 w-full h-full min-h-[380px] bg-slate-100 dark:bg-slate-900 overflow-hidden">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-[#0B0F17] z-0">
                  <div className="w-8 h-8 border-3 border-pink-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {isEs ? 'Cargando Google Maps...' : 'Loading Google Maps...'}
                  </p>
                </div>
              )}

              <iframe
                key={`${embedUrl}`}
                src={embedUrl}
                onLoad={() => setIframeLoaded(true)}
                title="Google Maps - Tu Poder Virtual Ecuador 1438 Antofagasta"
                className="w-full h-full min-h-[380px] border-0 relative z-1"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Tarjeta flotante con información clave del taller */}
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs z-10 pointer-events-auto bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200 dark:border-[#1E293B]">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-pink-100 dark:bg-pink-950 flex items-center justify-center text-pink-600 font-black text-xs shrink-0 mt-0.5">
                    TPV
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-black text-slate-900 dark:text-white truncate">
                      Tu Poder Virtual
                    </h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
                      Ecuador 1438, Antofagasta
                    </p>
                    <div className="flex items-center gap-1 mt-0.5 text-[10px] text-amber-500 font-bold">
                      <span>5.0</span>
                      <div className="flex text-amber-400">
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                      </div>
                      <span className="text-slate-400 font-normal">
                        ({isEs ? 'Taller técnico oficial' : 'Official workshop'})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {isEs ? 'Abierto' : 'Open'}
                  </span>
                  <a
                    className="text-pink-600 dark:text-pink-400 font-bold hover:underline inline-flex items-center gap-1"
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {isEs ? 'Ver en Google Maps ↗' : 'Directions ↗'}
                  </a>
                </div>
              </div>
            </div>

            {/* Sub-barra informativa con contexto geográfico */}
            <div className="bg-slate-50 dark:bg-[#0B0F17] px-4 py-2 border-t border-slate-200 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 truncate">
                <span>🌊 Oeste: Costanera / Mar</span>
                <span className="mx-1">•</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">📍 Ecuador 1438</span>
                <span className="mx-1">•</span>
                <span>🏔️ Este: Cordillera / Cerros</span>
              </span>
              <button
                onClick={handleResetZoom}
                className="text-pink-600 dark:text-pink-400 hover:underline shrink-0 font-medium ml-2"
              >
                {isEs ? 'Centrar' : 'Center'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
