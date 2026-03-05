import type { IconItem } from '../types';

// Use string keys for icons to avoid JSX in a plain .ts file; IconsList will resolve them to components
export const DEFAULT_ICONS: IconItem[] = [
  { id: 'macintosh', label: 'Macintosh HD', icon: 'HardDiskIcon' },
  { id: 'system', label: 'System Folder', icon: 'FolderIcon' },
  { id: 'notepad', label: 'Note Pad', icon: 'NotepadIcon' },
  { id: 'gallery', label: 'Gallery', icon: 'ImageIcon' },
  { id: 'trash', label: 'Trash', icon: 'TrashIcon' },
];
