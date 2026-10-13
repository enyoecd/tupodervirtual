import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Globe, Tag, AlignLeft, Layers, ShieldCheck } from 'lucide-react';
import { ManagedLink, LinkSectionKey } from '../../types/managedLinks';
import { SECTIONS_META } from '../../data/defaultLinks';

interface LinkEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (linkData: Omit<ManagedLink, 'id' | 'order_index'> & { id?: string }) => void;
  initialLink?: ManagedLink | null;
  defaultSection?: LinkSectionKey;
}

const BADGE_COLOR_OPTIONS = [
  { label: 'Esmeralda', value: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' },
  { label: 'Cyan', value: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' },
  { label: 'Ámbar', value: 'border-amber-500/30 text-amber-400 bg-amber-500/10' },
  { label: 'Azul', value: 'border-blue-500/30 text-blue-400 bg-blue-500/10' },
  { label: 'Rosa / Rojo', value: 'border-rose-500/30 text-rose-400 bg-rose-500/10' },
  { label: 'Púrpura', value: 'border-purple-500/30 text-purple-400 bg-purple-500/10' },
  { label: 'Lima', value: 'border-lime-500/30 text-lime-400 bg-lime-500/10' },
  { label: 'Violeta', value: 'border-violet-500/30 text-violet-400 bg-violet-500/10' },
];

export const LinkEditorModal: React.FC<LinkEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialLink,
  defaultSection = 'blog-software',
}) => {
  const [section, setSection] = useState<LinkSectionKey>(defaultSection);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [provider, setProvider] = useState('');
  const [badgeColor, setBadgeColor] = useState(BADGE_COLOR_OPTIONS[0].value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialLink) {
      setSection(initialLink.section);
      setTitle(initialLink.title);
      setUrl(initialLink.url);
      setDescription(initialLink.description || '');
      setTag(initialLink.tag || 'General');
      setProvider(initialLink.provider || '');
      setBadgeColor(initialLink.badgeColor || BADGE_COLOR_OPTIONS[0].value);
    } else {
      setSection(defaultSection);
      setTitle('');
      setUrl('');
      setDescription('');
      setTag('General');
      setProvider('');
      setBadgeColor(BADGE_COLOR_OPTIONS[0].value);
    }
    setError(null);
  }, [initialLink, defaultSection, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Por favor indica un título para el enlace.');
      return;
    }
    if (!url.trim()) {
      setError('Por favor indica la URL del enlace.');
      return;
    }

    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    onSave({
      id: initialLink ? initialLink.id : undefined,
      section,
      title: title.trim(),
      url: cleanUrl,
      description: description.trim(),
      tag: tag.trim() || 'General',
      provider: provider.trim() || undefined,
      badgeColor,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-emerald-950/30 overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              {initialLink ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                {initialLink ? 'Editar Enlace' : 'Agregar Nuevo Enlace'}
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                {initialLink ? `Modificando ID: ${initialLink.id}` : 'Creación para base de datos y panel'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
              ⚠ {error}
            </div>
          )}

          {/* Sección destino */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Sección de la Página:
            </label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value as LinkSectionKey)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-sans text-slate-200 outline-none transition-all"
            >
              {SECTIONS_META.map((sec) => (
                <option key={sec.key} value={sec.key} className="bg-slate-900 text-slate-100">
                  {sec.title}
                </option>
              ))}
            </select>
          </div>

          {/* Título */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Título / Nombre:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Rufus, Ninite, Mi Carpeta Drive..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-200 outline-none transition-all"
              required
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              Dirección URL / Enlace:
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-mono text-slate-200 outline-none transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tag / Categoría */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                Categoría / Etiqueta:
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Ej: Utilidad, ISOs, Antivirus..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-200 outline-none transition-all"
              />
            </div>

            {/* Proveedor / Plataforma */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                Proveedor (Opcional):
              </label>
              <input
                type="text"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                placeholder="Google Drive, Mega, Telegram..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-200 outline-none transition-all"
              />
            </div>
          </div>

          {/* Color de la etiqueta */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Color del distintivo:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BADGE_COLOR_OPTIONS.map((col) => (
                <button
                  type="button"
                  key={col.label}
                  onClick={() => setBadgeColor(col.value)}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all text-center cursor-pointer ${col.value} ${
                    badgeColor === col.value ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900 scale-102' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {col.label}
                </button>
              ))}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5 text-emerald-400" />
              Descripción corta:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve resumen de qué hace esta herramienta o archivo..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-200 outline-none transition-all resize-none"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {initialLink ? 'Guardar Cambios' : 'Agregar Enlace'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
