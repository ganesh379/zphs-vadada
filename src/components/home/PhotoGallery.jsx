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
                {/* Photograph Media Container */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[11px] font-mono text-emerald-300 border border-emerald-500/30">
                    {item.tag}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => setSelectedImage(item)}
                      className="px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-bold rounded-md flex items-center space-x-1.5 shadow-md hover:bg-amber-400 transition-colors"
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
            <div className="relative h-64 bg-slate-900 overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded w-fit mb-1">
                  {selectedImage.category}
                </span>
                <h3 className="text-lg font-bold leading-tight">{selectedImage.title}</h3>
                <p className="text-xs text-emerald-300 font-mono mt-1">{selectedImage.tag}</p>
              </div>
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
