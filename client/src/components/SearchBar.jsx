import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex-1 px-4 hidden lg:flex">
      <label className="relative w-full group">
        <input
          aria-label="Search"
          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white
             transition-all duration-300 dark:text-slate-800
             group-hover:shadow-[0_0_12px_3px_rgba(0,180,180,0.35)]
             focus:shadow-[0_0_14px_4px_rgba(255,140,0,0.45)]
             focus:ring-2 focus:ring-ei_teal outline-none"
          placeholder="Search destinations, people or hashtags…"
        />

        <svg
          className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2
                group-focus-within:text-ei_teal transition-all duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth="2"
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </label>
    </div>
  );
};

export default SearchBar;