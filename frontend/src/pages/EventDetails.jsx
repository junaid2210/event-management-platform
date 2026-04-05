import { useParams, Link } from 'react-router-dom';
import { useEvent } from '../hooks/useEvent';
import { ArrowLeft, User, MapPin } from 'lucide-react';

// Import our new UI components
import EventBanner from '../components/Events/EventBanner';
import EventHeader from '../components/Events/EventHeader';
import EventInfoGrid from '../components/Events/EventInfoGrid';

const EventDetails = () => {
    const { id } = useParams();
    
    // 1. Data Flow is completely abstracted to the hook!
    const { event, loading, error, isRegistering, registerError, isRegistered, handleRegistration } = useEvent(id);

    // 2. Early Returns for Loading and Errors
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error === 'auth_required') return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><User size={32} /></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Campus Event</h2>
                <p className="text-gray-500 mb-6">This event is exclusive to campus students. Please log in to view the details and register.</p>
                <Link to="/login" className="block w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700">Log In or Sign Up</Link>
            </div>
        </div>
    );

    if (error === 'wrong_college') return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><MapPin size={32} /></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Different Campus</h2>
                <p className="text-gray-500 mb-6">This event belongs to a different college. You can only view and register for events hosted at your own campus.</p>
                <Link to="/" className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200">Browse My Campus Events</Link>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <p className="text-red-500 font-bold text-xl">{error}</p>
            <Link to="/" className="text-blue-600 hover:underline font-medium">Go back to Home</Link>
        </div>
    );

    if (!event) return null;

    // 3. The Main UI Layout
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium">
                    <ArrowLeft size={20} />
                    <span>Back to Events</span>
                </Link>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <EventBanner event={event} />
                    <EventHeader 
                        event={event} 
                        isRegistered={isRegistered} 
                        isRegistering={isRegistering}
                        registerError={registerError}
                        handleRegistration={handleRegistration}
                    />
                    
                    <div className="p-8 md:p-10 bg-gray-50/50">
                        <EventInfoGrid event={event} />
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