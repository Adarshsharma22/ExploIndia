import { useState } from 'react';
import { createTrip } from '../services/authService';  // Keep API call name, but it's for trips

function CreateTripForm({ onClose, onCreate, userId }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    for (const image of images) {
      formData.append('images', image);
    }
    // Assuming backend associates with userId automatically via token

    try {
      const { data } = await createPost(formData);  // API is /trips/create
      onCreate(data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Trip Title" className="w-full p-2 border rounded" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Trip Description" className="w-full p-2 border rounded" />
      <input type="file" multiple onChange={(e) => setImages([...e.target.files])} accept="image/*" />
      <div className="flex gap-4">
        <button type="submit" className="px-4 py-2 rounded bg-ei_orange text-white">Create Trip</button>
        <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
      </div>
    </form>
  );
}

export default CreateTripForm;