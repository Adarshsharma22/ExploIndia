import { useState } from 'react';
import { createTrip } from '../services/authService';

function CreateTripForm({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    for (const image of images) {
      formData.append('images', image);
    }

    try {
  const data = await createTrip(formData);

  if (onCreate) {
    onCreate(data);
  }

  onClose();
} catch (err) {
  console.error(err);
}
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8 space-y-6 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800">
    
    {/* HEADER SECTION */}
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-ei_orange to-orange-600 bg-clip-text text-transparent">
        Share Your Story
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Tell the community about your latest Indian adventure.
      </p>
    </div>

    <div className="space-y-5">
      {/* TRIP TITLE */}
      <div className="group">
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5 ml-1">
          Trip Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. A Weekend in the Pink City"
          className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-ei_orange outline-none transition-all duration-300 placeholder:text-slate-400"
        />
      </div>

      {/* TRIP DESCRIPTION */}
      <div className="group">
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5 ml-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What made this trip special? Share your tips and hidden gems..."
          className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-ei_teal outline-none transition-all duration-300 h-40 resize-none placeholder:text-slate-400"
        />
      </div>

      {/* PHOTO UPLOAD BOX */}
      <div className="relative group">
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5 ml-1">
          Add Photos
        </label>
        <div className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 transition-colors cursor-pointer">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <p className="text-xs text-slate-500">Click to upload multiple images</p>
          </div>
          <input
            type="file"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        {images.length > 0 && (
          <p className="mt-2 text-xs font-semibold text-ei_teal">
            ✓ {images.length} photos selected
          </p>
        )}
      </div>
    </div>

    {/* ACTIONS */}
    <div className="flex items-center gap-4 pt-4">
      <button 
        type="submit" 
        className="flex-1 py-4 rounded-full font-bold text-white 
                   bg-gradient-to-r from-ei_orange via-orange-500 to-ei_teal 
                   shadow-[0_8px_20px_rgba(255,140,0,0.3)] 
                   hover:shadow-[0_10px_25px_rgba(255,140,0,0.45)] 
                   hover:-translate-y-1 active:scale-95 transition-all duration-300"
      >
        Create Trip
      </button>

      <button
        type="button"
        onClick={onClose}
        className="px-8 py-4 rounded-full font-semibold text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
      >
        Cancel
      </button>
    </div>
  </form>
  );
}

export default CreateTripForm;
