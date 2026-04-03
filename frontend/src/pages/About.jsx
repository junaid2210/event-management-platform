import { Link } from 'react-router-dom';
import { Calendar, Users, Ticket, Bell, LineChart, CheckCircle } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-16">
                
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        The End of <span className="text-blue-600">Event Chaos.</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                        Say goodbye to scattered WhatsApp links, manual spreadsheets, and lost tickets. 
                        EventSphere is the all-in-one platform designed to bring organizers and attendees together seamlessly.
                    </p>
                </div>

                {/* The Core Problem/Solution Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {/* For Organizers */}
                        <div className="p-10 space-y-6">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-2">
                                <LineChart size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">For Organizers</h2>
                            <p className="text-gray-500">
                                Stop managing RSVPs manually. We give you a professional command center to publish events, track capacity in real-time, and manage your guest list effortlessly.
                            </p>
                            <ul className="space-y-3 pt-4">
                                <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Publish in seconds</li>
                                <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Automated capacity caps</li>
                                <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Digital guest lists</li>
                            </ul>
                        </div>

                        {/* For Attendees */}
                        <div className="p-10 space-y-6">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-2">
                                <Ticket size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">For Attendees</h2>
                            <p className="text-gray-500">
                                Never miss out on a great event again. Discover what is happening, secure your spot with a single click, and keep all your digital tickets in one place.
                            </p>
                            <ul className="space-y-3 pt-4">
                                <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Centralized event discovery</li>
                                <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Instant RSVP</li>
                                <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Dedicated ticket dashboard</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* How It Works (Simple 3 Steps) */}
                <div className="py-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop only) */}
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-100 z-0"></div>

                        <div className="relative z-10 text-center space-y-4 bg-gray-50 pt-2">
                            <div className="w-16 h-16 mx-auto bg-white border-4 border-gray-50 shadow-sm text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">1</div>
                            <h3 className="text-xl font-bold text-gray-900">Discover</h3>
                            <p className="text-gray-500 text-sm px-4">Browse a curated feed of upcoming events tailored to your interests.</p>
                        </div>
                        
                        <div className="relative z-10 text-center space-y-4 bg-gray-50 pt-2">
                            <div className="w-16 h-16 mx-auto bg-white border-4 border-gray-50 shadow-sm text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">2</div>
                            <h3 className="text-xl font-bold text-gray-900">Register</h3>
                            <p className="text-gray-500 text-sm px-4">Secure your spot instantly before the venue capacity is reached.</p>
                        </div>
                        
                        <div className="relative z-10 text-center space-y-4 bg-gray-50 pt-2">
                            <div className="w-16 h-16 mx-auto bg-white border-4 border-gray-50 shadow-sm text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">3</div>
                            <h3 className="text-xl font-bold text-gray-900">Attend</h3>
                            <p className="text-gray-500 text-sm px-4">Pull up your digital ticket at the door and enjoy the experience.</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center pt-8 pb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to upgrade your event experience?</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                            Browse Upcoming Events
                        </Link>
                        <Link to="/register" className="bg-white text-gray-700 font-bold px-8 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                            Create an Account
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;