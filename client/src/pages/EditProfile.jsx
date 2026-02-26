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
    if (req.files?.userDP) data.append('profilePic', userDP);
    if (req.files?.backgroundImage) data.append('coverPic', backgroundImage);

    try {
      const { data: updated } = await updateProfile(data);
      onUpdate(updated);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full p-2 border rounded" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" />
      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="w-full p-2 border rounded" />

      <h3>Traveler Info</h3>
      <select 
        value={formData.travelerInfo.favoriteTravelType} 
        onChange={(e) => handleTravelerChange('favoriteTravelType', e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Type</option>
        <option value="solo">Solo</option>
        <option value="duo">Duo</option>
        <option value="group">Group</option>
        <option value="trio">Trio</option>
        {/* Add more */}
      </select>
      <input 
        type="text" 
        value={formData.travelerInfo.favoriteTravelType} 
        onChange={(e) => handleTravelerChange('favoriteTravelType', e.target.value)} 
        placeholder="Favorite Travel Types (comma separated, e.g., solo, group)" 
        className="w-full p-2 border rounded" 
      />
      <input 
        type="text" 
        value={formData.travelerInfo.favoriteTraveledPlace} 
        onChange={(e) => handleTravelerChange('favoriteTraveledPlace', e.target.value)} 
        placeholder="Favorite Traveled Place" 
        className="w-full p-2 border rounded" 
      />
      <input 
        type="text" 
        value={formData.travelerInfo.travelInterests} 
        onChange={(e) => handleTravelerChange('travelInterests', e.target.value)} 
        placeholder="Travel Interests (comma separated, e.g., mountains, beaches)" 
        className="w-full p-2 border rounded" 
      />
      <input 
        type="text" 
        value={formData.travelerInfo.placesVisited} 
        onChange={(e) => handleTravelerChange('placesVisited', e.target.value)} 
        placeholder="Places Visited (comma separated)" 
        className="w-full p-2 border rounded" 
      />
      <input 
        type="text" 
        value={formData.travelerInfo.statesVisited} 
        onChange={(e) => handleTravelerChange('statesVisited', e.target.value)} 
        placeholder="States Visited (comma separated)" 
        className="w-full p-2 border rounded" 
      />
      <input 
        type="text" 
        value={formData.travelerInfo.bucketListDestinations} 
        onChange={(e) => handleTravelerChange('bucketListDestinations', e.target.value)} 
        placeholder="Bucket List Destinations (comma separated)" 
        className="w-full p-2 border rounded" 
      />

      <input type="file" onChange={(e) => setUserDP(e.target.files[0])} accept="image/*" />
      <input type="file" onChange={(e) => setBackgroundImage(e.target.files[0])} accept="image/*" />

      <div className="flex gap-4">
        <button type="submit" className="px-4 py-2 rounded bg-ei_teal text-white">Save</button>
        <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
      </div>
    </form>
  );
}

export default EditProfileForm;