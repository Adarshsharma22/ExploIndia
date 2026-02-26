import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateTrip from "./pages/CreateTrip";
import EditTrip from "./pages/EditTrip";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AboutUs from "./pages/AboutUs";
import Search from "./pages/Search";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      <Route element={<MainLayout />}>
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/edit-trip/:id" element={<EditTrip />} /> 
        <Route path="/profile/:id" element={<Profile />} /> 
        <Route path="/edit-profile" element={<EditProfile />} /> 
        <Route path="/about-us" element={<AboutUs />} /> 
        <Route path="/search" element={<Search />} /> 
        <Route path="/profile" element={<Navigate to="/home" replace />} />
      </Route>

      {/* Catch-all for 404 */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App;