import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                
                {/* 1. BRAND LOGO */}
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

                {/* 2. NAVIGATION LINKS */}
                <div className="flex items-center gap-4 sm:gap-8">
                    {user ? (
                    /* LOGGED IN VIEW */
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
                        <User size={16} className="text-blue-600" />
                        <span className="text-sm font-semibold text-blue-700">{user.name}</span>
                        </div>
                        
                        <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium"
                        >
                        <LogOut size={18} />
                        <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                    ) : (
                    /* LOGGED OUT VIEW */
                    <div className="flex items-center gap-3 sm:gap-6">
                        <Link 
                        to="/login" 
                        className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
                        >
                        Sign In
                        </Link>
                        <Link 
                        to="/register" 
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                        >
                        Get Started
                        </Link>
                    </div>
                    )}
                </div>
                </div>
            </div>
        </nav>       
    );
};

export default Navbar;