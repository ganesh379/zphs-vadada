import React from 'react';
import { Award, Trophy, Star, Medal, CheckCircle2 } from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';

export function Achievements({ t, lang }) {
  return (
    <section id="achievements" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>{lang === 'en' ? "Pride of Vadada" : "పాఠశాల విశేష ఘనతలు"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t.achievementsTitle}
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-2 md:mt-0 font-mono bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
          [Verified Academic & Co-Curricular Track Record]
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {SCHOOL_INFO.achievements.map((item, idx) => (
          <div 
            key={item.id}
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  {item.badge}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Medal className="w-4 h-4" />
                </div>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                {item.title}
              </h4>
              
              <div className="text-xs font-semibold text-emerald-800 mb-2">
                {item.year}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] text-slate-500 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0" />
              <span>{lang === 'en' ? "School Board Recorded" : "పాఠశాల రికార్డు నమోదు"}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
