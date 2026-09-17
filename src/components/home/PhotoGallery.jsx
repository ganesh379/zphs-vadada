import React, { useState } from 'react';
import { Image as ImageIcon, ZoomIn, Eye, Sparkles, Building, BookOpen, Microscope, Trophy } from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';

export function PhotoGallery({ t, lang }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filters = ['All', 'Campus', 'Academics', 'Laboratories', 'Sports'];

  const filteredItems = activeFilter === 'All'
    ? SCHOOL_INFO.gallery
    : SCHOOL_INFO.gallery.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <ImageIcon className="w-4 h-4 text-emerald-700" />
            <span>{lang === 'en' ? "Visual Campus Archives" : "ఫోటో గ్యాలరీ"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t.galleryTitle}
          </h2>
        </div>
        
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3 md:mt-0">
          {filters.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                activeFilter === category
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          // Dynamic icon for placeholder graphics
          const CategoryIcon = item.category === 'Academics' 
            ? BookOpen 
            : item.category === 'Laboratories' 
              ? Microscope 
              : item.category === 'Sports' 
                ? Trophy 
                : Building;

          return (
            <div 
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                {/* SVG Visual Graphic Placeholder */}
                <div className="relative h-48 bg-linear-to-br from-slate-800 to-emerald-950 flex flex-col items-center justify-center p-4 overflow-hidden">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:12px_12px]" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xs flex items-center justify-center text-amber-300 shadow-lg group-hover:scale-110 transition-transform">
                    <CategoryIcon className="w-8 h-8" />
                  </div>

                  <div className="mt-3 px-2.5 py-0.5 rounded bg-black/60 text-[11px] font-mono text-emerald-300 border border-emerald-500/30">
                    {item.tag}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => setSelectedImage(item)}
                      className="px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-bold rounded-md flex items-center space-x-1.5 shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Preview Details' : 'వివరాలు చూడండి'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">ZPHS VADADA</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-3 text-[11px] text-slate-400 border-t border-slate-100 pt-2 flex items-center justify-between">
                <span>Infrastructure Archive</span>
                <span className="text-emerald-700 font-semibold">Active Facility</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal image preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-56 bg-gradient-to-tr from-slate-900 to-emerald-900 flex flex-col items-center justify-center text-white p-6 relative">
              <Building className="w-16 h-16 text-amber-400 mb-2" />
              <h3 className="text-lg font-bold">{selectedImage.title}</h3>
              <p className="text-xs text-emerald-200 font-mono mt-1">{selectedImage.tag}</p>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm text-slate-700">{selectedImage.caption}</p>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">{lang === 'en' ? "Institutional Archive:" : "పాఠశాల రికార్డు:"}</span> {lang === 'en' ? "Visual documentation curated by ZPHS Vadada administrative archives." : "వడద జిల్లా పరిషత్ ఉన్నత పాఠశాల అధికారిక విజువల్ ఆర్కైవ్."}
              </div>
              <div className="text-right pt-2">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
