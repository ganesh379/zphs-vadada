import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { PolicyModals } from './components/common/PolicyModals';
import { HeroSection } from './components/home/HeroSection';
import { PrincipalMessage } from './components/home/PrincipalMessage';
import { SchoolOverview } from './components/home/SchoolOverview';
import { Announcements } from './components/home/Announcements';
import { Achievements } from './components/home/Achievements';
import { PhotoGallery } from './components/home/PhotoGallery';
import { ContactSection } from './components/home/ContactSection';
import { RecordSearchPortal } from './components/records/RecordSearchPortal';
import { PwaInstallPrompt } from './components/common/PwaInstallPrompt';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { TRANSLATIONS } from './data/translations';
import { Info, ShieldAlert } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'te'
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const t = TRANSLATIONS[lang];

  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearchScroll = () => {
    handleNavigate('search-portal');
  };

  const handleAboutScroll = () => {
    handleNavigate('about');
  };

  const handleContactScroll = () => {
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      
      {/* Header with Bilingual Toggle & Navigation */}
      <Header
        lang={lang}
        setLang={setLang}
        t={t}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero Section */}
        <HeroSection
          t={t}
          lang={lang}
          onSearchClick={handleSearchScroll}
          onAboutClick={handleAboutScroll}
        />

        {/* Prototype Demonstration Banner */}
        <div className="bg-amber-500/15 border-y border-amber-500/30 py-2.5 px-4 text-center text-xs text-amber-950 font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              {lang === 'en'
                ? "Demonstration Prototype: All alumni records shown are fictional sample data for system evaluation and institutional preview."
                : "డెమో ప్రోటోటైప్: ప్రదర్శించబడిన అన్ని విద్యార్థి రికార్డులు డెమో కొరకు రూపొందించబడిన నమూనా సమాచారం మాత్రమే."}
            </span>
          </div>
        </div>

        {/* Container for Homepage Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
          
          {/* 2. Main Feature: Student Record Search Portal */}
          <div className="scroll-mt-24" id="search-portal">
            <RecordSearchPortal
              t={t}
              lang={lang}
              onContactSchoolClick={handleContactScroll}
            />
          </div>

          {/* 3. Principal's Message Card */}
          <div className="scroll-mt-24">
            <PrincipalMessage
              t={t}
              lang={lang}
            />
          </div>

          {/* 4. School Overview Section */}
          <div className="scroll-mt-24" id="about">
            <SchoolOverview
              t={t}
              lang={lang}
            />
          </div>

          {/* 5. Latest Announcements Section */}
          <div className="scroll-mt-24">
            <Announcements
              t={t}
              lang={lang}
              onRecordArchiveClick={handleSearchScroll}
            />
          </div>

          {/* 6. Achievements Section */}
          <div className="scroll-mt-24" id="achievements">
            <Achievements
              t={t}
              lang={lang}
            />
          </div>

          {/* 7. Photo Gallery Preview */}
          <div className="scroll-mt-24" id="gallery">
            <PhotoGallery
              t={t}
              lang={lang}
            />
          </div>

          {/* 8. Contact & Location Section */}
          <div className="scroll-mt-24" id="contact">
            <ContactSection
              t={t}
              lang={lang}
            />
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer
        t={t}
        lang={lang}
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenTerms={() => setTermsOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Mobile Safe Space so footer is never obscured by bottom bar */}
      <div className="h-16 lg:hidden" aria-hidden="true" />

      {/* PWA Mobile Install Banner & Offline Notice */}
      <PwaInstallPrompt lang={lang} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomBar
        onNavigate={handleNavigate}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      {/* Privacy & Terms Modals */}
      <PolicyModals
        privacyOpen={privacyOpen}
        termsOpen={termsOpen}
        onClosePrivacy={() => setPrivacyOpen(false)}
        onCloseTerms={() => setTermsOpen(false)}
        lang={lang}
      />

    </div>
  );
}
