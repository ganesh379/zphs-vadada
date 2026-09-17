import React from 'react';
import { Home, Search, Info, MapPin, Globe } from 'lucide-react';

export function MobileBottomBar({ onNavigate, activeTab, lang, setLang, t }) {
  return (
    <nav 
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 shadow-lg flex items-center justify-around safe-area-bottom"
      aria-label="Mobile Bottom Navigation"
    >
      {/* 1. Home */}
      <button
        onClick={() => onNavigate('hero')}
        className="flex flex-col items-center justify-center p-1 text-slate-600 hover:text-emerald-800 focus:outline-hidden min-w-[54px]"
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-medium leading-none">{t.navHome}</span>
      </button>

      {/* 2. About */}
      <button
        onClick={() => onNavigate('about')}
        className="flex flex-col items-center justify-center p-1 text-slate-600 hover:text-emerald-800 focus:outline-hidden min-w-[54px]"
      >
        <Info className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-medium leading-none">{t.navAbout}</span>
      </button>

      {/* 3. Primary Center Button: Search Student Records */}
      <button
        onClick={() => onNavigate('search-portal')}
        className="flex flex-col items-center justify-center -mt-5 focus:outline-hidden group"
        aria-label="Search Student Records"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-800 text-white shadow-lg shadow-emerald-900/40 flex items-center justify-center border-2 border-amber-400 group-active:scale-95 transition-transform">
          <Search className="w-5 h-5 text-amber-300" />
        </div>
        <span className="text-[10px] font-bold text-emerald-900 mt-1 leading-none">
          {lang === 'en' ? 'Records' : 'రికార్డులు'}
        </span>
      </button>

      {/* 4. Map / Contact */}
      <button
        onClick={() => onNavigate('contact')}
        className="flex flex-col items-center justify-center p-1 text-slate-600 hover:text-emerald-800 focus:outline-hidden min-w-[54px]"
      >
        <MapPin className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-medium leading-none">{t.navContact}</span>
      </button>

      {/* 5. Language Switcher */}
      <button
        onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
        className="flex flex-col items-center justify-center p-1 text-emerald-800 hover:text-emerald-950 focus:outline-hidden min-w-[54px]"
        aria-label="Toggle English or Telugu"
      >
        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold flex items-center justify-center mb-0.5 border border-amber-300">
          {lang === 'en' ? 'తె' : 'EN'}
        </span>
        <span className="text-[10px] font-bold leading-none">{lang === 'en' ? 'తెలుగు' : 'English'}</span>
      </button>
    </nav>
  );
}
