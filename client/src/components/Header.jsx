import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';
import { useAuth } from '../context/AuthContext';
import profile from '../pages/Profile';



export default function Header() {
  const { user } = useAuth();  // Add this to get user
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                  bg-linear-to-br from-ei_orange via-orange-500 to-ei_teal
                  hover:bg-linear-to-br hover:from-orange-500 hover:via-ei_teal hover:to-ei_blue
                  shadow-[0_4px_12px_rgba(255,140,0,0.35)]
                  flex items-center justify-center text-white text-2xl font-extrabold
                  transition-all duration-500 hover:scale-110"
              >
                E
              </div>
              <span className="font-bold text-xl text-slate-800 dark:text-white/90 tracking-wide">Explo<span className="font-bold text-2xl text-slate-900 dark:text-white group-hover:text-ei_teal transition-colors duration-300">
                India
              </span></span>
              
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
              <Link to="/home" className="group relative px-4 py-2 rounded-lg font-semibold text-sm text-slate-700 dark:text-slate-200 hover:text-white! transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">Home</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-ei_orange to-ei_teal transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/search"
                className="group relative px-4 py-2 rounded-lg font-semibold text-sm text-slate-700 dark:text-slate-200 hover:text-white! transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">Search</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-ei_orange to-ei_teal transition-all duration-300 group-hover:w-full"></span>

              </Link>
              <Link
                to="/aboutus"
                className="group relative px-4 py-2 rounded-lg font-semibold text-sm text-slate-700 dark:text-slate-200 hover:text-white! transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">Aboutus</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-ei_orange to-ei_teal transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/createtrip"
                className="group relative px-4 py-2 rounded-lg font-semibold text-sm text-slate-700 dark:text-slate-200 hover:text-white! transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">Create Trip</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-ei_orange to-ei_teal transition-all duration-300 group-hover:w-full"></span>

              </Link>
            </nav>
          </div>

          {/* SEARCH BAR */}
          <div className="hidden md:block flex-1 max-w-md mx-6">
            <SearchBar />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* Search Icon (Mobile) */}
            <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition">
              <i className="uil uil-search text-xl"></i>
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition relative">
              <i className="uil uil-bell text-xl"></i>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-ei_orange rounded-full ring-2 ring-white dark:ring-slate-800 animate-pulse"></span>
            </button>

            {/* Profile (Desktop – dynamic if logged in) */}
            <Link
              to={user ? `/profile/${user.id}` : '/login'}  // Dynamic - profile if logged in, else login
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full 
                       hover:bg-slate-100 dark:hover:bg-slate-600 transition-all"
            >
              <img
                src={profile.profilePic || "./img/headering.pngs"} 
                className="w-8 h-8 rounded-full shadow-sm"
                alt="user"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-white/90">
                Profile
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