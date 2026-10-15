# 🚀 Guía de Configuración: Formulario de Contacto en Cloudflare
### Tu Poder Virtual · Notificaciones por Correo (Admin + Copia al Cliente) y Telegram

Esta guía te explica paso a paso qué está hecho en el código y qué debes configurar en el panel de **Cloudflare** para que los formularios que envíen los clientes lleguen automáticamente:
1. **A tu correo personal:** `enyoecd@gmail.com` con todos los detalles y botones de acción rápida.
2. **Al correo del cliente:** una copia de confirmación con su número de Ticket (`TPV-XXXXXX`) y el aviso de que un especialista de *Tu Poder Virtual* se comunicará pronto con él.
3. **A tu Telegram:** una alerta inmediata en tu teléfono vía Bot de Telegram.

---

## 📂 1. ¿Cómo funciona la arquitectura?
- Tu aplicación web utiliza **Cloudflare Pages Functions**.
- El archivo `/functions/api/contact.ts` ya está creado y listo. Cuando subas tu proyecto a Cloudflare Pages, Cloudflare compila y activa automáticamente el endpoint en:  
  `https://tupodervirtual.com/api/contact` (o tu subdominio `.pages.dev`).
- No necesitas configurar servidores Express ni Node.js adicionales.

---

## 🔑 2. ¿Qué necesitas activar de tu parte? (3 Variables en Cloudflare)

Para que Cloudflare pueda despachar los correos y los mensajes a Telegram, solo debes añadir estas variables de entorno en el panel de Cloudflare Pages:

| Variable | Tipo en Cloudflare | ¿Para qué sirve? | Valor de ejemplo |
| :--- | :--- | :--- | :--- |
| `ADMIN_EMAIL` | **Texto (Plain text)** | Correo donde recibirás las alertas | `enyoecd@gmail.com` |
| `RESEND_API_KEY` | **Secreto (Encrypt / Secret)** | Clave privada de envío de correos | `re_123456789...` |
| `TELEGRAM_BOT_TOKEN` | **Secreto (Encrypt / Secret)** | Token privado del bot de Telegram | `7123456789:AAH...` |
| `TELEGRAM_CHAT_ID` | **Texto (Plain text)** | Tu ID de chat en Telegram | `123456789` |
| `FROM_EMAIL` *(opcional)* | **Texto (Plain text)** | Remitente que verá el cliente | `Tu Poder Virtual <onboarding@resend.dev>` |

---

## 🛠️ 3. Paso a Paso para obtener las Claves (Toma menos de 5 minutos)

### A. Para el Envío de Correos (Resend - 100% Gratuito y Generoso)
Cloudflare Workers/Pages utiliza el servicio **Resend** (fundado por ex-ingenieros de Vercel/Cloudflare, otorga **3.000 correos al mes gratis** sin tarjeta de crédito):
1. Entra a [https://resend.com](https://resend.com) e inicia sesión con tu cuenta de Google (`enyoecd@gmail.com`).
2. Ve al menú lateral **API Keys** y presiona **Create API Key**.
3. Dale un nombre (ej. `TuPoderVirtual-Web`) y copia la clave generada (empieza por `re_...`).
4. *(Opcional)* Si ya tienes tu dominio (`tupodervirtual.com`) en Cloudflare, en Resend vas a **Domains** -> **Add Domain** y agregas los 2 registros DNS que te indica para poder enviar desde `contacto@tupodervirtual.com`. Si aún no lo configuras, puedes usar por defecto `onboarding@resend.dev`.

### B. Para las Alertas en Telegram (Inmediato)
1. Abre Telegram y busca a **@BotFather**.
2. Escribe `/newbot`.
3. Asígnale un nombre (ej. `Tu Poder Virtual Notificador`) y un usuario (ej. `TuPoderVirtualAlerts_bot`).
4. @BotFather te responderá con tu **Token HTTP API** (ej. `7123456789:AAH...`).
5. Ahora busca a **@userinfobot** en Telegram y presiona Iniciar. Te dirá tu **Id** numérico (ej. `987654321`).
6. Envía un mensaje cualquiera a tu nuevo bot (ej. `Hola`) para que quede abierta la conversación.

---

## ⚙️ 4. Dónde pegar las variables en el panel de Cloudflare Pages

1. Inicia sesión en tu panel de **Cloudflare** ([dash.cloudflare.com](https://dash.cloudflare.com)).
2. En el menú de la izquierda, haz clic en **Workers & Pages**.
3. Selecciona tu proyecto de **Tu Poder Virtual**.
4. Ve a la pestaña **Settings** (Configuración) ➔ **Environment variables** (Variables de entorno).
5. Haz clic en **Add variable** y añade:
   - `ADMIN_EMAIL` ➔ Tipo: **Plain text** (Texto) ➔ Valor: `enyoecd@gmail.com`
   - `RESEND_API_KEY` ➔ Tipo: **Secret** (Encriptar / Secreto) ➔ Valor: `re_tu_clave`
   - `TELEGRAM_BOT_TOKEN` ➔ Tipo: **Secret** (Encriptar / Secreto) ➔ Valor: `tu_token_de_telegram`
   - `TELEGRAM_CHAT_ID` ➔ Tipo: **Plain text** (Texto) ➔ Valor: `tu_id_de_telegram`
6. Presiona **Save** (Guardar).
7. En el siguiente despliegue (Deploy), las variables estarán activas al 100%.

---

## 📬 5. ¿Qué experimenta el usuario en la web?

1. El usuario completa el formulario en la web (Nombre, Teléfono o Correo, Servicio y Mensaje).
2. Presiona **Enviar**:
   - Se genera un Ticket único de seguimiento (ej. `TPV-849102`).
   - Se ejecuta la llamada a `/api/contact`.
   - Se despachan los 2 correos y la alerta de Telegram.
3. Al terminar, la pantalla muestra de inmediato la ventana modal oficial:
   - Icono verde esmeralda de confirmación.
   - Título: **Mensaje enviado**.
   - Texto: **«Hemos recibido tu requerimiento. Nuestro equipo técnico se pondrá en contacto a la brevedad.»**
   - Número de ticket cifrado.
   - Botón directo para **Abrir en WhatsApp** con el número de ticket precargado por si el cliente desea agilizar su atención.
