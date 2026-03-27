import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';
import { useAuth } from '../context/AuthContext';
import NotificationBell from '../pages/Notification';



export default function Header() {
  const { user } = useAuth();  // Add this to get user
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
  };
  

  return (
    <header className="relative top-2 z-50 mx-4 mt-3 p-1 bg-white/40 dark:bg-slate-950 backdrop-blur-xl rounded-[2.5rem] ring-1 ring-white/30 dark:ring-white/10 before:absolute before:-z-10 before:inset-0  before:rounded-[2.5rem] before:blur-2xl before:opacity-20 before:bg-linear-to-r before:from-ei_orange before:via-ei_teal before:to-ei_blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO + NAV */}
          <div className="flex items-center gap-6">
            
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-3 group">
             <div className="flex items-center gap-3 group cursor-pointer">
              {/* Logo Icon */}
              <div className="relative w-11 h-11 flex items-center justify-center overflow-hidden rounded-xl transition-all duration-500 shadow-lg shadow-orange-500/20 hover:shadow-cyan-500/30 hover:scale-110 active:scale-95">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-linear-to-br from-ei_orange via-orange-500 to-ei_teal transition-opacity duration-800 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-br from-orange-500 via-ei_teal to-ei_blue opacity-0 transition-opacity duration-800 group-hover:opacity-100" />
                
                {/* Lettering */}
                <span className="relative z-10 text-white text-2xl font-black tracking-tighter">E</span>
              </div>

              {/* Typography */}
              <div className="flex flex-col -space-y-1">
                <h1 className="flex items-baseline font-bold tracking-tight">
                  <span className="text-xl text-slate-700 dark:text-slate-300">Explo</span>
                  <span className="text-2xl text-slate-900 dark:text-white group-hover:text-ei_orange transition-colors duration-300 ml-0.5">
                    India
                  </span>
                </h1>
                
              </div>
            </div>
              
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
              <Link to="/home" className="group relative px-4 py-2 rounded-lg font-semibold text-sm text-slate-700 dark:text-slate-200 hover:text-white! transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">Home</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-linear-to-r from-ei_orange to-ei_teal transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="#"
                className="group relative px-4 py-2 rounded-lg font-semibold text-sm text-slate-700 dark:text-slate-200 hover:text-white! transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">Talks</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-linear-to-r from-ei_orange to-ei_teal transition-all duration-300 group-hover:w-full"></span>

              </Link>
              <Link
                to="/aboutus"
                className="group relative px-4 py-2 rounded-lg font-semibold text-sm text-slate-700 dark:text-slate-200 hover:text-white! transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">Aboutus</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-linear-to-r from-ei_orange to-ei_teal transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/createtrip"
                className="group relative px-4 py-2 rounded-lg font-semibold text-sm text-slate-700 dark:text-slate-200 hover:text-white! transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">Create Trip</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-linear-to-r from-ei_orange to-ei_teal transition-all duration-300 group-hover:w-full"></span>

              </Link>
            </nav>
          </div>

          {/* SEARCH BAR */}
          <div className="hidden md:block flex-1 max-w-md mx-6">
            <SearchBar />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* Search Icon (Mobile)
            <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition">
              <i className="uil uil-search text-xl"></i>
            </button> */}

            {/* Notifications */}
            <div className="p-2  relative">
                <NotificationBell />
            </div>

            {/* Profile (Desktop – dynamic if logged in) */}
            <Link
  to={user ? `/profile/${user.id}` : '/login'}
  className="
    hidden lg:flex items-center gap-2.5 p-1 pr-4 rounded-full
    /* Glass Base - matches your header style */
    bg-white/40 dark:bg-slate-800/30 backdrop-blur-md
    ring-1 ring-slate-200/50 dark:ring-white/10
    
    /* Hover & Active States */
    hover:bg-white dark:hover:bg-slate-800 
    hover:ring-ei_orange/30 hover:shadow-lg hover:shadow-ei_orange/10
    active:scale-95 transition-all duration-300 group
  "
>
  {/* Avatar Container */}
  <div className="relative">
    <img
      src={user?.profilePic || "/img/default-avatar.png"} 
      className="w-9 h-9 rounded-full object-cover ring-2 ring-white dark:ring-slate-700 
                 group-hover:ring-ei_orange transition-all duration-300"
      alt="user"
    />
    {/* Online Status Dot (Optional Visual Polish) */}
    {user && (
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
    )}
  </div>

  {/* Text Content */}
  <div className="flex flex-col items-start leading-none">
    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold group-hover:text-ei_orange transition-colors">
      Account
    </span>
    <span className="text-sm font-bold tracking-tight text-slate-700 dark:text-slate-100 transition-colors">
      {user ? (user.name || "Profile") : "Login"}
    </span>
  </div>
</Link>

            {/* Mobile Menu Button */}
            <button
  id="mobileNavBtn"
  onClick={toggleMenu}
  className="
    md:hidden relative group p-3 rounded-2xl
    bg-white/10 dark:bg-slate-800/40 backdrop-blur-md
    hover:bg-ei_orange/10 dark:hover:bg-ei_teal/10
    active:scale-90 transition-all duration-300
    /* Inner Glow Ring */
    ring-1 ring-slate-200 dark:ring-white/10 
    hover:ring-ei_orange/50 dark:hover:ring-ei_teal/50
  "
>
  {/* Hover Aura Background */}
  <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-ei_orange/20 to-ei_teal/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />

  <div className="relative w-6 h-6 flex flex-col justify-between items-center overflow-hidden">
    {/* Animated Bars */}
    <span 
      className={`w-full h-0.5 bg-slate-700 dark:bg-slate-200 rounded-full transition-all duration-300 origin-left 
      ${isMenuOpen ? 'rotate-45 translate-x-1' : ''}`} 
    />
    <span 
      className={`w-full h-0.5 bg-slate-700 dark:bg-slate-200 rounded-full transition-all duration-300 
      ${isMenuOpen ? 'opacity-0 -translate-x-full' : 'opacity-100'}`} 
    />
    <span 
      className={`w-full h-0.5 bg-slate-700 dark:bg-slate-200 rounded-full transition-all duration-300 origin-left 
      ${isMenuOpen ? '-rotate-45 translate-x-1' : ''}`} 
    />
  </div>
</button>
          </div>
        </div>

        {/* Mobile Menu Component (Controlled by state) */}
        <MobileMenu isMenuOpen={isMenuOpen} />
      </div>
    </header>
  );
}