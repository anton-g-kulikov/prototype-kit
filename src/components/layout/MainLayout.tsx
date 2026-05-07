"use client";

import React from 'react';
import { Sidebar, Header } from './Navigation';
import { useSettings } from '@/lib/SettingsContext';

export const MainLayout = ({ children, title, noPadding = false }: { children: React.ReactNode, title?: string, noPadding?: boolean }) => {
  const { settings } = useSettings();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950 overflow-hidden text-zinc-900 dark:text-zinc-100">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Header title={title} onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="animate-fade-in flex-1 flex flex-col overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
            {noPadding ? (
              children
            ) : (
              <div className={`min-h-full relative ${settings.compactMode ? 'p-2 sm:p-4' : 'p-4 sm:p-6 md:p-10'}`}>
                <div className="absolute inset-0 bg-dot-pattern [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
                <div className="relative z-10">
                  {children}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
