import React from 'react';
import { Quote, Award, UserCheck } from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';

export function PrincipalMessage({ t, lang }) {
  const p = SCHOOL_INFO.principal;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-emerald-900 px-6 py-3 border-b border-emerald-950 flex items-center justify-between">
        <h3 className="text-white font-bold text-sm sm:text-base flex items-center space-x-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>{t.principalTitle}</span>
        </h3>
        <span className="text-[11px] bg-emerald-800 text-amber-300 px-2 py-0.5 rounded font-mono border border-emerald-700">
          Official Desk
        </span>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Photo Placeholder */}
        <div className="md:col-span-4 flex flex-col items-center text-center">
          <div className="relative w-36 h-44 rounded-xl bg-slate-100 border-2 border-emerald-700/40 p-1 shadow-md overflow-hidden flex flex-col items-center justify-center group">
            {/* Illustrated Principal Avatar Silhouette */}
            <div className="w-24 h-24 rounded-full bg-emerald-800 text-white flex items-center justify-center text-3xl font-bold border-2 border-amber-400 shadow-inner">
              <UserCheck className="w-12 h-12 text-amber-300" />
            </div>
            <div className="mt-3 text-[10px] font-mono font-semibold text-slate-500 bg-white/90 px-2 py-0.5 rounded border border-slate-200">
              {p.photoPlaceholderLabel}
            </div>
          </div>
          
          <div className="mt-3">
            <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
            <p className="text-xs font-semibold text-emerald-800">{p.role}</p>
            <p className="text-[11px] text-slate-500">{p.experience}</p>
          </div>
        </div>

        {/* Message Content */}
        <div className="md:col-span-8 space-y-4">
          <Quote className="w-8 h-8 text-amber-500/70 rotate-180" />
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-serif italic">
            "{lang === 'en' ? p.message : p.messageTelugu}"
          </p>
          
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
            <span className="font-semibold text-slate-700">
              {lang === 'en' ? "Zilla Parishad High School, Vadada" : "జిల్లా పరిషత్ ఉన్నత పాఠశాల, వడద"}
            </span>
            <span className="text-emerald-700 font-medium">
              Andhra Pradesh School Education Department
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
