import React from 'react';
import { AlertCircle, HelpCircle, PhoneCall, Edit3, ArrowUp, SearchX, CheckCircle } from 'lucide-react';

export function ResultsEmpty({ t, lang, onModifySearch, onContactSchool }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs text-center space-y-6 animate-fadeIn">
      {/* Icon */}
      <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-700 shadow-inner">
        <SearchX className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
      </div>

      <div className="max-w-md mx-auto space-y-1.5">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          {t.noResultsHeading}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          {lang === 'en' 
            ? "We could not find an indexed record matching the search parameters entered."
            : "మీరు నమోదు చేసిన వివరాలతో సరిపోలిన రికార్డు మా వద్ద నమోదు కాలేదు."}
        </p>
      </div>

      {/* Suggested Steps Card */}
      <div className="max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-xl p-5 text-left space-y-2.5">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
          <HelpCircle className="w-4 h-4 text-emerald-800" />
          <span>{t.noResultsSuggestionsTitle}</span>
        </h4>
        
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
          <li className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>{t.suggestion1}</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>{t.suggestion2}</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>{t.suggestion3}</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>{t.suggestion4}</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onModifySearch}
          className="w-full sm:w-auto px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-xs transition-colors"
        >
          <ArrowUp className="w-4 h-4" />
          <span>{t.btnModifySearch}</span>
        </button>

        <button
          onClick={onContactSchool}
          className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-colors"
        >
          <PhoneCall className="w-4 h-4 text-emerald-800" />
          <span>{t.btnContactSchool}</span>
        </button>
      </div>
    </div>
  );
}
