import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
        const response = await api.post('/auth/login', formData);
        login(response.data); // Save user to Global Context
        navigate('/'); // Go to Home page
        } catch (err) {
        setError(err); // Show error if login fails
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] p-4 lg:p-8">
        {/* Main Card Wrapper */}
        <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
            
            {/* LEFT SIDE: The Form */}
            <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2 mb-12">
                    <span>
                        <img 
                            src="image (1).png" 
                            alt="EventSphere Logo" 
                            className="w-10 h-10 object-contain rounded-lg" 
                        />
                    </span>
                    EventSphere
                </h1>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-gray-500">Enter your email and password to access your account.</p>
            </div>

            {error && <p className="mb-4 text-red-500 bg-red-50 p-3 rounded-lg text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <div className="flex justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">Email</label>
                </div>
                <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                />
                </div>

                <div>
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">Password</label>
                </div>
                <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                />
                </div>

                <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-gray-600">Remember Me</span>
                </label>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Forgot Your Password?</a>
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200"
                >
                {loading ? 'Verifying...' : 'Log In'}
                </button>
            </form>

            <p className="mt-8 text-center text-gray-500">
                Don't Have An Account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register Now.</Link>
            </p>
            </div>

            {/* RIGHT SIDE: The Visual Section */}
            <div className="hidden lg:flex w-1/2 bg-blue-600 p-16 flex-col justify-center relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            
            <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                Effortlessly manage your <br /> events and college life.
                </h2>
                <p className="text-blue-100 text-lg mb-12">
                Log in to access your event dashboard and see what's happening at your college.
                </p>
                
                {/* Mock Dashboard UI Illustration */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform rotate-2">
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="space-y-3">
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    <div className="h-4 bg-white/20 rounded w-1/2"></div>
                    <div className="h-20 bg-white/20 rounded w-full mt-4"></div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Login;