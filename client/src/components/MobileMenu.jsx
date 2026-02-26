import React from 'react';
import { Link } from 'react-router-dom';  // Add this import
import { useAuth } from '../context/AuthContext';  

const MobileMenu = ({ isOpen }) => {
  const { user } = useAuth();  // Get current user

  return (
    <div
  id="mobileMenu"
  className={`
    fixed top-16 right-4 z-[60] w-20 
    transition-all duration-500 ease-in-out transform origin-top-right
    ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}
    rounded-3xl border border-white/20 dark:border-slate-700/50 
    bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl
  `}
>
  <div className="flex flex-col items-center py-6 space-y-6">
    {/* HOME ICON */}
    <Link
      to="/home"
      onClick={() => setIsOpen(false)}
      className="p-3 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-ei_teal/20 hover:text-ei_teal transition-all active:scale-90"
    >
      <i className="uil uil-home text-2xl"></i>
    </Link>

    {/* PROFILE ICON */}
    <Link
      to={user ? `/profile/${user.id}` : '/login'}
      onClick={() => setIsOpen(false)}
      className="p-3 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-ei_teal/20 hover:text-ei_teal transition-all active:scale-90"
    >
      <i className="uil uil-user-circle text-2xl"></i>
    </Link>

    {/* CREATE TRIP ICON */}
    <Link
      to="/createtrip"
      onClick={() => setIsOpen(false)}
      className="p-3 rounded-2xl text-white bg-gradient-to-br from-ei_orange to-orange-500 shadow-lg shadow-orange-500/30 hover:brightness-110 transition-all active:scale-90"
    >
      <i className="uil uil-plus text-2xl"></i>
    </Link>

    {/* ABOUT US ICON */}
    <Link
      to="/aboutus"
      onClick={() => setIsOpen(false)}
      className="p-3 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-ei_teal/20 hover:text-ei_teal transition-all active:scale-90"
    >
      <i className="uil uil-info-circle text-2xl"></i>
    </Link>
  </div>
</div>
  );
};

export default MobileMenu;