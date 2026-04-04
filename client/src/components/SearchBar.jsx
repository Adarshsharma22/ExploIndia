import React, { useState, useEffect, useRef } from "react";
import { searchData } from "../services/authService";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ users: [], trips: [] });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [selectedTrip, setSelectedTrip] = useState(null);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        searchData(query)
          .then((data) => {
            setResults(data);
            setShow(true);
          })
          .catch(() => setResults({ users: [], trips: [] }));
      } else {
        setShow(false);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div ref={searchRef} className="relative flex-1 px-4 hidden lg:flex max-w-2xl mx-auto z-50 ">
      
      {/* --- INPUT SECTION --- */}
      <div className="relative w-full group ">
        <div className="absolute -inset-1 bg-gradient-to-r from-[oklch(76.9%_0.188_70.08)] to-[oklch(56.6%_0.08_193)] rounded-2xl blur-xl opacity-0 group-focus-within:opacity-10 transition-opacity duration-500"></div>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                navigate(`/trip-search?q=${query}`);
                setShow(false);
              }
            }}
            onFocus={() => query.trim() && setShow(true)}
            placeholder="Search people or trips..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl outline-none transition-all duration-300
              bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl 
              border border-white/20 dark:border-white/10 
              focus:bg-slate-950
              text-slate-800 dark:text-white placeholder:text-slate-400/80
              focus:ring-1 focus:ring-ei_orange
              hover:ring-1 hover:ring-ei_teal"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400 group-focus-within:text-[oklch(76.9%_0.188_70.08)] transition-colors"><circle cx="11" cy="11" r="7.5" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </div>
        </div>
      </div>

      {/* --- DROPDOWN SECTION --- */}
      {show && (
        <div className="absolute top-16 left-4 right-4 z-50 
          bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl
          rounded-2xl shadow-2xl border border-white/40 dark:border-white/10
          overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
            {/* USERS */}
            {results.users.length > 0 && (
              <div className="p-2">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 px-3 py-2">People</p>
                {results.users.map((user) => (
                  <div key={user._id} onClick={() => { navigate(`/suggested-profile/${user._id}`); setShow(false); }} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl hover:bg-[oklch(76.9%_0.188_70.08)]/10 transition-all">
                    <div className="relative">
                      <img
                        src={user.profilePic || "/img/avtar.png"}
                        alt={user.fullName}
                        onError={(e) => { e.target.src = "/img/avtar.png"; }}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50 dark:ring-slate-700 group-hover:ring-[oklch(76.9%_0.188_70.08)] transition-all"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{user.fullName}</span>
                      <span className="text-xs text-slate-400">{user.username}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TRIPS */}
            {results.trips.length > 0 && (
              <div className="p-2 border-t border-white/20 dark:border-slate-800">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 px-3 py-2">Trips</p>
                {results.trips.map((trip) => (
                  <div
                    key={trip._id}
                    onClick={() => {
                      setSelectedTrip(trip); // 1. Set the trip data
                      setShow(false);         // 2. Close dropdown so modal is visible
                    }}
                    className="flex items-center justify-between px-3 py-2.5 cursor-pointer rounded-xl hover:bg-[oklch(56.6%_0.08_193)]/10 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">🧭</div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{trip.title}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[oklch(56.6%_0.08_193)] opacity-0 group-hover:opacity-100 transition-opacity">VIEW</span>
                  </div>
                ))}
              </div>
            )}

            {/* 📭 NO RESULTS FOUND (Added logic) */}
            {results.users.length === 0 && results.trips.length === 0 && (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                <span className="text-2xl">🔍</span>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  No User or trips found for <span className="italic text-slate-800 dark:text-slate-200">"{query}"</span>
                </p>
              </div>
            )}

            {/* SEE ALL ACTION (Only show if there are results) */}
            {(results.users.length > 0 || results.trips.length > 0) && (
              <div onClick={() => { navigate(`/trip-search?q=${query}`); setShow(false); }} className="mt-2 p-4 bg-blue-800 hover:bg-blue-600 text-white text-center text-sm font-bold cursor-pointer transition-all">
                See all results for "{query}" →
              </div>
            )}
          </div>
        </div>
      )}

      

      
    </div>
  );
};

export default SearchBar;