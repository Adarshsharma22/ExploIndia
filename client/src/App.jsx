import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
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
        
        <Route path="/home" element={<Home />} /> 
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/editpost" element={<EditPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/home" element={<PrivateRoute><Home /> </PrivateRoute>} />
      </Route>
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App;
