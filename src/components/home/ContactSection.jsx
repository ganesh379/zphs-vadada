import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building, Shield, ExternalLink, Navigation, Compass } from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';

export function ContactSection({ t, lang }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    queryType: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;
    setSubmitted(true);
  };

  const mapUrl = SCHOOL_INFO.contact.mapUrl;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=18.5072028,83.4533293`;

  return (
    <section id="contact" className="space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
          <MapPin className="w-4 h-4 text-emerald-700" />
          <span>{lang === 'en' ? "Get in Touch & Visit Us" : "సంప్రదింపు వివరాలు & పాఠశాల స్థానం"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {t.contactTitle}
        </h2>
      </div>

      {/* Top Grid: School Contact Card & Quick Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: School Contact Card */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-emerald-800 text-amber-400 flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">ZPHS Vadada Administrative Office</h3>
                <p className="text-xs text-slate-500">Vadada High School, School Education Department</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">{lang === 'en' ? 'Postal Address:' : 'తపాలా చిరునామా:'}</strong>
                  <span>{SCHOOL_INFO.contact.addressLine1}, {SCHOOL_INFO.contact.village}, {SCHOOL_INFO.contact.district} - {SCHOOL_INFO.contact.pinCode}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">{lang === 'en' ? 'Office Phone / Mobile:' : 'కార్యాలయ ఫోన్ నంబర్:'}</strong>
                  <span>{SCHOOL_INFO.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">{lang === 'en' ? 'Official Email ID:' : 'అధికారిక ఈమెయిల్:'}</strong>
                  <span className="font-mono text-xs">{SCHOOL_INFO.contact.email}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">{lang === 'en' ? 'School Office Timings:' : 'కార్యాలయ పని వేళలు:'}</strong>
                  <span>{SCHOOL_INFO.contact.officeHours}</span>
                </div>
              </div>
            </div>

            {/* Note on physical ledger access */}
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-start space-x-2">
              <Shield className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                {lang === 'en'
                  ? "For physical ledger verification or historical TC issuance, please visit the Headmaster's office during working hours with valid identification."
                  : "భౌతిక రిజిస్టర్ తనిఖీ లేదా టి.సి కొరకు పని దినములలో పాఠశాల సమయాలలో తగిన గుర్తింపు కార్డుతో ప్రధానోపాధ్యాయుల కార్యాలయాన్ని సందర్శించవచ్చు."}
              </span>
            </div>
          </div>
        </div>

        {/* Right Col: Quick Inquiry Form */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {lang === 'en' ? "Send Office Inquiry or Message" : "పాఠశాలకు సందేశం పంపండి"}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'en' ? "Queries regarding student admissions, archives, or events" : "అడ్మిషన్లు లేదా రికార్డుల గురించిన విచారణలు"}
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-lg text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">
                  {lang === 'en' ? "Inquiry Submitted Successfully" : "విచారణ విజయవంతంగా నమోదు చేయబడింది"}
                </h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  {lang === 'en' 
                    ? "Thank you. Your message has been logged for school office review. The administration will contact you if required." 
                    : "ధన్యవాదాలు. మీ సందేశం పాఠశాల కార్యాలయంలో నమోదు చేయబడింది."}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', mobile: '', queryType: 'General Inquiry', message: '' });
                  }}
                  className="px-4 py-1.5 bg-emerald-800 text-white rounded-md text-xs font-semibold hover:bg-emerald-900"
                >
                  {lang === 'en' ? "Submit Another Query" : "మరొక సందేశం పంపండి"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'en' ? "Your Full Name *" : "మీ పూర్తి పేరు *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., K. Suresh"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-md border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'en' ? "Mobile Number *" : "మొబైల్ నంబర్ *"}
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                      placeholder="10-digit number"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-md border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'en' ? "Query Type" : "విచారణ రకం"}
                    </label>
                    <select
                      value={formData.queryType}
                      onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-md border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 bg-white"
                    >
                      <option>Alumni Record Verification</option>
                      <option>Admissions Inquiry</option>
                      <option>School Certificate / TC</option>
                      <option>General School Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'en' ? "Message / Details" : "సందేశం / వివరాలు"}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'en' ? "State your query or details of record needed..." : "మీ సందేశాన్ని ఇక్కడ టైప్ చేయండి..."}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-md border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-md text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xs transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'en' ? "Submit Inquiry to School" : "సందేశం పంపండి"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Google Maps Location Section */}
      <div className="bg-white rounded-2xl border-2 border-emerald-800/80 shadow-md overflow-hidden">
        {/* Map Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-amber-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
                <span>{lang === 'en' ? "School Location & Map (Vadada High School)" : "పాఠశాల స్థానం మరియు గూగుల్ మ్యాప్"}</span>
              </h3>
              <p className="text-xs text-emerald-200">
                {lang === 'en' ? "Official GPS coordinates: 18.5072° N, 83.4533° E • Vadada, Andhra Pradesh" : "అధికారిక GPS కోఆర్డినేట్స్: 18.5072° N, 83.4533° E"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 border border-emerald-600 transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'en' ? "Get Directions" : "దారి చూడండి"}</span>
            </a>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? "Open Google Maps" : "గూగుల్ మ్యాప్స్"}</span>
            </a>
          </div>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="relative w-full h-80 sm:h-96 bg-slate-100">
          <iframe
            title="Vadada High School Google Map Location"
            src={SCHOOL_INFO.contact.mapEmbedUrl}
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Map Footer Bar with Location Details */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
            <span>
              <strong className="text-slate-900">{SCHOOL_INFO.contact.placeName}</strong> — Vadada, Andhra Pradesh, India (PIN: {SCHOOL_INFO.contact.pinCode})
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-[11px] text-slate-500 font-mono">
            <span className="bg-white px-2.5 py-0.5 rounded border border-slate-300">
              Geo: {SCHOOL_INFO.contact.coordinates}
            </span>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 hover:underline font-semibold flex items-center space-x-1"
            >
              <span>{mapUrl}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
