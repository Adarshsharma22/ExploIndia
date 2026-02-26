import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTripById, updateTrip } from '../services/authService';  // Add these exports

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [pageloading, setpageLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await getTripById(id);
        setTitle(data.title);
        setDescription(data.description);
        setExistingImages(data.images || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    for (const image of images) {
      formData.append('images', image);
    }

    try {
      await updateTrip(id, formData);
      navigate('/Profile');  // Redirect back to profile
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen pt-20 px-4">
      <h1 className="text-3xl font-bold mb-4">Edit Trip</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Trip Title" className="w-full p-2 border rounded" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Trip Description" className="w-full p-2 border rounded" />
        <div>
          <p>Existing Images:</p>
          {existingImages.map((img, idx) => <img key={idx} src={img} alt="Existing" className="w-32" />)}
        </div>
        <input type="file" multiple onChange={(e) => setImages([...e.target.files])} accept="image/*" />
        <button type="submit" className="px-4 py-2 rounded bg-ei_teal text-white">Update Trip</button>
      </form>
    </div>
  );
}