import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const data = await loginUser(email, password);
      login(data);
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
<div className="font-inter overflow-x-hidden bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white/90 antialiased min-h-screen">
  <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex text-x1 items-center gap-3 group"> 

                        {/* text */}
                        <span className="relative z-10 text-3xl font-bold">
                            W
                            <span className="text-ei_orange group-hover:text-ei_teal text-4x1 transition-colors duration-300">
                            E
                            </span> 
                            LCOME
                        </span>

                        {/* bottom route line */}
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2
                        w-10 h-[3px] rounded-full
                        bg-gradient-to-r from-ei_orange to-ei_teal
                        opacity-80"></span>
                        



                        </Link>
                        <Link to="/Signup" className="px-4 py-2 text-sm font-semibold rounded-full border-2 border-ei_orange text-ei_orange dark:border-white/90 dark:text-white/90 hover:bg-ei_orange hover:text-white transition-all duration-300">
                            Need an account? Sign Up
                        </Link>
                    </div>
                </div>
            </header>

      {/* Login Section */}
      <section className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-slate-800 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-700">

          <div className="text-center">
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
              Log In to Your Account
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Welcome back, fellow traveller!
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">

              {/* USERNAME (UI ONLY) */}
              <input
                type="text"
                placeholder="User Name"
                className="appearance-none rounded-t-md relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-400 text-slate-900 dark:text-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-ei_teal focus:border-ei_teal sm:text-sm"
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-400 text-slate-900 dark:text-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-ei_teal focus:border-ei_teal sm:text-sm"
              />

              {/* PASSWORD */}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-b-md relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-400 text-slate-900 dark:text-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-ei_teal focus:border-ei_teal sm:text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-ei_orange hover:text-ei_teal transition-colors duration-200">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 text-lg font-medium rounded-full text-white bg-gradient-to-r from-ei_teal to-ei_blue hover:shadow-[0_10px_25px_rgba(0,180,180,0.55)] transition-all duration-300"
            >
              Log In
            </button>
          </form>
          <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                Or log in with
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200">
                            <img src="img/google_2702602.png" alt="Google logo" className="w-5 h-5 mr-2" />
                            Google
                        </button>
                        <button type="button" className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200">
                            <img src="img/facebook_3536394.png" alt="Facebook logo" className="w-5 h-5 mr-2" />
                            Facebook
                        </button>
                    </div>
                    <div className="text-center text-sm">
                        <Link to="/Signup" className="font-medium text-ei_orange hover:text-ei_teal transition-colors duration-200">
                            Don't have an account? Sign up now
                        </Link>
                    </div>

        </div>
      </section>
    </div>
  );
}
