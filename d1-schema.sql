-- ==============================================================================
-- CLOUDFLARE D1 DATABASE SCHEMA
-- Proyecto: Tu Poder Virtual (/enyo enlaces y herramientas)
-- ==============================================================================

-- 1. Creación de la tabla principal de enlaces
CREATE TABLE IF NOT EXISTS links (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  tag TEXT,
  provider TEXT,
  badge_color TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Índice para consultas rápidas por sección ordenadas por posición
CREATE INDEX IF NOT EXISTS idx_links_section_order ON links(section, order_index);

-- ==============================================================================
-- INSERCIÓN DE DATOS INICIALES (SEED DATA)
-- Copia y pega esto en la pestaña "Console" de Cloudflare D1 si deseas cargar
-- todos los enlaces que ya tienes configurados en la web.
-- ==============================================================================

-- 1. Repositorios de software del blog (Lista vertical)
INSERT OR IGNORE INTO links (id, section, title, url, provider, tag, description, badge_color, order_index) VALUES
('bsoft-1', 'blog-software', 'Programas (Drive)', 'https://drive.google.com/drive/folders/1jPkERPLwzNpYKUigAZMQg_xiM7lHYf6U?usp=sharing', 'Google Drive', 'Software General', 'Carpeta compartida con instaladores y utilidades de software esencial.', 'border-amber-500/30 text-amber-400 bg-amber-500/10', 0),
('bsoft-2', 'blog-software', 'Programas (Mega)', 'https://mega.nz/folder/eyB1BBpI#m6_JZpwUoZMfNiJcs2hLjg', 'Mega', 'Software General', 'Repositorio en la nube Mega con paquetes de programas y herramientas para PC.', 'border-rose-500/30 text-rose-400 bg-rose-500/10', 1),
('bsoft-3', 'blog-software', 'Programas (OneDrive)', 'https://1drv.ms/f/c/291b8c9113bdeaf1/IgDx6r0TkYwbIIAp6gAAAAAAAc1y5LjWV5VQRgaKng16EA8?e=HzjYly', 'OneDrive', 'Software General', 'Colección de utilidades y herramientas alojadas en Microsoft OneDrive.', 'border-sky-500/30 text-sky-400 bg-sky-500/10', 2),
('bsoft-4', 'blog-software', 'Programas (Telegram)', 'https://t.me/softwareenyo', 'Telegram', 'Canal de Telegram', 'Canal oficial @softwareenyo para acceso directo a instaladores y novedades.', 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10', 3),
('bsoft-5', 'blog-software', 'Programas 2 (Drive)', 'https://drive.google.com/drive/folders/14gzB_RONZAUgbSaRz3_xx0oV4zUQfS_t?usp=drive_link', 'Google Drive', 'Software Adicional', 'Segunda carpeta en Google Drive con software complementario y utilidades.', 'border-amber-500/30 text-amber-400 bg-amber-500/10', 4),
('bsoft-6', 'blog-software', 'Programas 2 (Mega)', 'https://mega.nz/folder/jIpRBQbZ#iaRtDjMekc0Je7Tg7lsemg', 'Mega', 'Software Adicional', 'Segundo directorio en Mega con utilidades técnicas y herramientas de diagnóstico.', 'border-rose-500/30 text-rose-400 bg-rose-500/10', 5),
('bsoft-7', 'blog-software', '0-f-f-1-c-e', 'https://drive.google.com/drive/u/3/folders/1mrZ02LkroFNT4yupM4TiAGUSYk48ASqM', 'Google Drive', 'Ofimática', 'Carpeta en Google Drive con suites de oficina y herramientas de productividad.', 'border-blue-500/30 text-blue-400 bg-blue-500/10', 6),
('bsoft-8', 'blog-software', 'ISOS (Mega)', 'https://mega.nz/folder/yR4kwRQD#v3QTGXfRR_EFTGdHvS68Kg', 'Mega', 'Imágenes ISO', 'Repositorio en Mega con imágenes ISO de sistemas y utilidades de rescate.', 'border-rose-500/30 text-rose-400 bg-rose-500/10', 7),
('bsoft-9', 'blog-software', 'ISOS: Herramientas y Android (Drive)', 'https://drive.google.com/drive/folders/1zZPihMOG9PvUhEwePvFm9CdQ_1k8mS10?usp=drive_link', 'Google Drive', 'Herramientas / Android', 'ISOS de diagnóstico, herramientas de flasheo y utilidades para Android en Drive.', 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10', 8),
('bsoft-10', 'blog-software', 'ISOS: WIN (Drive)', 'https://drive.google.com/drive/folders/1GyK7-kR_9WWY-tJtNUnj9CswVcbvzw0m?usp=sharing', 'Google Drive', 'Sistemas Windows', 'Imágenes ISO oficiales de Windows preparadas para formateo y booteo limpio.', 'border-sky-500/30 text-sky-400 bg-sky-500/10', 9),
('bsoft-11', 'blog-software', 'APK (Drive)', 'https://drive.google.com/drive/folders/1twawzf1C3PVxUzQUOD0eZb6k6Q2YxuUw?usp=sharing', 'Google Drive', 'Aplicaciones Android', 'Colección de archivos APK verificados para teléfonos y tablets Android.', 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10', 10),
('bsoft-12', 'blog-software', 'APK (Mega)', 'https://mega.nz/folder/TchTwIwJ#RK4tCF-KozqklKtKjxV9Ow', 'Mega', 'Aplicaciones Android', 'Directorio en Mega con aplicaciones APK para dispositivos Android y Smart TV Box.', 'border-rose-500/30 text-rose-400 bg-rose-500/10', 11);

-- 2. Sitios Web Favoritos
INSERT OR IGNORE INTO links (id, section, title, url, tag, description, badge_color, order_index) VALUES
('fav-1', 'favorite-websites', 'Ninite', 'https://ninite.com/', 'Instalador Masivo', 'Instalador y actualizador masivo de aplicaciones esenciales sin barras ni software no deseado.', 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10', 0),
('fav-2', 'favorite-websites', 'CD-Libre', 'https://www.cdlibre.org/', 'Software Libre', 'Catálogo de software libre y de código abierto para Windows clasificado por áreas y temáticas.', 'border-blue-500/30 text-blue-400 bg-blue-500/10', 1),
('fav-3', 'favorite-websites', 'Winstall', 'https://winstall.app/', 'Herramienta Windows', 'Interfaz gráfica web para crear paquetes y scripts para Windows Package Manager (winget).', 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10', 2),
('fav-4', 'favorite-websites', 'Intercambios Virtuales', 'http://www.intercambiosvirtuales.org/', 'Comunidad Tech', 'Comunidad de tecnología, noticias, utilidades y aportes digitales.', 'border-amber-500/30 text-amber-400 bg-amber-500/10', 3),
('fav-5', 'favorite-websites', 'OldVersion', 'http://www.oldversion.com/', 'Versiones Anteriores', 'Repositorio histórico de versiones anteriores de programas cuando las versiones actuales fallan.', 'border-violet-500/30 text-violet-400 bg-violet-500/10', 4),
('fav-6', 'favorite-websites', 'Software Libre (Google Sites)', 'https://sites.google.com/view/todosoftwarelibre/software?authuser=0', 'Software Libre', 'Compilado curado en Google Sites de utilidades libres para PC y productividad.', 'border-teal-500/30 text-teal-400 bg-teal-500/10', 5),
('fav-7', 'favorite-websites', 'Hipertextual', 'http://hipertextual.com/', 'Noticias Tech', 'Medio de noticias de tecnología, ciencia, cultura digital, hardware y videojuegos.', 'border-pink-500/30 text-pink-400 bg-pink-500/10', 6),
('fav-8', 'favorite-websites', 'Alta Densidad', 'http://www.altadensidad.com/', 'Actualidad Tech', 'Portal de actualidad sobre tecnología, tendencias digitales, gadgets e informática.', 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10', 7),
('fav-9', 'favorite-websites', 'MalaVida', 'http://www.malavida.com/', 'Guías & Apps', 'Guías de descarga, análisis y tutoriales paso a paso de aplicaciones para PC y móvil.', 'border-lime-500/30 text-lime-400 bg-lime-500/10', 8),
('fav-10', 'favorite-websites', 'Will My Phone Work', 'https://willmyphonework.net/', 'Móvil / Bandas', 'Comprobador de compatibilidad de frecuencias y bandas móviles (2G, 3G, 4G, 5G) por país.', 'border-sky-500/30 text-sky-400 bg-sky-500/10', 9),
('fav-11', 'favorite-websites', 'Fútbol Libre', 'http://librefutboltv.su', 'Deportes / En Vivo', 'Transmisiones deportivas y seguimiento en vivo de partidos de fútbol internacional.', 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10', 10),
('fav-12', 'favorite-websites', 'Radio Garden', 'http://radio.garden', 'Radio Mundial', 'Globo interactivo 3D para escuchar miles de emisoras de radio en directo alrededor del mundo.', 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10', 11),
('fav-13', 'favorite-websites', 'Snapdrop', 'https://snapdrop.net/#', 'Compartir Archivos', 'Transferencia directa de archivos estilo AirDrop entre dispositivos en la misma red local.', 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10', 12),
('fav-14', 'favorite-websites', 'Libros... (Mega)', 'https://mega.nz/folder/Pc4DkTzB#lJVKJXwWIzv9Hlkn96LYjw', 'Biblioteca Digital', 'Biblioteca y repositorio de libros digitales, manuales y lecturas en la nube de Mega.', 'border-amber-500/30 text-amber-400 bg-amber-500/10', 13),
('fav-15', 'favorite-websites', '🎬 Películas y Series (Recomendaciones)', 'https://photos.app.goo.gl/kQDpCkjY3Wtem1pb6', 'Cine & Series', 'Colección fotográfica y recomendaciones destacadas de películas y series de televisión.', 'border-rose-500/30 text-rose-400 bg-rose-500/10', 14),
('fav-16', 'favorite-websites', 'Borrador (Google Docs)', 'https://docs.google.com/document/d/12Y9pOy8TbagtgKi6ZKFg9zl1QuvjdoC-QUKXiojm-74/edit?usp=sharing', 'Documentos en Nube', 'Documento en Google Docs para apuntes rápidos, notas técnicas y borradores en la nube.', 'border-blue-500/30 text-blue-400 bg-blue-500/10', 15),
('fav-17', 'favorite-websites', 'Agrega tu Página Web Favorita', 'http://spreadsheets.google.com/viewform?formkey=dGxYSGRESE80VlZFX19vUHN2VGtwSXc6MA', 'Sugerir Enlace', 'Formulario oficial para postular y sugerir nuevos sitios web útiles para añadir a la colección.', 'border-purple-500/30 text-purple-400 bg-purple-500/10', 16);

-- 3. Páginas y Utilidades Web Online
INSERT OR IGNORE INTO links (id, section, title, url, tag, description, badge_color, order_index) VALUES
('util-1', 'online-utilities', 'VirusTotal', 'https://www.virustotal.com/', 'Seguridad / Antivirus', 'Analizador online de archivos, URLs, dominios y direcciones IP contra más de 70 motores antivirus.', 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10', 0),
('util-2', 'online-utilities', 'Speedtest by Ookla', 'https://www.speedtest.net/', 'Redes / Conectividad', 'Medición precisa de velocidad de bajada, subida, latencia y jitter de tu conexión a Internet.', 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10', 1),
('util-3', 'online-utilities', 'Can I Use', 'https://caniuse.com/', 'Desarrollo Web', 'Tablas de soporte actualizado de tecnologías HTML5, CSS3 y JavaScript en todos los navegadores.', 'border-amber-500/30 text-amber-400 bg-amber-500/10', 2),
('util-4', 'online-utilities', 'TinyPNG / TinyJPG', 'https://tinypng.com/', 'Optimización Web', 'Compresión inteligente con pérdida de peso para imágenes WebP, PNG y JPEG sin perder calidad perceptible.', 'border-pink-500/30 text-pink-400 bg-pink-500/10', 3),
('util-5', 'online-utilities', 'ILovePDF', 'https://www.ilovepdf.com/es', 'Utilidad Documentos', 'Herramientas completas para unir, dividir, comprimir y convertir archivos PDF en el navegador.', 'border-rose-500/30 text-rose-400 bg-rose-500/10', 4),
('util-6', 'online-utilities', 'DNS Checker', 'https://dnschecker.org/', 'Dominios / Servidores', 'Verificación global de propagación de registros DNS (A, MX, CNAME, TXT, NS) en servidores mundiales.', 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10', 5),
('util-7', 'online-utilities', 'Regex101', 'https://regex101.com/', 'Herramienta Dev', 'Probador interactivo de expresiones regulares con desglose sintáctico, depurador y explicaciones.', 'border-purple-500/30 text-purple-400 bg-purple-500/10', 6),
('util-8', 'online-utilities', 'Have I Been Pwned', 'https://haveibeenpwned.com/', 'Ciberseguridad', 'Comprueba si alguna de tus cuentas de correo o contraseñas ha sufrido filtraciones de seguridad conocidas.', 'border-red-500/30 text-red-400 bg-red-500/10', 7);

-- 4. Software de Descarga Esencial
INSERT OR IGNORE INTO links (id, section, title, url, tag, description, badge_color, order_index) VALUES
('sdown-1', 'software-downloads', 'AnyDesk', 'https://anydesk.com/es/downloads', 'Soporte Remoto', 'Software ligero de escritorio remoto multiplataforma. Ideal para soporte técnico a distancia de alta velocidad.', 'border-red-500/30 text-red-400 bg-red-500/10', 0),
('sdown-2', 'software-downloads', 'TeamViewer', 'https://www.teamviewer.com/es/descarga/', 'Soporte Remoto', 'Solución empresarial de acceso remoto, colaboración y mantenimiento seguro con soporte bidireccional.', 'border-blue-500/30 text-blue-400 bg-blue-500/10', 1),
('sdown-3', 'software-downloads', 'HWiNFO (Hardware Info & Diagnostics)', 'https://www.hwinfo.com/download/', 'Diagnóstico & Sensores', 'Monitoreo profesional de hardware en tiempo real: temperaturas, voltajes, salud de batería y sensores.', 'border-amber-500/30 text-amber-400 bg-amber-500/10', 2),
('sdown-4', 'software-downloads', 'CrystalDiskInfo', 'https://crystalmark.info/en/software/crystaldiskinfo/', 'Almacenamiento / SSD', 'Utilidad indispensable para evaluar la salud S.M.A.R.T. y temperatura de discos duros HDD y unidades SSD / NVMe.', 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10', 3),
('sdown-5', 'software-downloads', 'Rufus', 'https://rufus.ie/es/', 'Sistemas Operativos', 'Herramienta de creación de medios USB booteables para formateo e instalación de Windows, Linux y UEFI.', 'border-purple-500/30 text-purple-400 bg-purple-500/10', 4),
('sdown-6', 'software-downloads', '7-Zip', 'https://www.7-zip.org/', 'Utilidad Esencial', 'Compresor y descompresor libre de archivos con ratio de compresión ultra alto (.7z, .zip, .rar, .tar, .iso).', 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10', 5),
('sdown-7', 'software-downloads', 'Revo Uninstaller Free', 'https://www.revouninstaller.com/products/revo-uninstaller-free/', 'Mantenimiento PC', 'Desinstalador avanzado que rastrea y borra claves de registro huérfanas y restos de programas resistentes.', 'border-teal-500/30 text-teal-400 bg-teal-500/10', 6),
('sdown-8', 'software-downloads', 'Visual Studio Code', 'https://code.visualstudio.com/Download', 'Desarrollo / Código', 'Editor de código fuente multiplataforma y extensible para desarrollo web, scripts y terminal integrada.', 'border-sky-500/30 text-sky-400 bg-sky-500/10', 7);

-- 5. Canales de YouTube
INSERT OR IGNORE INTO links (id, section, title, url, tag, description, badge_color, order_index) VALUES
('yt-1', 'youtube', 'Tu Poder Virtual (Canal Oficial)', 'https://www.youtube.com/@TuPoderVirtual', 'Canal Oficial YouTube', 'Canal oficial de YouTube con guías de sistemas, soporte computacional, software y tecnología.', 'border-rose-500/30 text-rose-400 bg-rose-500/10', 0),
('yt-2', 'youtube', 'Guías de Software, Optimización & Mantenimiento PC', 'https://www.youtube.com/results?search_query=optimizacion+windows+soporte+tecnico', 'Software & Sistemas', 'Aceleración de Windows, eliminación de amenazas, respaldo seguro de archivos y configuración de sistemas.', 'border-amber-500/30 text-amber-400 bg-amber-500/10', 1),
('yt-3', 'youtube', 'Desarrollo Web & Tecnologías Modernas', 'https://www.youtube.com/results?search_query=desarrollo+web+react+tailwind+typescript', 'Programación & Web', 'Novedades de diseño web responsive, menús digitales con códigos QR e interfaces avanzadas.', 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10', 2);

-- 6. Música en Plataformas
INSERT OR IGNORE INTO links (id, section, title, url, provider, tag, description, badge_color, order_index) VALUES
('mus-1', 'music', 'Spotify', 'https://open.spotify.com/user/313nj2hnqo74iqsptlds6s3wczva?si=xjAHInD_TTuVCAlRnQTNLA', 'Spotify Profile', 'Spotify Profile', 'Perfil y playlists musicales seleccionadas en Spotify.', 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10', 0),
('mus-2', 'music', 'Deezer', 'https://www.deezer.com/en/profile/1172086726/playlists', 'Deezer Profile', 'Deezer Profile', 'Listas de reproducción y colecciones musicales en Deezer.', 'border-purple-500/30 text-purple-400 bg-purple-500/10', 1),
('mus-3', 'music', 'SoundCloud', 'https://soundcloud.com/enyoecd', 'SoundCloud (@enyoecd)', 'SoundCloud (@enyoecd)', 'Música, pistas y sesiones en el canal de SoundCloud.', 'border-amber-500/30 text-amber-400 bg-amber-500/10', 2),
('mus-4', 'music', 'YouTube Playlists', 'https://www.youtube.com/user/enyoecd/playlists', 'YouTube (enyoecd)', 'YouTube (enyoecd)', 'Playlists y recopilaciones de música en video en YouTube.', 'border-rose-500/30 text-rose-400 bg-rose-500/10', 3),
('mus-5', 'music', 'Mega (Música)', 'https://mega.nz/folder/KRARyQLC#w-QEzHs-zrWSRRVWF0Vplg', 'Mega Cloud', 'Mega Cloud', 'Directorio en Mega con archivos de audio y colecciones musicales.', 'border-red-500/30 text-red-400 bg-red-500/10', 4),
('mus-6', 'music', 'OneDrive (Música)', 'https://1drv.ms/u/s!AvHqvRORjBspgcpzDfLLAI8jaMI_5g?e=ujC4p3', 'Microsoft OneDrive', 'Microsoft OneDrive', 'Biblioteca musical y álbumes compartidos en Microsoft OneDrive.', 'border-sky-500/30 text-sky-400 bg-sky-500/10', 5);
