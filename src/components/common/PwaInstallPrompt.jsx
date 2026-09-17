import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, WifiOff, CheckCircle, Share } from 'lucide-react';

export function PwaInstallPrompt({ lang }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineToast, setShowOfflineToast] = useState(false);

  useEffect(() => {
    // Check if already installed / running as PWA
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    setIsStandalone(isStandaloneMode);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if user dismissed previously in this session
      const dismissed = sessionStorage.getItem('pwa_dismissed');
      if (!dismissed && !isStandaloneMode) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Online / Offline Listeners
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineToast(false);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('pwa_dismissed', 'true');
  };

  return (
    <>
      {/* Offline Status Toast */}
      {!isOnline && showOfflineToast && (
        <div className="fixed top-20 inset-x-4 sm:inset-x-auto sm:right-6 z-50 max-w-sm bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center space-x-2.5">
            <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {lang === 'en'
                ? "Offline Mode Active: Precached school records and pages are available."
                : "ఆఫ్‌లైన్ మోడ్: సేవ్ చేయబడిన పాఠశాల సమాచారం అందుబాటులో ఉంది."}
            </span>
          </div>
          <button
            onClick={() => setShowOfflineToast(false)}
            className="p-1 hover:bg-slate-800 rounded-sm text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* PWA Mobile Install Banner */}
      {showInstallBanner && !isStandalone && (
        <div className="fixed bottom-16 sm:bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 z-50 max-w-md bg-white rounded-2xl shadow-2xl border-2 border-emerald-800 p-4 animate-scaleUp">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-900 p-1 border border-amber-400 shrink-0">
                <img src="/logo.svg" alt="App Icon" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 leading-tight">
                  {lang === 'en' ? "Install ZPHS Vadada App" : "జడ్పీహెచ్ఎస్ వడద యాప్‌ను ఇన్‌స్టాల్ చేయండి"}
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {lang === 'en'
                    ? "Add to home screen for 1-tap record search and offline access."
                    : "హోమ్ స్క్రీన్‌కు జోడించి సులభంగా రికార్డులు శోధించండి."}
                </p>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
              aria-label="Dismiss installation banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 text-xs text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition-colors"
            >
              {lang === 'en' ? "Not Now" : "ఇప్పుడు వద్దు"}
            </button>

            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'en' ? "Install App" : "ఇన్‌స్టాల్ చేయండి"}</span>
              </button>
            )}

            {isIOS && !deferredPrompt && (
              <div className="text-[11px] text-emerald-800 font-medium flex items-center space-x-1">
                <Share className="w-3.5 h-3.5" />
                <span>Tap Share then "Add to Home Screen"</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
