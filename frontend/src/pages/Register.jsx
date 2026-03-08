import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import InputField from '../components/common/inputField'; // 👈 Import our reusable component!

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student', 
        collegeId: ''
    });
    const [isOther, setIsOther] = useState(false);

    // 👈 Connect our custom hook
    const { register, loading, error, existingColleges } = useRegister();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCollegeSelection = (e) => {
        const value = e.target.value;
        if (value === 'other') {
            setIsOther(true);
            setFormData({ ...formData, collegeId: '' });
        } else {
            setIsOther(false);
            setFormData({ ...formData, collegeId: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] p-4 lg:p-8">
            <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
                
                <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                    <div className="mb-10 text-left">
                        <h1 className="text-2xl font-bold text-gray-600 flex items-center gap-2 mb-12">
                            <span>
                                <img src="image (1).png" alt="EventSphere Logo" className="w-10 h-10 object-contain rounded-lg" />
                            </span>
                            <span className="text-xl font-bold tracking-tight text-gray-900">
                                Event<span className="text-blue-600">Sphere</span>
                            </span>
                        </h1>
                        <h2 className="text-3xl font-bold text-gray-800 text-left">Create Account</h2>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100 text-left">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* 👇 Look at how clean these inputs are now! */}
                        <InputField 
                            label="Full Name" 
                            name="name" 
                            placeholder="Name" 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                        
                        <InputField 
                            label="College Email" 
                            name="email" 
                            type="email" 
                            placeholder="Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">I am a...</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none"
                                >
                                    <option value="student">Student</option>
                                    <option value="organizer">Organizer</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">College Name</label>
                                {!isOther ? (
                                    <select
                                        onChange={handleCollegeSelection}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">-- Select --</option>
                                        {existingColleges.map((col) => (
                                            <option key={col._id} value={col.name}>
                                                {col.name.toUpperCase()}
                                            </option>
                                        ))}
                                        <option value="other" className="text-blue-600 font-bold">+ Add New College</option>
                                    </select>
                                ) : (
                                    <div className="space-y-1">
                                        <input
                                            type="text"
                                            name="collegeId"
                                            placeholder="Enter College Name"
                                            className="w-full px-4 py-3 rounded-xl border border-blue-500 bg-blue-50 outline-none"
                                            value={formData.collegeId}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button type="button" onClick={() => setIsOther(false)} className="text-[10px] text-blue-600 underline">Back to list</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <InputField 
                            label="Password" 
                            name="password" 
                            type="password" 
                            placeholder="••••••••" 
                            value={formData.password} 
                            onChange={handleChange} 
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all mt-4 disabled:bg-blue-400"
                        >
                            {loading ? 'Registering...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
                    </p>
                </div>

                {/* RIGHT SIDE: The Visual Section */}
                <div className="hidden lg:flex w-1/2 bg-blue-600 p-16 flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    
                    <div className="relative z-10 text-white">
                        <h2 className="text-4xl font-bold mb-6 leading-tight">
                            A place where <br /> ideas become events.
                        </h2>
                        <p className="text-blue-100 text-lg mb-12">
                            Stay updated with workshops, hackathons, and cultural fests at your college.
                        </p>
                        
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-blue-400 border-2 border-white/30"></div>
                                <div className="space-y-2">
                                    <div className="h-3 w-32 bg-white/40 rounded"></div>
                                    <div className="h-2 w-20 bg-white/20 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 w-full bg-white/10 rounded"></div>
                                <div className="h-4 w-5/6 bg-white/10 rounded"></div>
                                <div className="h-4 w-4/6 bg-white/10 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
};

export default Register;