import { useContext , useState} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Added NavLink
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, PlusCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false); // Controls the mobile menu
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/'); 
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

                    {/* MIDDLE: DESKTOP NAVIGATION LINKS */}
                    <div className="hidden md:flex items-center bg-gray-50/50 px-1.5 py-1 rounded-2xl border border-gray-100">
                        <NavLink to="/" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
                            Browse
                        </NavLink>
                        
                        {user?.role === 'student' && (
                            <NavLink to="/my-tickets" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
                                My Registrations
                            </NavLink>
                        )}

                        {user?.role === 'organizer' && (
                            <NavLink to="/my-events" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
                                Dashboard
                            </NavLink>
                        )}
                        
                        <NavLink to="/about" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
                            About
                        </NavLink>
                    </div>

                    {/* RIGHT: USER ACTIONS & MOBILE TOGGLE */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        
                        {/* ROLE-BASED ACTION (Hidden on small mobile, moved to dropdown) */}
                        {user?.role === 'organizer' && (
                            <Link to="/create-event" className="hidden sm:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors">
                                <PlusCircle size={18} />
                                <span className="hidden md:inline">Post Event</span>
                            </Link>
                        )}

                        {/* USER PROFILE INFO */}
                        <div className="flex items-center gap-3 pl-0 sm:pl-4 sm:border-l border-gray-100">
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

                            <button onClick={handleLogout} className="hidden sm:block ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Logout">
                                <LogOut size={20} />
                            </button>
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 -mr-2 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE DROPDOWN MENU */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 shadow-lg space-y-1">
                    <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-4 py-3 rounded-xl text-sm font-semibold ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}>
                        Browse Events
                    </NavLink>
                    
                    {user?.role === 'student' && (
                        <NavLink to="/my-tickets" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-4 py-3 rounded-xl text-sm font-semibold ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}>
                            My Registrations
                        </NavLink>
                    )}

                    {user?.role === 'organizer' && (
                        <>
                            <NavLink to="/my-events" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-4 py-3 rounded-xl text-sm font-semibold ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}>
                                Dashboard
                            </NavLink>
                            <Link to="/create-event" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-3 text-blue-600 font-bold bg-blue-50/50 rounded-xl">
                                <PlusCircle size={18} /> Post New Event
                            </Link>
                        </>
                    )}

                    <NavLink to="/about" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-4 py-3 rounded-xl text-sm font-semibold ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}>
                        About
                    </NavLink>

                    {/* Mobile Logout Row */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between px-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-800">{user?.name}</span>
                            <span className="text-xs text-blue-500 uppercase">{user?.collegeId || 'Member'}</span>
                        </div>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-bold text-sm px-3 py-2 bg-red-50 rounded-lg">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>       
    );
};

export default Navbar;