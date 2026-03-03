import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Added NavLink
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, PlusCircle } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext); // logout() handles the API call
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // This already hits the backend and clears state
        navigate('/'); // Clean redirect to the Landing/Login gate
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    
                    {/* LEFT: BRAND */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <img 
                            src="/image (1).png" 
                            alt="Logo" 
                            className="w-8 h-8 object-contain transition-transform group-hover:scale-110" 
                        />
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            Event<span className="text-blue-600">Sphere</span>
                        </span>
                    </Link>

                    {/* MIDDLE: NAVIGATION LINKS */}
                    <div className="hidden md:flex items-center bg-gray-50/50 px-1.5 py-1 rounded-2xl border border-gray-100">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                    isActive 
                                    ? "bg-white text-blue-600 shadow-sm" 
                                    : "text-gray-500 hover:text-gray-900"
                                }`
                            }
                        >
                            Browse
                        </NavLink>
                        
                        {user?.role === 'student' && (
                            <NavLink 
                                to="/my-tickets" 
                                className={({ isActive }) => 
                                    `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                        isActive 
                                        ? "bg-white text-blue-600 shadow-sm" 
                                        : "text-gray-500 hover:text-gray-900"
                                    }`
                                }
                            >
                                My Registrations
                            </NavLink>
                        )}

                        {user?.role === 'organizer' && (
                            <NavLink 
                                to="/my-events" 
                                className={({ isActive }) => 
                                    `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                        isActive 
                                        ? "bg-white text-blue-600 shadow-sm" 
                                        : "text-gray-500 hover:text-gray-900"
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>
                        )}
                        
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => 
                                `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                    isActive 
                                    ? "bg-white text-blue-600 shadow-sm" 
                                    : "text-gray-500 hover:text-gray-900"
                                }`
                            }
                        >
                            About
                        </NavLink>
                    </div>

                    {/* RIGHT: USER ACTIONS */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        
                        {/* ROLE-BASED ACTION */}
                        {user?.role === 'organizer' && (
                            <Link 
                                to="/create-event" 
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                            >
                                <PlusCircle size={18} />
                                <span className="hidden md:inline">Post Event</span>
                            </Link>
                        )}

                        {/* USER PROFILE INFO */}
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-bold text-gray-800 leading-none">
                                    {user?.name}
                                </span>
                                <span className="text-[10px] font-medium text-blue-500 uppercase tracking-wider mt-1">
                                    {user?.collegeId || 'Campus Member'}
                                </span>
                            </div>

                            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <User size={20} />
                            </div>

                            <button 
                                onClick={handleLogout}
                                className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>       
    );
};

export default Navbar;