import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LeftSidebar = () => {
  const { user } = useAuth();

  console.log("USER OBJECT:", user);

  // If user is not logged in
  if (!user) {
    return (
      <aside className="lg:col-span-3 hidden lg:block">
        <div className="card-shadow rounded-lg bg-white dark:bg-slate-700 p-5 glass">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Log in to see your profile</h3>
            <Link 
              to="/login" 
              className="mt-4 inline-block px-4 py-2 rounded bg-ei_teal text-white font-medium hover:bg-ei_teal/90 transition"
            >
              Log In
            </Link>
          </div>
        </div>
      </aside>
    );
  }

const profilePic = user.profilePic || 'img/avtar.png'; 

  return (
    <aside className="lg:col-span-3 hidden lg:block">
  <div className="sticky top-24 space-y-6">

    {/* USER PROFILE SECTION */}
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white/40 dark:bg-slate-900 backdrop-blur-2xl border border-white/40 dark:border-slate-700/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
      
      {/* Dynamic Top Glow */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-ei_orange via-orange-500 to-ei_teal opacity-80"></div>
      
      {/* Subtle Mesh Gradient Overlay for Glass Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-ei_teal/10 blur-[60px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-ei_orange/10 blur-[60px] rounded-full pointer-events-none"></div>

      <div className="p-7 relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Profile Image with Pulsing Glow */}
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-ei_orange to-ei_teal rounded-full blur-md opacity-20 group-hover:opacity-40 transition duration-700"></div>
            
            <img
              className="relative w-24 h-24 rounded-full object-cover border-[6px] border-white/60 dark:border-slate-800/60 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
              src={profilePic} 
              alt={user.fullName || "User"}
              onError={(e) => {
                e.target.src = "/img/avtar.jpg";
              }}
            />
          </div>

          <div className="mt-5">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">
              {user.fullName || "User"}
            </h3>
            <p className="text-sm text-ei_teal font-bold tracking-wide mt-0.5">@{user.username}</p>
            <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic px-4">
              "{user.bio || "Exploring the unseen India..."}"
            </p>
          </div>
        </div>

        {/* Action Buttons with Glass-Buttons */}
        <div className="mt-8 grid grid-cols-1 gap-3 px-2">
          <Link
            to="/create-trip"
            className="group relative flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-sm transition-all hover:translate-y-[-2px] active:scale-95 shadow-xl shadow-slate-900/20 dark:shadow-white/10"
          >
            <span className="text-lg leading-none group-hover:rotate-12 transition-transform">✨</span>
            Create Trip
          </Link>
          
          <Link
            to="/friends"
            className="flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/20 dark:bg-slate-800/20 hover:bg-white/40 dark:hover:bg-slate-700/40 text-slate-700 dark:text-slate-200 font-bold text-sm transition-all"
          >
            <span className="text-lg">👥</span>
            Friends
          </Link>
        </div>

        {/* Stats Section with Neumorphic separation */}
        <div className="mt-8 pt-6 border-t border-slate-200/30 dark:border-slate-700/30">
          <div className="flex justify-around items-center">
            <div className="text-center group cursor-pointer">
              <p className="text-xl font-black text-slate-800 dark:text-white transition-colors group-hover:text-ei_orange">
                {user.followers?.length || 0}
              </p>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">Followers</p>
            </div>
            <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-200/50 dark:via-slate-700/50 to-transparent"></div>
            <div className="text-center group cursor-pointer">
              <p className="text-xl font-black text-slate-800 dark:text-white transition-colors group-hover:text-ei_teal">
                {user.following?.length || 0}
              </p>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* QUICK LINKS SECTION */}
    <div className="rounded-[2.5rem] bg-white/40 dark:bg-slate-900 backdrop-blur-2xl border border-white/40 dark:border-slate-700/40 p-7 shadow-lg relative overflow-hidden">
      {/* Decorative inner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-ei_orange/5 blur-2xl rounded-full"></div>

      <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 mb-6 ml-2">
        Explore India
      </h4>
      
      <ul className="space-y-3">
        {[
          { to: "/groups", label: "Groups", emoji: "🏘️", color: "hover:bg-ei_orange/10 hover:text-ei_orange" },
          { to: "/events", label: "Events", emoji: "📅", color: "hover:bg-ei_teal/10 hover:text-ei_teal" },
          { to: "/createtrip", label: "Create Post", emoji: "✍️", color: "hover:bg-orange-50/20 hover:text-ei_orange" }
        ].map((link, idx) => (
          <li key={idx}>
            <Link to={link.to} className={`flex items-center gap-4 p-3 rounded-2xl text-slate-600 dark:text-slate-300 font-bold text-sm transition-all ${link.color} group`}>
              <div className="w-10 h-10 rounded-[14px] bg-white/50 dark:bg-slate-800/50 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all">
                <span className="text-xl">{link.emoji}</span>
              </div>
              <span className="tracking-tight">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>

  </div>
</aside>
  );
};

export default LeftSidebar;