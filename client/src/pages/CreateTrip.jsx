import { useState, useEffect } from 'react';
import { createTrip } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { Plus, X, ImageIcon } from 'lucide-react';

function CreateTripForm({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const navigate = useNavigate();

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

    navigate(`/profile/${user?.id}`);

  } catch (err) {
    console.error(err);
  }
};

const handleFileChange = (e) => {
  const files = [...e.target.files];

  if (files.length + images.length > 10) {
    alert("Max 10 images allowed");
    return;
  }

  const newImages = [...images, ...files];
  setImages(newImages);

  const newPreview = files.map(file => URL.createObjectURL(file));
  setPreview(prev => [...prev, ...newPreview]);
};

const removeImage = (index) => {
  const updatedImages = images.filter((_, i) => i !== index);
  const updatedPreview = preview.filter((_, i) => i !== index);

  URL.revokeObjectURL(preview[index]);

  setImages(updatedImages);
  setPreview(updatedPreview);
};

useEffect(() => {
  return () => {
    preview.forEach(url => URL.revokeObjectURL(url));
  };
}, [preview]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 m-4 overflow-y-auto scrollbar-hide max-h-[80vh] text-slate-700 dark:text-slate-100 p-1 w-[80%] mx-auto">
    
    {/* HEADER SECTION */}
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-extrabold bg-linear-to-r from-ei_orange to-orange-600 bg-clip-text text-transparent">
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

      {/* */}
      <div className="w-full max-w-md space-y-3">
      <div className="flex justify-between items-end px-1">
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">
          Add Photos
        </label>
        <span className={`text-[10px] font-medium ${images.length >= 10 ? 'text-red-500' : 'text-slate-400'}`}>
          {images.length} / 10
        </span>
      </div>

      <div className="group relative">
        {/* Main Upload Dropzone */}
        <div className="relative flex p-7 items-center justify-center w-full h-10 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group-hover:border-teal-500">
          <div className="flex items-center justify-center gap-3 ">
            <div className="p-2 bg-white dark:bg-slate-700 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-200">
              <Plus className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Drop images or <span className="text-teal-600">browse</span>
            </p>
          </div>
          
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>
      </div>

      {/* Horizontal Preview Gallery */}
      {preview.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {preview.map((src, i) => (
            <div key={src} className="relative flex-shrink-0 group animate-in fade-in zoom-in duration-200">
              <img
                src={src}
                alt="preview"
                className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          
          {/* Subtle "Add More" slot if under limit */}
          {images.length < 10 && (
             <div className="relative flex-shrink-0 w-20 h-20 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50/30">
                <ImageIcon className="w-5 h-5 text-slate-300" />
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
             </div>
          )}
        </div>
      )}
    </div>
    </div>

    {/* ACTIONS */}
    <div className="flex items-center gap-4 pt-4">
      <button 
        type="submit" 
        className="flex-1 py-4 rounded-full font-bold text-white 
                   bg-linear-to-r from-ei_orange via-orange-500 to-ei_teal 
                   shadow-[0_8px_20px_rgba(255,140,0,0.3)] 
                   hover:shadow-[0_10px_25px_rgba(255,140,0,0.45)] 
                   hover:-translate-y-1 active:scale-95 transition-all duration-300
                   hover:cursor-pointer "
                   
      >
        Create Trip
      </button>

      <button
        type="button"
        onClick={() => navigate(`/profile`)}
        className="px-8 py-4 rounded-full font-semibold text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:cursor-pointer"
      >
        Cancel
      </button>
    </div>
  </form>
  );
}

export default CreateTripForm;
