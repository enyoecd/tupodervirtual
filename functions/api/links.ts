// ==============================================================================
// CLOUDFLARE PAGES FUNCTIONS: /api/links
// Base de datos: Cloudflare D1 (Binding: DB)
// ==============================================================================

interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  error?: string;
  meta?: unknown;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<D1Result[]>;
}

interface Env {
  DB?: D1Database;
}

interface LinkRow {
  id: string;
  section: string;
  title: string;
  url: string;
  description: string | null;
  tag: string | null;
  provider: string | null;
  badge_color: string | null;
  order_index: number;
}

const jsonResponse = (data: unknown, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};

// 1. OBTENER ENLACES (GET)
export const onRequestGet = async (context: { env: Env }) => {
  try {
    const { env } = context;
    if (!env.DB) {
      return jsonResponse(
        { error: 'Cloudflare D1 binding (DB) no configurado en Settings > Functions' },
        500
      );
    }

    const query = `
      SELECT id, section, title, url, description, tag, provider, badge_color, order_index
      FROM links
      ORDER BY section ASC, order_index ASC
    `;
    const result = await env.DB.prepare(query).all<LinkRow>();

    // Mapear snake_case de SQLite a camelCase para el frontend React
    const formatted = (result.results || []).map((row) => ({
      id: row.id,
      section: row.section,
      title: row.title,
      url: row.url,
      description: row.description || '',
      tag: row.tag || 'General',
      provider: row.provider || undefined,
      badgeColor: row.badge_color || undefined,
      order_index: row.order_index,
    }));

    return jsonResponse({ success: true, data: formatted });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return jsonResponse({ success: false, error: message }, 500);
  }
};

// 2. CREAR NUEVO ENLACE (POST)
export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const { request, env } = context;
    if (!env.DB) {
      return jsonResponse({ error: 'Cloudflare D1 binding (DB) no configurado' }, 500);
    }

    const body = (await request.json()) as {
      id?: string;
      section: string;
      title: string;
      url: string;
      description?: string;
      tag?: string;
      provider?: string;
      badgeColor?: string;
      order_index?: number;
    };

    if (!body.title || !body.url || !body.section) {
      return jsonResponse({ error: 'Faltan campos obligatorios (title, url, section)' }, 400);
    }

    const id = body.id || `link-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const orderIndex = body.order_index ?? 999;

    const query = `
      INSERT INTO links (id, section, title, url, description, tag, provider, badge_color, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await env.DB.prepare(query)
      .bind(
        id,
        body.section,
        body.title,
        body.url,
        body.description || '',
        body.tag || 'General',
        body.provider || null,
        body.badgeColor || null,
        orderIndex
      )
      .run();

    return jsonResponse({ success: true, id, message: 'Enlace creado exitosamente' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return jsonResponse({ success: false, error: message }, 500);
  }
};

// 3. EDITAR ENLACE O REORDENAR LOTES (PUT)
export const onRequestPut = async (context: { request: Request; env: Env }) => {
  try {
    const { request, env } = context;
    if (!env.DB) {
      return jsonResponse({ error: 'Cloudflare D1 binding (DB) no configurado' }, 500);
    }

    const body = (await request.json()) as {
      reorder?: { id: string; order_index: number }[];
      id?: string;
      section?: string;
      title?: string;
      url?: string;
      description?: string;
      tag?: string;
      provider?: string;
      badgeColor?: string;
      order_index?: number;
    };

    // Caso A: Reordenar por lote (Drag & Drop masivo)
    if (Array.isArray(body.reorder) && body.reorder.length > 0) {
      const statements = body.reorder.map((item) =>
        env.DB!.prepare('UPDATE links SET order_index = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(
          item.order_index,
          item.id
        )
      );

      await env.DB.batch(statements);
      return jsonResponse({ success: true, message: 'Orden de enlaces actualizado en D1' });
    }

    // Caso B: Editar un enlace individual
    if (!body.id) {
      return jsonResponse({ error: 'Se requiere id para actualizar' }, 400);
    }

    const query = `
      UPDATE links
      SET section = COALESCE(?, section),
          title = COALESCE(?, title),
          url = COALESCE(?, url),
          description = COALESCE(?, description),
          tag = COALESCE(?, tag),
          provider = ?,
          badge_color = COALESCE(?, badge_color),
          order_index = COALESCE(?, order_index),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    await env.DB.prepare(query)
      .bind(
        body.section || null,
        body.title || null,
        body.url || null,
        body.description ?? null,
        body.tag || null,
        body.provider ?? null,
        body.badgeColor || null,
        body.order_index ?? null,
        body.id
      )
      .run();

    return jsonResponse({ success: true, message: 'Enlace actualizado en D1' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return jsonResponse({ success: false, error: message }, 500);
  }
};

// 4. ELIMINAR ENLACE (DELETE)
export const onRequestDelete = async (context: { request: Request; env: Env }) => {
  try {
    const { request, env } = context;
    if (!env.DB) {
      return jsonResponse({ error: 'Cloudflare D1 binding (DB) no configurado' }, 500);
    }

    const url = new URL(request.url);
    let id = url.searchParams.get('id');

    if (!id) {
      try {
        const body = (await request.json()) as { id?: string };
        id = body?.id || null;
      } catch {
        // no body
      }
    }

    if (!id) {
      return jsonResponse({ error: 'Se requiere id para eliminar' }, 400);
    }

    await env.DB.prepare('DELETE FROM links WHERE id = ?').bind(id).run();

    return jsonResponse({ success: true, message: `Enlace ${id} eliminado de D1` });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return jsonResponse({ success: false, error: message }, 500);
  }
};
