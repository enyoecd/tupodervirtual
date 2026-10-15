import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Mail,
  Send,
  ShieldCheck,
  CheckCircle2,
  X,
  Sparkles,
  Copy,
  Check,
  Construction,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import gmailIcon from '../assets/gmail.png';
import googleMapsIcon from '../assets/mapas-de-google.png';
import telegramLogo from '../assets/telegram.svg';
import { contactService } from '../services/contactService';

export const ContactForm: React.FC = () => {
  const { language, triggerSpill } = useApp();
  const t = translations[language].contact;
  const isEs = language === 'ES';

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'reparacion-software',
    message: '',
  });

  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactMethodError, setContactMethodError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [submittedData, setSubmittedData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  // Modo del formulario: 'activo' (envío funcional a Cloudflare / correo / Telegram)
  // Cambiar el valor inicial a 'construccion' si alguna vez se requiere volver a modo aviso temporal.
  const [formMode] = useState<'construccion' | 'activo'>('activo');

  // Format phone: only numbers allowed, max 15 digits. If '+' is typed anywhere, move it to position 0
  const formatPhoneNumber = (value: string): string => {
    const hasPlus = value.includes('+');
    const digitsOnly = value.replace(/\D/g, '').slice(0, 15);
    return hasPlus ? `+${digitsOnly}` : digitsOnly;
  };

  // Block letters and unwanted symbols on desktop keyboard
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedNavigationKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
    ];
    if (allowedNavigationKeys.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }
    // Allow '+'
    if (e.key === '+') {
      return;
    }
    // Disallow non-numeric keys
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const validateForm = () => {
    let isValid = true;
    setContactMethodError('');
    setPhoneError('');
    setEmailError('');
    setMessageError('');

    // El nombre no es obligatorio.
    // Entre teléfono y correo, uno de los dos debe ser obligatorio.
    const hasPhone = formData.phone.trim().length > 0;
    const hasEmail = formData.email.trim().length > 0;

    if (!hasPhone && !hasEmail) {
      setContactMethodError(
        isEs
          ? 'Debes ingresar al menos un medio de contacto (teléfono o correo).'
          : 'Please provide at least one contact method (phone or email).'
      );
      isValid = false;
    }

    // Teléfono: no requiere longitud mínima (máximo 15 números)
    // Si escribió correo, validar formato estándar
    if (hasEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setEmailError(
          isEs
            ? 'Ingresa un correo electrónico con formato válido (ej. usuario@correo.com).'
            : 'Please enter a valid email address (e.g. user@domain.com).'
        );
        isValid = false;
      }
    }

    // El mensaje sí debe ser obligatorio
    if (!formData.message.trim()) {
      setMessageError(
        isEs
          ? 'Por favor, describe tu requerimiento o mensaje.'
          : 'Please enter your message or service requirement.'
      );
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Activar cascada Matrix al presionar enviar
    const btn = document.getElementById('submit-quote-btn');
    const startY = btn ? btn.getBoundingClientRect().top : window.innerHeight / 2;
    triggerSpill(startY, true);

    // Generar código de ticket cifrado
    const generatedTicket = `TPV-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedTicket);
    setSubmittedData({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    });

    try {
      // Envío de la información a Cloudflare Pages Functions (/api/contact)
      // Envía a enyoecd@gmail.com, envía copia al cliente y alerta a Telegram
      await contactService.submitInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        message: formData.message,
        ticketId: generatedTicket,
      });
    } catch (err) {
      console.warn('Aviso al procesar envío:', err);
    } finally {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'reparacion-software',
        message: '',
      });
      setPhoneError('');
      setEmailError('');
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText('+56 9 8767 6879');
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('enyoecd@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section
      className="py-20 bg-slate-50 dark:bg-[#0F172A] border-t border-slate-200 dark:border-[#1E293B] transition-colors duration-300 scroll-mt-24"
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
            {/* 1. Teléfono y WhatsApp Fused Card */}
            <div className="bg-white dark:bg-[#0B0F17] rounded-2xl p-6 border border-slate-200/80 dark:border-[#1E293B] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/25">
                <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.phoneTitle}
                </h4>
                <div className="flex items-center flex-wrap gap-2 mt-1">
                  <a
                    href="https://wa.me/56987676879"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-base hover:underline break-all"
                    title={isEs ? 'Escribir por WhatsApp' : 'Chat on WhatsApp'}
                  >
                    +56 9 8767 6879
                  </a>
                  <div className="flex items-center gap-1 shrink-0">
                    {/* 2. El botoncito de WhatsApp */}
                    <a
                      href="https://wa.me/56987676879"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md p-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                      title={isEs ? 'Ir a WhatsApp' : 'Go to WhatsApp'}
                      aria-label={isEs ? 'Ir a WhatsApp' : 'Go to WhatsApp'}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    </a>

                    {/* 3. El icono de llamada */}
                    <a
                      href="tel:+56987676879"
                      className="inline-flex items-center justify-center rounded-md p-1.5 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/40 transition-colors"
                      title={isEs ? 'Llamar por teléfono' : 'Make phone call'}
                      aria-label={isEs ? 'Llamar al +56 9 8767 6879' : 'Call +56 9 8767 6879'}
                    >
                      <Phone className="w-4 h-4" />
                    </a>

                    {/* 4. El icono de copiar */}
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className="inline-flex items-center justify-center rounded-md p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title={isEs ? 'Copiar teléfono' : 'Copy phone number'}
                      aria-label={isEs ? 'Copiar teléfono' : 'Copy phone number'}
                    >
                      {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t.phoneHours}
                </p>
              </div>
            </div>

            {/* 2. Telegram Card */}
            <div className="bg-white dark:bg-[#0B0F17] rounded-2xl p-6 border border-slate-200/80 dark:border-[#1E293B] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shrink-0 p-2 shadow-xs">
                <img src={telegramLogo} alt="Telegram" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.telegramTitle || 'Telegram'}
                </h4>
                <a
                  href="https://t.me/enyoecd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-500 dark:text-sky-400 font-semibold text-sm mt-0.5 hover:underline block"
                >
                  @enyoecd
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t.telegramSub || 'Consultas y soporte vía mensajería'}
                </p>
              </div>
            </div>

            {/* 3. Correo Card */}
            <div className="bg-white dark:bg-[#0B0F17] rounded-2xl p-6 border border-slate-200/80 dark:border-[#1E293B] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shrink-0 p-2 shadow-xs">
                <img src={gmailIcon} alt="Gmail" className="w-7 h-7 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.emailTitle || 'Correo Electrónico'}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <a
                    href="mailto:enyoecd@gmail.com"
                    className="text-purple-600 dark:text-purple-400 font-semibold text-sm hover:underline break-all"
                  >
                    enyoecd@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center rounded-md p-1.5 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                    title={isEs ? 'Copiar correo' : 'Copy email'}
                    aria-label={isEs ? 'Copiar correo' : 'Copy email'}
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Taller presencial Card (click on Ecuador 1438 scrolls up to map) */}
            <div className="bg-white dark:bg-[#0B0F17] rounded-2xl p-6 border border-slate-200/80 dark:border-[#1E293B] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shrink-0 p-2 shadow-xs">
                <img src={googleMapsIcon} alt="Google Maps" className="w-7 h-7 object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.workshopTitle}
                </h4>
                <a
                  href="#contenedor-mapa"
                  onClick={(e) => {
                    e.preventDefault();
                    const mapEl = document.getElementById('contenedor-mapa') || document.getElementById('mapa-ubicacion');
                    if (mapEl) {
                      const header = document.querySelector('header');
                      const headerHeight = header ? header.getBoundingClientRect().height : 80;
                      const elementTop = mapEl.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({
                        top: Math.max(0, elementTop - headerHeight - 12),
                        behavior: 'smooth',
                      });
                    }
                  }}
                  className="text-slate-800 dark:text-slate-200 font-semibold text-sm mt-0.5 hover:text-pink-600 dark:hover:text-pink-400 hover:underline block cursor-pointer transition-colors"
                  title={isEs ? 'Ver ubicación en el mapa' : 'View location on map'}
                >
                  Ecuador 1438, Antofagasta, Chile
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t.workshopSub}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div
            id="formulario-cotizacion"
            className="lg:col-span-7 bg-white dark:bg-[#0B0F17] rounded-3xl p-8 border border-slate-200 dark:border-[#1E293B] shadow-sm relative scroll-mt-24 lg:scroll-mt-28"
          >
            <h3
              id="solicitar-cotizacion"
              className="text-xl font-bold text-slate-900 dark:text-white mb-6 scroll-mt-24 lg:scroll-mt-28"
            >
              {t.formTitle}
            </h3>

            <form
              onSubmit={handleSubmit}
              noValidate={formMode === 'construccion'}
              className="space-y-4"
              data-purpose="quote-form"
            >
              {/* Row 1: Nombre */}
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
                  type="text"
                />
              </div>

              {/* Row 2: Teléfono y Correo */}
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1"
                      htmlFor="phone"
                    >
                      {t.phoneLabel}
                    </label>
                    <input
                      className={`w-full rounded-xl border ${
                        phoneError || contactMethodError
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-slate-300 dark:border-slate-700 focus:border-pink-500 focus:ring-pink-500'
                      } bg-white dark:bg-[#0F172A] text-sm focus:ring-1 text-slate-900 dark:text-white p-3`}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={e => {
                        const formatted = formatPhoneNumber(e.target.value);
                        setFormData({ ...formData, phone: formatted });
                        if (phoneError) setPhoneError('');
                        if (contactMethodError) setContactMethodError('');
                      }}
                      onKeyDown={handlePhoneKeyDown}
                      placeholder={t.phonePlaceholder}
                      maxLength={16}
                      inputMode="tel"
                      type="tel"
                    />
                    {phoneError && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{phoneError}</p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1"
                      htmlFor="email"
                    >
                      {t.emailLabel || (isEs ? 'Correo' : 'Email')}
                    </label>
                    <input
                      className={`w-full rounded-xl border ${
                        emailError || contactMethodError
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-slate-300 dark:border-slate-700 focus:border-pink-500 focus:ring-pink-500'
                      } bg-white dark:bg-[#0F172A] text-sm focus:ring-1 text-slate-900 dark:text-white p-3`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={e => {
                        setFormData({ ...formData, email: e.target.value });
                        if (emailError) setEmailError('');
                        if (contactMethodError) setContactMethodError('');
                      }}
                      placeholder={t.emailPlaceholder || (isEs ? 'ejemplo@correo.com' : 'example@email.com')}
                      type="email"
                    />
                    {emailError && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{emailError}</p>
                    )}
                  </div>
                </div>

                {contactMethodError && (
                  <p className="text-xs text-rose-500 font-semibold">{contactMethodError}</p>
                )}
              </div>

              {/* Row 3: Servicio Requerido */}
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
                  <optgroup label={isEs ? 'Soporte Técnico & Sistemas' : 'Technical Support & Systems'}>
                    <option value="reparacion-software">
                      {isEs
                        ? 'Reparación y mantenimiento de software para PC/Notebooks (con respaldo seguro)'
                        : 'Software Repair & Maintenance for PC/Laptops (Secure Backup)'}
                    </option>
                    <option value="soporte-remoto">
                      {isEs ? 'Asistencia y soporte técnico remoto (Problemas de equipos)' : 'Remote Tech Support (Computer Issues)'}
                    </option>
                    <option value="tickets-empresas">
                      {isEs
                        ? 'Tickets presenciales empresas en Antofagasta (Informática, Sistemas, Roll out)'
                        : 'On-site Corporate Tickets in Antofagasta (IT, Systems, Roll out)'}
                    </option>
                    <option value="redes-totems">
                      {isEs
                        ? 'Cableado de redes, conectividad y soporte de tótems'
                        : 'Network Cabling, Connectivity & Self-Service Kiosks'}
                    </option>
                    <option value="cctv-alarmas">
                      {isEs
                        ? 'Cámaras de seguridad, CCTV y sistemas de alarma'
                        : 'Security Cameras, CCTV & Alarm Systems'}
                    </option>
                    <option value="formateo-windows">
                      {isEs ? 'Formateo e instalación limpia de Windows y Linux' : 'Windows & Linux Clean Installation'}
                    </option>
                    <option value="instalacion-software">
                      {isEs ? 'Instalación y configuración de software' : 'Software Installation & Config'}
                    </option>
                    <option value="antivirus">
                      {isEs ? 'Eliminación de virus y malware' : 'Virus & Malware Removal'}
                    </option>
                    <option value="optimizacion">
                      {isEs ? 'Optimización de computadores y aceleración' : 'System Speed Optimization'}
                    </option>
                    <option value="recuperacion-datos">
                      {isEs ? 'Recuperación de datos' : 'Data Recovery'}
                    </option>
                    <option value="presencial-antofagasta">
                      {isEs
                        ? 'Atención presencial en laboratorio (Ecuador 1438, Antofagasta)'
                        : 'On-site Lab (Ecuador 1438, Antofagasta)'}
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

              <div>
                <label
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1"
                  htmlFor="message"
                >
                  {t.detailsLabel} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  className={`w-full rounded-xl border ${
                    messageError
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:border-pink-500 focus:ring-pink-500'
                  } bg-white dark:bg-[#0F172A] text-sm focus:ring-1 text-slate-900 dark:text-white p-3`}
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={e => {
                    setFormData({ ...formData, message: e.target.value });
                    if (messageError) setMessageError('');
                  }}
                  placeholder={t.detailsPlaceholder}
                  required
                ></textarea>
                {messageError && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{messageError}</p>
                )}
              </div>

              {/* Banner informativo temporal cuando el formulario está en construcción */}
              {formMode === 'construccion' && (
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs">
                  <Construction className="w-4 h-4 shrink-0 text-amber-500" />
                  <span className="leading-snug">
                    {isEs
                      ? 'Aviso temporal: Web en construcción. Al enviar podrás continuar tu consulta directamente por WhatsApp.'
                      : 'Temporary notice: Website under construction. When submitting you can continue directly on WhatsApp.'}
                  </span>
                </div>
              )}

              {/* Submit button */}
              <button
                id="submit-quote-btn"
                data-is-submit="true"
                disabled={isSubmitting}
                type={formMode === 'construccion' ? 'button' : 'submit'}
                onClick={e => {
                  if (formMode === 'construccion') {
                    handleSubmit(e);
                  }
                }}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-sm shadow-md shadow-pink-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>{isEs ? 'Procesando...' : 'Processing...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.submitBtn}</span>
                    {formMode === 'construccion' && (
                      <span className="text-[10px] font-mono uppercase bg-black/20 px-1.5 py-0.5 rounded text-amber-200">
                        {isEs ? 'Temporal' : 'Temp'}
                      </span>
                    )}
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

      {/* Confirmation Modal / Temporary Construction Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div
            className={`bg-white dark:bg-[#0F172A] border-2 ${
              formMode === 'construccion'
                ? 'border-amber-500/80 dark:border-amber-500/60 max-w-lg'
                : 'border-emerald-500/80 dark:border-emerald-500/60 max-w-md'
            } rounded-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto`}
          >
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {formMode === 'construccion' ? (
              /* ========================================================
               * 1. AVISO TEMPORAL: WEB EN CONSTRUCCIÓN / ENVÍO DESHABILITADO
               * Muestra directamente los botones de WhatsApp, Telegram, Correo y Teléfono
               * ======================================================== */
              <>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
                  <Construction className="w-8 h-8" />
                </div>

                <div className="text-center space-y-2 mb-5">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    AVISO TEMPORAL
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {isEs ? 'Web en construcción' : 'Website under construction'}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isEs
                      ? 'El envío automático de este formulario se encuentra temporalmente deshabilitado. Para atenderte de inmediato y sin demoras, comunícate con nosotros a través de cualquiera de nuestros medios oficiales:'
                      : 'Automated form submission is temporarily disabled. For immediate assistance, please reach out via any of our official channels:'}
                  </p>
                </div>

                {/* 4 Canales de Comunicación: WhatsApp, Telegram, Correo y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {/* 1. WhatsApp */}
                  <a
                    href={`https://wa.me/56987676879?text=${encodeURIComponent(
                      submittedData.message
                        ? `Hola, estuve en la web de Tu Poder Virtual:\n- Nombre: ${submittedData.name || 'Cliente'}\n- Requerimiento: ${submittedData.message}`
                        : 'Hola, me comunico desde la web de Tu Poder Virtual para solicitar atención o cotización.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-3 transition-all shadow-md shadow-emerald-600/20 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="font-bold text-sm">WhatsApp</div>
                      <div className="text-[11px] text-emerald-100 truncate">+56 9 8767 6879</div>
                    </div>
                  </a>

                  {/* 2. Telegram */}
                  <a
                    href="https://t.me/enyoecd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs flex items-center gap-3 transition-all shadow-md shadow-sky-500/20 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <img src={telegramLogo} alt="Telegram" className="w-6 h-6 object-contain" />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="font-bold text-sm">Telegram</div>
                      <div className="text-[11px] text-sky-100 truncate">@enyoecd</div>
                    </div>
                  </a>

                  {/* 3. Correo Electrónico */}
                  <a
                    href={`mailto:enyoecd@gmail.com?subject=${encodeURIComponent(
                      'Consulta desde la web - Tu Poder Virtual'
                    )}&body=${encodeURIComponent(
                      submittedData.message
                        ? `Nombre: ${submittedData.name || 'No indicado'}\nTeléfono: ${submittedData.phone || 'No indicado'}\n\nRequerimiento:\n${submittedData.message}`
                        : 'Hola, deseo cotizar un servicio técnico o consultar con Tu Poder Virtual.'
                    )}`}
                    className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-3 transition-all shadow-md shadow-rose-600/20 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <img src={gmailIcon} alt="Gmail" className="w-6 h-6 object-contain" />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="font-bold text-sm">{isEs ? 'Correo' : 'Email'}</div>
                      <div className="text-[11px] text-rose-100 truncate">enyoecd@gmail.com</div>
                    </div>
                  </a>

                  {/* 4. Teléfono */}
                  <a
                    href="tel:+56987676879"
                    className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold text-xs flex items-center gap-3 transition-all shadow-md shadow-slate-900/20 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="font-bold text-sm">{isEs ? 'Llamar' : 'Call'}</div>
                      <div className="text-[11px] text-slate-300 truncate">+56 9 8767 6879</div>
                    </div>
                  </a>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs transition-colors"
                  >
                    {isEs ? 'Cerrar ventana' : 'Close window'}
                  </button>
                </div>
              </>
            ) : (
              /* ========================================================
               * 2. MENSAJE DEFINITIVO PRESERVADO: MENSAJE ENVIADO
               * (Se activará automáticamente al pasar FORM_STATUS_MODE a 'activo')
               * ======================================================== */
              <>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {isEs ? 'Mensaje enviado' : 'Message sent'}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isEs
                      ? 'Hemos recibido tu requerimiento. Nuestro equipo técnico se pondrá en contacto a la brevedad.'
                      : 'We have received your requirement. Our technical team will be in touch shortly.'}
                  </p>
                </div>

                <div className="mt-5 p-3.5 rounded-xl bg-slate-100 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{isEs ? 'Ticket de Seguimiento:' : 'Tracking Ticket:'}</span>
                    <span className="text-emerald-500 font-bold">{ticketId}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/56987676879?text=${encodeURIComponent(
                      `Hola, acabo de enviar una solicitud desde la web (Ticket: ${ticketId}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center transition-colors shadow flex items-center justify-center gap-1.5"
                  >
                    <span>{isEs ? 'Abrir en WhatsApp' : 'Open in WhatsApp'}</span>
                  </a>
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="py-3 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs transition-colors"
                  >
                    {isEs ? 'Cerrar' : 'Close'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
