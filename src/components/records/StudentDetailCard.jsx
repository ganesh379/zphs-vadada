import React from 'react';
import { ArrowLeft, Edit, PhoneCall, Printer, CheckCircle, Clock, ShieldCheck, Award, GraduationCap, Calendar, Cake, Hash, Home, AlertCircle, Bookmark } from 'lucide-react';

export function StudentDetailCard({
  student,
  t,
  lang,
  onBack,
  onRequestCorrection,
  onContactSchool
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top action row */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-1.5 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToResults}</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition-colors"
            title="Print Verification Slip"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>{t.btnPrintSlip}</span>
          </button>

          <button
            onClick={() => onRequestCorrection(student)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-xs transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>{t.btnRequestCorrection}</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Style Card (Printable) */}
      <div id="printable-record" className="bg-white rounded-2xl border-2 border-emerald-800 shadow-md overflow-hidden">
        {/* Certificate Header Banner */}
        <div className="bg-linear-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-amber-500">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white p-1 border-2 border-amber-400 shrink-0">
              <img src="/logo.svg" alt="School Emblem" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-xs text-amber-300 font-semibold tracking-wider uppercase">
                {lang === 'en' ? "Government of Andhra Pradesh • School Education Department" : "ఆంధ్రప్రదేశ్ ప్రభుత్వం • పాఠశాల విద్యా శాఖ"}
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                ZPHS Vadada — Digital Alumni Archive Ledger
              </h3>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-emerald-800 sm:pl-4">
            <span className="text-[10px] text-slate-300 block font-mono">ARCHIVE SERIAL</span>
            <span className="text-xs font-mono font-bold text-amber-300">{student.id}</span>
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-600">Verification Status:</span>
            <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
              student.recordStatus === 'Verified' 
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {student.recordStatus === 'Verified' ? (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-amber-700" />
              )}
              <span>{student.recordStatus === 'Verified' ? t.recordStatusVerified : t.recordStatusPending}</span>
            </span>
          </div>

          <div className="text-slate-500 text-[11px] font-mono">
            {lang === 'en' ? 'Verified on:' : 'ధృవీకరణ తేదీ:'} {student.verificationDate}
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Main profile section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200">
            {/* Student Photo Placeholder */}
            <div className="shrink-0 flex flex-col items-center">
              <div 
                className="w-32 h-40 rounded-xl flex flex-col items-center justify-center text-white border-2 border-slate-300 shadow-inner p-2 relative overflow-hidden"
                style={{ backgroundColor: student.photoPlaceholderBg }}
              >
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold border border-white/40">
                  {student.firstName[0]}{student.lastName[0]}
                </div>
                <span className="mt-2 text-[10px] font-mono text-center bg-black/40 px-2 py-0.5 rounded">
                  {lang === 'en' ? "Student Photo" : "విద్యార్థి ఫోటో"}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono mt-1">Roll: {student.rollNumber}</span>
            </div>

            {/* Core Details */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {student.fullName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {lang === 'en' 
                  ? `Alumnus of ZPHS Vadada • Batch of ${student.passOutYear}`
                  : `జడ్పీహెచ్ఎస్ వడద పూర్వ విద్యార్థి • ${student.passOutYear} బ్యాచ్`}
              </p>

              {/* Verified identifiers */}
              <div className="pt-2 text-xs text-slate-500 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                <span className="bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                  <strong>Gender:</strong> {student.gender}
                </span>
                <span className="bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded border border-emerald-300 font-mono font-semibold flex items-center space-x-1.5">
                  <Cake className="w-3.5 h-3.5 text-emerald-700" />
                  <span><strong>DOB:</strong> {student.formattedDob}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Academic & Ledger Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase mb-1">
                <Hash className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.fieldAdmissionNo}</span>
              </div>
              <div className="font-mono font-bold text-slate-900 text-base">
                {student.maskedAdmissionNumber}
              </div>
              <span className="text-[10px] text-slate-400">Masked for privacy</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase mb-1">
                <Cake className="w-3.5 h-3.5 text-emerald-700" />
                <span>{lang === 'en' ? 'Date of Birth (DOB)' : 'పుట్టిన తేదీ'}</span>
              </div>
              <div className="font-bold text-slate-900 text-base font-mono">
                {student.formattedDob}
              </div>
              <span className="text-[10px] text-slate-400">Verified Ledger Date</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.fieldClass}</span>
              </div>
              <div className="font-bold text-slate-900 text-base">
                {student.classStudied}
              </div>
              <span className="text-[10px] text-slate-400">Completed at Vadada</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase mb-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.fieldAcademicYear}</span>
              </div>
              <div className="font-bold text-slate-900 text-base">
                {student.academicYear}
              </div>
              <span className="text-[10px] text-slate-400">Pass-Out Year: {student.passOutYear}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2 lg:col-span-4">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase mb-1">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.fieldAchievement}</span>
              </div>
              <div className="font-semibold text-slate-800">
                {student.achievementSummary || "Academic participation in secondary school curriculum."}
              </div>
              <span className="text-[10px] text-slate-400">Co-curricular & Academic record</span>
            </div>

          </div>

          {/* Archive Ledger Reference */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-start space-x-2">
            <Bookmark className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">{t.fieldRemarks}:</strong>
              <span>{student.remarks}</span>
            </div>
          </div>

          {/* Official Verification Notice */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-300 text-xs text-amber-950 flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="block font-bold mb-0.5">{lang === 'en' ? "Important School Record Notice:" : "ముఖ్యమైన గమనిక:"}</strong>
              <p>{t.officialNotice}</p>
            </div>
          </div>

        </div>

        {/* Certificate Footer / Seal */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>Digital Ledger Copy • ZPHS Vadada Secondary Archives</span>
          </div>

          <div className="flex items-center space-x-3 no-print">
            <button
              onClick={onContactSchool}
              className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-md text-slate-700 font-semibold text-xs flex items-center space-x-1"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-800" />
              <span>{t.btnContactSchool}</span>
            </button>
            <button
              onClick={() => onRequestCorrection(student)}
              className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-md font-bold text-xs flex items-center space-x-1"
            >
              <Edit className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.btnRequestCorrection}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
