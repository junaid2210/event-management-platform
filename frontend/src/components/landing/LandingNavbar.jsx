import { Link } from 'react-router-dom';

const LandingNavbar = () => {
    return (
        <nav className="flex justify-between items-center px-10 py-6">
            <div className="flex items-center gap-2">
                <img src="/image (1).png" alt="Logo" className="w-11 h-10 rounded-lg" />
                <span className="text-2xl font-bold text-blue-600">EventSphere</span>
            </div>
            <div className="flex gap-4">
                <Link to="/login" className="px-6 py-2 text-gray-600 font-semibold hover:text-blue-600 transition-colors">Login</Link>
                <Link to="/register" className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                    Join Now
                </Link>
            </div>
        </nav>
    );
};

export default LandingNavbar;