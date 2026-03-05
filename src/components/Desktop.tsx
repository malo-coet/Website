import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import MenuBar from './MenuBar';
import Window from './Window';
import IconsList from './IconsList';
import { DEFAULT_ICONS } from '../data/iconsData';
import WINDOWS_CONFIG from './windowsConfig';
import type { IconItem, WindowState as WS } from '../types';

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<WS[]>([]);
  const [windowZIndices, setWindowZIndices] = useState<Record<string, number>>({});

  const [desktopIconsState, setDesktopIconsState] = useState<IconItem[]>(() => {
    try {
      const raw = localStorage.getItem('desktopIcons');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed as IconItem[];
      }
    } catch {
      // ignore parse errors
    }
    return DEFAULT_ICONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('desktopIcons', JSON.stringify(desktopIconsState));
    } catch {
      // ignore storage errors (e.g. private mode)
    }
  }, [desktopIconsState]);

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
      const config = (WINDOWS_CONFIG as Record<string, any>)[id];
      if (!config) return prev;
      return [...prev, { id, ...config }];
    });
    bringToFront(id);
  }, [bringToFront]);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const handleRename = useCallback((id: string, newValue: string) => {
    setDesktopIconsState((prev) => prev.map((icon) => (icon.id === id ? { ...icon, label: newValue } : icon)));
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden desktop-area" style={{ background: 'transparent' }}>
      <MenuBar onItemClick={(id) => { console.log('menu click:', id); }} />

      {/* Desktop icons — left stacked list */}
      <IconsList items={desktopIconsState} onOpen={openWindow} onRename={handleRename} />

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
