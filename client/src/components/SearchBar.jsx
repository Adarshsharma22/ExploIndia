import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex-1 px-4 hidden lg:flex max-w-2xl mx-auto">
      <label className="relative w-full group">
        {/* The Input Field */}
        <input
          type="text"
          aria-label="Search"
          placeholder="Search destinations, people or hashtags...."
          className="
            w-full pl-12  py-3 rounded-2xl outline-none transition-all duration-500
            /* Glass Base */
            bg-slate-900/5 dark:bg-white/5 border border-transparent
            text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500
            
            /* Hover State: Subtle Teal Glow */
            hover:bg-slate-900/10 dark:hover:bg-white/10
            hover:border-ei_teal/30
            
            /* Focus State: Brand Orange Glow */
            focus:bg-white dark:focus:bg-slate-950
            focus:ring-2 focus:ring-ei_orange/50
            focus:shadow-[0_0_25px_-5px_oklch(76.9%_0.188_70.08/0.3)]
          "
        />

        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-slate-400 group-focus-within:text-ei_orange group-focus-within:scale-110 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>
       
      </label>
    </div>
  );
};

export default SearchBar;