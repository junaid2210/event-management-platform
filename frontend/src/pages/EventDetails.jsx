import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Calendar, MapPin, Clock, Users, ArrowLeft, User, CheckCircle } from 'lucide-react';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isRegistering, setIsRegistering] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await api.get(`/events/${id}`);
                setEvent(response.data);

                if(response.data.isUserRegistered){
                    setIsRegistered(true);
                }
            } catch (err) {
                // 1. Blocked by Auth Middleware (No Token)
                console.log("Raw Axios Error:", err);
                if (err === 'Not authorized, not token' || err === 'Not authorized, token failed' || err === 'User not found') {
                    setError('auth_required'); 
                } 
                // 2. Blocked by Controller (Wrong College)
                else if (err === 'You are not authorized to view events from other colleges') {
                    setError('wrong_college');
                }
                // 3. Any Other error (MUST be in an else block!)
                else {
                    setError(err.response?.data?.message || 'Failed to load event details');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRegistration = async () => {
        if(!user) {
            navigate('/login');
            return;
        }

        setIsRegistering(true);
        setRegisterError('');

        try {
            await api.post(`/events/${id}/register`);

            setIsRegistered(true);
        } catch (err) {
            setRegisterError(err || 'Failed to register. Please try again');
        } finally {
            setIsRegistering(false);
        }
    };

    if(loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error === 'auth_required') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md text-center">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Campus Event</h2>
                    <p className="text-gray-500 mb-6">
                        This event is exclusive to campus students. Please log in to view the details and register.
                    </p>
                    <Link to="/" className="block w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                        Log In or Sign Up
                    </Link>
                </div>
            </div>
        );
    }

    if (error === 'wrong_college') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md text-center">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Different Campus</h2>
                    <p className="text-gray-500 mb-6">
                        This event belongs to a different college. You can only view and register for events hosted at your own campus.
                    </p>
                    <Link to="/" className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                        Browse My Campus Events
                    </Link>
                </div>
            </div>
        );
    }

    if(error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-red-500 font-bold text-xl">{error}</p>
                <Link to="/" className="text-blue-600 hover:underline font-medium">Go back to Home</Link>
            </div>
        );
    }

    if(!event) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Back Navigation */}
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium">
                    <ArrowLeft size={20} />
                    <span>Back to Events</span>
                </Link>

                {/* Main Content Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* 1. THE EVENT BANNER (Image or Fallback) */}
                    <div className="relative h-64 md:h-80 w-full bg-gray-200">
                        {event.image ? (
                            <img 
                                src={event.image} 
                                alt={event.title} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-white/20 font-bold text-4xl uppercase tracking-widest">
                                    {event.title.substring(0, 2)}
                                </span>
                            </div>
                        )}
                        
                        {/* Status Badge Overlaid on Image */}
                        {!event.isPublished && (
                            <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                Draft Mode
                            </div>
                        )}
                    </div>

                    {/* 2. THE HEADER SECTION (Title, Organizer, Button) */}
                    <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-6">
                        
                        {/* LEFT SIDE: TITLE & ORGANIZER */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                                {event.title}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-500 mt-4">
                                <User size={18} />
                                <span>Organized by <span className="font-bold text-gray-800">{event.createdBy?.name || 'Unknown'}</span></span>
                            </div>
                        </div>

                        {/* RIGHT SIDE: ACTION BUTTON & ERRORS */}
                        <div className="flex flex-col items-end gap-2">
                            {user?.role === 'organizer' ? (
                                /* Block ALL organizers from registering */
                                <div className="bg-gray-100 text-gray-500 px-6 py-3 rounded-xl font-bold border border-gray-200 text-sm">
                                    Organizers cannot register
                                </div>
                            ) : isRegistered ? (
                                /* Success State */
                                <button disabled className="bg-green-50 text-green-600 px-8 py-3 rounded-xl font-bold border border-green-200 flex items-center gap-2">
                                    <CheckCircle size={20} /> Registered
                                </button>
                            ) : (
                                /* Normal Student Registration Button */
                                <button 
                                    onClick={handleRegistration}
                                    disabled={isRegistering || !event.isPublished || new Date(event.date) < new Date()}
                                    className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg whitespace-nowrap
                                        ${(!event.isPublished || new Date(event.date) < new Date()) 
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 hover:-translate-y-0.5'
                                        }`}
                                >
                                    {isRegistering ? 'Processing...' : 
                                    !event.isPublished ? 'Registration Closed' : 
                                    new Date(event.date) < new Date() ? 'Event Ended' : 
                                    'Register Now'}
                                </button>
                            )}

                            {/* Display Backend Errors (e.g., "Event is full") */}
                            {registerError && (
                                <p className="text-red-500 text-sm font-semibold max-w-xs text-right mt-1">
                                    {registerError}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* 3. THE DETAILS GRID (Date, Time, Venue, Capacity) */}
                    <div className="p-8 md:p-10 bg-gray-50/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><Calendar size={24} /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Date</p>
                                    <p className="font-bold text-gray-900">{new Date(event.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><Clock size={24} /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Time</p>
                                    <p className="font-bold text-gray-900">{event.time}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><MapPin size={24} /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Venue</p>
                                    <p className="font-bold text-gray-900">{event.venue}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><Users size={24} /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Capacity</p>
                                    <p className="font-bold text-gray-900">{event.capacity} Seats</p>
                                </div>
                            </div>
                        </div>

                        {/* 4. THE DESCRIPTION */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">About this Event</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                {event.description}
                            </p>
                        </div>
                    </div>

                </div>                
            </div>
        </div>
    );
};

export default EventDetails;