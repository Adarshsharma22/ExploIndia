import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile, getUserTrip, toggleFavorite } from '../services/authService';
import TripCard from '../components/TripCard';

const SuggestedProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [trips, setTrips] = useState([]);
  const [favoriteTrips, setFavoriteTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profileData = await getProfile(id);
        setProfile(profileData);
        setFavoriteTrips(profileData.favoriteTrips || []);

        const tripsData = await getUserTrip(id);
        setTrips(tripsData);
      } catch (err) {
        console.error("Error fetching suggested profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleToggleFavorite = async (tripId) => {
    try {
      await toggleFavorite(tripId);
      // Logic to update local state if you want to show 'liked' status visually
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center">Loading Profile...</div>;
  if (!profile) return <div className="min-h-screen pt-20 flex items-center justify-center">Profile not found</div>;

  return (
    <main className="min-h-screen pt-24 bg-slate-300 dark:bg-slate-950 transition-colors duration-500">
      <section className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-12 lg:gap-8">
        
        {/* LEFT COLUMN: Profile & Traveler Info */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* PREMIUM PROFILE CARD */}
          <div className="overflow-hidden rounded-3xl bg-white/60 dark:bg-slate-950/60 backdrop-blur-3xl border border-white/40 dark:border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.6)]">
            <div className="relative h-32 w-full">
              <img
                className="w-full h-full object-cover"
                src={profile.coverPic || '/default-cover.jpg'}
                alt="Cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
              <img
                className="absolute -bottom-10 left-6 w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-900 object-cover shadow-lg"
                src={profile.profilePic || '/default-avatar.jpg'}
                alt="Profile"
              />
            </div>

            <div className="pt-12 pb-6 px-6">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {profile.fullName}
              </h1>
              <p className="text-ei_teal font-bold text-sm tracking-wide">@{profile.username}</p>

              <div className="mt-4">
                <p
                  className={`text-slate-600 dark:text-slate-300 leading-relaxed italic transition-all duration-300 ${
                    showFullBio ? "" : "line-clamp-3"
                  }`}
                >
                  "{profile.bio || 'Exploring the unseen India...'}"
                </p>

                {/* Read More Button */}
                {profile.bio && profile.bio.length > 100 && (
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="mt-1 text-xs font-bold text-ei_teal hover:underline"
                  >
                    {showFullBio ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                 <span className="text-ei_orange">📍</span> {profile.location || 'India'}
              </div>

              <div className="mt-6 flex gap-6 border-y border-slate-50 dark:border-slate-800 py-4">
                <div className="text-center">
                  <span className="block text-lg font-bold text-slate-900 dark:text-white">{profile.followers?.length || 0}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Followers</span>
                </div>
                <div className="text-center border-l border-slate-100 dark:border-slate-800 pl-6">
                  <span className="block text-lg font-bold text-slate-900 dark:text-white">{profile.following?.length || 0}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Following</span>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full bg-linear-to-r from-ei_teal to-ei_blue text-white font-black py-4 rounded-2xl shadow-lg shadow-ei_teal/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs">
                  Follow {profile.fullName.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>

          {/* TRAVELER INSIGHTS CARD */}
          <div className="rounded-3xl bg-white/90 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 backdrop-blur-sm p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">🗺️</span>
              <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Traveler <span className="text-ei_teal">Stats</span></h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 bg-linear-to-br from-ei_orange/10 to-transparent border border-ei_orange/20 rounded-2xl text-center">
                <p className="text-2xl font-black text-ei_orange">{profile.travelerInfo?.placesVisited?.length || 0}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Places</p>
              </div>
              <div className="p-4 bg-linear-to-br from-ei_teal/10 to-transparent border border-ei_teal/20 rounded-2xl text-center">
                <p className="text-2xl font-black text-ei_teal">{profile.travelerInfo?.statesVisited?.length || 0}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">States</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Style</span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700">
                  {profile.travelerInfo?.favoriteTravelType?.join(', ') || 'Vagabond'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Spot</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1">
                  <span className="text-ei_orange">📍</span> {profile.travelerInfo?.favoriteTraveledPlace || 'N/A'}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Interests</span>
                <div className="flex flex-wrap gap-2">
                  {profile.travelerInfo?.travelInterests?.length > 0 ? (
                    profile.travelerInfo.travelInterests.map((interest, i) => (
                      <span key={i} className="px-2 py-1 bg-ei_teal/5 text-ei_teal text-[11px] font-bold rounded-md border border-ei_teal/10">
                        #{interest.toUpperCase()}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No interests listed</span>
                  )}
                </div>
              </div>

              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">✨</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Bucket List</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  {profile.travelerInfo?.bucketList?.join(', ') || 'Planning the next adventure...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Trips Feed */}
        <div className="lg:col-span-8 mt-8 lg:mt-0 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Trips by <span className="text-ei_orange">{profile.fullName.split(' ')[0]}</span>
            </h2>
            <Link 
              to="/home" 
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white bg-linear-to-r from-ei_teal to-ei_blue px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-ei_teal/20 transition-all"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span> Back Home
            </Link>
          </div>

          {trips.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 font-medium italic text-lg">No trips shared by this traveler yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {trips.map(post => (
                <div key={post._id} className="relative group">
                   <TripCard 
                    post={post} 
                    showActions={false} // Ensuring User A cannot edit User B's posts
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default SuggestedProfile;