import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const registerUser = async (fullName, username, email, password) => {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getProfile = (id) =>
  API.get(`/users/${id}`);

export const updateProfile = (formData) =>
  API.put("/users/update", formData);

export const createTrip = (formData) =>
  API.post("/trips/create", formData);

export const getUserTrip = (userId) =>
  API.get(`/trips/user/${userId}`);

export const toggleFavorite = (tripId) =>
  API.put(`/trips/favorite/${tripId}`);

export const getTripById = (id) =>
  API.get(`/trips/${id}`);

export const updateTrip = (id, formData) => 
  API.put(`/trips/${id}`, formData);