import React from 'react';
import { User, Eye, ShieldCheck, Calendar, GraduationCap, Cake, Hash, AlertTriangle } from 'lucide-react';

export function ResultsList({ 
  records, 
  t, 
  lang, 
  onSelectRecord, 
  isMobileSearch 
}) {
  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header bar with count & privacy badge */}
      <div className="bg-emerald-900 text-white px-5 py-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <h3 className="font-bold text-sm sm:text-base">
            {records.length} {t.resultsCount}
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-xs text-amber-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>{t.privacyNoticeBadge}</span>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start space-x-2">
        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>{lang === 'en' ? "Confidentiality Protection:" : "గోప్యతా నిబంధన:"}</strong> {t.privacyNoticeText}
        </span>
      </div>

      {/* Grid of Compact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {records.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-600 transition-all p-5 flex flex-col justify-between group"
          >
            <div>
              {/* Header inside card: Name and Status */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {student.fullName}
                  </h4>
                </div>
                
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ${
                  student.recordStatus === 'Verified'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {student.recordStatus}
                </span>
              </div>

              {/* Data fields grid: strictly masked identifiers */}
              <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-slate-100 text-xs">
                <div className="flex items-center space-x-1.5 text-slate-700">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong>{lang === 'en' ? 'Class:' : 'తరగతి:'}</strong> {student.classStudied}</span>
                </div>

                <div className="flex items-center space-x-1.5 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong>{lang === 'en' ? 'Pass-Out:' : 'సంవత్సరం:'}</strong> {student.passOutYear}</span>
                </div>

                <div className="flex items-center space-x-1.5 text-slate-700">
                  <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong>{lang === 'en' ? 'Adm No:' : 'అడ్మిషన్:'}</strong> <span className="font-mono text-emerald-800">{student.maskedAdmissionNumber}</span></span>
                </div>

                <div className="flex items-center space-x-1.5 text-slate-700">
                  <Cake className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong>{lang === 'en' ? 'DOB:' : 'పుట్టిన తేదీ:'}</strong> <span className="font-mono text-slate-700">{student.maskedDob}</span></span>
                </div>
              </div>
            </div>

            {/* View Details Button */}
            <div className="pt-3.5 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Ref: {student.id}
              </span>

              <button
                onClick={() => onSelectRecord(student)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.btnViewDetails}</span>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
