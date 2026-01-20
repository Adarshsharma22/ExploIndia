import React from 'react';

const RightSidebar = () => {
  return (
    <aside className="lg:col-span-3 space-y-6">
      {/* Suggested People */}
      <div className="rounded-xl bg-white/90 dark:bg-slate-700 p-4 border border-slate-100 dark:border-slate-600 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Suggested Travellers
        </h4>

        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <img
              className="w-10 h-10 rounded-full object-cover ring-2 ring-ei_teal/20"
              src="img/nature.jpg"
              alt="Suggested 1"
            />
            <div className="flex-1 text-sm">
              <div className="font-medium text-slate-500 dark:text-slate-100">
                Shankar Sharma
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Himalayas Fan
              </div>
            </div>

            <button className="px-3 py-1 text-xs rounded-full border border-ei_teal text-ei_teal hover:bg-ei_teal hover:text-white transition">
              Follow
            </button>
          </li>

          <li className="flex items-center gap-3">
            <img
              className="w-10 h-10 rounded-full object-cover ring-2 ring-ei_blue/20"
              src="img/japan.jpg"
              alt="Suggested 2"
            />
            <div className="flex-1 text-sm">
              <div className="font-medium text-slate-500 dark:text-slate-100">
                Sourab Sonkar
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Heritage Photographer
              </div>
            </div>

            <button className="px-3 py-1 text-xs rounded-full border border-ei_teal text-ei_teal hover:bg-ei_teal hover:text-white transition">
              Follow
            </button>
          </li>
        </ul>
      </div>

      {/* Trending */}
      <div className="rounded-xl bg-white/90 dark:bg-slate-700 p-4 border border-slate-100 dark:border-slate-600 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Trending
        </h4>
        <div className="flex flex-wrap gap-2">
          <a
            href="#"
            className="px-3 py-1 rounded-full bg-ei_orange/10 text-ei_orange text-sm hover:bg-ei_orange hover:text-white transition"
          >
            #Goa
          </a>
          <a
            href="#"
            className="px-3 py-1 rounded-full bg-ei_teal/10 text-ei_teal text-sm hover:bg-ei_teal hover:text-white transition"
          >
            #Ladakh
          </a>
          <a
            href="#"
            className="px-3 py-1 rounded-full bg-ei_blue/10 text-ei_blue text-sm hover:bg-ei_blue hover:text-white transition"
          >
            #TajMahal
          </a>
          <a
            href="#"
            className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition"
          >
            #RoadTrip
          </a>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;