import { Link } from 'react-router-dom';
import { Target, Heart, Zap, Coffee } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-16">
                
                {/* Mission Header */}
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Built for Students, <br/>
                        <span className="text-blue-600">By Students.</span>
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        We believe that campus life shouldn't be hidden behind messy group chats and endless email threads.
                    </p>
                </div>

                {/* The Origin Story */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 md:p-12 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <Coffee className="text-blue-600" />
                            Our Origin Story
                        </h2>
                        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                            <p>
                                EventSphere started with a simple frustration. We noticed that incredible campus events—hackathons, cultural fests, and expert workshops—were suffering from low attendance simply because students didn't know they were happening. 
                            </p>
                            <p>
                                Organizers were forced to spam WhatsApp links, and students were managing RSVPs through clunky Google Forms. The disconnect was massive.
                            </p>
                            <p>
                                We built this platform to fix that broken bridge. We wanted a centralized hub where organizers could manage capacity with professional tools, and students could discover their campus culture with a single click.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                <Target size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Simplicity First</h3>
                            <p className="text-gray-500">Software should get out of your way. We obsess over clean UI and removing unnecessary clicks.</p>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                                <Heart size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Community Driven</h3>
                            <p className="text-gray-500">Every feature we build is directly inspired by the feedback of real campus organizers and attendees.</p>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Reliable Tech</h3>
                            <p className="text-gray-500">When tickets go live, the platform stays up. We engineer for speed, security, and scale.</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center pt-8 pb-12 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Be a part of our story.</h2>
                    <Link to="/register" className="inline-block bg-gray-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-300">
                        Join the Community
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default About;