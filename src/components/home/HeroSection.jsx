import React from 'react';
import { Search, Info, ShieldCheck, Award, BookOpen, Users, CheckCircle2 } from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';

export function HeroSection({ t, lang, onSearchClick, onAboutClick }) {
  return (
    <section id="hero" className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white overflow-hidden">
      {/* Subtle Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-amber-300 text-xs font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>{t.estdBadge}</span>
              <span className="text-emerald-300">•</span>
              <span>{lang === 'en' ? 'Digital Alumni Archive Active' : 'డిజిటల్ విద్యార్థి ఆర్కైవ్'}</span>
            </div>

            {/* Main Headings */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-xs">
                {t.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-emerald-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.heroSubtitle}
              </p>
              {lang === 'en' && (
                <p className="text-xs sm:text-sm text-emerald-200/75 italic">
                  {SCHOOL_INFO.fullName} — Vadada, Andhra Pradesh
                </p>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-emerald-200">
              <div className="flex items-center space-x-1.5 bg-emerald-950/70 px-3 py-1.5 rounded-md border border-emerald-800/60">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>BSEAP Affiliated</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-emerald-950/70 px-3 py-1.5 rounded-md border border-emerald-800/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{SCHOOL_INFO.mediums}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-emerald-950/70 px-3 py-1.5 rounded-md border border-emerald-800/60">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Govt Co-Educational High School</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onSearchClick}
                className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center space-x-2.5 focus:outline-hidden focus:ring-4 focus:ring-amber-400/50 border border-amber-300"
              >
                <Search className="w-5 h-5 text-slate-950" />
                <span>{t.btnSearchRecord}</span>
              </button>

              <button
                onClick={onAboutClick}
                className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold rounded-lg bg-emerald-800/80 hover:bg-emerald-800 text-white border border-emerald-600/80 hover:border-emerald-500 transition-all flex items-center justify-center space-x-2 focus:outline-hidden focus:ring-4 focus:ring-emerald-700/50"
              >
                <Info className="w-5 h-5 text-emerald-300" />
                <span>{t.btnAboutSchool}</span>
              </button>
            </div>
          </div>

          {/* Right Hero Visual / School Building Placeholder Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl p-2 bg-gradient-to-br from-amber-400/30 via-emerald-600/20 to-slate-800/40 border border-emerald-600/40 shadow-2xl backdrop-blur-xs">
              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
                
                {/* SVG School Building Graphic & Architectural Placeholder */}
                <div className="h-64 sm:h-72 w-full bg-linear-to-b from-slate-800 to-emerald-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                  <svg viewBox="0 0 400 240" className="w-full h-full text-emerald-700 drop-shadow-md">
                    {/* Sky & Clouds */}
                    <path d="M 50 40 Q 65 30 80 40 Q 95 30 110 40 Q 120 50 110 60 L 50 60 Z" fill="#ffffff" opacity="0.15" />
                    <path d="M 280 30 Q 295 20 310 30 Q 325 20 340 30 Q 350 40 340 50 L 280 50 Z" fill="#ffffff" opacity="0.15" />

                    {/* School Ground */}
                    <rect x="0" y="190" width="400" height="50" fill="#0A3622" />
                    <line x1="0" y1="190" x2="400" y2="190" stroke="#F59E0B" strokeWidth="2" />

                    {/* Main School Building Structure */}
                    <rect x="70" y="80" width="260" height="110" fill="#1E3A8A" rx="4" />
                    <rect x="150" y="60" width="100" height="130" fill="#14532D" rx="4" stroke="#F59E0B" strokeWidth="2" />

                    {/* Gable Roof Center */}
                    <polygon points="140,65 200,20 260,65" fill="#B45309" stroke="#F59E0B" strokeWidth="1.5" />
                    <circle cx="200" cy="45" r="8" fill="#FDE047" />

                    {/* National Flag Post */}
                    <line x1="200" y1="20" x2="200" y2="5" stroke="#FFFFFF" strokeWidth="2" />
                    <polygon points="200,5 218,10 200,15" fill="#F97316" />

                    {/* Windows & Doors */}
                    <rect x="90" y="100" width="22" height="30" fill="#E2E8F0" rx="2" />
                    <rect x="120" y="100" width="22" height="30" fill="#E2E8F0" rx="2" />
                    <rect x="90" y="145" width="22" height="30" fill="#E2E8F0" rx="2" />
                    <rect x="120" y="145" width="22" height="30" fill="#E2E8F0" rx="2" />

                    <rect x="258" y="100" width="22" height="30" fill="#E2E8F0" rx="2" />
                    <rect x="288" y="100" width="22" height="30" fill="#E2E8F0" rx="2" />
                    <rect x="258" y="145" width="22" height="30" fill="#E2E8F0" rx="2" />
                    <rect x="288" y="145" width="22" height="30" fill="#E2E8F0" rx="2" />

                    {/* Central Grand Entrance */}
                    <path d="M 180 190 L 180 140 Q 200 130 220 140 L 220 190 Z" fill="#D97706" />
                    <text x="200" y="85" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">ZPHS VADADA</text>

                    {/* Trees & Landscaping */}
                    <circle cx="45" cy="170" r="22" fill="#15803D" />
                    <rect x="42" y="170" width="6" height="20" fill="#78350F" />
                    <circle cx="355" cy="170" r="22" fill="#15803D" />
                    <rect x="352" y="170" width="6" height="20" fill="#78350F" />
                  </svg>

                  {/* Stamp Overlay */}
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-mono text-amber-300 border border-amber-500/40">
                    Campus Facility & Grounds • ZPHS Vadada
                  </div>
                </div>

                {/* Sub-card Details */}
                <div className="p-4 bg-slate-800/95 border-t border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">Location:</span>
                    <span className="font-semibold text-white">Vadada, Andhra Pradesh</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block">Digitization Drive:</span>
                    <span className="text-emerald-400 font-bold">1985 – 2024 Records</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
