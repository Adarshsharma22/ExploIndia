// authService.js
import axios from "axios";

// Create a single axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change to your production URL later
});

// Automatically add Authorization header if token exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ───────────────────────────────────────────────
// Login User
// ───────────────────────────────────────────────
export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });

    // Assuming backend returns { token, user: {...} }
    const { token, user } = response.data;

    // Save token to localStorage
    localStorage.setItem("token", token);

    return { token, user };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};

// ───────────────────────────────────────────────
// Register User
// ───────────────────────────────────────────────
export const registerUser = async (fullName, username, email, password) => {
  try {
    const response = await API.post("/auth/register", {
      fullName,
      username,
      email,
      password,
    });

    // Assuming backend returns { token, user }
    const { token, user } = response.data;

    localStorage.setItem("token", token);

    return { token, user };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Registration failed. Please try again."
    );
  }
};

// ───────────────────────────────────────────────
// Get User Profile
// ───────────────────────────────────────────────
export const getProfile = async (id) => {
  try {
    const response = await API.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch profile"
    );
  }
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

// ───────────────────────────────────────────────
// Update Profile
// ───────────────────────────────────────────────
export const updateProfile = async (formData) => {
  
  const token = localStorage.getItem("token");

  const res = await axios.put(
    "http://localhost:5000/api/users/update",
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


// ───────────────────────────────────────────────
// Create Trip
// ───────────────────────────────────────────────
export const createTrip = async (formData) => {
  try {
    const response = await API.post("/trips/create", formData, {
      headers: {
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

// ───────────────────────────────────────────────
// Get User's Trips
// ───────────────────────────────────────────────
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

// ───────────────────────────────────────────────
// Toggle Favorite Trip
// ───────────────────────────────────────────────
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

// ───────────────────────────────────────────────
// Get Trip by ID
// ───────────────────────────────────────────────
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