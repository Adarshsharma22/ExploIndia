import { useState } from 'react';
import { updateProfile } from '../services/authService';

function EditProfileForm({ profile, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    username: profile.username,
    email: profile.email,
    location: profile.location,
    bio: profile.bio,
    travelerInfo: {
      favoriteTravelType: profile.travelerInfo?.favoriteTravelType?.join(', ') || '',  
      travelInterests: profile.travelerInfo?.travelInterests?.join(', ') || '',
      placesVisited: profile.travelerInfo?.placesVisited?.join(', ') || '',
      statesVisited: profile.travelerInfo?.statesVisited?.join(', ') || '',
      bucketList: profile.travelerInfo?.bucketList?.join(', ') || '',    },
  });
  const [userDP, setUserDP] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTravelerChange = (field, value) => {
    setFormData({
      ...formData,
      travelerInfo: { ...formData.travelerInfo, [field]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('location', formData.location);
    data.append('bio', formData.bio);
    const travelerInfo = {
      ...formData.travelerInfo,
      favoriteTravelType: formData.travelerInfo.favoriteTravelType.split(',').map(item => item.trim()), 
      travelInterests: formData.travelerInfo.travelInterests.split(',').map(item => item.trim()),
      placesVisited: formData.travelerInfo.placesVisited.split(',').map(item => item.trim()),
      statesVisited: formData.travelerInfo.statesVisited.split(',').map(item => item.trim()),
      bucketList: formData.travelerInfo.bucketList.split(',').map(item => item.trim()),
    };
    data.append('travelerInfo', JSON.stringify(travelerInfo));
    if (userDP) data.append('userDP', userDP);
    if (backgroundImage) data.append('backgroundImage', backgroundImage);


    try {
      const { data: updated } = await updateProfile(data);
      onUpdate(updated);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <form onSubmit={handleSubmit} className="space-y-6 scroll-auto overflow-y-auto scrollbar-hide text-slate-700 dark:text-slate-100 p-1">
    
    {/* Profile Section */}
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-ei_orange border-b border-slate-200 dark:border-slate-700 pb-1">
        General Info
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" 
          className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-ei_teal outline-none transition-all" />
        
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" 
          className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-ei_teal outline-none transition-all" />
      </div>

      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" 
        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-ei_teal outline-none transition-all" />
      
      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" 
        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-ei_teal outline-none transition-all h-24 resize-none" />
    </div>

    {/* Traveler Info Section */}
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-ei_teal border-b border-slate-200 dark:border-slate-700 pb-1">
        Traveler Info
      </h3>
      
      <div className="flex gap-2">
        <select 
          value={formData.travelerInfo.favoriteTravelType} 
          onChange={(e) => handleTravelerChange('favoriteTravelType', e.target.value)}
          className="w-1/3 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-ei_teal outline-none transition-all"
        >
          <option value="">Select Type</option>
          <option value="solo">Solo</option>
          <option value="duo">Duo</option>
          <option value="group">Group</option>
          <option value="trio">Trio</option>
        </select>
        
        <input 
          type="text" 
          value={formData.travelerInfo.favoriteTravelType} 
          onChange={(e) => handleTravelerChange('favoriteTravelType', e.target.value)} 
          placeholder="Favorite Travel Types (e.g. solo, group)" 
          className="w-2/3 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-ei_teal outline-none transition-all" 
        />
      </div>

      <input 
        type="text" 
        value={formData.travelerInfo.favoriteTraveledPlace} 
        onChange={(e) => handleTravelerChange('favoriteTraveledPlace', e.target.value)} 
        placeholder="Favorite Traveled Place" 
        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-ei_teal outline-none transition-all" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" 
          value={formData.travelerInfo.travelInterests} 
          onChange={(e) => handleTravelerChange('travelInterests', e.target.value)} 
          placeholder="Travel Interests (e.g. mountains)" 
          className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-ei_teal outline-none transition-all" 
        />
        <input 
          type="text" 
          value={formData.travelerInfo.placesVisited} 
          onChange={(e) => handleTravelerChange('placesVisited', e.target.value)} 
          placeholder="Places Visited (comma separated)" 
          className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-ei_teal outline-none transition-all" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" 
          value={formData.travelerInfo.statesVisited} 
          onChange={(e) => handleTravelerChange('statesVisited', e.target.value)} 
          placeholder="States Visited" 
          className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-ei_teal outline-none transition-all" 
        />
        <input 
          type="text" 
          value={formData.travelerInfo.bucketList} 
          onChange={(e) => handleTravelerChange('bucketList', e.target.value)} 
          placeholder="Bucket List Destinations" 
          className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-ei_teal outline-none transition-all" 
        />
      </div>
    </div>

    {/* Media Section */}
    <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl space-y-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Profile Picture</label>
        <input type="file" onChange={(e) => setUserDP(e.target.files[0])} accept="image/*" 
          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ei_teal file:text-white hover:file:bg-teal-600 transition-all cursor-pointer" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Background Image</label>
        <input type="file" onChange={(e) => setBackgroundImage(e.target.files[0])} accept="image/*" 
          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ei_orange file:text-white hover:file:bg-orange-600 transition-all cursor-pointer" />
      </div>
    </div>

    {/* Buttons */}
    <div className="flex gap-4 pt-4">
      <button type="submit" 
        className="flex-1 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-ei_teal to-ei_blue hover:shadow-lg hover:brightness-110 transition-all active:scale-95">
        Save Changes
      </button>
      <button type="button" onClick={onClose} 
        className="px-6 py-3 rounded-full font-semibold border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
        Cancel
      </button>
    </div>
  </form>
  );
}

export default EditProfileForm;