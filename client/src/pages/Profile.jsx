import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useAuth } from '../context/AuthContext';
import { getProfile, getUserTrip, toggleFavorite } from '../services/authService';
import EditProfile from './EditProfile';
import CreateTrip from './CreateTrip';  // Renamed from CreatePost
import TripCard from '../components/TripCard';  // Renamed from PostCard

function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Added for redirects
  const { user, loading: authLoading, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [trips, setTrips] = useState([]);  // User's trips
  const [favoriteTrips, setFavoriteTrips] = useState([]);  // Favorite trip IDs
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingTrip, setIsCreatingTrip] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);


  

  useEffect(() => {
    if (authLoading) return;

    const effectiveId = id || user?.id; // Fallback to current user ID if no param
    console.log('Effective User ID for fetch:', effectiveId); // Add this log for debug


    const fetchData = async () => {
      try {
        setPageLoading(true);
        const profileData = await getProfile(effectiveId);
        setProfile(profileData);
        setFavoriteTrips(profileData.favoriteTrips || []);

        const tripsData = await getUserTrip(effectiveId);
        setTrips(tripsData);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, [id, user, authLoading]); // Added navigate to deps

  const handleToggleFavorite = async (tripId) => {
    try {
      await toggleFavorite(tripId);
      const effectiveId = id || user?.id;
      const { data } = await getProfile(effectiveId);  // Refresh profile
      setFavoriteTrips(data.favoriteTrips || []);
    } catch (err) {
      console.error(err);
    }
  };

  const isOwnProfile = (id === user?.id) || !id;  // Hide edit/create if not own profile

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (authLoading || pageLoading) return <div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen pt-20 flex items-center justify-center text-red-500">{error}</div>;
  if (!profile) return <div className="min-h-screen pt-20 flex items-center justify-center">Profile not found</div>;

  // Rest of your return statement remains the same
  return (
    <main className="min-h-screen pt-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
  <section className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-12 lg:gap-8">
    
    {/* LEFT COLUMN: Profile & Traveler Info */}
    <div className="lg:col-span-4 space-y-6">
      
      {/* Profile Card */}
      <div className="overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {profile.fullName}
              </h1>
              <p className="text-ei_teal font-bold text-sm tracking-wide">@{profile.username}</p>
            </div>
          </div>

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

          {isOwnProfile && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold py-3 rounded-xl hover:bg-ei_teal hover:text-white transition-all duration-300"
              >
                Edit Profile
              </button>
              <button 
                onClick={() => setIsCreatingTrip(true)}
                className="w-full bg-linear-to-r from-ei_orange to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/30 hover:scale-[1.02] transition-all"
              >
                Create Trip
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Traveler Insights (Reusing the styled version from before) */}
      <div className="rounded-xl bg-white/90 dark:bg-slate-900 border border-slate-100 dark:border-slate-600 backdrop-blur-sm p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">🗺️</span>
              <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Traveler <span className="text-ei_teal">Stats</span></h2>
            </div>
             <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-linear-to-br from-ei_orange/10 to-transparent border border-ei_orange/20 rounded-2xl text-center">
                <p className="text-2xl font-black text-ei_orange">{profile.travelerInfo?.placesVisited?.length || 0}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">Places Visited</p>
              </div>
              <div className="p-4 bg-linear-to-br from-ei_teal/10 to-transparent border border-ei_teal/20 rounded-2xl text-center">
                <p className="text-2xl font-black text-ei_teal">{profile.travelerInfo?.statesVisited?.length || 0}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">States Explored</p>
              </div>
              </div>
              <div className="space-y-4 pt-2">
      {/* Travel Type Badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Style</span>
        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-600">
          {profile.travelerInfo?.favoriteTravelType?.join(', ') || 'Vagabond'}
        </span>
      </div>

      {/* Favorite Place Row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Spot</span>
        <span className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
          <span className="text-ei_orange">📍</span> {profile.travelerInfo?.favoriteTraveledPlace || 'N/A'}
        </span>
      </div>

      {/* Interests Tags */}
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

      {/* Bucket List (Visual Card) */}
      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">✨</span>
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Bucket List</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          {profile.travelerInfo?.bucketList?.join(', ') || 'Planning the next adventure...'}
        </p>
      </div>
    </div>
            </div>
      </div>
    </div>
    
    {/* MIDDLE COLUMN: Trips Feed */}
    <div className="lg:col-span-8 mt-8 lg:mt-0 space-y-8">
      
      {/* TABS HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Recent <span className="text-ei_orange">Trips</span></h2>
        <span className="bg-slate-100 dark:bg-slate-800 px-4 py-1 rounded-full text-xs font-bold text-slate-500">
          {trips.length} Posts
        </span>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-medium italic text-lg">Your adventure hasn't started yet. Post your first trip!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {trips.map(post => (
            <div key={post._id} className="group relative">
              <TripCard post={post} />
              
              <div className="absolute top-6 right-16 flex gap-2">
                 {isOwnProfile && (
                  <Link 
                    to={`/edittrip/${post._id}`} 
                    className="p-2 bg-white/90 dark:bg-slate-800 rounded-full shadow-md text-ei_teal hover:bg-ei_teal hover:text-white transition-all"
                  >
                    ✏️
                  </Link>
                )}
                <button 
                  onClick={() => handleToggleFavorite(post._id)}
                  className={`p-2 rounded-full shadow-md transition-all ${favoriteTrips.includes(post._id) ? 'bg-ei_orange text-white' : 'bg-white/90 dark:bg-slate-800 text-slate-400'}`}
                >
                  {favoriteTrips.includes(post._id) ? '⭐' : '☆'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAVORITES SECTION */}
      <section className="pt-10">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-8 h-8 flex items-center justify-center bg-ei_orange/10 rounded-lg">🔥</div>
           <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Your <span className="text-ei_orange">Favorites</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favoriteTrips.length === 0 ? (
            <div className="col-span-full p-8 bg-slate-100 dark:bg-slate-800/50 rounded-2xl text-center italic text-slate-400">
              No favorites saved yet.
            </div>
          ) : (
            favoriteTrips.map(favId => {
              const favTrip = trips.find(p => p._id === favId);
              if (!favTrip) return null;
              return (
                <div key={favId} className="group bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 hover:border-ei_orange transition-all">
                  <div className="relative h-32 mb-4 overflow-hidden rounded-xl">
                    <img src={favTrip.images?.[0] || '/default-trip.jpg'} alt="Trip" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <button 
                      onClick={() => handleToggleFavorite(favId)}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-xs shadow-lg"
                    >
                      ❌
                    </button>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white truncate">{favTrip.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-3">{favTrip.content}</p>
                  <div className="flex justify-between items-center">
                     {isOwnProfile && <Link to={`/edittrip/${favTrip._id}`} className="text-[10px] font-black uppercase text-ei_teal tracking-widest hover:underline">Edit Trip</Link>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  </section>

  {/* MODALS - Enhanced Glassmorphism */}
  {(isEditing || isCreatingTrip) && (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-100 p-4 animate-in fade-in duration-300 overflow-y-auto scrollbar-hide ">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative border border-white/20">
        <button 
          onClick={() => isEditing ? setIsEditing(false) : setIsCreatingTrip(false)}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full font-bold z-10"
        >
          ✕
        </button>
        <div className="p-2">
          {isEditing ? (
            <EditProfile profile={profile} onClose={() => setIsEditing(false)} onUpdate={setProfile} />
          ) : (
            <CreateTrip onClose={() => setIsCreatingTrip(false)} onCreate={(newTrip) => setTrips((prev) => [newTrip, ...prev])} />
          )}
        </div>
      </div>
    </div>
  )}
  <button
                    onClick={handleLogout}
                    className="col-span-2 mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>🚪</span>
                    Logout
                  </button>
</main>
  );
}

export default ProfilePage;