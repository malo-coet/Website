import Icon from './Icon';
import type { IconItem } from '../types';
import { FolderIcon, NotepadIcon, TrashIcon, HardDiskIcon, ImageIcon } from './Icons';

const ICON_MAP: Record<string, React.ReactNode> = {
  FolderIcon: <FolderIcon />,
  NotepadIcon: <NotepadIcon />,
  TrashIcon: <TrashIcon />,
  HardDiskIcon: <HardDiskIcon />,
  ImageIcon: <ImageIcon />,
};

interface Props {
  items: IconItem[];
  onOpen: (id: string) => void;
  onRename?: (id: string, newLabel: string) => void;
}

export default function IconsList({ items, onOpen, onRename }: Props) {
  return (
    <div className="desktop-icons">
      {items.map((it) => (
        <div key={it.id} className="icon-card">
          <Icon
            id={it.id}
            label={it.label}
            icon={typeof it.icon === 'string' ? ICON_MAP[it.icon] ?? it.icon : it.icon}
            editableLabel
            onRename={(iconId: string | undefined, v: string) => onRename?.(iconId as string, v)}
            onDoubleClick={() => onOpen(it.id)}
          />
        </div>
      ))}
    </div>
  );
}
