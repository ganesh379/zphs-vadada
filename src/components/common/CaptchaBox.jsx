import React, { useState, useEffect } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';

export function CaptchaBox({ onVerify, isVerified, error, lang }) {
  const [num1, setNum1] = useState(4);
  const [num2, setNum2] = useState(3);
  const [userAnswer, setUserAnswer] = useState('');
  const [localError, setLocalError] = useState('');

  const generateNewCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 7) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setLocalError('');
    onVerify(false, null);
  };

  useEffect(() => {
    generateNewCaptcha();
  }, []);

  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setUserAnswer(val);
    if (parseInt(val, 10) === num1 + num2) {
      setLocalError('');
      onVerify(true, parseInt(val, 10));
    } else {
      onVerify(false, val ? parseInt(val, 10) : null);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-300 rounded-lg p-3.5 space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{lang === 'en' ? "Security Verification (Human Check)" : "భద్రతా నిర్ధారణ (CAPTCHA)"}</span>
        </label>
        <button
          type="button"
          onClick={generateNewCaptcha}
          className="text-xs text-emerald-800 hover:text-emerald-950 flex items-center space-x-1 p-1 hover:bg-emerald-50 rounded-sm transition-colors"
          title="Regenerate Security Code"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">{lang === 'en' ? "Change" : "మార్చండి"}</span>
        </button>
      </div>

      <div className="flex items-center space-x-3">
        {/* Math Challenge Visual Badge */}
        <div className="px-3.5 py-1.5 bg-slate-900 text-amber-300 font-mono text-base font-bold tracking-widest rounded-md border border-slate-700 select-none shadow-inner flex items-center space-x-1.5">
          <span>{num1}</span>
          <span className="text-white">+</span>
          <span>{num2}</span>
          <span className="text-white">=</span>
          <span className="text-amber-400">?</span>
        </div>

        {/* Input */}
        <div className="flex-1">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            value={userAnswer}
            onChange={handleChange}
            placeholder={lang === 'en' ? "Result" : "సమాధానం"}
            className={`w-full px-3 py-2 text-base sm:text-sm font-semibold rounded-md border text-slate-900 bg-white placeholder-slate-400 focus:outline-hidden focus:ring-2 ${
              isVerified 
                ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/50' 
                : error 
                  ? 'border-red-500 ring-2 ring-red-500/20' 
                  : 'border-slate-300 focus:ring-emerald-600 focus:border-emerald-600'
            }`}
          />
        </div>

        {/* Verified Indicator */}
        {isVerified && (
          <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md border border-emerald-300 flex items-center space-x-1">
            <span>✓</span>
            <span className="hidden sm:inline">{lang === 'en' ? 'Verified' : 'ధృవీకరించబడింది'}</span>
          </span>
        )}
      </div>

      {(error || localError) && (
        <p className="text-[11px] text-red-600 font-medium">
          {error || localError}
        </p>
      )}
    </div>
  );
}
