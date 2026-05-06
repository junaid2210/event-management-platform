import { Link } from 'react-router-dom';
import { Calendar, Ticket, LineChart, CheckCircle, MapPin, Users, Bell, Zap, QrCode, ArrowUpRight } from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-white overflow-hidden">
            
            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-6 sm:px-10 py-20 flex flex-col lg:flex-row items-center gap-16 relative">
                
                {/* Background ambient glow (Premium SaaS touch) */}
                <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>

                <div className="lg:w-1/2 space-y-8 z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                        The End of <br /> 
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Event Chaos.</span>
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        Say goodbye to scattered WhatsApp links, manual spreadsheets, and lost tickets. 
                        EventSphere connects campus organizers and students in one seamless platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link to="/register" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg text-center hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-200">
                            Get Started for Free
                        </Link>
                        <a href="#features" className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold text-lg text-center hover:bg-gray-50 hover:border-gray-200 transition-all duration-300">
                            Learn More
                        </a>
                    </div>
                </div>
                
                {/* THE UPGRADED VISUAL: Dynamic Glassmorphism Card 
                  Hovering over this "group" triggers the 3D transforms!
                */}
                <div className="lg:w-1/2 relative w-full h-[500px] flex justify-center items-center group perspective-1000">
                    
                    {/* The Main Event Card */}
                    <div className="relative z-10 w-full max-w-sm bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-6 transform transition-all duration-500 group-hover:-rotate-2 group-hover:scale-105">
                        
                        {/* Fake Event Image with Gradient */}
                        <div className="h-48 w-full rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 mb-6 relative overflow-hidden">
                            <img
                                src="event.png"
                                alt="Event"
                                className="w-full h-full object-cover"
                            />
                            {/* Tags */}
                            <div className="absolute bottom-4 left-4 flex gap-2">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-bold shadow-sm">Hackathon</span>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-bold shadow-sm">Tech</span>
                            </div>
                        </div>

                        {/* Fake Event Details */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900 leading-tight">Innovate Campus Summit '26</h3>
                            
                            <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                                <Calendar size={18} className="text-blue-500" /> 
                                Oct 24 • 10:00 AM
                            </div>
                            
                            <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                                <MapPin size={18} className="text-indigo-500" /> 
                                Main Auditorium, Block D
                            </div>

                            {/* Fake Capacity Progress Bar */}
                            <div className="pt-4 border-t border-gray-100 mt-2">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-bold text-gray-900">240 Registered</span>
                                    <span className="text-gray-500">/ 300</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="w-[80%] h-full bg-blue-600 rounded-full relative">
                                        {/* Little shimmer effect on the bar */}
                                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Badge 1: Ticket Confirmed (Top Right) */}
                    <div className="absolute top-12 -right-4 md:-right-12 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:rotate-3 hidden sm:block">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Auto-RSVP</p>
                                <p className="font-bold text-gray-900 text-sm">Ticket Sent!</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Badge 2: Social Proof (Bottom Left) */}
                    <div className="absolute bottom-16 -left-4 md:-left-12 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-500 group-hover:-translate-x-4 group-hover:translate-y-4 group-hover:-rotate-3 hidden sm:block">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3">
                                {/* Fake avatars */}
                                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">J</div>
                                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">A</div>
                                <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">S</div>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">+45 Friends</p>
                                <p className="text-xs text-gray-500 font-medium">Are attending</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Badge 3: Notification (Top Left) */}
                    <div className="absolute top-32 -left-8 z-0 bg-white p-3 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-700 group-hover:-translate-x-6 group-hover:-rotate-6 opacity-80 hidden md:block">
                        <div className="flex items-center gap-2">
                            <Bell size={16} className="text-yellow-500" />
                            <p className="text-xs font-bold text-gray-700">Capacity Alert</p>
                        </div>
                    </div>

                </div>
            </main>

            {/* Features Section */}
            <section id="features" className="py-24 bg-gray-50 relative overflow-hidden">
                {/* Subtle background mesh gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-gray-50 to-white -z-10"></div>

                <div className="max-w-7xl mx-auto px-6 sm:px-10">
                    
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm">Platform Capabilities</h2>
                        <h3 className="text-4xl font-extrabold text-gray-900">Everything you need to run the perfect event.</h3>
                    </div>

                    {/* The Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
                        
                        {/* Bento Box 1: Analytics (Spans 2 columns) */}
                        <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-blue-100 transition-colors duration-500"></div>
                            
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                                        <LineChart size={24} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Real-Time Command Center</h4>
                                    <p className="text-gray-500 max-w-sm">Watch your guest list grow live. Track capacity, page views, and attendee demographics without hitting refresh.</p>
                                </div>
                                
                                {/* Decorative UI inside the box */}
                                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-64 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg transform group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold text-gray-500 uppercase">Live Capacity</span>
                                        <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full animate-pulse">Filling Fast</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-[92%] h-full bg-blue-600 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bento Box 2: Digital Tickets (Tall, spans 1 col) */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700 shadow-lg relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 bg-gray-800 text-white rounded-xl border border-gray-600 flex items-center justify-center mb-6">
                                        <Ticket size={24} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-2">Digital Wallets</h4>
                                    <p className="text-gray-400">Students access all their tickets via secure QR codes. No more lost emails.</p>
                                </div>
                                
                                {/* Floating QR Code Graphic */}
                                <div className="mt-8 flex justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                    <div className="bg-white p-4 rounded-2xl shadow-2xl">
                                        <QrCode size={80} className="text-gray-900" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bento Box 3: Social Proof (Small) */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                <Users size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Built-in Community</h4>
                            <p className="text-gray-500 text-sm mb-6">See which of your friends are already attending.</p>
                            
                            {/* Avatar Stack Hover Effect */}
                            <div className="flex -space-x-3 transform group-hover:translate-x-2 transition-transform duration-300">
                                <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex justify-center items-center text-white font-bold text-sm shadow-sm z-30">JD</div>
                                <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-white flex justify-center items-center text-white font-bold text-sm shadow-sm z-20">AK</div>
                                <div className="w-10 h-10 rounded-full bg-pink-500 border-2 border-white flex justify-center items-center text-white font-bold text-sm shadow-sm z-10">SJ</div>
                                <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex justify-center items-center text-gray-600 font-bold text-sm shadow-sm z-0">+12</div>
                            </div>
                        </div>

                        {/* Bento Box 4: Frictionless Tech (Spans 2 columns) */}
                        <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 border border-blue-500 shadow-lg relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                            {/* Abstract background rings */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[40px] border-white/5 rounded-full -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-700"></div>
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] border-[40px] border-white/10 rounded-full -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-1000"></div>

                            <div className="relative z-10 h-full flex flex-col justify-between sm:flex-row sm:items-center gap-8">
                                <div className="max-w-md">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 flex items-center justify-center mb-6">
                                        <Zap size={24} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-2">Zero Friction.</h4>
                                    <p className="text-blue-100">
                                        The platform is designed to get out of your way. Creating an event takes exactly 30 seconds. Registering for one takes a single click.
                                    </p>
                                </div>
                                
                                {/* CTA button inside the bento box */}
                                <div className="flex-shrink-0">
                                    <a href="/register" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-4 rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl">
                                        Try it now <ArrowUpRight size={20} />
                                    </a>
                                </div>
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
                    <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-gray-200 z-0"></div>

                    <div className="relative z-10 text-center space-y-4 pt-2 group cursor-default">
                        <div className="w-16 h-16 mx-auto bg-white border-4 border-gray-100 shadow-sm text-blue-600 rounded-full flex items-center justify-center text-xl font-bold group-hover:border-blue-200 group-hover:scale-110 transition-all duration-300">1</div>
                        <h3 className="text-xl font-bold text-gray-900">Discover</h3>
                        <p className="text-gray-500 px-4">Browse a curated feed of upcoming events tailored to your interests.</p>
                    </div>
                    
                    <div className="relative z-10 text-center space-y-4 pt-2 group cursor-default">
                        <div className="w-16 h-16 mx-auto bg-white border-4 border-gray-100 shadow-sm text-blue-600 rounded-full flex items-center justify-center text-xl font-bold group-hover:border-blue-200 group-hover:scale-110 transition-all duration-300">2</div>
                        <h3 className="text-xl font-bold text-gray-900">Register</h3>
                        <p className="text-gray-500 px-4">Secure your spot instantly before the venue capacity is reached.</p>
                    </div>
                    
                    <div className="relative z-10 text-center space-y-4 pt-2 group cursor-default">
                        <div className="w-16 h-16 mx-auto bg-white border-4 border-gray-100 shadow-sm text-blue-600 rounded-full flex items-center justify-center text-xl font-bold group-hover:border-blue-200 group-hover:scale-110 transition-all duration-300">3</div>
                        <h3 className="text-xl font-bold text-gray-900">Attend</h3>
                        <p className="text-gray-500 px-4">Pull up your digital ticket at the door and enjoy the experience.</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Landing;