// ==============================================================================
// CLOUDFLARE PAGES FUNCTIONS: /api/contact
// Endpoint para recepción de formularios web en Cloudflare.
// Envía:
//   1. Notificación al Correo Personal del Administrador (enyoecd@gmail.com)
//   2. Correo de confirmación/copia al Cliente con sus datos (si ingresó email)
//   3. Notificación instantánea a Telegram Bot (si se configuran token y chat ID)
// ==============================================================================

interface Env {
  ADMIN_EMAIL?: string;          // Por defecto: 'enyoecd@gmail.com'
  FROM_EMAIL?: string;           // Por defecto: 'Tu Poder Virtual <notificaciones@tupodervirtual.com>' o 'Tu Poder Virtual <onboarding@resend.dev>'
  RESEND_API_KEY?: string;       // Clave de API de Resend (https://resend.com - gratis 3.000 correos/mes)
  TELEGRAM_BOT_TOKEN?: string;   // Token de bot creado en Telegram (@BotFather)
  TELEGRAM_CHAT_ID?: string;     // Chat ID o canal de Telegram para recibir alertas
}

interface ContactRequestBody {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
  ticketId?: string;
}

const jsonResponse = (data: unknown, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};

const SERVICE_LABELS: Record<string, string> = {
  'soporte-tecnico': 'Soporte técnico (PC, notebooks)',
  'soporte-remoto': 'Soporte remoto',
  'tickets-empresas': 'Tickets atenciones para empresa en Antofagasta',
  'redes-cableado': 'Redes, cableado',
  'camaras-cctv': 'Cámaras de seguridad (CCTV)',
  'sistema-alarma': 'Sistema de alarma',
  'creacion-web': 'Creación página web para empresas',
  'menu-qr': 'Menú QRs para restaurantes',
  // Compatibilidad anterior
  'reparacion-software': 'Soporte técnico (PC, notebooks)',
  'redes-totems': 'Redes, cableado',
  'cctv-alarmas': 'Cámaras de seguridad (CCTV)',
  'pagina-web': 'Creación página web para empresas',
  'menu-digital': 'Menú QRs para restaurantes',
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const { request, env } = context;

    let body: ContactRequestBody;
    try {
      body = (await request.json()) as ContactRequestBody;
    } catch {
      return jsonResponse({ success: false, error: 'Cuerpo de solicitud JSON no válido' }, 400);
    }

    const name = (body.name || '').trim();
    const phone = (body.phone || '').trim();
    const email = (body.email || '').trim();
    const rawService = (body.service || '').trim();
    const serviceName = SERVICE_LABELS[rawService] || rawService || 'Consulta General de Servicios';
    const message = (body.message || '').trim();
    const ticketId = (body.ticketId || '').trim() || `TPV-${Math.floor(100000 + Math.random() * 900000)}`;

    // Validación básica: por lo menos teléfono o correo, y mensaje obligatorio
    if (!phone && !email) {
      return jsonResponse(
        { success: false, error: 'Debes proporcionar al menos un teléfono o correo electrónico' },
        400
      );
    }

    if (!message) {
      return jsonResponse(
        { success: false, error: 'El mensaje o requerimiento es obligatorio' },
        400
      );
    }

    const adminEmail = env.ADMIN_EMAIL || 'enyoecd@gmail.com';
    const fromEmail = env.FROM_EMAIL || 'Tu Poder Virtual <onboarding@resend.dev>';
    const resendKey = env.RESEND_API_KEY;
    const telegramToken = env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = env.TELEGRAM_CHAT_ID;

    let emailAdminSent = false;
    let emailClientSent = false;
    let telegramSent = false;
    const errors: string[] = [];

    const nowFormatted = new Date().toLocaleString('es-CL', {
      timeZone: 'America/Santiago',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // =========================================================================
    // 1. ENVÍO DE CORREOS VÍA RESEND (SI ESTÁ CONFIGURADO RESEND_API_KEY)
    // =========================================================================
    if (resendKey) {
      // 1.1 Correo hacia el Administrador (enyoecd@gmail.com)
      try {
        const adminHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #131b2e; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #ec4899, #f43f5e, #f59e0b); padding: 24px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 24px; }
    .badge { display: inline-block; background: #059669; color: white; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; margin-bottom: 16px; }
    .row { display: flex; border-bottom: 1px solid #1e293b; padding: 12px 0; font-size: 14px; }
    .label { width: 140px; font-weight: 600; color: #94a3b8; }
    .value { flex: 1; color: #f8fafc; font-weight: 500; }
    .msg-box { background: #090d16; border-left: 4px solid #ec4899; padding: 16px; border-radius: 8px; margin: 20px 0; color: #f1f5f9; line-height: 1.6; white-space: pre-wrap; font-size: 14px; }
    .actions { display: flex; gap: 12px; margin-top: 24px; }
    .btn { display: inline-block; padding: 12px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none; text-align: center; }
    .btn-wa { background: #10b981; color: white; }
    .btn-mail { background: #3b82f6; color: white; }
    .footer { text-align: center; font-size: 11px; color: #64748b; padding: 16px; border-top: 1px solid #1e293b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Tu Poder Virtual</h1>
      <p>Notificación de Nueva Solicitud Web</p>
    </div>
    <div class="content">
      <div class="badge">Ticket: ${ticketId}</div>
      <div class="row"><div class="label">Fecha / Hora:</div><div class="value">${nowFormatted}</div></div>
      <div class="row"><div class="label">Nombre:</div><div class="value">${name || 'No especificado'}</div></div>
      <div class="row"><div class="label">Teléfono:</div><div class="value">${phone || 'No especificado'}</div></div>
      <div class="row"><div class="label">Correo:</div><div class="value">${email || 'No especificado'}</div></div>
      <div class="row"><div class="label">Servicio:</div><div class="value">${serviceName}</div></div>

      <div style="margin-top: 18px; font-weight: 700; font-size: 13px; color: #94a3b8; text-transform: uppercase;">Detalle del requerimiento:</div>
      <div class="msg-box">${message}</div>

      <div class="actions">
        ${phone ? `<a class="btn btn-wa" href="https://wa.me/${phone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(name || 'estimado')},%20me%20comunico%20de%20Tu%20Poder%20Virtual%20respecto%20a%20tu%20solicitud%20${ticketId}">Contactar por WhatsApp</a>` : ''}
        ${email ? `<a class="btn btn-mail" href="mailto:${email}?subject=Respuesta%20a%20tu%20solicitud%20${ticketId}%20-%20Tu%20Poder%20Virtual">Responder por Correo</a>` : ''}
      </div>
    </div>
    <div class="footer">
      Sistema de notificaciones automatizado de Tu Poder Virtual · Antofagasta, Chile
    </div>
  </div>
</body>
</html>
        `;

        const resAdmin = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [adminEmail],
            reply_to: email || undefined,
            subject: `🔔 [Tu Poder Virtual] Nueva Solicitud: ${name || 'Cliente'} - Ticket ${ticketId}`,
            html: adminHtml,
          }),
        });

        if (resAdmin.ok) {
          emailAdminSent = true;
        } else {
          const errText = await resAdmin.text();
          errors.push(`Error Resend Admin: ${errText}`);
        }
      } catch (errAdmin) {
        errors.push(`Excepción Resend Admin: ${String(errAdmin)}`);
      }

      // 1.2 Correo de Copia y Confirmación al Cliente (si ingresó email)
      if (email && email.includes('@')) {
        try {
          const clientHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #ec4899, #f43f5e, #f59e0b); padding: 28px 24px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
    .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.95; }
    .content { padding: 28px 24px; }
    .badge { display: inline-block; background: #059669; color: white; padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; margin-bottom: 16px; }
    .greeting { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
    .text { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 16px; }
    .summary-box { background: #f1f5f9; border-radius: 12px; padding: 18px; margin: 20px 0; font-size: 13px; }
    .summary-row { margin-bottom: 8px; }
    .summary-label { font-weight: 700; color: #64748b; }
    .summary-value { color: #0f172a; }
    .user-msg { background: #ffffff; border-left: 3px solid #f43f5e; padding: 12px; margin-top: 10px; border-radius: 4px; font-style: italic; color: #334155; white-space: pre-wrap; }
    .contact-card { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 16px; margin: 24px 0; text-align: center; }
    .contact-title { font-weight: 700; color: #065f46; font-size: 14px; margin-bottom: 4px; }
    .contact-sub { font-size: 12px; color: #047857; margin-bottom: 12px; }
    .btn-wa { display: inline-block; background: #10b981; color: white; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 13px; text-decoration: none; }
    .footer { text-align: center; font-size: 11px; color: #94a3b8; padding: 18px; border-top: 1px solid #e2e8f0; background: #f8fafc; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Tu Poder Virtual</h1>
      <p>Confirmación de Solicitud Recibida</p>
    </div>
    <div class="content">
      <div class="badge">Ticket de Seguimiento: ${ticketId}</div>

      <div class="greeting">Hola ${name ? name : 'estimado(a) cliente'},</div>
      <p class="text">
        Hemos recibido tu requerimiento con éxito. Nuestro equipo técnico y especialista se pondrá en contacto contigo a la brevedad para atenderte.
      </p>

      <div class="summary-box">
        <div style="font-weight: 700; font-size: 13px; color: #334155; margin-bottom: 10px; text-transform: uppercase;">
          Resumen de tu mensaje:
        </div>
        <div class="summary-row"><span class="summary-label">Servicio:</span> <span class="summary-value">${serviceName}</span></div>
        ${phone ? `<div class="summary-row"><span class="summary-label">Teléfono registrado:</span> <span class="summary-value">${phone}</span></div>` : ''}
        <div class="summary-row"><span class="summary-label">Fecha de envío:</span> <span class="summary-value">${nowFormatted}</span></div>
        <div style="margin-top: 12px; font-weight: 600; color: #64748b;">Tu mensaje:</div>
        <div class="user-msg">${message}</div>
      </div>

      <div class="contact-card">
        <div class="contact-title">¿Necesitas atención inmediata?</div>
        <div class="contact-sub">Puedes comunicarte de inmediato con nuestro especialista por WhatsApp o llamada:</div>
        <a class="btn-wa" href="https://wa.me/56987676879?text=Hola,%20tengo%20una%20consulta%20respecto%20a%20mi%20solicitud%20${ticketId}">
          Abrir chat en WhatsApp (+56 9 8767 6879)
        </a>
      </div>
    </div>
    <div class="footer">
      <strong>Tu Poder Virtual</strong> · Soporte Técnico & Soluciones Digitales<br>
      Ecuador 1438, Antofagasta, Chile · Tel: +56 9 8767 6879 · enyoecd@gmail.com
    </div>
  </div>
</body>
</html>
          `;

          const resClient = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: fromEmail,
              to: [email],
              subject: `Hemos recibido tu requerimiento [Ticket: ${ticketId}] - Tu Poder Virtual`,
              html: clientHtml,
            }),
          });

          if (resClient.ok) {
            emailClientSent = true;
          } else {
            const errClientText = await resClient.text();
            errors.push(`Error Resend Cliente: ${errClientText}`);
          }
        } catch (errClient) {
          errors.push(`Excepción Resend Cliente: ${String(errClient)}`);
        }
      }
    }

    // =========================================================================
    // 2. ENVÍO DE NOTIFICACIÓN A TELEGRAM (SI ESTÁ CONFIGURADO BOT_TOKEN & CHAT_ID)
    // =========================================================================
    if (telegramToken && telegramChatId) {
      try {
        const tgText = `🔔 *NUEVA SOLICITUD WEB - TU PODER VIRTUAL*
━━━━━━━━━━━━━━━━━━━━
🎫 *Ticket:* \`${ticketId}\`
📅 *Fecha:* ${nowFormatted}
👤 *Nombre:* ${name || 'No especificado'}
📱 *Teléfono:* ${phone || 'No especificado'}
📧 *Correo:* ${email || 'No especificado'}
🛠️ *Servicio:* ${serviceName}
━━━━━━━━━━━━━━━━━━━━
📝 *Requerimiento:*
${message}
━━━━━━━━━━━━━━━━━━━━
${phone ? `👉 [Escribir al WhatsApp](https://wa.me/${phone.replace(/\D/g, '')})` : ''}`;

        const tgUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
        const resTg = await fetch(tgUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: tgText,
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
          }),
        });

        if (resTg.ok) {
          telegramSent = true;
        } else {
          const errTg = await resTg.text();
          errors.push(`Error Telegram: ${errTg}`);
        }
      } catch (errTg) {
        errors.push(`Excepción Telegram: ${String(errTg)}`);
      }
    }

    // Respuesta final completa
    return jsonResponse({
      success: true,
      message: 'Solicitud procesada con éxito',
      ticketId,
      emailAdminSent,
      emailClientSent,
      telegramSent,
      configuredProviders: {
        resend: Boolean(resendKey),
        telegram: Boolean(telegramToken && telegramChatId),
      },
      note:
        !resendKey && !telegramToken
          ? 'Variables RESEND_API_KEY y/o TELEGRAM_BOT_TOKEN pendientes de configurar en Cloudflare Pages.'
          : undefined,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Error general en /api/contact:', errorMsg);
    return jsonResponse({ success: false, error: errorMsg }, 500);
  }
};
