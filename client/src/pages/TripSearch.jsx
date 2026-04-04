import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchData } from "../services/authService";
import TripDetailModal from "../pages/TripDetailModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const TripSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [users, setUsers] = useState([]);

  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  

  useEffect(() => {
    if (!query.trim()) return;

    searchData(query)
      .then((data) => {
        setTrips(data.trips || []);
        setUsers(data.users || []);
      })
      .catch(console.error);
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto pt-15 px-6 pb-20">

  {/* 🔥 Title Section */}
  <div className="mb-12">
    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
      Search Results
    </h1>
    <p className="text-slate-500 dark:text-slate-400 mt-2">
      Found results for <span className="text-[oklch(76.9%_0.188_70.08)] font-bold italic">"{query}"</span>
    </p>
  </div>

  {/* 👤 Users Section */}
  {users.length > 0 && (
    <section className="mb-16">
      <h2 className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-black text-slate-400 dark:text-slate-500 mb-6">
        <span className="w-8 h-[1px] bg-slate-300 dark:bg-slate-700"></span>
        Verified People
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => {
            if (currentUser?._id === user._id) {
                navigate(`/profile`);
            } else {
                navigate(`/suggested-profile/${user._id}`);
            }
            }}
            className="group flex items-center gap-4 p-4 
            bg-white/40 dark:bg-slate-900/40 backdrop-blur-md
            border border-white/20 dark:border-white/5
            rounded-2xl shadow-sm hover:shadow-xl hover:bg-white/60 dark:hover:bg-slate-800/60
            transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={user.profilePic || "/img/avtar.png"}
                alt={user.fullName}
                onError={(e) => { e.target.src = "/img/avtar.png"; }}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50 dark:ring-slate-700 group-hover:ring-[oklch(76.9%_0.188_70.08)] transition-all"
              />
            </div>

            <div className="overflow-hidden">
              <p className="font-bold text-slate-900 dark:text-white truncate group-hover:text-[oklch(76.9%_0.188_70.08)] transition-colors">
                {user.fullName}
              </p>
              <p className="text-xs text-slate-500 truncate font-medium">
                @{user.username}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )}

  {/* 🧳 Trips Grid */}
  <section>
    <h2 className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-black text-slate-400 dark:text-slate-500 mb-6">
      <span className="w-8 h-[1px] bg-slate-300 dark:bg-slate-700"></span>
      Discovery Trips
    </h2>

    {trips.length === 0 ? (
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-20 text-center border border-dashed border-slate-300 dark:border-slate-700">
        <p className="text-slate-500 font-medium">No adventure found in this direction.</p>
      </div>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <div
            key={trip._id}
            onClick={() => setSelectedTrip(trip)}
            className="group cursor-pointer relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl 
            rounded-[2rem] overflow-hidden border border-white/20 dark:border-white/5
            shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={trip.images?.[0] || "/default.jpg"}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
                <span className="text-[10px] font-black uppercase text-[oklch(56.6%_0.08_193)] tracking-tighter">
                   Explore Mode
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6">
              <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-[oklch(56.6%_0.08_193)] transition-colors">
                {trip.title}
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-6 font-medium">
                {trip.description}
              </p>

              {/* Bottom Row */}
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="flex items-center gap-2 group/author">
                  <img
                    src={trip.user?.profilePic || "/img/avtar.png"}
                    className="w-8 h-8 rounded-full border-2 border-[oklch(76.9%_0.188_70.08)]/20"
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {trip.user?.username}
                  </span>
                </div>
                
                <div className="text-[oklch(33.958%_0.1144_268.086)] dark:text-blue-400 font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                  Details <span className="text-lg">→</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>

  {/* 🔥 MODAL */}
  {selectedTrip && (
    <TripDetailModal
      post={selectedTrip}
      onClose={() => setSelectedTrip(null)}
    />
  )}
</div>
  );
};

export default TripSearch;