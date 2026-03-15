import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile, getUserTrip } from '../services/authService';
import TripCard from '../components/TripCard';

const SuggestedProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(id);
        setProfile(profileData);

        const tripsData = await getUserTrip(id);
        setTrips(tripsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  if (!profile) return <div className="min-h-screen flex items-center justify-center">Profile not found</div>;

  return (
    <main className="min-h-screen pt-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <img
              src={profile.profilePic || "/img/avtar.png"}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white dark:border-slate-800 shadow-2xl"
              alt={profile.fullName}
            />
            <h1 className="mt-6 text-3xl font-black text-slate-900 dark:text-white">
              {profile.fullName}
            </h1>
            <p className="text-ei_teal text-lg">@{profile.username}</p>
            <p className="mt-4 max-w-md text-slate-600 dark:text-slate-300 italic">
              "{profile.bio || 'Exploring the unseen India...'}"
            </p>
          </div>
        </div>

        {/* User's Trips */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Trips by {profile.fullName}</h2>
          {trips.length === 0 ? (
            <p className="text-slate-500">No trips posted yet.</p>
          ) : (
            <div className="space-y-6">
              {trips.map(post => (
                <TripCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>

        <Link
          to="/home"
          className="mt-10 inline-block px-6 py-3 bg-ei_teal text-white rounded-full hover:bg-ei_teal/90 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
};

export default SuggestedProfile;