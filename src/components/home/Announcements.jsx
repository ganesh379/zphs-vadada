import React from 'react';
import { Bell, Calendar, ChevronRight, FileText, Sparkles } from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';

export function Announcements({ t, lang, onRecordArchiveClick }) {
  return (
    <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-700 border border-amber-500/30">
            <Bell className="w-5 h-5 text-amber-600 animate-bounce" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t.announcementsTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {lang === 'en' ? "Official circulars and academic notices" : "అధికారిక సర్క్యులర్లు మరియు సమాచారం"}
            </p>
          </div>
        </div>
        <span className="text-xs font-mono bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 w-fit">
          Updated: Sept 2026
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCHOOL_INFO.announcements.map((ann) => (
          <div 
            key={ann.id}
            className={`p-4 rounded-xl border transition-all hover:shadow-md flex flex-col justify-between ${
              ann.isNew 
                ? 'bg-emerald-50/40 border-emerald-300 ring-1 ring-emerald-400/30' 
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-white text-emerald-900 border border-emerald-200">
                  {ann.category}
                </span>
                <div className="flex items-center space-x-2">
                  {ann.isNew && (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wide">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{lang === 'en' ? 'New' : 'కొత్తది'}</span>
                    </span>
                  )}
                  <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{ann.date}</span>
                  </span>
                </div>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 hover:text-emerald-800 transition-colors">
                {ann.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {ann.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
              {ann.id === 'ann-1' ? (
                <button
                  onClick={onRecordArchiveClick}
                  className="font-bold text-emerald-800 hover:text-emerald-950 hover:underline flex items-center space-x-1"
                >
                  <span>{lang === 'en' ? "Open Student Record Search →" : "విద్యార్థి రికార్డు శోధించండి →"}</span>
                </button>
              ) : (
                <span className="text-slate-500 flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Notice Board Copy Available</span>
                </span>
              )}
              <span className="text-[11px] font-mono text-slate-400">Notice REF-{ann.id.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
