import React from 'react';
import { Search, Loader2 } from 'lucide-react';

export function ResultsSkeleton({ t, lang }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
      <div className="flex items-center justify-center space-x-3 text-emerald-800">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-700" />
        <div className="text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {t.loadingText}
          </h3>
          <p className="text-xs text-slate-500">
            {t.loadingSub}
          </p>
        </div>
      </div>

      {/* Pulsing Skeleton Cards */}
      <div className="space-y-3 max-w-4xl mx-auto">
        {[1, 2].map((n) => (
          <div 
            key={n} 
            className="border border-slate-200 rounded-xl p-5 bg-slate-50/70 animate-pulse space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-slate-200 rounded-md w-1/3"></div>
                <div className="h-3.5 bg-slate-200 rounded-md w-1/4"></div>
              </div>
              <div className="h-8 bg-slate-200 rounded-md w-28"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="h-4 bg-slate-200 rounded-sm w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded-sm w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded-sm w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded-sm w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
