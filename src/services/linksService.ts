import { ManagedLink } from '../types/managedLinks';
import { INITIAL_MANAGED_LINKS } from '../data/defaultLinks';

const STORAGE_KEY = 'tpv_managed_links_v1';
const API_URL = '/api/links';

export const linksService = {
  /**
   * Carga los enlaces desde Cloudflare D1 (/api/links),
   * con respaldo transparente en localStorage y datos por defecto.
   * Si la tabla en D1 existe pero está vacía, la inicializa automáticamente.
   */
  async fetchLinks(): Promise<{ links: ManagedLink[]; isFromD1: boolean }> {
    try {
      const response = await fetch(API_URL, {
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          if (json.data.length > 0) {
            // Guardar copia local en caso de desconexión
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
            } catch {
              // ignore
            }
            return { links: json.data, isFromD1: true };
          } else {
            // D1 está conectado pero la tabla está vacía.
            // Sincronizamos automáticamente los enlaces iniciales:
            let linksToSeed = INITIAL_MANAGED_LINKS;
            try {
              const local = localStorage.getItem(STORAGE_KEY);
              if (local) {
                const parsed = JSON.parse(local);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  linksToSeed = parsed;
                }
              }
            } catch {
              // ignore
            }

            try {
              await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'seed', links: linksToSeed }),
              });
            } catch {
              // ignore
            }

            return { links: linksToSeed, isFromD1: true };
          }
        }
      }
    } catch {
      // Si la API no está disponible (modo dev local o aún no desplegado en Cloudflare), continuamos con localStorage
    }

    // Fallback: Recuperar de localStorage o datos iniciales
    try {
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return { links: parsed, isFromD1: false };
        }
      }
    } catch {
      // ignore
    }

    return { links: INITIAL_MANAGED_LINKS, isFromD1: false };
  },

  /**
   * Guarda un enlace nuevo en Cloudflare D1 y en localStorage.
   */
  async createLink(newLink: ManagedLink): Promise<boolean> {
    let savedInD1 = false;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLink),
      });
      if (res.ok) {
        savedInD1 = true;
      }
    } catch {
      // offline o preview
    }
    return savedInD1;
  },

  /**
   * Actualiza un enlace existente en Cloudflare D1 y en localStorage.
   */
  async updateLink(updatedLink: ManagedLink): Promise<boolean> {
    let savedInD1 = false;
    try {
      const res = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLink),
      });
      if (res.ok) {
        savedInD1 = true;
      }
    } catch {
      // offline o preview
    }
    return savedInD1;
  },

  /**
   * Actualiza el nuevo orden de enlaces en lote (Drag & Drop) en Cloudflare D1.
   */
  async reorderLinks(items: { id: string; order_index: number }[]): Promise<boolean> {
    let savedInD1 = false;
    try {
      const res = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reorder: items }),
      });
      if (res.ok) {
        savedInD1 = true;
      }
    } catch {
      // offline o preview
    }
    return savedInD1;
  },

  /**
   * Elimina un enlace por ID en Cloudflare D1 y en localStorage.
   */
  async deleteLink(id: string): Promise<boolean> {
    let deletedInD1 = false;
    try {
      const res = await fetch(`${API_URL}?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        deletedInD1 = true;
      }
    } catch {
      // offline o preview
    }
    return deletedInD1;
  },

  /**
   * Fuerza la sincronización completa de un conjunto de enlaces hacia Cloudflare D1.
   */
  async syncAllToD1(links: ManagedLink[]): Promise<boolean> {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed', links }),
      });
      return res.ok;
    } catch {
      return false;
    }
  },
};
