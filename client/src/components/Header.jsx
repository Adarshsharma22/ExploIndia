import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';

export default function Header() {
  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO + NAV */}
          <div className="flex items-center gap-6">
            
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-3 group">
              <div
                className="w-11 h-11 rounded-xl
                  bg-gradient-to-br from-ei_orange via-orange-500 to-ei_teal
                  hover:bg-gradient-to-br hover:from-orange-500 hover:via-ei_teal hover:to-ei_blue
                  shadow-[0_4px_12px_rgba(255,140,0,0.35)]
                  flex items-center justify-center text-white text-2xl font-extrabold
                  transition-all duration-500 hover:scale-110"
              >
                E
              </div>

              <span className="font-bold text-xl text-slate-800 dark:text-white/90 tracking-wide">
                Explo
                <span className="text-ei_orange group-hover:text-ei_teal transition-colors duration-300">
                  India
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2 text-sm font-semibold">
              <Link
                to="/home"
                className="px-4 py-2 rounded-full text-slate-700 dark:text-white/90 hover:text-white 
                           hover:bg-gradient-to-r from-ei_teal to-ei_blue 
                           hover:shadow-[0_0_12px_rgba(0,180,180,0.4)]
                           transition-all duration-300"
              >
                Home
              </Link>

              <Link
                to="/search" 
                className="px-4 py-2 rounded-full text-slate-700 dark:text-white/90 hover:text-white 
                           hover:bg-gradient-to-r from-ei_teal to-ei_blue 
                           hover:shadow-[0_0_12px_rgba(0,180,180,0.4)]
                           transition-all duration-300"
              >
                Explore
              </Link>

              <Link
                to="/timeline"
                className="px-4 py-2 rounded-full text-slate-700 dark:text-white/90 hover:text-white 
                           hover:bg-gradient-to-r from-ei_teal to-ei_blue 
                           hover:shadow-[0_0_12px_rgba(0,180,180,0.4)]
                           transition-all duration-300"
              >
                Timeline
              </Link>

              <Link
                to="/aboutus"
                className="px-4 py-2 rounded-full text-slate-700 dark:text-white/90 hover:text-white 
                           hover:bg-gradient-to-r from-ei_teal to-ei_blue 
                           hover:shadow-[0_0_12px_rgba(0,180,180,0.4)]
                           transition-all duration-300"
              >
                About Us
              </Link>
            </nav>
          </div>

          <SearchBar />

          {/* RIGHT BUTTONS */}
          <div className="flex items-center gap-4">
            
            {/* User Profile Preview (Static for now, implies logged in state) */}
            <Link
              to="/Profile"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full 
                       hover:bg-slate-100 dark:hover:bg-slate-600 transition-all"
            >
              {/* Ensure you have this image in your public/img folder or change source */}
              <img
                src="./img/headerimg.png" 
                className="w-8 h-8 rounded-full shadow-sm"
                alt="user"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-white/90">
                Adarsh
              </span>
            </Link>

           

            {/* Mobile Menu Button */}
            <button
              id="mobileNavBtn"
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-500 transition"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Component (Controlled by state) */}
        <MobileMenu isOpen={isMenuOpen} />
      </div>
    </header>
  );
}