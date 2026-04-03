import { Link } from 'react-router-dom';
import { Calendar, Ticket, LineChart, CheckCircle } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="min-h-screen bg-white">
            
            {/* Hero Section (Your tilting card design!) */}
            <main className="max-w-7xl mx-auto px-6 sm:px-10 py-20 flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 space-y-8">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                        The End of <br /> 
                        <span className="text-blue-600">Event Chaos.</span>
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        Say goodbye to scattered WhatsApp links, manual spreadsheets, and lost tickets. 
                        EventSphere connects campus organizers and students in one seamless platform.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/register" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                            Get Started for Free
                        </Link>
                        {/* Smooth scroll to features below */}
                        <a href="#features" className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-sm">
                            Learn More
                        </a>
                    </div>
                </div>
                
                <div className="lg:w-1/2 bg-blue-50 rounded-[40px] p-8 w-full">
                    <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <div className="h-40 bg-blue-100 rounded-xl mb-4 animate-pulse"></div>
                        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section id="features" className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-6 sm:px-10">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                            {/* For Organizers */}
                            <div className="p-10 md:p-12 space-y-6">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-2">
                                    <LineChart size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">For Organizers</h2>
                                <p className="text-gray-500 text-lg leading-relaxed">
                                    Stop managing RSVPs manually. We give you a professional command center to publish events, track capacity in real-time, and manage your guest list effortlessly.
                                </p>
                                <ul className="space-y-3 pt-4">
                                    <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Publish in seconds</li>
                                    <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Automated capacity caps</li>
                                    <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Digital guest lists</li>
                                </ul>
                            </div>

                            {/* For Attendees */}
                            <div className="p-10 md:p-12 space-y-6">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-2">
                                    <Ticket size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">For Attendees</h2>
                                <p className="text-gray-500 text-lg leading-relaxed">
                                    Never miss out on a great event again. Discover what is happening, secure your spot with a single click, and keep all your digital tickets organized in one place.
                                </p>
                                <ul className="space-y-3 pt-4">
                                    <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Centralized event discovery</li>
                                    <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Instant RSVP</li>
                                    <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Dedicated ticket dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 max-w-7xl mx-auto px-6 sm:px-10">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop only) */}
                    <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-gray-100 z-0"></div>

                    <div className="relative z-10 text-center space-y-4 pt-2">
                        <div className="w-16 h-16 mx-auto bg-white border-4 border-gray-50 shadow-sm text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">1</div>
                        <h3 className="text-xl font-bold text-gray-900">Discover</h3>
                        <p className="text-gray-500 px-4">Browse a curated feed of upcoming events tailored to your interests.</p>
                    </div>
                    
                    <div className="relative z-10 text-center space-y-4 pt-2">
                        <div className="w-16 h-16 mx-auto bg-white border-4 border-gray-50 shadow-sm text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">2</div>
                        <h3 className="text-xl font-bold text-gray-900">Register</h3>
                        <p className="text-gray-500 px-4">Secure your spot instantly before the venue capacity is reached.</p>
                    </div>
                    
                    <div className="relative z-10 text-center space-y-4 pt-2">
                        <div className="w-16 h-16 mx-auto bg-white border-4 border-gray-50 shadow-sm text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">3</div>
                        <h3 className="text-xl font-bold text-gray-900">Attend</h3>
                        <p className="text-gray-500 px-4">Pull up your digital ticket at the door and enjoy the experience.</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HeroSection;