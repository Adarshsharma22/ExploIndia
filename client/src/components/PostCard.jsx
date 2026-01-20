import React from 'react';

const PostCard = () => {
  return (
    <article className="rounded-xl bg-white/90 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 backdrop-blur-sm p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition">
      <div className="flex items-start gap-4">
        <img
          className="w-11 h-11 rounded-full object-cover ring-2 ring-ei_teal/20"
          src="img/Sagar.jpg"
          alt="User"
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Sagar Sharma
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                Goa 3 days ago
              </p>
            </div>
            <button className="text-slate-400 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-100 transition">
              ⋮
            </button>
          </div>

          <p className="mt-3 text-slate-700 dark:text-slate-200 leading-relaxed">
            Absolutely loved this paradise beach in Goa — clear water and golden
            sand. ☀️🏖️
          </p>

          {/* Gallery */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <img
              className="w-full h-24 rounded-lg object-cover hover:scale-105 transition"
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Post Image 1"
            />
            <img
              className="w-full h-24 rounded-lg object-cover hover:scale-105 transition"
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
              alt="Post Image 2"
            />
            <img
              className="w-full h-24 rounded-lg object-cover hover:scale-105 transition"
              src="https://images.unsplash.com/photo-1493558103817-58b2924bce98"
              alt="Post Image 3"
            />
          </div>

          {/* Interactions */}
          <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-4">
              <button className="like-btn inline-flex items-center gap-2 hover:text-ei_orange transition">
                ❤️ <span className="like-count">25</span>
              </button>

              <button className="inline-flex items-center gap-2 hover:text-ei_orange transition">
                💬 3
              </button>

              <button className="inline-flex items-center gap-2 hover:text-ei_orange transition">
                🔗 Share
              </button>
            </div>

            <span className="text-xs text-slate-400">128 views</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;