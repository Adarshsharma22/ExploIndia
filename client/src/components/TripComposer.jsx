import React from 'react';

const TripComposer = () => {
  return (
    <div className="rounded-xl bg-white/90 dark:bg-slate-700 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.07)] p-5 mb-7 border border-slate-100 dark:border-slate-600">
      <div className="flex gap-4">
        <img
          src="img/Thrillingadventure.jpg"
          className="w-12 h-12 rounded-full object-cover ring-2 ring-ei_blue/30"
          alt="avatar"
        />

        <div className="flex-1">
          <textarea
            id="composer"
            rows="3"
            className="w-full resize-none border border-slate-200 dark:border-slate-500 bg-slate-50/50  dark:bg-slate-600 rounded-xl p-3
                 focus:outline-none focus:ring-2 focus:ring-ei_teal text-slate-700 dark:text-slate-100"
            placeholder="Share your travel experience..."
          ></textarea>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-200 text-sm">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h3l2-3h8l2 3h3v13H3V7z"
                  />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Photo
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                Location
              </button>
            </div>

            {/* Post Button */}
            <button
              id="postBtn"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-ei_blue to-ei_teal text-white font-semibold
                   shadow-[0_4px_14px_rgba(0,120,255,0.35)]
                   hover:shadow-[0_6px_18px_rgba(0,120,255,0.55)]
                   hover:-translate-y-0.5 transition-all duration-300"
            >
              Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripComposer;