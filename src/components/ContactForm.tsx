import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Send, ShieldCheck, CheckCircle2, X, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export const ContactForm: React.FC = () => {
  const { language, triggerSpill } = useApp();
  const t = translations[language].contact;
  const isEs = language === 'ES';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'reparacion-pc',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    // Requirement 3: Trigger dense rapid cascade along entire right side
    const btn = document.getElementById('submit-quote-btn');
    const startY = btn ? btn.getBoundingClientRect().top : window.innerHeight / 2;
    triggerSpill(startY, true);

    // Generate random encrypted ticket code
    const generatedTicket = `TPV-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedTicket);

    // Simulate processing data with the matrix cascade for 1.2s before displaying confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      setFormData({
        name: '',
        phone: '',
        service: 'reparacion-pc',
        message: '',
      });
    }, 1200);
  };

  return (
    <section
      className="py-20 bg-slate-50 dark:bg-[#0F172A] border-t border-slate-200 dark:border-[#1E293B] transition-colors duration-300"
      id="contacto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#0B0F17] rounded-2xl p-6 border border-slate-200/80 dark:border-[#1E293B] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.phoneTitle}
                </h4>
                <a
                  href="tel:+56987676879"
                  className="text-pink-600 dark:text-pink-400 font-semibold text-sm mt-0.5 hover:underline block"
                >
                  +56 9 8767 6879
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t.phoneHours}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0B0F17] rounded-2xl p-6 border border-slate-200/80 dark:border-[#1E293B] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.waTitle}
                </h4>
                <a
                  href="https://wa.me/56987676879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm mt-0.5 hover:underline block"
                >
                  +56 9 8767 6879
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t.waSub}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0B0F17] rounded-2xl p-6 border border-slate-200/80 dark:border-[#1E293B] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.workshopTitle}
                </h4>
                <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm mt-0.5">
                  Ecuador 1438, Antofagasta, Chile
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t.workshopSub}
                </p>
              </div>
            </div>

            {/* Coverage Tags */}
            <div className="bg-white dark:bg-[#0B0F17] rounded-2xl p-6 border border-slate-200/80 dark:border-[#1E293B] shadow-sm">
              <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                {t.coverageTitle}
              </h5>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
                  Antofagasta Presencial
                </span>
                <span className="text-xs bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
                  Sector Centro y Norte
                </span>
                <span className="text-xs bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
                  Sector Sur
                </span>
                <span className="text-xs bg-pink-50 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 font-semibold px-3 py-1 rounded-full border border-pink-200 dark:border-pink-800">
                  Soporte Remoto a Todo Chile
                </span>
                <span className="text-xs bg-slate-900 dark:bg-blue-900/60 text-white font-semibold px-3 py-1 rounded-full">
                  Soporte Remoto Internacional
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0B0F17] rounded-3xl p-8 border border-slate-200 dark:border-[#1E293B] shadow-sm relative">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              {t.formTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4" data-purpose="quote-form">
              <div>
                <label
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1"
                  htmlFor="name"
                >
                  {t.nameLabel}
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F172A] text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-slate-900 dark:text-white p-3"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.namePlaceholder}
                  required
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1"
                    htmlFor="phone"
                  >
                    {t.phoneLabel}
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F172A] text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-slate-900 dark:text-white p-3"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.phonePlaceholder}
                    required
                    type="tel"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1"
                    htmlFor="service-type"
                  >
                    {t.serviceLabel}
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F172A] text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-slate-900 dark:text-white p-3"
                    id="service-type"
                    name="service"
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                  >
                    <optgroup label={isEs ? 'Soporte Técnico' : 'Technical Support'}>
                      <option value="reparacion-pc">
                        {isEs
                          ? 'Reparación y mantenimiento de computadores (PC/Notebooks)'
                          : 'Computer Repair & Maintenance (PC/Laptops)'}
                      </option>
                      <option value="formateo-windows">
                        {isEs ? 'Formateo e instalación de Windows' : 'Windows Formatting & Installation'}
                      </option>
                      <option value="instalacion-software">
                        {isEs ? 'Instalación y configuración de software' : 'Software Installation & Config'}
                      </option>
                      <option value="antivirus">
                        {isEs ? 'Eliminación de virus y malware' : 'Virus & Malware Removal'}
                      </option>
                      <option value="optimizacion">
                        {isEs ? 'Optimización de computadores' : 'System Speed Optimization'}
                      </option>
                      <option value="recuperacion-datos">
                        {isEs ? 'Recuperación de datos' : 'Data Recovery'}
                      </option>
                      <option value="soporte-remoto">
                        {isEs ? 'Asistencia y soporte técnico remoto' : 'Remote IT Tech Support'}
                      </option>
                      <option value="presencial-antofagasta">
                        {isEs
                          ? 'Atención presencial en Antofagasta (Ecuador 1438)'
                          : 'On-site Workshop (Ecuador 1438, Antofagasta)'}
                      </option>
                    </optgroup>
                    <optgroup label={isEs ? 'Desarrollo y Soluciones Web' : 'Web Development & Solutions'}>
                      <option value="pagina-web">
                        {isEs ? 'Creación de páginas web para empresas' : 'Corporate Website Creation'}
                      </option>
                      <option value="sitio-profesional">
                        {isEs ? 'Diseño de sitios web profesionales' : 'Professional Web Design'}
                      </option>
                      <option value="menu-digital">
                        {isEs ? 'Creación de menús digitales QR para restaurantes' : 'QR Digital Menu for Restaurants'}
                      </option>
                      <option value="solucion-web-pyme">
                        {isEs ? 'Solución web personalizada para PyMEs' : 'Custom Web Solution for SMEs'}
                      </option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1"
                  htmlFor="message"
                >
                  {t.detailsLabel}
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F172A] text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-slate-900 dark:text-white p-3"
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.detailsPlaceholder}
                ></textarea>
              </div>

              {/* Submit button with Matrix cascade trigger */}
              <button
                id="submit-quote-btn"
                data-is-submit="true"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-sm shadow-md shadow-pink-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span className="font-mono text-emerald-300">
                      [TRANSMITIENDO ENLACE CIFRADO MATRIX...]
                    </span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.submitBtn}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>{t.privacyText}</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal after Matrix Data Processing Cascade */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0F172A] border-2 border-emerald-500/80 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-center space-y-2">
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-500 dark:text-emerald-400">
                PROCESAMIENTO MATRIX COMPLETADO
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {isEs ? '¡Solicitud Recibida con Éxito!' : 'Request Successfully Received!'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? 'Hemos recibido tu requerimiento. Nuestro equipo técnico en Ecuador 1438, Antofagasta se pondrá en contacto a la brevedad.'
                  : 'We have received your inquiry. Our technical team at Ecuador 1438, Antofagasta will contact you shortly.'}
              </p>
            </div>

            <div className="mt-5 p-3.5 rounded-xl bg-slate-100 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Ticket de Telemetría:</span>
                <span className="text-emerald-500 font-bold">{ticketId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sede Presencial:</span>
                <span>Ecuador 1438, Antofagasta</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Respuesta Estimada:</span>
                <span className="text-amber-500">&lt; 30 minutos</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/56987676879"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center transition-colors shadow"
              >
                {isEs ? 'Abrir en WhatsApp' : 'Open in WhatsApp'}
              </a>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="py-3 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs transition-colors"
              >
                {isEs ? 'Cerrar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
