import axios from "axios";

const API = axios.create({
  baseURL: "https://fm096qfx-5000.inc1.devtunnels.ms/api", 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${token}`, 
    };
  }

  console.log("FINAL HEADERS:", req.headers); 

  return req;
});


// Login User

export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });

   
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};


// Register User

export const registerUser = async (fullName, username, email, password) => {
  try {
    const response = await API.post("/auth/register", {
      fullName,
      username,
      email,
      password,
    });

    
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Registration failed. Please try again."
    );
  }
};

// Get User Profile

export const getProfile = async (id) => {

  if (!id) {
    console.warn("getProfile called with undefined ID");
    return null;
  }

  const res = await API.get(`/users/${id}`);
  return res.data;
};

// Get All Public Trips (for Home Feed)
export const getAllTrips = async () => {
  try {
    const response = await API.get('/trips');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch trips");
  }
};

// Get Suggested Users for Right Sidebar
export const getSuggestedUsers = async () => {
  try {
    const response = await API.get('/users/suggested');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to load suggested users");
  }
};


// Update Profile

export const updateProfile = async (formData) => {
  
  const token = localStorage.getItem("token");

  const res = await axios.put(
    "https://fm096qfx-5000.inc1.devtunnels.ms/api/users/update",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res;
};



// Create Trip

export const createTrip = async (formData) => {
  try {
    const token = localStorage.getItem("token"); // 🔥 ADD THIS

    const response = await API.post("/trips/create", formData, {
      headers: {
        Authorization: `Bearer ${token}`, // 🔥 FORCE TOKEN
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create trip"
    );
  }
};

// Get User's Trips

export const getUserTrip = async (userId) => {
  try {
    const response = await API.get(`/trips/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch trips"
    );
  }
};

// Notification Api

export const getNotifications = async () => {
  const res = await API.get("/notifications");
  return res.data;
};

export const markNotificationRead = async (id) => {
  await API.put(`/notifications/${id}/read`);
};

// Toggle Favorite Trip

export const toggleFavorite = async (tripId) => {
  try {
    const response = await API.put(`/trips/favorite/${tripId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to toggle favorite"
    );
  }
};


// Get Trip by ID

export const getTripById = async (id) => {
  try {
    const response = await API.get(`/trips/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch trip"
    );
  }
};

// Toggle Like on a Trip
export const toggleLike = async (tripId) => {
  try {
    const response = await API.put(`/trips/like/${tripId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to toggle like");
  }
};

// views api

export const incrementViews = async (tripId) => {
  try {
    const response = await API.put(`/trips/view/${tripId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to update views");
  }
};

// Add Comment on a Trip
export const addComment = async (tripId, commentText) => {
  try {
    const response = await API.post(`/trips/${tripId}/comment`, {
      text: commentText
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add comment");
  }
};


//delet trip api
export const deleteTrip = async (tripId) => {
  try {
    const response = await API.delete(`/trips/${tripId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete trip");
  }
};

// Edit trip api
export const editTrip = async (tripId, formData) => {
  try {
    const response = await API.put(`/trips/${tripId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update trip");
  }
};

// ───────────────────────────────────────────────
// Update Trip
// ───────────────────────────────────────────────
export const updateTrip = async (id, formData) => {
  try {
    const response = await API.put(`/trips/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update trip"
    );
  }
};

export default API;