import React, { useState } from 'react';
import { Menu, X, Globe, Search, Shield, BookOpen, Award, Phone, Image as ImageIcon } from 'lucide-react';

export function Header({ 
  lang, 
  setLang, 
  t, 
  activeSection, 
  onNavigate,
  currentUser,
  onOpenLogin,
  onOpenAdmin,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: t.navHome, icon: BookOpen },
    { id: 'about', label: t.navAbout, icon: BookOpen },
    { id: 'search-portal', label: t.navRecords, icon: Search, isPrimary: true },
    { id: 'achievements', label: t.navAchievements, icon: Award },
    { id: 'gallery', label: t.navGallery, icon: ImageIcon },
    { id: 'contact', label: t.navContact, icon: Phone }
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-emerald-900 text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Staff portal status badge */}
          <div className="flex items-center space-x-2">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1 bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-700 text-[11px]">
                  <Shield className="w-3 h-3 text-amber-400" />
                  <span className="font-semibold text-white">{currentUser.name}</span>
                  <span className="text-emerald-300">({currentUser.role === 'admin' ? 'Headmaster' : 'Staff Clerk'})</span>
                </span>
                <button
                  onClick={onOpenAdmin}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md font-bold text-[11px] shadow-xs transition-colors"
                >
                  {lang === 'en' ? 'CMS Dashboard' : 'సిబ్బంది డ్యాష్‌బోర్డ్'}
                </button>
                <button
                  onClick={onLogout}
                  className="text-emerald-300 hover:text-white underline text-[11px] ml-1"
                >
                  {lang === 'en' ? 'Sign Out' : 'లాగౌట్'}
                </button>
              </div>
            ) : (
              <span className="hidden sm:inline-flex text-emerald-300/90 text-[11px]">
                {lang === 'en' ? 'Z.P. High School Vadada • Estd. 1962' : 'జిల్లా పరిషత్ ఉన్నత పాఠశాల వడద'}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Staff / Admin Login Button when logged out */}
            {!currentUser && (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-700/60 transition-colors text-[11px] font-medium"
                title={lang === 'en' ? 'Staff & Administrator CMS Login' : 'ఉపాధ్యాయులు మరియు ప్రధానోపాధ్యాయుల లాగిన్'}
              >
                <Shield className="w-3 h-3 text-amber-400" />
                <span>{lang === 'en' ? 'Staff Portal' : 'సిబ్బంది లాగిన్'}</span>
              </button>
            )}

            {/* Language Switcher */}
            <div className="flex items-center bg-emerald-950/60 rounded-full p-0.5 border border-emerald-700/50">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-full transition-all ${
                  lang === 'en' 
                    ? 'bg-amber-500 text-slate-950 shadow-xs' 
                    : 'text-emerald-200 hover:text-white'
                }`}
                aria-label="Switch to English"
              >
                English
              </button>
              <button
                onClick={() => setLang('te')}
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-full transition-all ${
                  lang === 'te' 
                    ? 'bg-amber-500 text-slate-950 shadow-xs' 
                    : 'text-emerald-200 hover:text-white'
                }`}
                aria-label="Switch to Telugu"
              >
                తెలుగు
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Branding */}
          <button 
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center space-x-3.5 text-left focus:outline-hidden focus:ring-2 focus:ring-emerald-600 rounded-lg p-1 group"
          >
            <div className="relative w-14 h-14 shrink-0 rounded-full border-2 border-amber-500/70 p-0.5 bg-emerald-50 shadow-xs transition-transform group-hover:scale-105">
              <img 
                src="/logo.svg" 
                alt="ZPHS Vadada Official Emblem" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors">
                  {t.schoolName}
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {lang === 'en' ? 'AP Govt. School' : 'ప్రభుత్వ పాఠశాల'}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600">
                {t.schoolSubtitle}
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isRecordsBtn = link.isPrimary;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center space-x-1.5 ${
                    isRecordsBtn
                      ? 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm border border-emerald-950 font-semibold ring-2 ring-emerald-600/30'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/70'
                  }`}
                >
                  <link.icon className={`w-4 h-4 ${isRecordsBtn ? 'text-amber-300' : 'text-slate-500'}`} />
                  <span>{link.label}</span>
                  {isRecordsBtn && (
                    <span className="ml-1 px-1.5 py-0.2 bg-amber-400 text-slate-900 text-[10px] font-bold rounded-full">
                      {lang === 'en' ? 'DIGITAL' : 'డిజిటల్'}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-emerald-800 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg animate-fadeIn">
          <div className="px-4 pt-3 pb-5 space-y-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2.5 ${
                  link.isPrimary
                    ? 'bg-emerald-800 text-white font-semibold'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                <link.icon className={`w-4 h-4 ${link.isPrimary ? 'text-amber-300' : 'text-slate-500'}`} />
                <span>{link.label}</span>
                {link.isPrimary && (
                  <span className="ml-auto px-2 py-0.5 bg-amber-400 text-slate-900 text-[10px] font-bold rounded-full">
                    {lang === 'en' ? 'Search Archives' : 'ఆర్కైవ్ శోధన'}
                  </span>
                )}
              </button>
            ))}

            {/* Mobile Staff Portal / CMS Trigger */}
            <div className="pt-2 border-t border-slate-100">
              {currentUser ? (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-900">{currentUser.name}</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {currentUser.role}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAdmin();
                      }}
                      className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded text-center transition-colors"
                    >
                      {lang === 'en' ? 'Open CMS Dashboard' : 'డ్యాష్‌బోర్డ్ తెరవండి'}
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded transition-colors"
                    >
                      {lang === 'en' ? 'Logout' : 'లాగౌట్'}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-950 text-white flex items-center justify-between hover:bg-emerald-900 transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'en' ? 'Staff & Administrator Portal' : 'సిబ్బంది లాగిన్ పోర్టల్'}</span>
                  </span>
                  <span className="text-[10px] bg-emerald-800 text-emerald-200 px-1.5 py-0.5 rounded">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
