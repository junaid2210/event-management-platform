import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                
                {/* Column 1: Brand */}
                <div className="space-y-4 col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2">
                        {/* If you have a logo image, you can drop it here! */}
                        <span className="text-2xl font-bold text-white tracking-tight">EventSphere</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        The ultimate platform for campus organizers and students to discover, manage, and experience events seamlessly.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-blue-400 transition-colors"><Github size={20} /></a>
                        <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>

                {/* Column 2: Platform Links */}
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Platform</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                        <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                        <li><Link to="/register" className="hover:text-blue-400 transition-colors">Create Account</Link></li>
                        <li><Link to="/my-tickets" className="hover:text-blue-400 transition-colors">My Tickets</Link></li>
                    </ul>
                </div>

                {/* Column 3: Legal & Support (Dummy links for realism) */}
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Resources</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Event Guidelines</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Column 4: Newsletter */}
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Stay Updated</h4>
                    <p className="text-xs text-gray-400 mb-4">Get the best campus events delivered directly to your inbox.</p>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center bg-gray-800 rounded-xl overflow-hidden border border-gray-700 focus-within:border-blue-500 transition-colors">
                            <div className="pl-3 text-gray-400"><Mail size={16} /></div>
                            <input 
                                type="email" 
                                placeholder="Student email" 
                                className="bg-transparent text-sm w-full p-3 outline-none text-white placeholder-gray-500" 
                            />
                        </div>
                        <button className="bg-blue-600 text-white text-sm font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© {new Date().getFullYear()} EventSphere. Built by Junaid.</p>
                <div className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span>All systems operational</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;