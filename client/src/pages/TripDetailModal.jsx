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
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const minSwipeDistance = 50;

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

    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Glass Background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Glow Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-ei_teal/20 blur-[120px] rounded-full"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-ei_orange/20 blur-[120px] rounded-full"></div>

      {/* Modal */}
      <div className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/30 dark:border-slate-700/40 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide shadow-[0_25px_80px_rgba(0,0,0,0.35)] transition-all duration-500">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/30 hover:scale-110 transition-all shadow-md"
        >
          ✕
        </button>

        {/* IMAGE SLIDER */}
        {images.length > 0 && (
          <div
            className="relative group"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >

            {/* Image */}
            <img
              src={images[currentIndex]}
              alt="Trip"
              className="w-full h-[420px] object-cover rounded-t-3xl"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-t-3xl"></div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white text-xl hover:scale-110 transition-all"
                >
                  ‹
                </button>

                <button
                  onClick={nextImage}
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white text-xl hover:scale-110 transition-all"
                >
                  ›
                </button>
              </>
            )}

            {/* Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`transition-all duration-300 ${
                      i === currentIndex
                        ? "w-6 h-2 bg-white rounded-full"
                        : "w-2 h-2 bg-white/50 rounded-full"
                    }`}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* Content */}
        <div className="p-8 space-y-4">

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {post.title}
          </h2>

          {/* Date */}
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>

          {/* Description */}
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-[15px]">
            {post.description}
          </p>

        </div>
      </div>
    </div>
  );
};

export default TripDetailModal;