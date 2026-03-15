import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTripById, updateTrip } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const data = await getTripById(id);
        setTitle(data.title);
        setDescription(data.description);
        setExistingImages(data.images || []);
      } catch (err) {
        console.error("Failed to fetch trip", err);
      }
    };

    fetchTrip();
  }, [id]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);

  for (const image of images) {
    formData.append("images", image);
  }

  try {
    await updateTrip(id, formData);
    navigate(`/profile/${user._id}`);   // ← FIXED: Pass user ID
  } catch (err) {
    console.error("Update failed", err);
  }
};

  return (
    <main className="min-h-screen pt-24 flex justify-center bg-slate-50 dark:bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-xl w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl"
      >
        <h2 className="text-3xl font-extrabold text-center bg-linear-to-r from-ei_orange to-ei_teal bg-clip-text text-transparent">
          Edit Trip
        </h2>

        {/* TITLE */}
        <div>
          <label className="text-xs font-bold uppercase text-slate-500">
            Trip Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 mt-1 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 focus:border-ei_orange outline-none"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-xs font-bold uppercase text-slate-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 mt-1 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 focus:border-ei_teal outline-none h-40"
          />
        </div>

        {/* EXISTING IMAGES */}
        {existingImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {existingImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="trip"
                className="rounded-xl h-24 object-cover"
              />
            ))}
          </div>
        )}

        {/* NEW IMAGES */}
        <div>
          <label className="text-xs font-bold uppercase text-slate-500">
            Upload New Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
            className="mt-2"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 pt-4">
          <button
          type="submit"
          className="flex-1 py-4 rounded-full text-white font-bold bg-gradient-to-r from-ei_orange to-ei_teal"
        >
          Update Trip
        </button>

        <button
          type="button"
          onClick={() => navigate(`/profile/${user._id}`)}   // ← FIXED: Pass user ID
          className="px-6 py-4 border rounded-full text-slate-600 dark:text-slate-300"
        >
          Cancel
        </button>
        </div>
      </form>
    </main>
  );
}

export default EditTrip;