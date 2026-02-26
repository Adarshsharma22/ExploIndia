import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSuggestedUsers } from '../services/authService';

const RightSidebar = () => {
  const { user } = useAuth();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real users when component loads
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const users = await getSuggestedUsers();
        setSuggestedUsers(users);
      } catch (error) {
        console.error("Failed to fetch suggested users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  if (!user) {
    return (
      <aside className="lg:col-span-3 hidden lg:block">
        <div className="rounded-xl bg-white/90 dark:bg-slate-700 p-5 text-center">
          <p className="text-slate-500">Log in to see suggested travellers</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:col-span-3 hidden lg:block space-y-6">
  
  {/* --- SUGGESTED TRAVELLERS (ULTRA GLASS) --- */}
  <div className="relative overflow-hidden rounded-[2.5rem] bg-white/40 dark:bg-slate-900 backdrop-blur-2xl border border-white/40 dark:border-slate-700/40 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
    
    {/* Decorative inner glow */}
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-ei_teal/10 blur-[40px] rounded-full pointer-events-none"></div>

    <div className="flex items-center justify-between mb-6 px-1">
      <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
        Suggested Travellers
      </h4>
      <span className="text-ei_teal animate-pulse">✨</span>
    </div>

    {loading ? (
      <div className="flex flex-col items-center py-10 space-y-3">
        <div className="w-8 h-8 border-4 border-ei_teal/20 border-t-ei_teal rounded-full animate-spin"></div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Finding Explorers...</p>
      </div>
    ) : suggestedUsers.length === 0 ? (
      <p className="text-center text-xs font-medium text-slate-500 py-10 italic">
        No new explorers found
      </p>
    ) : (
      <ul className="space-y-5">
        {suggestedUsers.map((suggested) => (
          <li key={suggested._id} className="group flex items-center gap-3 transition-all">
            <div className="relative">
              <img
                className="w-11 h-11 rounded-2xl object-cover ring-2 ring-white/60 dark:ring-slate-800/60 shadow-lg group-hover:scale-110 transition-transform duration-300"
                src={suggested.profilePic || "/img/default-avatar.jpg"}
                alt={suggested.fullName}
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-ei_teal border-2 border-white dark:border-slate-900 rounded-full"></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate tracking-tight">
                {suggested.fullName}
              </div>
              <div className="text-[10px] font-bold text-ei_teal/70 dark:text-ei_teal/50 truncate tracking-wide">
                @{suggested.username}
              </div>
            </div>

            <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-ei_teal hover:text-white hover:border-ei_teal transition-all shadow-sm active:scale-90">
              Follow
            </button>
          </li>
        ))}
      </ul>
    )}

    <button className="w-full mt-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-ei_orange transition-colors">
      View All Explorers
    </button>
  </div>

  {/* --- TRENDING DESTINATIONS (GLASS PILLS) --- */}
  <div className="relative overflow-hidden rounded-[2.5rem] bg-white/40 dark:bg-slate-900 backdrop-blur-2xl border border-white/40 dark:border-slate-700/40 p-6 shadow-lg">
    
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-ei_orange/10 blur-[40px] rounded-full pointer-events-none"></div>

    <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 mb-5 px-1">
      Trending Hub
    </h4>
    
    <div className="flex flex-wrap gap-2.5">
      {[
        { tag: '#Goa', color: 'hover:bg-ei_orange/20 text-ei_orange border-ei_orange/20' },
        { tag: '#Ladakh', color: 'hover:bg-ei_teal/20 text-ei_teal border-ei_teal/20' },
        { tag: '#TajMahal', color: 'hover:bg-ei_blue/20 text-ei_blue border-ei_blue/20' },
        { tag: '#RoadTrip', color: 'hover:bg-slate-500/10 text-slate-500 border-slate-500/10' },
        { tag: '#Himalayas', color: 'hover:bg-ei_orange/20 text-ei_orange border-ei_orange/20' }
      ].map((item, idx) => (
        <a 
          key={idx} 
          href="#" 
          className={`px-4 py-1.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border backdrop-blur-md text-[11px] font-extrabold transition-all hover:-translate-y-1 hover:shadow-md ${item.color}`}
        >
          {item.tag}
        </a>
      ))}
    </div>
  </div>

</aside>
  );
};

export default RightSidebar;