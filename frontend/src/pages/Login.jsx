import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import InputField from "../components/common/inputField";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    
    // 👈 Look at this! Pure, clean separation of concerns.
    const { login, loading, error } = useLogin(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] p-4 lg:p-8">
            <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
                
                {/* LEFT SIDE: The Form */}
                <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2 mb-12">
                            <span>
                                <img src="image (1).png" alt="EventSphere Logo" className="w-10 h-10 object-contain rounded-lg" />
                            </span>
                            <span className="text-xl font-bold tracking-tight text-gray-900">
                                Event<span className="text-blue-600">Sphere</span>
                            </span>
                        </h1>
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                        <p className="text-gray-500">Enter your email and password to access your account.</p>
                    </div>

                    {error && <p className="mb-4 text-red-500 bg-red-50 p-3 rounded-lg text-sm font-medium">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField 
                            label="Email" 
                            name="email" 
                            type="email" 
                            placeholder="Enter your email address" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                        
                        <InputField 
                            label="Password" 
                            name="password" 
                            type="password" 
                            placeholder="••••••••" 
                            value={formData.password} 
                            onChange={handleChange} 
                        />

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
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 disabled:bg-blue-400"
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                            Effortlessly manage your <br /> events and college life.
                        </h2>
                        <p className="text-blue-100 text-lg mb-12">
                            Log in to access your event dashboard and see what's happening at your college.
                        </p>
                        
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
};

export default Login;