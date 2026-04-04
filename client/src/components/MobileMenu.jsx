import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MobileMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const { user } = useAuth();
  const closeMenu = () => setIsMenuOpen(false);

  // Safety check for user name to prevent the 'split' error
  const firstName = user?.name ? user.name.split(' ')[0] : "Guest";

  return (
    <div
      className={`
        fixed top-24 left-1/2 -translate-x-1/2 z-50
        w-[90%] max-w-100 h-20
        transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
        ${isMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-20 opacity-0 scale-90 pointer-events-none'}
        
        /* The Glass Pill */
        bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl
        rounded-full border border-white/40 dark:border-white/10
        shadow-[0_20px_40px_rgba(0,0,0,0.2)]
        flex items-center justify-between px-2
      `}
    >
      {/* LEFT: User Avatar & Welcome */}
      <Link 
        to={user ? `/profile/${user.id}` : '/login'} 
        onClick={closeMenu}
        className="flex items-center gap-2 pl-2 group"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-ei_teal/20 group-hover:ring-ei_teal transition-all">
          <img 
            src={user?.profilePic || "/img/default-avatar.png"} 
            className="w-full h-full object-cover"
            alt="avatar"
          />
        </div>
        <div className="hidden sm:flex flex-col leading-tight">
          <span className="text-[10px] uppercase font-bold text-slate-400">Hi,</span>
          <span className="text-xs font-black text-slate-800 dark:text-white">{firstName}</span>
        </div>
      </Link>

      {/* CENTER: Navigation Icons */}
      <nav className="flex items-center gap-1">
        <HorizontalNavLink to="/home" icon="uil-home" onClick={closeMenu} />
        <HorizontalNavLink to="/aboutus" icon="uil-compass" onClick={closeMenu} />
      </nav>

      {/* RIGHT: Primary Action Button */}
      <Link
        to="/createtrip"
        onClick={closeMenu}
        className="
          h-14 w-14 flex items-center justify-center rounded-full
          bg-gradient-to-br from-ei_orange via-orange-500 to-ei_teal
          text-white shadow-lg shadow-orange-500/30
          hover:scale-105 active:scale-90 transition-all duration-300
        "
      >
        <i className="uil uil-plus text-2xl font-bold"></i>
      </Link>
    </div>
  );
};

const HorizontalNavLink = ({ to, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="
      w-12 h-12 flex items-center justify-center rounded-full
      text-slate-500 dark:text-slate-400
      hover:bg-slate-100 dark:hover:bg-white/10
      hover:text-ei_teal active:scale-90 transition-all duration-300
    "
  >
    <i className={`uil ${icon} text-2xl`}></i>
  </Link>
);

export default MobileMenu;