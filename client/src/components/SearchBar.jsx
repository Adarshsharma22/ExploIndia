import React, { useState, useEffect } from "react";
import { searchData } from "../services/authService";
import { useNavigate } from "react-router-dom";
import TripDetailModal from "../pages/TripDetailModal";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ users: [], trips: [] });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [selectedTrip, setSelectedTrip] = useState(null);

  // 🔍 Live search
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
    <div className="relative flex-1 px-4 hidden lg:flex max-w-2xl mx-auto">
      
      {/* INPUT */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setShow(true)}
        placeholder="Search people or trips..."
        className="w-full pl-12 py-3 rounded-2xl outline-none
        bg-slate-900/5 dark:bg-white/5
        text-slate-800 dark:text-white
        focus:ring-2 focus:ring-ei_orange/50"
      />

      {/* ICON */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2">
        🔍
      </div>

      {/* 🔥 DROPDOWN */}
      {show && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-slate-900 
        rounded-xl shadow-lg border dark:border-slate-700 z-50">

          {/* USERS */}
          {results.users.length > 0 && (
            <div className="p-2">
              <p className="text-xs text-slate-400 px-2">Users</p>
              {results.users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => navigate(`/profile/${user._id}`)}
                  className="px-3 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  {user.username} • {user.fullName}
                </div>
              ))}
            </div>
          )}

          {/* TRIPS */}
          {results.trips.length > 0 && (
            <div className="p-2 border-t dark:border-slate-700">
              <p className="text-xs text-slate-400 px-2">Trips</p>
              {results.trips.map((trip) => (
                <div
                  key={trip._id}
                  onClick={() => {
                    setSelectedTrip(trip);
                    setShow(false); // close dropdown
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  {trip.title}
                </div>
              ))}
            </div>
          )}

          {selectedTrip && (
            <TripDetailModal
              post={selectedTrip}
              onClose={() => setSelectedTrip(null)}
            />
          )}

          {/* EMPTY */}
          {results.users.length === 0 && results.trips.length === 0 && (
            <p className="p-3 text-center text-slate-500">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;