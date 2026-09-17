import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Shield, BookOpen, Heart } from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';

export function Footer({ t, lang, onOpenPrivacy, onOpenTerms, onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t-4 border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full p-1 bg-white border border-amber-400 shrink-0">
                <img src="/logo.svg" alt="ZPHS Emblem" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg tracking-tight">ZPHS Vadada</h3>
                <p className="text-xs text-amber-400 font-medium">Zilla Parishad High School</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'en' 
                ? "Affiliated to Board of Secondary Education, Andhra Pradesh (BSEAP). Dedicated to holistic rural secondary education and transparent digital student governance." 
                : "ఆంధ్రప్రదేశ్ సెకండరీ విద్యా మండలి (BSEAP) అనుబంధం కలిగిన పాఠశాల. గ్రామీణ విద్యాభివృద్ధి మరియు పారదర్శక డిజిటల్ సేవల కొరకు అంకితం చేయబడింది."}
            </p>
            <div className="pt-1 text-[11px] text-emerald-400 font-mono">
              {SCHOOL_INFO.schoolCode}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-slate-700 pb-2 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? "Quick Navigation" : "ప్రధాన లింకులు"}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-amber-400 transition-colors">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search-portal')} className="text-amber-400 font-semibold hover:underline flex items-center space-x-1">
                  <span>{t.navRecords} (Digital Archive)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('achievements')} className="hover:text-amber-400 transition-colors">
                  {t.navAchievements}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-amber-400 transition-colors">
                  {t.navGallery}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors">
                  {t.navContact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Educational Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-slate-700 pb-2 flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'en' ? "Official AP Portals" : "ప్రభుత్వ విద్యా పోర్టల్స్"}</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer">
                <span>AP School Education Dept (CSE)</span>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer">
                <span>BSEAP (Directorate of Govt Exams)</span>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer">
                <span>Samagra Shiksha Andhra Pradesh</span>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer">
                <span>AP Teachers & Student Information System</span>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer">
                <span>Mana Badi - Nadu Nedu Portal</span>
              </li>
            </ul>
          </div>

          {/* Col 4: School Office & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-slate-700 pb-2 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? "School Office" : "పాఠశాల కార్యాలయం"}</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.contact.addressLine1}, {SCHOOL_INFO.contact.village}, {SCHOOL_INFO.contact.mandal}, {SCHOOL_INFO.contact.district}, {SCHOOL_INFO.contact.state} - {SCHOOL_INFO.contact.pinCode}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{SCHOOL_INFO.contact.phone}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{SCHOOL_INFO.contact.email}</span>
              </p>
              <div className="pt-1">
                <a
                  href={SCHOOL_INFO.contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? "View on Google Maps" : "గూగుల్ మ్యాప్స్‌లో చూడండి"}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Privacy & Legal Notice */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} ZPHS Vadada. All Rights Reserved.</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-emerald-400">Official AP Government School Digital Prototype</span>
          </div>

          <div className="flex items-center space-x-6 text-xs">
            <button 
              onClick={onOpenPrivacy}
              className="hover:text-amber-400 underline decoration-slate-600 transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={onOpenTerms}
              className="hover:text-amber-400 underline decoration-slate-600 transition-colors"
            >
              Terms of Use & Record Access
            </button>
            <a 
              href="#search-portal"
              className="hover:text-amber-400 underline decoration-slate-600 transition-colors"
            >
              Digital Archives
            </a>
          </div>
        </div>

        {/* Disclaimer note */}
        <div className="mt-4 text-center text-[11px] text-slate-400 bg-slate-950/60 py-2 px-4 rounded-md border border-slate-800">
          <p>
            {lang === 'en'
              ? "Disclaimer: This digital portal displays digitized student verification records from physical school ledgers. Sensitive identifiers are masked for privacy compliance."
              : "గమనిక: ఈ డిజిటల్ పోర్టల్ పాత భౌతిక రికార్డుల నుండి డిజిటైజ్ చేయబడిన విద్యార్థి వివరాలను ప్రదర్శిస్తుంది. గోప్యత రక్షణ నిమిత్తం వ్యక్తిగత వివరాలు పాక్షికంగా దాచబడ్డాయి."}
          </p>
        </div>

      </div>
    </footer>
  );
}
