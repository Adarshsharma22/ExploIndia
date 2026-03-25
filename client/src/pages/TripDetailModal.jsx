import React, { useState } from "react";

const TripDetailModal = ({ post, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  if (!post) return null;

  const images = post.images || [];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextImage();
    if (distance < -50) prevImage();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-300">
      
      {/* Dynamic Background Overlay */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ei_teal/30 blur-[100px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-ei_orange/20 blur-[100px] rounded-full animate-pulse delay-700"></div>

      {/* Modal Container */}
      <div className="relative bg-white/80 dark:bg-slate-900/90 backdrop-blur-3xl border border-white/40 dark:border-slate-700/50 
        w-full h-full md:h-auto md:max-w-5xl md:max-h-[90vh] md:rounded-[2.5rem] 
        overflow-y-auto shadow-[0_32px_120px_-20px_rgba(0,0,0,0.5)] flex flex-col scrollbar-hide">
        
        {/* Mobile Top Bar / Desktop Close */}
        <div className="sticky top-0 z-30 flex items-center justify-between p-4 md:p-6 md:absolute md:right-0 md:top-0">
          <div className="md:hidden flex items-center gap-3">
             <img src={post.user?.profilePic || '/img/avtar.png'} className="w-8 h-8 rounded-full object-cover ring-2 ring-ei_teal/20" alt="" />
             <span className="font-bold text-slate-900 dark:text-white text-sm">{post.user?.username}</span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:rotate-90 transition-all duration-300 shadow-lg border border-white/20"
          >
            ✕
          </button>
        </div>

        {/* Layout Wrapper */}
        <div className="flex flex-col">
          
          {/* 1. IMAGE SECTION */}
          {images.length > 0 && (
            <div
              className="relative w-full aspect-square md:aspect-video overflow-hidden group/slider"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Main Image */}
              <img
                src={images[currentIndex]}
                alt="Trip"
                className="w-full h-full object-cover animate-in zoom-in-95 duration-500"
              />

              {/* Slider Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Nav Arrows (Desktop) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl text-white border border-white/20 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-white/20"
                  >
                    <span className="text-2xl">←</span>
                  </button>
                  <button
                    onClick={nextImage}
                    className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl text-white border border-white/20 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-white/20"
                  >
                    <span className="text-2xl">→</span>
                  </button>
                </>
              )}

              {/* Dynamic Pips (Bottom) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-2 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === currentIndex ? "w-6 bg-ei_teal" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 2. CONTENT SECTION */}
          <div className="p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
              
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-ei_orange/10 text-ei_orange text-[10px] font-black uppercase tracking-widest">
                      {post.location || 'Explore'}
                    </span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-bold">
                      {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                    {post.title}
                  </h2>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                   <img src={post.user?.profilePic || '/img/avtar.png'} className="w-12 h-12 rounded-xl object-cover" alt="" />
                   <div>
                     <p className="text-[10px] uppercase font-bold text-slate-400">Published by</p>
                     <p className="font-bold text-slate-900 dark:text-white">{post.user?.username || 'Traveler'}</p>
                   </div>
                </div>
              </div>

              {/* Editorial Divider */}
              <div className="flex items-center gap-4 mb-10">
                 <div className="h-[2px] flex-1 bg-gradient-to-r from-ei_teal/40 to-transparent"></div>
                 <span className="text-ei_teal text-xl">✦</span>
                 <div className="h-[2px] flex-1 bg-gradient-to-l from-ei_orange/40 to-transparent"></div>
              </div>

              {/* Body Text */}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-[1.8] font-medium first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-ei_teal">
                  {post.description}
                </p>
              </div>

              {/* Stats/Footer */}
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-slate-500">
                 <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-bold uppercase">Appreciations</span>
                       <span className="text-lg font-black text-slate-900 dark:text-white">{post.likes?.length || 0}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-bold uppercase">Discussions</span>
                       <span className="text-lg font-black text-slate-900 dark:text-white">{post.comments?.length || 0}</span>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-bold uppercase block">Current Reach</span>
                    <span className="text-lg font-black text-ei_teal">{post.views || 0} Views</span>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailModal;