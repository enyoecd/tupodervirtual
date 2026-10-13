export type LinkSectionKey =
  | 'blog-software'
  | 'favorite-websites'
  | 'online-utilities'
  | 'software-downloads'
  | 'youtube'
  | 'music';

export interface ManagedLink {
  id: string;
  section: LinkSectionKey;
  title: string;
  url: string;
  description: string;
  tag: string;
  badgeColor?: string;
  provider?: string;
  order_index: number;
}

export interface SectionMeta {
  key: LinkSectionKey;
  title: string;
  description: string;
  layout: 'list' | 'grid-4' | 'grid-3';
  accentColor: string;
}
