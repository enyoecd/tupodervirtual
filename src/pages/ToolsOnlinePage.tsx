import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Youtube,
  Download,
  Terminal,
  Sparkles,
  ArrowLeft,
  Globe,
  CheckCircle2,
  Lock,
  Cloud,
  Send,
  MessageCircle,
  Music,
  FolderDown,
  Bookmark,
  GripVertical,
  Pencil,
  Trash2,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  ArrowUp,
  ArrowDown,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MatrixPasswordGate } from '../components/matrix/MatrixPasswordGate';
import { ManagedLink, LinkSectionKey } from '../types/managedLinks';
import { INITIAL_MANAGED_LINKS, SECTIONS_META } from '../data/defaultLinks';
import { LinkEditorModal } from '../components/enyo/LinkEditorModal';
import { linksService } from '../services/linksService';
import {
  getProviderBrandIcon,
  BloggerIcon,
  TelegramIcon,
  WhatsAppIcon,
} from '../components/BrandIcons';

const STORAGE_KEY = 'tpv_managed_links_v1';

export const ToolsOnlinePage: React.FC = () => {
  const { navigateTo, isEnyoAuthorized, isPreUnlocked, unlockEnyo, lockEnyo } = useApp();

  // Estado dinámico de los enlaces
  const [links, setLinks] = useState<ManagedLink[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (err) {
        console.error('Error cargando enlaces guardados:', err);
      }
    }
    return INITIAL_MANAGED_LINKS;
  });

  const [isD1Connected, setIsD1Connected] = useState(false);

  // Cargar enlaces al iniciar desde Cloudflare D1 (/api/links) o local
  useEffect(() => {
    linksService.fetchLinks().then(({ links: fetched, isFromD1 }) => {
      setLinks(fetched);
      setIsD1Connected(isFromD1);
    });
  }, []);

  // Modo edición / administración
  const [isEditMode, setIsEditMode] = useState(false);

  // Modal para agregar / editar enlaces
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<ManagedLink | null>(null);
  const [modalDefaultSection, setModalDefaultSection] = useState<LinkSectionKey>('blog-software');

  // Estado de arrastrar y soltar (Drag and Drop)
  const [draggedLinkId, setDraggedLinkId] = useState<string | null>(null);
  const [dragOverLinkId, setDragOverLinkId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistir en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    } catch (e) {
      console.error('Error guardando enlaces en localStorage:', e);
    }
  }, [links]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filtrar enlaces por sección ordenados por order_index
  const getSectionLinks = (sectionKey: LinkSectionKey): ManagedLink[] => {
    return links
      .filter((l) => l.section === sectionKey)
      .sort((a, b) => a.order_index - b.order_index);
  };

  // Abrir modal para crear
  const handleOpenAddModal = (sectionKey?: LinkSectionKey) => {
    setEditingLink(null);
    setModalDefaultSection(sectionKey || 'blog-software');
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const handleOpenEditModal = (link: ManagedLink) => {
    setEditingLink(link);
    setModalDefaultSection(link.section);
    setIsModalOpen(true);
  };

  // Guardar (crear o actualizar)
  const handleSaveLink = async (linkData: Omit<ManagedLink, 'id' | 'order_index'> & { id?: string }) => {
    if (linkData.id) {
      // Actualizar enlace existente
      const existing = links.find((l) => l.id === linkData.id);
      const updated = { ...(existing || {}), ...linkData } as ManagedLink;
      setLinks((prev) =>
        prev.map((item) => (item.id === linkData.id ? updated : item))
      );
      await linksService.updateLink(updated);
      showNotification('Enlace actualizado correctamente');
    } else {
      // Crear nuevo enlace
      const sectionItems = getSectionLinks(linkData.section);
      const nextOrder = sectionItems.length > 0 ? Math.max(...sectionItems.map((i) => i.order_index)) + 1 : 0;
      const newLink: ManagedLink = {
        ...linkData,
        id: `link-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        order_index: nextOrder,
      };
      setLinks((prev) => [...prev, newLink]);
      await linksService.createLink(newLink);
      showNotification('Nuevo enlace añadido con éxito');
    }
  };

  // Eliminar enlace
  const handleDeleteLink = async (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el enlace "${title}"?`)) {
      setLinks((prev) => prev.filter((item) => item.id !== id));
      await linksService.deleteLink(id);
      showNotification(`Enlace "${title}" eliminado`);
    }
  };

  // Restablecer a los originales
  const handleResetToDefault = () => {
    if (
      window.confirm(
        '¿Deseas restablecer todos los enlaces al listado original del blog? Se perderán las modificaciones locales.'
      )
    ) {
      setLinks(INITIAL_MANAGED_LINKS);
      showNotification('Enlaces restablecidos a los valores originales');
    }
  };

  // Reordenar arrastrando y soltando dentro de la misma sección
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLinkId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverLinkId !== targetId) {
      setDragOverLinkId(targetId);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedLinkId || draggedLinkId === targetId) {
      setDraggedLinkId(null);
      setDragOverLinkId(null);
      return;
    }

    const draggedItem = links.find((l) => l.id === draggedLinkId);
    const targetItem = links.find((l) => l.id === targetId);

    if (!draggedItem || !targetItem || draggedItem.section !== targetItem.section) {
      setDraggedLinkId(null);
      setDragOverLinkId(null);
      return;
    }

    // Reordenar dentro de la sección
    const sectionKey = draggedItem.section;
    const sectionItems = getSectionLinks(sectionKey);

    const fromIdx = sectionItems.findIndex((l) => l.id === draggedLinkId);
    const toIdx = sectionItems.findIndex((l) => l.id === targetId);

    if (fromIdx === -1 || toIdx === -1) return;

    const reordered = [...sectionItems];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);

    // Actualizar order_index para cada elemento de la sección
    const updatedIdsMap = new Map<string, number>();
    reordered.forEach((item, index) => {
      updatedIdsMap.set(item.id, index);
    });

    setLinks((prev) =>
      prev.map((item) => {
        if (updatedIdsMap.has(item.id)) {
          return { ...item, order_index: updatedIdsMap.get(item.id)! };
        }
        return item;
      })
    );

    // Guardar nuevo orden en Cloudflare D1
    const reorderPayload = Array.from(updatedIdsMap.entries()).map(([id, order_index]) => ({ id, order_index }));
    linksService.reorderLinks(reorderPayload);

    setDraggedLinkId(null);
    setDragOverLinkId(null);
    showNotification('Posición actualizada');
  };

  const handleDragEnd = () => {
    setDraggedLinkId(null);
    setDragOverLinkId(null);
  };

  // Mover elemento arriba o abajo (para accesibilidad / móviles)
  const handleMoveStep = (id: string, direction: 'up' | 'down') => {
    const item = links.find((l) => l.id === id);
    if (!item) return;

    const sectionItems = getSectionLinks(item.section);
    const currIdx = sectionItems.findIndex((l) => l.id === id);
    const targetIdx = direction === 'up' ? currIdx - 1 : currIdx + 1;

    if (targetIdx < 0 || targetIdx >= sectionItems.length) return;

    const reordered = [...sectionItems];
    const [moved] = reordered.splice(currIdx, 1);
    reordered.splice(targetIdx, 0, moved);

    const updatedIdsMap = new Map<string, number>();
    reordered.forEach((it, index) => {
      updatedIdsMap.set(it.id, index);
    });

    setLinks((prev) =>
      prev.map((it) => {
        if (updatedIdsMap.has(it.id)) {
          return { ...it, order_index: updatedIdsMap.get(it.id)! };
        }
        return it;
      })
    );

    // Guardar nuevo orden en Cloudflare D1
    const reorderPayload = Array.from(updatedIdsMap.entries()).map(([id, order_index]) => ({ id, order_index }));
    linksService.reorderLinks(reorderPayload);
  };

  // Si no está autenticado, muestra la pantalla negra estilo Matrix de Neo
  if (!isEnyoAuthorized) {
    return <MatrixPasswordGate onUnlock={unlockEnyo} autoBypass={isPreUnlocked} />;
  }

  return (
    <div className="py-10 sm:py-16 bg-slate-950 text-slate-100 min-h-screen relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-mono text-xs font-bold shadow-2xl shadow-emerald-500/30 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal para crear / editar enlaces */}
      <LinkEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLink}
        initialLink={editingLink}
        defaultSection={modalDefaultSection}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Secret Access Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la Página Principal
          </button>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acceso Privado [enyo]</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <button
              onClick={() => lockEnyo()}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg border border-rose-500/30 transition-colors cursor-pointer"
              title="Bloquear acceso y volver a la pantalla Matrix"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Bloquear</span>
            </button>
          </div>
        </div>

        {/* Main Header & Admin Control Bar */}
        <div className="mb-10 border-b border-slate-800 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                Plataforma Personal de Gestión
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Herramientas y utilidades online
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
                Centro de comando y panel personal con accesos directos seleccionados para diagnóstico informático,
                servicios web esenciales, repositorios de software en la nube del blog, sitios favoritos, canales y música.
              </p>
            </div>

            {/* Panel de Control de Administración y Arrastrar */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-3 min-w-[280px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">
                    Modo Edición:
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isEditMode ? 'bg-emerald-500 shadow-md shadow-emerald-500/40' : 'bg-slate-700'
                  }`}
                  role="switch"
                  aria-checked={isEditMode}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow ring-0 transition duration-200 ease-in-out ${
                      isEditMode ? 'translate-x-6 bg-white' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => handleOpenAddModal()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 font-mono text-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nuevo enlace</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 font-mono text-xs transition-colors cursor-pointer"
                  title="Restablecer todos los enlaces originales"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-500 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span>{links.length} enlaces activos</span>
                  {isEditMode ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      Arrastra o edita
                    </span>
                  ) : (
                    <span>Solo lectura</span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px]">
                  <span className="text-slate-400">Almacenamiento:</span>
                  <span
                    className={`font-semibold flex items-center gap-1 ${
                      isD1Connected ? 'text-emerald-400' : 'text-cyan-400'
                    }`}
                    title={
                      isD1Connected
                        ? 'Conectado a Cloudflare D1 SQL'
                        : 'Guardado en navegador (listo para Cloudflare D1)'
                    }
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isD1Connected ? 'bg-emerald-400' : 'bg-cyan-400'
                      }`}
                    ></span>
                    {isD1Connected ? 'Cloudflare D1 (SQL)' : 'Memoria Local (Híbrido)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner explicativo del Modo Edición */}
          {isEditMode && (
            <div className="mt-6 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-emerald-300">
              <div className="flex items-center gap-2.5">
                <GripVertical className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>
                  <strong>Modo Edición Activado:</strong> Arrastra desde el icono de agarre ⋮⋮ para reordenar, o usa los botones para editar ✎, eliminar 🗑 o mover ↑↓.
                </span>
              </div>
              <button
                onClick={() => setIsEditMode(false)}
                className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shrink-0 cursor-pointer"
              >
                Listo / Cerrar Edición
              </button>
            </div>
          )}
        </div>

        {/* 1. SECCIÓN: Repositorios de Software del Blog (LISTA VERTICAL) */}
        <section className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <FolderDown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  Software y Repositorios en la Nube (Tu Poder Virtual)
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Enlaces directos a los directorios de software, suites, imágenes ISO y APKs alojados en Drive, Mega, OneDrive y Telegram.
                </p>
              </div>
            </div>

            {isEditMode && (
              <button
                onClick={() => handleOpenAddModal('blog-software')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg border border-cyan-500/30 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar a esta sección
              </button>
            )}
          </div>

          {/* LISTA VERTICAL: una debajo de la otra */}
          <div className="flex flex-col gap-2.5">
            {getSectionLinks('blog-software').map((item, idx, arr) => {
              const isBeingDragged = draggedLinkId === item.id;
              const isDropTarget = dragOverLinkId === item.id;

              return (
                <div
                  key={item.id}
                  draggable={isEditMode}
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragOver={(e) => handleDragOver(e, item.id)}
                  onDrop={(e) => handleDrop(e, item.id)}
                  onDragEnd={handleDragEnd}
                  className={`group p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isDropTarget
                      ? 'border-emerald-400 ring-2 ring-emerald-500/30 bg-slate-800'
                      : isBeingDragged
                      ? 'border-dashed border-cyan-400 opacity-40 bg-slate-950'
                      : 'border-slate-800/90 hover:border-cyan-500/60 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                    {/* Handle de arrastre */}
                    {isEditMode && (
                      <div
                        className="cursor-grab active:cursor-grabbing p-1.5 rounded text-slate-500 hover:text-cyan-400 hover:bg-slate-800/60 transition-colors"
                        title="Arrastra para reordenar"
                      >
                        <GripVertical className="w-4 h-4" />
                      </div>
                    )}

                    <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center group-hover:scale-105 transition-all shrink-0 mt-0.5 sm:mt-0 p-1.5 overflow-hidden">
                      {getProviderBrandIcon(item.provider, item.title, item.tag) || (
                        <Cloud className="w-4 h-4 text-cyan-400" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono font-bold text-sm sm:text-base text-slate-100 hover:text-cyan-300 transition-colors"
                        >
                          {item.title}
                        </a>
                        {item.provider && (
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${item.badgeColor || 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'}`}>
                            {item.provider}
                          </span>
                        )}
                        <span className="hidden md:inline text-[10px] font-mono text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 sm:mt-0.5 truncate max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Acciones: Editar / Mover / Abrir */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {isEditMode ? (
                      <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800">
                        <button
                          type="button"
                          onClick={() => handleMoveStep(item.id, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                          title="Subir posición"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveStep(item.id, 'down')}
                          disabled={idx === arr.length - 1}
                          className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                          title="Bajar posición"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                          title="Editar enlace"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLink(item.id, item.title)}
                          className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Eliminar enlace"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : null}

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform"
                    >
                      <span className="hidden sm:inline">Abrir enlace</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. SECCIÓN: Web Favoritas del Blog (EN FORMATO TARJETITAS) */}
        <section className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  Sitios Web Favoritos
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Selección de páginas y recursos web recomendados del blog para utilidades, noticias, software y entretenimiento.
                </p>
              </div>
            </div>

            {isEditMode && (
              <button
                onClick={() => handleOpenAddModal('favorite-websites')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar a esta sección
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getSectionLinks('favorite-websites').map((tool, idx, arr) => {
              const isBeingDragged = draggedLinkId === tool.id;
              const isDropTarget = dragOverLinkId === tool.id;

              return (
                <div
                  key={tool.id}
                  draggable={isEditMode}
                  onDragStart={(e) => handleDragStart(e, tool.id)}
                  onDragOver={(e) => handleDragOver(e, tool.id)}
                  onDrop={(e) => handleDrop(e, tool.id)}
                  onDragEnd={handleDragEnd}
                  className={`group p-4 rounded-xl bg-slate-900/80 border transition-all duration-200 flex flex-col justify-between ${
                    isDropTarget
                      ? 'border-emerald-400 ring-2 ring-emerald-500/30 bg-slate-800'
                      : isBeingDragged
                      ? 'border-dashed border-amber-400 opacity-40 bg-slate-950'
                      : 'border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-amber-950/20'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        {isEditMode && (
                          <div
                            className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-amber-400 transition-colors"
                            title="Arrastra para reordenar"
                          >
                            <GripVertical className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${tool.badgeColor || 'border-amber-500/30 text-amber-400 bg-amber-500/10'}`}>
                          {tool.tag}
                        </span>
                      </div>

                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 group-hover:text-amber-400 transition-colors shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        {tool.title}
                      </a>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                    {isEditMode ? (
                      <div className="flex items-center gap-1 w-full justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveStep(tool.id, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-amber-400 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveStep(tool.id, 'down')}
                            disabled={idx === arr.length - 1}
                            className="p-1 text-slate-400 hover:text-amber-400 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(tool)}
                            className="p-1 text-slate-400 hover:text-amber-300 cursor-pointer"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteLink(tool.id, tool.title)}
                            className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full text-amber-400 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Abrir sitio</span>
                        <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. SECCIÓN: Páginas y Utilidades Web Online */}
        <section className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  Páginas y Utilidades Web Online
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Herramientas en la nube para análisis rápido, verificación de red, archivos y seguridad.
                </p>
              </div>
            </div>

            {isEditMode && (
              <button
                onClick={() => handleOpenAddModal('online-utilities')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar a esta sección
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getSectionLinks('online-utilities').map((tool, idx, arr) => {
              const isBeingDragged = draggedLinkId === tool.id;
              const isDropTarget = dragOverLinkId === tool.id;

              return (
                <div
                  key={tool.id}
                  draggable={isEditMode}
                  onDragStart={(e) => handleDragStart(e, tool.id)}
                  onDragOver={(e) => handleDragOver(e, tool.id)}
                  onDrop={(e) => handleDrop(e, tool.id)}
                  onDragEnd={handleDragEnd}
                  className={`group p-4 rounded-xl bg-slate-900/80 border transition-all duration-200 flex flex-col justify-between ${
                    isDropTarget
                      ? 'border-emerald-400 ring-2 ring-emerald-500/30 bg-slate-800'
                      : isBeingDragged
                      ? 'border-dashed border-emerald-400 opacity-40 bg-slate-950'
                      : 'border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-emerald-950/20'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        {isEditMode && (
                          <div
                            className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-emerald-400 transition-colors"
                            title="Arrastra para reordenar"
                          >
                            <GripVertical className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${tool.badgeColor || 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'}`}>
                          {tool.tag}
                        </span>
                      </div>

                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        {tool.title}
                      </a>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                    {isEditMode ? (
                      <div className="flex items-center gap-1 w-full justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveStep(tool.id, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-emerald-400 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveStep(tool.id, 'down')}
                            disabled={idx === arr.length - 1}
                            className="p-1 text-slate-400 hover:text-emerald-400 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(tool)}
                            className="p-1 text-slate-400 hover:text-emerald-300 cursor-pointer"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteLink(tool.id, tool.title)}
                            className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full text-emerald-400 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Abrir utilidad</span>
                        <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. SECCIÓN: Software de Descarga Esencial */}
        <section className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  Software de Descarga Esencial
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Enlaces directos a los instaladores oficiales y utilidades de soporte y diagnóstico técnico.
                </p>
              </div>
            </div>

            {isEditMode && (
              <button
                onClick={() => handleOpenAddModal('software-downloads')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg border border-cyan-500/30 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar a esta sección
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getSectionLinks('software-downloads').map((soft, idx, arr) => {
              const isBeingDragged = draggedLinkId === soft.id;
              const isDropTarget = dragOverLinkId === soft.id;

              return (
                <div
                  key={soft.id}
                  draggable={isEditMode}
                  onDragStart={(e) => handleDragStart(e, soft.id)}
                  onDragOver={(e) => handleDragOver(e, soft.id)}
                  onDrop={(e) => handleDrop(e, soft.id)}
                  onDragEnd={handleDragEnd}
                  className={`group p-4 rounded-xl bg-slate-900/80 border transition-all duration-200 flex flex-col justify-between ${
                    isDropTarget
                      ? 'border-emerald-400 ring-2 ring-emerald-500/30 bg-slate-800'
                      : isBeingDragged
                      ? 'border-dashed border-cyan-400 opacity-40 bg-slate-950'
                      : 'border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-cyan-950/20'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        {isEditMode && (
                          <div
                            className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-cyan-400 transition-colors"
                            title="Arrastra para reordenar"
                          >
                            <GripVertical className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${soft.badgeColor || 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'}`}>
                          {soft.tag}
                        </span>
                      </div>

                      <a
                        href={soft.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>

                    <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      <a href={soft.url} target="_blank" rel="noopener noreferrer">
                        {soft.title}
                      </a>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {soft.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                    {isEditMode ? (
                      <div className="flex items-center gap-1 w-full justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveStep(soft.id, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveStep(soft.id, 'down')}
                            disabled={idx === arr.length - 1}
                            className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(soft)}
                            className="p-1 text-slate-400 hover:text-cyan-300 cursor-pointer"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteLink(soft.id, soft.title)}
                            className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={soft.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full text-cyan-400 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Ir a descarga oficial</span>
                        <span>↓</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. SECCIÓN: Canal de YouTube & Recursos Multimedia */}
        <section className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  Canal de YouTube & Recursos Multimedia
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Canal oficial Tu Poder Virtual, tutoriales técnicos y guías de servicio.
                </p>
              </div>
            </div>

            {isEditMode && (
              <button
                onClick={() => handleOpenAddModal('youtube')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg border border-rose-500/30 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar a esta sección
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {getSectionLinks('youtube').map((yt, idx, arr) => {
              const isBeingDragged = draggedLinkId === yt.id;
              const isDropTarget = dragOverLinkId === yt.id;

              return (
                <div
                  key={yt.id}
                  draggable={isEditMode}
                  onDragStart={(e) => handleDragStart(e, yt.id)}
                  onDragOver={(e) => handleDragOver(e, yt.id)}
                  onDrop={(e) => handleDrop(e, yt.id)}
                  onDragEnd={handleDragEnd}
                  className={`group p-5 rounded-xl bg-slate-900/80 border transition-all duration-200 flex flex-col justify-between ${
                    isDropTarget
                      ? 'border-emerald-400 ring-2 ring-emerald-500/30 bg-slate-800'
                      : isBeingDragged
                      ? 'border-dashed border-rose-400 opacity-40 bg-slate-950'
                      : 'border-slate-800 hover:border-rose-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-rose-950/20'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        {isEditMode && (
                          <div
                            className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-rose-400 transition-colors"
                            title="Arrastra para reordenar"
                          >
                            <GripVertical className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${yt.badgeColor || 'border-rose-500/30 text-rose-400 bg-rose-500/10'}`}>
                          {yt.tag}
                        </span>
                      </div>
                      <Youtube className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-300 transition-colors">
                      <a href={yt.url} target="_blank" rel="noopener noreferrer">
                        {yt.title}
                      </a>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                      {yt.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                    {isEditMode ? (
                      <div className="flex items-center gap-1 w-full justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveStep(yt.id, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-rose-400 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveStep(yt.id, 'down')}
                            disabled={idx === arr.length - 1}
                            className="p-1 text-slate-400 hover:text-rose-400 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(yt)}
                            className="p-1 text-slate-400 hover:text-rose-300 cursor-pointer"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteLink(yt.id, yt.title)}
                            className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={yt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full text-rose-400 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Ver en YouTube</span>
                        <span>▶</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. SECCIÓN: Mi Música en Plataformas */}
        <section className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  Mi Música en Plataformas
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Playlists, selecciones musicales y colecciones de audio disponibles en Spotify, Deezer, SoundCloud y almacenamiento en nube.
                </p>
              </div>
            </div>

            {isEditMode && (
              <button
                onClick={() => handleOpenAddModal('music')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-1.5 rounded-lg border border-purple-500/30 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar a esta sección
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getSectionLinks('music').map((item, idx, arr) => {
              const isBeingDragged = draggedLinkId === item.id;
              const isDropTarget = dragOverLinkId === item.id;

              return (
                <div
                  key={item.id}
                  draggable={isEditMode}
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragOver={(e) => handleDragOver(e, item.id)}
                  onDrop={(e) => handleDrop(e, item.id)}
                  onDragEnd={handleDragEnd}
                  className={`group p-4 rounded-xl bg-slate-900/80 border transition-all duration-200 flex flex-col justify-between ${
                    isDropTarget
                      ? 'border-emerald-400 ring-2 ring-emerald-500/30 bg-slate-800'
                      : isBeingDragged
                      ? 'border-dashed border-purple-400 opacity-40 bg-slate-950'
                      : 'border-slate-800 hover:border-purple-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-purple-950/20'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        {isEditMode && (
                          <div
                            className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-purple-400 transition-colors"
                            title="Arrastra para reordenar"
                          >
                            <GripVertical className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${item.badgeColor || 'border-purple-500/30 text-purple-400 bg-purple-500/10'}`}>
                          {item.provider || item.tag}
                        </span>
                      </div>
                      <Music className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    </div>

                    <h3 className="text-base font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                    {isEditMode ? (
                      <div className="flex items-center gap-1 w-full justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveStep(item.id, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-purple-400 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveStep(item.id, 'down')}
                            disabled={idx === arr.length - 1}
                            className="p-1 text-slate-400 hover:text-purple-400 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1 text-slate-400 hover:text-purple-300 cursor-pointer"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteLink(item.id, item.title)}
                            className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full text-purple-400 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Escuchar música</span>
                        <span>♫</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. SECCIÓN: Blog Oficial, Telegram & WhatsApp (Accesos Principales) - Al Final */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Blog Oficial & Canales de Contacto Directo
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Enlaces al blog Tu Poder Virtual, atención directa por Telegram y WhatsApp.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tarjeta 1: Blog Oficial */}
            <a
              href="https://tupodervirtual.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 hover:border-amber-400 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-amber-950/30"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-amber-500/30 text-amber-400 bg-amber-500/10">
                    Blog Oficial
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-1 group-hover:scale-110 transition-transform shrink-0">
                    <BloggerIcon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                  <div>Tu Poder Virtual</div>
                  <div className="text-sm font-normal text-amber-400/90 font-mono mt-0.5">blogspot.com</div>
                </h3>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  Blog oficial con guías técnicas, artículos de informática, descargas de software y recomendaciones.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Visitar blog oficial</span>
                <span>→</span>
              </div>
            </a>

            {/* Tarjeta 2: Telegram */}
            <a
              href="https://t.me/enyoecd"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/40 hover:border-cyan-400 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/30"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
                    Mensajería Segura
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center p-1 group-hover:scale-110 transition-transform shrink-0">
                    <TelegramIcon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                  <div>Telegram</div>
                  <div className="text-sm font-normal text-cyan-400/90 font-mono mt-0.5">@enyoecd</div>
                </h3>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  Contacto directo en Telegram para soporte inmediato, consultas de proyectos y asistencia rápida.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Escribir por Telegram</span>
                <span>→</span>
              </div>
            </a>

            {/* Tarjeta 3: WhatsApp */}
            <a
              href="https://wa.me/56987676879"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-950/30"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                    WhatsApp Directo
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center p-1 group-hover:scale-110 transition-transform shrink-0">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight">
                  <div>WhatsApp</div>
                  <div className="text-sm font-normal text-emerald-400/90 font-mono mt-0.5">+56 9 8767 6879</div>
                </h3>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  Chat de atención presencial y remota para empresas y particulares en Antofagasta.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Abrir chat de WhatsApp</span>
                <span>→</span>
              </div>
            </a>
          </div>
        </section>

        {/* Footer info note */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Espacio interactivo de gestión personal para Tu Poder Virtual.</span>
          </div>
          <button
            onClick={() => navigateTo('home')}
            className="text-emerald-400 hover:underline cursor-pointer"
          >
            ← Volver al sitio web principal
          </button>
        </div>
      </div>
    </div>
  );
};
