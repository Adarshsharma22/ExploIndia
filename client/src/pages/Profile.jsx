import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useAuth } from '../context/AuthContext';
import { getProfile, getUserTrip, toggleFavorite } from '../services/authService';
import EditProfileForm from './EditProfile';
import CreateTripForm from './CreateTrip';  // Renamed from CreatePost
import TripCard from '../components/TripCard';  // Renamed from PostCard

function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Added for redirects
  const { user } = useAuth();  // Get current user from context
  const [profile, setProfile] = useState(null);
  const [trips, setTrips] = useState([]);  // User's trips
  const [favoriteTrips, setFavoriteTrips] = useState([]);  // Favorite trip IDs
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingTrip, setIsCreatingTrip] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const effectiveId = id || user?._id; // Fallback to current user ID if no param
    console.log('Effective User ID for fetch:', effectiveId); // Add this log for debug

    if (!effectiveId) {
      // No ID available - redirect to login or home
      setError('No user ID available. Please log in.');
      navigate('/login'); // Adjust to your login path
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: profileData } = await getProfile(effectiveId);
        setProfile(profileData);
        setFavoriteTrips(profileData.favoriteTrips || []);

        const { data: tripsData } = await getUserTrip(effectiveId);
        setTrips(tripsData);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user, navigate]); // Added navigate to deps

  const handleToggleFavorite = async (tripId) => {
    try {
      await toggleFavorite(tripId);
      const effectiveId = id || user?._id;
      const { data } = await getProfile(effectiveId);  // Refresh profile
      setFavoriteTrips(data.favoriteTrips || []);
    } catch (err) {
      console.error(err);
    }
  };

  const isOwnProfile = (id === user?._id) || !id;  // Hide edit/create if not own profile

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen pt-20 flex items-center justify-center text-red-500">{error}</div>;
  if (!profile) return <div className="min-h-screen pt-20 flex items-center justify-center">Profile not found</div>;

  // Rest of your return statement remains the same
  return (
    <main className="min-h-screen pt-20 bg-slate-50 dark:bg-slate-800">
      <section className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-12 lg:gap-6">
        {/* Profile content */}
        <div className="lg:col-span-3">
          {/* Profile card */}
          <div className="rounded-xl bg-white/90 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 backdrop-blur-sm p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] mb-6">
            <div className="relative">
              <img
                className="w-full h-32 rounded-t-lg object-cover"
                src={profile.coverPic || '/default-cover.jpg'}
                alt="Cover"
              />
              <img
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white dark:border-slate-700 object-cover"
                src={profile.profilePic || '/default-avatar.jpg'}
                alt="Profile"
              />
            </div>
            <div className="mt-10 text-center">
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{profile.fullName}</h1>
              <p className="text-sm text-ei_teal">@{profile.username}</p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{profile.bio}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{profile.location}</p>
              <div className="mt-3 flex justify-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                <span><strong>{profile.followers?.length || 0}</strong> Followers</span>
                <span><strong>{profile.following?.length || 0}</strong> Following</span>
              </div>
            </div>
            {isOwnProfile && (
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-ei_teal text-white py-2 rounded-lg hover:bg-ei_teal/90 transition"
                >
                  Edit Profile
                </button>
                <button 
                  onClick={() => setIsCreatingTrip(true)}
                  className="flex-1 bg-ei_orange text-white py-2 rounded-lg hover:bg-ei_orange/90 transition"
                >
                  Create Trip
                </button>
              </div>
            )}
          </div>

          {/* Traveler Info */}
          <div className="rounded-xl bg-white/90 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 backdrop-blur-sm p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-100">Traveler Info</h2>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p><strong>Favorite Travel Type:</strong> {profile.travelerInfo?.favoriteTravelType?.join(', ') || 'N/A'}</p>
              <p><strong>Favorite Place:</strong> {profile.travelerInfo?.favoriteTraveledPlace || 'N/A'}</p>
              <p><strong>Interests:</strong> {profile.travelerInfo?.travelInterests?.join(', ') || 'N/A'}</p>
              <p><strong>Places Visited:</strong> {profile.travelerInfo?.placesVisited?.length || 0}</p>
              <p><strong>States Visited:</strong> {profile.travelerInfo?.statesVisited?.length || 0}</p>
              <p><strong>Bucket List:</strong> {profile.travelerInfo?.bucketList?.join(', ') || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-6 mt-6 lg:mt-0">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">Trips</h2>
          {trips.length === 0 ? (
            <p className="text-slate-500">No trips yet.</p>
          ) : (
            trips.map(trip => (
              <div key={trip._id} className="mb-6">
                <TripCard trip={trip} />
                <button 
                  onClick={() => handleToggleFavorite(trip._id)}
                  className="text-ei_orange mt-2"
                >
                  {favoritetrips.includes(trip._id) ? 'Unfavorite' : 'Favorite'}
                </button>
                {isOwnProfile && <Link to={`/edittrip/${trip._id}`} className="text-ei_teal ml-4">Edit</Link>}
              </div>
            ))
          )}
        </div>

        {/* Favorites Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">Favorite Trips</h2>
          {favoritePosts.length === 0 ? (
            <p>No favorite trips yet.</p>
          ) : (
            favoritePosts.map(favId => {
              const favPost = posts.find(p => p._id === favId);
              if (!favPost) return null;
              return (
                <div key={favId} className="mb-4">
                  <h3>{favPost.title}</h3>
                  <p>{favPost.content}</p>
                  {favPost.images?.map(img => (
                    <img key={img} src={img} alt="Trip image" className="w-48 rounded-lg" />
                  ))}
                  <button 
                    onClick={() => handleToggleFavorite(favId)} 
                    className="text-ei_orange"
                  >
                    {favoritePosts.includes(favId) ? 'Unfavorite' : 'Favorite'}
                  </button>
                  {isOwnProfile && <Link to={`/edittrip/${favPost._id}`} className="text-ei_teal ml-4">Edit</Link>}
                </div>
              );
            })
          )}
        </section>

        {/* Right Sidebar (reuse from Home) */}
        <aside className="lg:col-span-3 hidden lg:block">
          {/* <RightSidebar /> */}  {/* Add if needed */}
        </aside>
      </section>

      {/* Modals */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-700 p-6 rounded-lg max-w-md w-full">
            <EditProfileForm 
              profile={profile} 
              onClose={() => setIsEditing(false)} 
              onUpdate={setProfile} 
            />
          </div>
        </div>
      )}

      {isCreatingTrip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-700 p-6 rounded-lg max-w-md w-full">
            <CreateTripForm 
              onClose={() => setIsCreatingTrip(false)} 
              onCreate={(newTrip) => setPosts([newTrip, ...posts])} 
              userId={id || user?._id} 
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default ProfilePage;