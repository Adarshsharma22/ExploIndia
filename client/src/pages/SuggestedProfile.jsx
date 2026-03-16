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
  const [activeMenu, setActiveMenu] = useState(null);

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

  // Handle Close Menu for the ⋮ button
  useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const handleToggleFavorite = async (tripId) => {
    try {
      await toggleFavorite(tripId);
      // Refresh current user's local context or profile if needed
      // Note: In SuggestedProfile, you might want to show if YOU (User A) liked User B's post
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center">Loading Profile...</div>;
  if (!profile) return <div className="min-h-screen pt-20 flex items-center justify-center">Profile not found</div>;

  return (
    <main className="min-h-screen pt-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <section className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-12 lg:gap-8">
        
        {/* LEFT COLUMN: Profile & Traveler Info */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Profile Card */}
          <div className="overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xl">
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
              <p className="text-ei_teal font-bold text-sm">@{profile.username}</p>

              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{profile.bio || 'Exploring the unseen India...'}"
              </p>
              
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
                <button className="w-full bg-ei_teal text-white font-bold py-3 rounded-xl shadow-lg hover:bg-opacity-90 transition-all">
                  Follow {profile.fullName.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>

          {/* Traveler Insights (User B's Stats) */}
          <div className="rounded-xl bg-white/90 dark:bg-slate-900 border border-slate-100 dark:border-slate-600 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">🗺️</span>
              <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Traveler <span className="text-ei_teal">Stats</span></h2>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-center">
                <p className="text-2xl font-black text-ei_orange">{profile.travelerInfo?.placesVisited?.length || 0}</p>
                <p className="text-[10px] uppercase font-bold text-slate-500">Places</p>
              </div>
              <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-center">
                <p className="text-2xl font-black text-ei_teal">{profile.travelerInfo?.statesVisited?.length || 0}</p>
                <p className="text-[10px] uppercase font-bold text-slate-500">States</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase">Style</span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-bold">
                  {profile.travelerInfo?.favoriteTravelType?.join(', ') || 'Vagabond'}
                </span>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Bucket List</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {profile.travelerInfo?.bucketList?.join(', ') || 'Planning...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Trips Feed */}
        <div className="lg:col-span-8 mt-8 lg:mt-0 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Trips by <span className="text-ei_orange">{profile.fullName.split(' ')[0]}</span></h2>
            <Link to="/home" className="text-xs font-bold text-white bg-linear-to-b from-ei_teal to-ei_blue rounded-2xl p-3 hover:text-white! ">← Back Home</Link>
          </div>

          {trips.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 italic">
              No trips shared yet.
            </div>
          ) : (
            <div className="space-y-6">
              {trips.map(post => (
                <div key={post._id} className="relative">
                  <TripCard post={post} />
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