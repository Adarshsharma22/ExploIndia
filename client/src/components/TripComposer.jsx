// src/components/TripComposer.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createTrip, getAllTrips } from '../services/authService';
import TripCard from './TripCard';
import { Link } from 'react-router-dom';

const TripComposer = () => {
  const { user, isAuthenticated } = useAuth();

  // Composer State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [composerLoading, setComposerLoading] = useState(false);
  const [composerError, setComposerError] = useState(null);
  const [composerSuccess, setComposerSuccess] = useState(null);

  // Feed State
  const [trips, setTrips] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const [feedError, setFeedError] = useState(null);

  // Fetch all trips when component loads
  useEffect(() => {
    const fetchAllTrips = async () => {
      try {
        setFeedLoading(true);
        const data = await getAllTrips();
        setTrips(data);
      } catch (err) {
        console.error("Failed to fetch trips:", err);
        setFeedError("Failed to load trips. Please try again later.");
      } finally {
        setFeedLoading(false);
      }
    };

    fetchAllTrips();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      setComposerError("Maximum 5 images allowed");
      return;
    }
    setImages([...images, ...files]);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previews]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  // Submit new trip
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setComposerError("Title and description are required");
      return;
    }
    if (images.length === 0) {
      setComposerError("Please add at least one photo");
      return;
    }

    setComposerLoading(true);
    setComposerError(null);
    setComposerSuccess(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      images.forEach(file => formData.append('images', file));

      const newTrip = await createTrip(formData);

      // Clear form
      setTitle('');
      setDescription('');
      setImages([]);
      setPreviewImages([]);

      // Add new trip to top of feed instantly
      setTrips(prev => [newTrip, ...prev]);

      setComposerSuccess("Trip shared successfully! 🎉");

    } catch (err) {
      setComposerError(err.message || "Failed to create trip");
    } finally {
      setComposerLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">

      {/* === GLOBAL FEED === */}
      <div>
        <div className="flex items-center justify-between mb-8 px-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Latest <span className="text-ei_orange">Trips</span>
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-ei_orange to-ei_teal rounded-full"></div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ei_teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ei_teal"></span>
          </span>
          Live Feed
        </div>
      </div>

        {feedLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin h-12 w-12 border-4 border-ei_teal border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-slate-500">Loading trips from all travellers...</p>
            </div>
          ) : feedError ? (
            <p className="text-red-500 text-center py-10">{feedError}</p>
          ) : trips.length === 0 ? (
            <div className="text-center py-20 text-slate-500 bg-white/50 dark:bg-slate-800/50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-2">No trips yet</h3>
              <p>Be the first to share your adventure!</p>
              <Link to="/create-trip" className="mt-4 inline-block px-6 py-3 bg-ei_teal text-white rounded-full hover:bg-ei_teal/90">
                Create Your First Trip
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {trips.map((post) => (
                <TripCard key={post._id} post={post} />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default TripComposer;