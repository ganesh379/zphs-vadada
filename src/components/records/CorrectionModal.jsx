import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Edit, UploadCloud, CheckCircle2, AlertCircle, FileCheck, Copy, Check } from 'lucide-react';

export function CorrectionModal({
  isOpen,
  onClose,
  student,
  t,
  lang
}) {
  const [studentName, setStudentName] = useState('');
  const [refNumber, setRefNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setStudentName(student.fullName || '');
      setRefNumber(student.admissionNumber || student.id || '');
    } else {
      setStudentName('');
      setRefNumber('');
    }
    setMobileNumber('');
    setDescription('');
    setFileName('');
    setSubmittedRef(null);
    setCopied(false);
    setError('');
  }, [student, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setError(lang === 'en' ? "Please enter student name." : "దయచేసి విద్యార్థి పేరు నమోదు చేయండి.");
      return;
    }
    if (!mobileNumber || mobileNumber.length !== 10) {
      setError(lang === 'en' ? "Please provide a 10-digit mobile number for contact." : "దయచేసి 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.");
      return;
    }
    if (!description.trim()) {
      setError(lang === 'en' ? "Please provide a brief description of the required correction." : "దయచేసి కావలసిన సవరణ వివరాలు నమోదు చేయండి.");
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate backend submission and generate reference ID
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = `REQ-2026-VAD-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(generatedRef);
    }, 600);
  };

  const handleCopyRef = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center space-x-2 text-white">
          <Edit className="w-5 h-5 text-amber-400" />
          <span>{t.corrTitle}</span>
        </div>
      }
      maxWidth="max-w-lg"
    >
      {submittedRef ? (
        /* Success State */
        <div className="text-center space-y-5 py-4 animate-fadeIn">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-slate-900">
              {t.corrSuccessTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              {t.corrSuccessMessage}
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-slate-50 border-2 border-dashed border-emerald-600/60 rounded-xl p-4 max-w-sm mx-auto space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
              {t.corrRefLabel}
            </span>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xl font-mono font-black text-emerald-900">
                {submittedRef}
              </span>
              <button
                type="button"
                onClick={handleCopyRef}
                className="p-1 rounded-md hover:bg-slate-200 text-slate-600 transition-colors"
                title="Copy reference number"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <span className="text-[11px] text-slate-500 block">
              {lang === 'en' ? "Please quote this reference number at the school office." : "పాఠశాల కార్యాలయంలో ఈ రిఫరెన్స్ నంబర్‌ను తెలియజేయండి."}
            </span>
          </div>

          <div className="pt-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-sm font-bold shadow-md transition-colors"
            >
              {lang === 'en' ? "Close Window" : "విండోను మూసివేయండి"}
            </button>
          </div>
        </div>
      ) : (
        /* Form State */
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-slate-600">
            {t.corrSub}
          </p>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center space-x-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3 text-xs sm:text-sm">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.corrStudentName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Full student name as per school records"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            {/* Reference / Admission Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.corrRefNo}
                </label>
                <input
                  type="text"
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  placeholder="e.g., ADM-1994-0842"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.corrMobile} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit mobile"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 font-mono"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.corrDesc} <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.corrDescPlaceholder}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            {/* Supporting Document Upload Placeholder */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.corrDocUpload}
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                <p className="text-xs text-slate-600 font-medium">
                  {fileName ? (
                    <span className="text-emerald-800 font-bold flex items-center justify-center space-x-1">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>{fileName}</span>
                    </span>
                  ) : (
                    <span>{lang === 'en' ? "Click or drag document here" : "పత్రం ఇక్కడ డ్రాగ్ చేయండి లేదా క్లిక్ చేయండి"}</span>
                  )}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {t.corrDocHint}
                </p>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                  className="hidden"
                  id="doc-upload"
                />
                <label
                  htmlFor="doc-upload"
                  className="mt-2 inline-block px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold rounded-md cursor-pointer transition-colors"
                >
                  {lang === 'en' ? "Choose Document" : "పత్రం ఎంచుకోండి"}
                </label>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
            >
              {t.btnCancel}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center space-x-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>{t.btnSubmitCorrection}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
