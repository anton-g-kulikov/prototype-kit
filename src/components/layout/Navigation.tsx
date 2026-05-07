'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Settings, Menu, X, AppWindow, UserCircle } from 'lucide-react';
import { useSettings } from '@/lib/SettingsContext';

export const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();
  const { settings } = useSettings();
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: AppWindow, label: 'Components', href: '/components' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className={`w-64 h-full border-r-2 border-border flex flex-col bg-white dark:bg-zinc-950 ${onClose ? 'fixed inset-y-0 left-0 z-50' : 'hidden lg:flex'}`}>
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 lg:hidden"
        >
          <X size={24} />
        </button>
      )}
      <div className="h-16 border-b-2 border-border flex items-center px-6">
        <h2 className="font-bold text-xl tracking-tighter text-zinc-900 dark:text-white">PrototypeKit</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`w-full flex items-center gap-3 p-3 text-sm font-bold transition-all ${
                isActive 
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t-2 border-black space-y-2">
        <p className="text-xs font-bold text-muted-foreground text-left px-3 uppercase">
          Prototype v1.0
        </p>
      </div>
    </div>
  );
};

export const Header = ({ title, onMenuClick }: { title?: string, onMenuClick?: () => void }) => {
  const { settings } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const accountName = 'Demo User';
  const roleLabel = settings.userMode.charAt(0).toUpperCase() + settings.userMode.slice(1);

  return (
    <header className="h-16 border-b-2 border-border flex items-center justify-between px-4 sm:px-8 bg-white dark:bg-zinc-950 relative z-40">
      <div className="flex items-center gap-2 sm:gap-4">
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 lg:hidden hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="flex items-center gap-2 font-bold text-sm">
          <span className="text-zinc-400">Project Workspace</span>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="uppercase tracking-widest text-xs text-zinc-900 dark:text-white">{title || 'Dashboard'}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-6">
        <div 
          className="flex items-center gap-3 cursor-pointer group relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold truncate">{accountName}</p>
            <p className="text-xs text-muted-foreground truncate uppercase">{roleLabel}</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center text-xs font-bold group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900 transition-all text-zinc-900 dark:text-zinc-100">
            <UserCircle size={20} />
          </div>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 border-2 border-border shadow-wireframe dark:shadow-wireframe-white py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-border border-dashed mb-2">
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{accountName}</p>
                <p className="text-xs text-zinc-500 tracking-tighter">demo@example.com</p>
              </div>
              <Link
                href="/settings"
                className="block w-full text-left px-4 py-2 text-sm font-bold hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all text-zinc-900 dark:text-zinc-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-sm font-bold hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all text-zinc-900 dark:text-zinc-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
