import React from 'react';

const MobileMenu = ({ isOpen }) => {
  return (
    <div
      id="mobileMenu"
      // If isOpen is false, add 'hidden'. If true, remove 'hidden'.
      // md:hidden is always present to ensure it stays hidden on desktop.
      className={`${isOpen ? '' : 'hidden'} md:hidden border-t border-slate-200 dark:border-slate-800 dark:bg-slate-800 bg-white text-slate-700 dark:text-slate-200 backdrop:blur`}
    >
      <div className="px-4 py-4 space-y-2">
        <a
          href="home"
          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-ei_teal transition"
        >
          <i className="uil uil-home text-xl"></i>
          <span>Home</span>
        </a>

        <a
          href="Profile"
          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-ei_teal transition"
        >
          <i className="uil uil-user-circle text-xl"></i>
          <span>Profile</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-ei_teal transition"
        >
          <i className="uil uil-compass text-xl"></i>
          <span>Explore Destinations</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-ei_teal transition"
        >
          <i className="uil uil-history text-xl"></i>
          <span>Timeline</span>
        </a>

        <a
          href="AboutUs"
          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-ei_teal transition"
        >
          <i className="uil uil-info-circle text-xl"></i>
          <span>About Us</span>
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;