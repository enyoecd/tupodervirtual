-- ==============================================================================
-- CLOUDFLARE D1 DATABASE SCHEMA
-- Proyecto: Tu Poder Virtual (/enyo enlaces y herramientas)
-- ==============================================================================

-- PARTE 1: CREACIÓN DE LA TABLA Y EL ÍNDICE (Solo ejecuta esto en D1 Console)
-- ==============================================================================
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

CREATE INDEX IF NOT EXISTS idx_links_section_order ON links(section, order_index);

-- NOTA:
-- ¡Ya no necesitas pegar miles de líneas de datos en la consola de D1!
-- La aplicación web ahora se encarga de sincronizar todos los enlaces
-- iniciales automáticamente la primera vez que abras tu web en Cloudflare Pages.
