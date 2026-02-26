import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [fullName, setFullName] = useState('');  // Fixed typo (setfullName → setFullName)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState(null);  // Added for UX

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName || !username || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (!agree) {
      setError('Please agree to the Terms and Privacy Policy');
      return;
    }

    try {
      setError(null);
      const data = await registerUser(fullName, username, email, password);

      // Auto login after signup
      login(data);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

    return (
        <div className="font-inter min-h-screen bg-slate-50  dark:bg-slate-900 text-slate-800 dark:text-white/90 antialiased">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex text-x1 items-center gap-3 group"> 

                        {/* soft travel glow */}
                        

                        {/* text */}
                        <span className="relative z-10 text-3xl font-bold">
                            W
                            <span className="text-ei_orange group-hover:text-ei_teal transition-colors duration-300">
                            E
                            </span> 
                            LCOME
                        </span>

                        {/* bottom route line */}
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2
                        w-10 h-0.75 rounded-full
                        bg-linear-to-r from-ei_orange to-ei_teal
                        opacity-80"></span>
                        



                        </Link>
                        <Link to="/login" className="px-4 py-2 text-sm hidden lg:block font-semibold rounded-full border-2 border-ei_orange text-ei_orange dark:border-white/90 dark:text-white/90 hover:bg-ei_orange hover:text-white transition-all duration-300">
                            Already have an account? Login
                        </Link>
                    </div>
                </div>
            </header>

            {/* Signup Section */}
            <section className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-slate-800 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-700">
                    
                    <div className="text-center">
                        <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
                            Create Your ExploIndia Account
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                            Join our community of travellers today!
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="appearance-none rounded-t-md relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-400 text-slate-900 dark:text-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-ei_teal focus:border-ei_teal focus:z-10 sm:text-sm transition-colors duration-200"
                                    placeholder="Full Name (e.g., Jane Doe)"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}                                   
                                    className="appearance-none relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-400 text-slate-900 dark:text-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-ei_teal focus:border-ei_teal focus:z-10 sm:text-sm transition-colors duration-200"
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-400 text-slate-900 dark:text-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-ei_teal focus:border-ei_teal focus:z-10 sm:text-sm transition-colors duration-200"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none rounded-b-md relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-400 text-slate-900 dark:text-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-ei_teal focus:border-ei_teal focus:z-10 sm:text-sm transition-colors duration-200"
                                    placeholder="Password (min 8 characters)"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                                className="h-4 w-4 text-ei_teal border-slate-300 dark:border-slate-600 rounded focus:ring-ei_teal transition-colors duration-200"
                            />
                            <label className="ml-2 block text-sm text-slate-600 dark:text-slate-300">
                                I agree to the <Link to="/terms" className="font-medium text-ei_teal hover:text-ei_orange transition-colors">Terms of Service</Link> and <Link to="/privacy" className="font-medium text-ei_teal hover:text-ei_orange transition-colors">Privacy Policy</Link>
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-lg font-medium rounded-full text-white bg-linear-to-r from-ei_orange to-ei_blue hover:shadow-[0_10px_25px_rgba(255,140,0,0.55)] hover:-translate-y-0.5 hover:brightness-110 transition-all duration-300"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="text-center text-sm">
                    {error && <p className="text-red-500 mb-2">{error}</p>}  {/* Show error */}
                        <Link to="/login" className="font-medium text-ei_teal hover:text-ei_orange transition-colors">
                            Already an ExploIndia member? Log in here
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Signup;
