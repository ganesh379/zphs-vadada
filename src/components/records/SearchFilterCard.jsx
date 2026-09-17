import React, { useState } from 'react';
import { Search, RotateCcw, AlertCircle, ShieldCheck, User, Calendar, GraduationCap, Cake, Info } from 'lucide-react';
import { CaptchaBox } from '../common/CaptchaBox';
import { SCHOOL_ESTABLISHMENT_YEAR, CURRENT_ACADEMIC_YEAR } from '../../data/sampleStudents';

export function SearchFilterCard({
  t,
  lang,
  onSearch,
  onClear,
  isLoading
}) {
  // Search state: Name (full or partial) + DOB + Pass-out year + Class (optional)
  const [studentName, setStudentName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [passOutYear, setPassOutYear] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [consentConfirmed, setConsentConfirmed] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  
  // Validation Errors
  const [errors, setErrors] = useState({});

  // Dynamic Year list from establishment year to current year descending
  const years = [];
  for (let yr = CURRENT_ACADEMIC_YEAR; yr >= SCHOOL_ESTABLISHMENT_YEAR; yr--) {
    years.push(yr);
  }

  const classes = [
    { value: 'All', label: t.allClasses },
    { value: 'Class 6', label: 'Class 6 (ఆరవ తరగతి)' },
    { value: 'Class 7', label: 'Class 7 (ఏడవ తరగతి)' },
    { value: 'Class 8', label: 'Class 8 (ఎనిమిదవ తరగతి)' },
    { value: 'Class 9', label: 'Class 9 (తొమ్మిదవ తరగతి)' },
    { value: 'Class 10', label: 'Class 10 (పదవ తరగతి / SSC)' }
  ];

  const handleNameChange = (e) => {
    setStudentName(e.target.value);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: null }));
    }
  };

  const handleDobChange = (e) => {
    setDateOfBirth(e.target.value);
    if (errors.dob) {
      setErrors(prev => ({ ...prev, dob: null }));
    }
  };

  const handleYearChange = (e) => {
    setPassOutYear(e.target.value);
    if (errors.passOutYear) {
      setErrors(prev => ({ ...prev, passOutYear: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // 1. Validate Student Name (full or part of name)
    if (!studentName.trim() || studentName.trim().length < 2) {
      newErrors.name = lang === 'en' 
        ? "Please enter full name or at least 2 letters of the student's name." 
        : "దయచేసి విద్యార్థి పూర్తి పేరు లేదా కనీసం 2 అక్షరాలు నమోదు చేయండి.";
    }

    // 2. Validate Date of Birth
    if (!dateOfBirth) {
      newErrors.dob = lang === 'en'
        ? "Please select or enter the student's Date of Birth."
        : "దయచేసి విద్యార్థి పుట్టిన తేదీని ఎంచుకోండి.";
    }

    // 3. Validate Pass-out Year
    if (!passOutYear) {
      newErrors.passOutYear = lang === 'en'
        ? "Please select the pass-out / leaving year."
        : "దయచేసి ఉత్తీర్ణత / విడిచిన సంవత్సరాన్ని ఎంచుకోండి.";
    }

    // 4. Validate consent
    if (!consentConfirmed) {
      newErrors.consent = t.consentError;
    }

    // 5. Validate CAPTCHA
    if (!isCaptchaVerified) {
      newErrors.captcha = t.captchaError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSearch({
      nameQuery: studentName.trim(),
      dateOfBirth,
      passOutYear: parseInt(passOutYear, 10),
      selectedClass
    });
  };

  const handleClearFilters = () => {
    setStudentName('');
    setDateOfBirth('');
    setPassOutYear('');
    setSelectedClass('All');
    setConsentConfirmed(false);
    setIsCaptchaVerified(false);
    setErrors({});
    onClear();
  };

  return (
    <div id="search-portal" className="bg-white rounded-2xl shadow-md border-2 border-emerald-800/80 overflow-hidden">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 px-6 sm:px-8 py-5 text-white border-b-2 border-amber-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-sm">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {t.searchCardHeading}
              </h2>
              <p className="text-xs text-emerald-200/90 font-medium">
                {t.schoolSubtitle} — Official Historical Student Record Verification
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-[11px] bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full text-amber-300 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Secure Verification: Name + DOB + Pass-Out Year</span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Supporting description */}
        <p className="text-sm text-slate-700 leading-relaxed">
          {t.searchCardSubheading}
        </p>

        {/* Search Inputs Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
            
            {/* Field 1: Student Name (Full or Part of Name) */}
            <div className="lg:col-span-5 space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
                {t.inputNameLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={studentName}
                  onChange={handleNameChange}
                  placeholder={t.inputNamePlaceholder}
                  className={`w-full pl-10 pr-4 py-2.5 text-base sm:text-sm font-medium rounded-lg border text-slate-900 bg-white placeholder-slate-400 focus:outline-hidden focus:ring-2 ${
                    errors.name 
                      ? 'border-red-500 ring-2 ring-red-500/20' 
                      : 'border-slate-300 focus:ring-emerald-700 focus:border-emerald-700'
                  }`}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                {lang === 'en' ? "Accepts full name, surname, or any part of name" : "పూర్తి పేరు లేదా పేరులోని కొంత భాగం అయినా సరిపోతుంది"}
              </p>

              {errors.name && (
                <p className="text-xs text-red-600 font-medium flex items-center space-x-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Field 2: Date of Birth (DOB) */}
            <div className="lg:col-span-3 space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
                {t.dobLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Cake className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={handleDobChange}
                  max="2015-12-31"
                  min="1960-01-01"
                  className={`w-full pl-10 pr-3 py-2.5 text-base sm:text-sm font-medium rounded-lg border text-slate-900 bg-white focus:outline-hidden focus:ring-2 ${
                    errors.dob 
                      ? 'border-red-500 ring-2 ring-red-500/20' 
                      : 'border-slate-300 focus:ring-emerald-700 focus:border-emerald-700'
                  }`}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                {t.dobHelper}
              </p>

              {errors.dob && (
                <p className="text-xs text-red-600 font-medium flex items-center space-x-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.dob}</span>
                </p>
              )}
            </div>

            {/* Field 3: Pass-Out / Leaving Year */}
            <div className="lg:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
                {t.passOutYearLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <select
                  value={passOutYear}
                  onChange={handleYearChange}
                  className={`w-full pl-10 pr-8 py-2.5 text-base sm:text-sm font-medium rounded-lg border bg-white text-slate-800 focus:outline-hidden focus:ring-2 ${
                    errors.passOutYear
                      ? 'border-red-500 ring-2 ring-red-500/20'
                      : 'border-slate-300 focus:ring-emerald-700 focus:border-emerald-700'
                  }`}
                >
                  <option value="">{t.selectYear}</option>
                  {years.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              {errors.passOutYear && (
                <p className="text-xs text-red-600 font-medium flex items-center space-x-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.passOutYear}</span>
                </p>
              )}
            </div>

            {/* Field 4: Class Studied / Passed (Optional Refinement) */}
            <div className="lg:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
                {t.classLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 text-base sm:text-sm font-medium rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                >
                  {classes.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Quick Guidance Note */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-3 flex items-start space-x-2.5 text-xs text-emerald-950">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span className="font-medium">
              <strong>{lang === 'en' ? "Authentication:" : "ధృవీకరణ:"}</strong> {t.searchNote}
            </span>
          </div>

          {/* Security & Verification Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2 border-t border-slate-200">
            {/* CAPTCHA Challenge */}
            <div className="md:col-span-7">
              <CaptchaBox
                isVerified={isCaptchaVerified}
                error={errors.captcha}
                lang={lang}
                onVerify={(ok) => {
                  setIsCaptchaVerified(ok);
                  if (ok && errors.captcha) {
                    setErrors(prev => ({ ...prev, captcha: null }));
                  }
                }}
              />
            </div>

            {/* Consent Checkbox */}
            <div className="md:col-span-5 flex flex-col justify-center">
              <label className={`flex items-start space-x-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                consentConfirmed 
                  ? 'bg-emerald-50/70 border-emerald-300 text-slate-800' 
                  : errors.consent 
                    ? 'bg-red-50 border-red-300 text-red-900' 
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}>
                <input
                  type="checkbox"
                  checked={consentConfirmed}
                  onChange={(e) => {
                    setConsentConfirmed(e.target.checked);
                    if (e.target.checked && errors.consent) {
                      setErrors(prev => ({ ...prev, consent: null }));
                    }
                  }}
                  className="w-4 h-4 mt-0.5 rounded text-emerald-800 focus:ring-emerald-700 border-slate-300"
                />
                <span className="text-xs font-medium leading-relaxed select-none">
                  {t.consentText}
                </span>
              </label>

              {errors.consent && (
                <p className="text-[11px] text-red-600 font-semibold flex items-center space-x-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.consent}</span>
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'en' ? "Verified matching against digitized school ledger archives." : "పాఠశాల డిజిటల్ ఆర్కైవ్స్ ఆధారంగా శోధన."}</span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleClearFilters}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.btnClear}</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{lang === 'en' ? "Searching..." : "వెతుకుతున్నాము..."}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-amber-300" />
                    <span>{t.btnSearch}</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
