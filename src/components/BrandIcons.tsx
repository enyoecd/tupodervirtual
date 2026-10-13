import React from 'react';

interface BrandIconProps {
  className?: string;
  size?: number;
}

/**
 * 1. Mega Icon (SVG provisto por el usuario)
 * Círculo rojo #d31b00 con M blanca centrada
 */
export const MegaIcon: React.FC<BrandIconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="119.5 239.5 721 721"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <circle cx="480" cy="600" r="360.5" fill="#d31b00" />
    <path
      fill="#ffffff"
      d="M267 454h85l128 130 129-130h82v293h-86V577.25L500.334 682h-40.668L355 577.25V747h-88z"
    />
  </svg>
);

/**
 * 2. Microsoft OneDrive Icon (SVG provisto por el usuario)
 * 4 nubes con gradientes azules de Microsoft
 */
export const OneDriveIcon: React.FC<BrandIconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="-1.132 4.726 34.057 21.467"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      d="M12.202 11.193v-.001l6.718 4.024 4.003-1.685A6.477 6.477 0 0 1 25.5 13c.148 0 .294.007.439.016a10 10 0 0 0-18.041-3.013L8 10a7.96 7.96 0 0 1 4.202 1.193z"
      fill="#0364b8"
    />
    <path
      d="M12.203 11.192A7.96 7.96 0 0 0 8 10l-.102.003a7.997 7.997 0 0 0-6.46 12.57L7.36 20.08l2.634-1.108 5.863-2.468 3.062-1.288z"
      fill="#0078d4"
    />
    <path
      d="M25.939 13.016A6.577 6.577 0 0 0 25.5 13a6.477 6.477 0 0 0-2.576.532l-4.004 1.684 1.161.695 3.805 2.279 1.66.994 5.677 3.4a6.5 6.5 0 0 0-5.284-9.568z"
      fill="#1490df"
    />
    <path
      d="M25.546 19.184l-1.66-.994-3.805-2.28-1.16-.694-3.063 1.288-5.863 2.468L7.36 20.08l-5.924 2.493A7.989 7.989 0 0 0 8 26h17.5a6.498 6.498 0 0 0 5.723-3.416z"
      fill="#28a8ea"
    />
  </svg>
);

/**
 * 3. Telegram Icon (SVG oficial nítido idéntico a telegram.png)
 * Círculo azul cyan con avión de papel blanco y sombra
 */
export const TelegramIcon: React.FC<BrandIconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 240 240"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="tg-grad" x1="120" y1="0" x2="120" y2="240" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2AABEE" />
        <stop offset="100%" stopColor="#229ED9" />
      </linearGradient>
    </defs>
    <circle cx="120" cy="120" r="120" fill="url(#tg-grad)" />
    <path
      d="M98 175c-3.9 0-3.2-1.5-4.6-5.2L79.5 124 163 74c3.9-2.6 7.5-1.1 4.5 1.5l-68.5 61.8v-.1l2.5 37.8z"
      fill="#c8daea"
    />
    <path
      d="M98 175c3 0 4.3-1.4 6-3l16.1-15.6-20.1-12.1L98 175z"
      fill="#a9c9dd"
    />
    <path
      d="M100 144.3l49 36.2c5.7 3.1 9.7 1.5 11.2-5.3l20-94.2c2.1-8.3-3.2-12-8.7-9.6L54 116.7c-8.2 3.3-8.1 7.9-1.4 10l30 9.4 69.5-43.8c3.3-2 6.3-.9 3.8 1.3L100 144.3z"
      fill="#ffffff"
    />
  </svg>
);

/**
 * 4. Google Drive Icon (SVG oficial tricolor de google_drive_logo_icon_159334)
 * Verde (#0F9D58), Amarillo (#FFBA00), Azul (#4285F4), Rojo (#EA4335)
 */
export const GoogleDriveIcon: React.FC<BrandIconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 87.3 78"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Amarillo superior derecho */}
    <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
    <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47" />
    <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335" />
    <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
    <path d="m57.4 1.2-13.75 23.8 13.75 23.8h27.5c0-1.55-.4-3.1-1.2-4.5l-21.8-37.7c-.8-1.4-1.95-2.5-3.3-3.3z" fill="#ffba00" />
    <path d="m73.55 76.8h-46.2c-1.55 0-3.1-.4-4.5-1.2l13.75-23.8h36.95z" fill="#2684fc" />
  </svg>
);

/**
 * 5. Android Icon (SVG oficial verde idéntico a androide (1).png)
 * Robot verde (#3DDC84 / #78C257)
 */
export const AndroidIcon: React.FC<BrandIconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="11" fill="#78C257" />
    {/* Antenas */}
    <line x1="8.5" y1="5.5" x2="6.8" y2="3.8" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
    <line x1="15.5" y1="5.5" x2="17.2" y2="3.8" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
    {/* Cabeza */}
    <path d="M7 10a5 5 0 0 1 10 0H7z" fill="#ffffff" />
    <circle cx="9.5" cy="8.5" r="0.7" fill="#78C257" />
    <circle cx="14.5" cy="8.5" r="0.7" fill="#78C257" />
    {/* Cuerpo */}
    <rect x="7" y="11" width="10" height="7.5" rx="1.2" fill="#ffffff" />
    {/* Brazos */}
    <rect x="4.5" y="11" width="1.8" height="5.5" rx="0.9" fill="#ffffff" />
    <rect x="17.7" y="11" width="1.8" height="5.5" rx="0.9" fill="#ffffff" />
    {/* Piernas */}
    <rect x="8.8" y="18.5" width="2" height="3" rx="1" fill="#ffffff" />
    <rect x="13.2" y="18.5" width="2" height="3" rx="1" fill="#ffffff" />
  </svg>
);

/**
 * 6. Blogger Icon (SVG oficial naranja idéntico a blogger.png)
 * Círculo naranja (#F57C00) con 'B' estilizada blanca
 */
export const BloggerIcon: React.FC<BrandIconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="11" fill="#F57C00" />
    <path
      fill="#ffffff"
      fillRule="evenodd"
      d="M8.5 6h7A3.5 3.5 0 0 1 19 9.5c0 1.2-.6 2.2-1.5 2.8.9.6 1.5 1.6 1.5 2.8A3.5 3.5 0 0 1 15.5 18h-7A3.5 3.5 0 0 1 5 14.5v-5A3.5 3.5 0 0 1 8.5 6zm2 3.2a1.2 1.2 0 0 0 0 2.4h3a1.2 1.2 0 0 0 0-2.4h-3zm0 4.4a1.2 1.2 0 0 0 0 2.4h5a1.2 1.2 0 0 0 0-2.4h-5z"
    />
  </svg>
);

/**
 * 7. WhatsApp Icon (SVG oficial idéntico a whatsapp_logo.png)
 * Círculo verde (#25D366) con burbuja de diálogo y teléfono blanco
 */
export const WhatsAppIcon: React.FC<BrandIconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="11" fill="#25D366" />
    <path
      fill="#ffffff"
      d="M16.8 14.2c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1s-.8.9-.9 1.1c-.2.2-.3.2-.6.1s-1.2-.4-2.2-1.3c-.8-.7-1.3-1.6-1.5-1.9s0-.4.1-.6c.1-.1.3-.3.4-.5.1-.2.2-.3.3-.4.1-.2 0-.3 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.7-.7 1.9-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"
    />
  </svg>
);

/**
 * Helper dinámico para resolver el icono de marca a partir del proveedor o título
 */
export const getProviderBrandIcon = (provider?: string, title?: string, tag?: string) => {
  const text = `${provider || ''} ${title || ''} ${tag || ''}`.toLowerCase();

  if (text.includes('mega')) {
    return <MegaIcon className="w-5 h-5 shrink-0" />;
  }
  if (text.includes('onedrive') || text.includes('1drv')) {
    return <OneDriveIcon className="w-5 h-5 shrink-0" />;
  }
  if (text.includes('telegram') || text.includes('t.me')) {
    return <TelegramIcon className="w-5 h-5 shrink-0" />;
  }
  if (text.includes('drive') || text.includes('google drive')) {
    return <GoogleDriveIcon className="w-5 h-5 shrink-0" />;
  }
  if (text.includes('apk') || text.includes('android')) {
    return <AndroidIcon className="w-5 h-5 shrink-0" />;
  }
  if (text.includes('whatsapp') || text.includes('wa.me')) {
    return <WhatsAppIcon className="w-5 h-5 shrink-0" />;
  }
  if (text.includes('blogger') || text.includes('blogspot')) {
    return <BloggerIcon className="w-5 h-5 shrink-0" />;
  }

  return null;
};
