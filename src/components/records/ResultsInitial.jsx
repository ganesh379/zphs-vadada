import React from 'react';
import { Search, ShieldAlert, Archive, FileSpreadsheet, Lock } from 'lucide-react';

export function ResultsInitial({ t, lang }) {
  return (
    <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-xs text-center space-y-6">
      {/* Visual Archive Illustration */}
      <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-800 shadow-inner">
        <Archive className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-700" />
      </div>

      <div className="max-w-xl mx-auto space-y-2">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          {t.initialStateHeading}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t.initialStateSub}
        </p>
      </div>

      {/* Security & Access Guidance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 border-t border-slate-100 text-left">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800">
            <Search className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? "Targeted Search" : "లక్షిత శోధన"}</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            {lang === 'en' ? "Search by full name or 10-digit mobile number." : "పేరు లేదా 10 అంకెల మొబైల్ నంబర్ ద్వారా శోధించండి."}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'en' ? "Data Privacy" : "గోప్యత రక్షణ"}</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            {lang === 'en' ? "Identifiers are masked. OTP verification protects mobile queries." : "వ్యక్తిగత వివరాలు పాక్షికంగా దాచబడతాయి."}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? "School Ledger" : "పాఠశాల రిజిస్టర్"}</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            {lang === 'en' ? "Verified against headmaster physical ledger archives." : "ప్రధానోపాధ్యాయుల రికార్డుల ఆధారంగా ధృవీకరించబడుతుంది."}
          </p>
        </div>
      </div>
    </div>
  );
}
