import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSuggestedUsers } from '../services/authService';

const RightSidebar = () => {
  const { user } = useAuth();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

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
        <div className="rounded-[2rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 p-8 text-center shadow-xl">
          <div className="text-3xl mb-3">🔒</div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 leading-relaxed">
            Join the community to <br /> <span className="text-ei_teal">discover travellers</span>
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:col-span-3 hidden lg:block space-y-6 sticky top-24">
      {/* SUGGESTED TRAVELLERS CONTAINER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white/60 dark:bg-slate-950/40 backdrop-blur-3xl border border-white/40 dark:border-white/5 p-5 shadow-[0_0px_20px_2px_rgba(0,150,136,0.25)] transition-all duration-500">
        
        {/* Animated Background Accents */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-ei_teal/10 blur-[60px] rounded-full animate-pulse"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-ei_orange/5 blur-[60px] rounded-full animate-pulse delay-700"></div>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="space-y-1">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
              Explorer
            </h4>
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Suggested <span className="text-ei_teal">For You</span>
            </h3>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-sm">
            <span className="text-lg animate-bounce">✨</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-16 space-y-4">
            <div className="relative w-12 h-12">
               <div className="absolute inset-0 border-4 border-ei_teal/10 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-t-ei_teal rounded-full animate-spin"></div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">
              Syncing Explorers...
            </p>
          </div>
        ) : suggestedUsers.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <span className="text-2xl opacity-20 italic font-black">∅</span>
            <p className="text-xs font-bold text-slate-400 italic">No new explorers found</p>
          </div>
        ) : (
          <div className="relative z-10">
            <ul className="space-y-5">
              {(showAll ? suggestedUsers : suggestedUsers.slice(0, 5)).map((suggested) => (
                <li 
                  key={suggested._id} 
                  className="group flex items-center gap-4 p-2 -mx-2 rounded-2xl hover:bg-white/50 dark:hover:bg-slate-900/50 transition-all duration-300 border border-transparent hover:border-white/40 dark:hover:border-white/5"
                >
                  <div className="relative">
                    <img
                      className="w-12 h-12 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform duration-500"
                      src={suggested.profilePic || "/img/avtar.png"}
                      alt={suggested.fullName}
                      onError={(e) => { e.target.src = "/img/avtar.png"; }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-black text-sm text-slate-900 dark:text-white truncate tracking-tight">
                      {suggested.fullName}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-ei_teal/80 truncate">@{suggested.username}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Explorer</span>
                    </div>
                  </div>

                  <Link
                    to={`/suggested-profile/${suggested._id}`}
                    className="relative overflow-hidden px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl bg-slate-900 dark:bg-white  text-white! dark:text-black! dark:hover:text-white! hover:bg-linear-to-r hover:from-ei_teal hover:to-ei_blue hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg shadow-slate-900/10 dark:shadow-white/5"
                  >
                    Visit
                  </Link>
                </li>
              ))}
            </ul>

            {suggestedUsers.length > 5 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-8 w-full py-3 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-ei_teal hover:border-ei_teal/40 transition-all duration-300"
              >
                {showAll ? "Show Less Explorers" : `View All `}
              </button>
            )}
          </div>
        )}
      </div>

      {/* FOOTER MINI CARD */}
      <div className="p-6 rounded-[2rem] bg-linear-to-br from-ei_orange to-orange-600 shadow-xl shadow-orange-500/20 group cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">ExploIndia Pro</p>
                <h5 className="text-sm font-black">Share your journey</h5>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
               <span className="text-white text-xs">→</span>
            </div>
          </div>
      </div>
    </aside>
  );
};

export default RightSidebar;