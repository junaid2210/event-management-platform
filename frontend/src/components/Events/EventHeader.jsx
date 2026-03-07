import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { User, CheckCircle } from 'lucide-react';

const EventHeader = ({ event, isRegistered, isRegistering, registerError, handleRegistration }) => {
    const { user } = useContext(AuthContext);

    const isPastEvent = new Date(event.date) < new Date();

    return (
        <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{event.title}</h1>
                <div className="flex items-center gap-2 text-gray-500 mt-4">
                    <User size={18} />
                    <span>Organized by <span className="font-bold text-gray-800">{event.createdBy?.name || 'Unknown'}</span></span>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                {user?.role === 'organizer' ? (
                    <div className="bg-gray-100 text-gray-500 px-6 py-3 rounded-xl font-bold border border-gray-200 text-sm">
                        Organizers cannot register
                    </div>
                ) : isRegistered ? (
                    <button disabled className="bg-green-50 text-green-600 px-8 py-3 rounded-xl font-bold border border-green-200 flex items-center gap-2">
                        <CheckCircle size={20} /> Registered
                    </button>
                ) : (
                    <button 
                        onClick={handleRegistration}
                        disabled={isRegistering || !event.isPublished || isPastEvent}
                        className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg whitespace-nowrap
                            ${(!event.isPublished || isPastEvent) 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 hover:-translate-y-0.5'
                            }`}
                    >
                        {isRegistering ? 'Processing...' : !event.isPublished ? 'Registration Closed' : isPastEvent ? 'Event Ended' : 'Register Now'}
                    </button>
                )}
                {registerError && <p className="text-red-500 text-sm font-semibold max-w-xs text-right mt-1">{registerError}</p>}
            </div>
        </div>
    );
};

export default EventHeader;