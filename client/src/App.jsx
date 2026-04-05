import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateTrip from "./pages/CreateTrip";
import EditTrip from "./pages/EditTrip";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AboutUs from "./pages/AboutUs";
import Welcome from "./pages/Welcome";
import SuggestedProfile from './pages/SuggestedProfile';
import Notification from './pages/Notification';
import TripSearch from './pages/TripSearch';

function App() {
  return (
<div className="min-h-screen p-2 bg-slate-300 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<Signup />} />

      <Route element={<MainLayout />}>
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/createtrip" element={<CreateTrip />} />
        <Route path="/edittrip/:id" element={<EditTrip />} />
        <Route path="/notification" element={<Notification />}/>
        <Route path="/profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>} /> 
        <Route path="/suggested-profile/:id" element={<SuggestedProfile />} />
        <Route path="/editprofile" element={<EditProfile />} /> 
        <Route path="/aboutus" element={<AboutUs />} /> 
        <Route path="/trip-search" element={<TripSearch />} />
      </Route>

      
      <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App;