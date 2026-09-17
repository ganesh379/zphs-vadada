import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, AlertCircle, RefreshCw, Smartphone, CheckCircle2 } from 'lucide-react';
import { Modal } from '../common/Modal';

export function OtpVerificationModal({
  isOpen,
  onClose,
  targetStudent,
  onVerifySuccess,
  t,
  lang
}) {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    let interval;
    if (isOpen) {
      setOtpDigits(['', '', '', '']);
      setError('');
      setTimer(30);
      setCanResend(false);

      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleDigitChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);
    setError('');

    // Auto move to next box if filled
    if (cleanVal && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pasteData.length > 0) {
      const newDigits = ['', '', '', ''];
      for (let i = 0; i < pasteData.length; i++) {
        newDigits[i] = pasteData[i];
      }
      setOtpDigits(newDigits);
    }
  };

  const handleAutoFill = () => {
    setOtpDigits(['1', '2', '3', '4']);
    setError('');
  };

  const handleVerify = () => {
    const fullCode = otpDigits.join('');
    if (fullCode.length !== 4) {
      setError(lang === 'en' ? "Please enter the complete 4-digit code." : "దయచేసి 4 అంకెల కోడ్‌ను నమోదు చేయండి.");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // Demo validation accepts 1234
      if (fullCode === '1234') {
        onVerifySuccess();
      } else {
        setError(t.invalidOtpError);
      }
    }, 600);
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtpDigits(['', '', '', '']);
    setError('');
    setTimer(30);
    setCanResend(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center space-x-2 text-white">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <span>{t.otpTitle}</span>
        </div>
      }
      maxWidth="max-w-md"
    >
      <div className="space-y-5 text-center">
        {/* Visual Icon */}
        <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center text-emerald-800">
          <Smartphone className="w-7 h-7 text-emerald-700" />
        </div>

        <div>
          <h4 className="text-base font-bold text-slate-900 mb-1">
            {lang === 'en' ? "Verify Registered Mobile" : "మొబైల్ నంబర్ ధృవీకరణ"}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {t.otpSubtitle}{" "}
            <strong className="text-emerald-900 font-mono">
              {targetStudent ? targetStudent.maskedMobileNumber : "98480*****"}
            </strong>
          </p>
        </div>

        {/* 4-digit OTP Inputs */}
        <div className="flex items-center justify-center space-x-3" onPaste={handlePaste}>
          {otpDigits.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e.key)}
              className="w-12 h-14 text-center text-xl font-bold font-mono rounded-lg border-2 border-slate-300 text-slate-900 bg-white focus:outline-hidden focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
            />
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-center space-x-1.5 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo Helper Banner */}
        <div className="p-3 bg-amber-50/90 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1.5">
          <p className="font-semibold">{t.otpDemoHint}</p>
          <button
            type="button"
            onClick={handleAutoFill}
            className="text-[11px] font-bold text-emerald-800 underline hover:text-emerald-950"
          >
            {t.otpAutoFill}
          </button>
        </div>

        {/* Action Button */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg text-sm shadow-md transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isVerifying ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>{t.btnVerifyOtp}</span>
              </>
            )}
          </button>

          {/* Resend & Timer */}
          <div className="text-xs text-slate-500 flex items-center justify-between px-1">
            <span>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="font-bold text-emerald-800 hover:underline flex items-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.resendOtp}</span>
                </button>
              ) : (
                <span>{lang === 'en' ? `Resend code in ${timer}s` : `${timer} సెకన్లలో మళ్ళీ పంపవచ్చు`}</span>
              )}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="text-slate-500 hover:text-slate-800"
            >
              {t.btnCancel}
            </button>
          </div>
        </div>

      </div>
    </Modal>
  );
}
