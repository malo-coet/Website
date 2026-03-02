import { useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import MenuBar from './MenuBar';
import Window from './Window';
import Icon from './Icon';
import { FolderIcon, NotepadIcon, TrashIcon, HardDiskIcon, ImageIcon } from './Icons';

interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  width: number;
  height: number;
}

const WINDOWS_CONFIG: Record<string, Omit<WindowState, 'id'>> = {
  system: {
    title: 'System Folder',
    content: (
      <div className="p-2">
        <p className="text-xs mb-2 font-bold">System Folder</p>
        <div className="flex flex-wrap gap-3">
          {['Extensions', 'Control Panels', 'Preferences', 'Startup Items'].map((name) => (
            <div key={name} className="flex flex-col items-center w-14">
              <FolderIcon />
              <span className="text-xs text-center mt-1">{name}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    position: { x: 120, y: 60 },
    width: 320,
    height: 220,
  },
  notepad: {
    title: 'Note Pad',
    content: (
      <div className="p-2 h-full">
        <p className="text-xs font-bold mb-2">Note Pad</p>
        <textarea
          className="w-full h-full resize-none text-xs border border-black outline-none p-1 font-mono"
          placeholder="Type your notes here..."
          style={{ minHeight: 160, fontFamily: 'Chicago, Geneva, Monaco, monospace' }}
        />
      </div>
    ),
    position: { x: 200, y: 80 },
    width: 280,
    height: 240,
  },
  macintosh: {
    title: 'Macintosh HD',
    content: (
      <div className="p-2">
        <p className="text-xs mb-2 font-bold">Macintosh HD</p>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2 border-b border-gray-300 pb-1 font-bold">
            <span className="w-40">Name</span>
            <span className="w-20 text-right">Size</span>
            <span className="w-20 text-right">Modified</span>
          </div>
          {[
            { name: 'System Folder', size: '3.2 MB', date: '01/01/95' },
            { name: 'Applications', size: '12 MB', date: '15/03/95' },
            { name: 'Documents', size: '2.1 MB', date: '28/02/95' },
            { name: 'Trash', size: '—', date: '—' },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="w-40 truncate">{item.name}</span>
              <span className="w-20 text-right">{item.size}</span>
              <span className="w-20 text-right">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    position: { x: 80, y: 50 },
    width: 360,
    height: 220,
  },
  gallery: {
    title: 'Gallery',
    content: (
      <div className="p-2">
        <p className="text-xs mb-2 font-bold">Gallery</p>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="border border-black"
              style={{
                width: 70,
                height: 60,
                background: `hsl(${n * 50}, 60%, 85%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
              }}
            >
              Image {n}
            </div>
          ))}
        </div>
      </div>
    ),
    position: { x: 160, y: 100 },
    width: 300,
    height: 220,
  },
  trash: {
    title: 'Trash',
    content: (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <p className="text-xs text-center text-gray-500">The Trash is empty.</p>
      </div>
    ),
    position: { x: 300, y: 120 },
    width: 240,
    height: 180,
  },
};

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [windowZIndices, setWindowZIndices] = useState<Record<string, number>>({});
  const zCounter = useRef(10);

  const bringToFront = useCallback((id: string) => {
    zCounter.current += 1;
    const newZ = zCounter.current;
    setWindowZIndices((zi) => ({ ...zi, [id]: newZ }));
  }, []);

  const openWindow = useCallback((id: string) => {
    setOpenWindows((prev) => {
      if (prev.find((w) => w.id === id)) {
        bringToFront(id);
        return prev;
      }
      const config = WINDOWS_CONFIG[id];
      if (!config) return prev;
      return [...prev, { id, ...config }];
    });
    bringToFront(id);
  }, [bringToFront]);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const desktopIcons = [
    { id: 'macintosh', label: 'Macintosh HD', icon: <HardDiskIcon /> },
    { id: 'system', label: 'System Folder', icon: <FolderIcon /> },
    { id: 'notepad', label: 'Note Pad', icon: <NotepadIcon /> },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon /> },
    { id: 'trash', label: 'Trash', icon: <TrashIcon /> },
  ];

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#008080' }}
    >
      <MenuBar />

      {/* Desktop icons — top-right column */}
      <div
        className="absolute top-0 right-0 flex flex-col gap-2 pt-6 pr-2"
        style={{ paddingTop: 28 }}
      >
        {desktopIcons.map(({ id, label, icon }) => (
          <Icon
            key={id}
            label={label}
            icon={icon}
            onDoubleClick={() => openWindow(id)}
          />
        ))}
      </div>

      {/* Open windows */}
      <AnimatePresence>
        {openWindows.map((win) => (
          <Window
            key={win.id}
            title={win.title}
            onClose={() => closeWindow(win.id)}
            initialPosition={win.position}
            width={win.width}
            height={win.height}
            zIndex={windowZIndices[win.id] ?? 10}
            onFocus={() => bringToFront(win.id)}
          >
            {win.content}
          </Window>
        ))}
      </AnimatePresence>
    </div>
  );
}
