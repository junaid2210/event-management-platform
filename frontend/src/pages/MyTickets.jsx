import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { Calendar, MapPin, Ticket, ExternalLink } from 'lucide-react';

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchtickets = async () => {
            try{
                const response = await eventService.getMyTickets();
                setTickets(response || []);
            } catch (err) {
                setError(err || 'Failed to load your tickets.');
            } finally {
                setLoading(false);
            }
        };
        fetchtickets();
    }, []);

    if (loading) return <div className="min-h-screen flex justify-center items-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Ticket className="text-blue-600" size={32} />
                        My Tickets
                    </h1>
                    <p className="text-gray-500 mt-2">Manage your upcoming event registrations.</p>
                </div>

                {error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">{error}</div>
                ) : tickets.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Ticket size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No tickets found</h3>
                        <p className="text-gray-500 mb-6">You haven't registered for any upcoming events yet.</p>
                        <Link to="/" className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                            Browse Events
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tickets.map((ticket) => {
                            // Safety check: if an organizer deleted the event after the user registered
                            if (!ticket.eventId) return null; 

                            const event = ticket.eventId;
                            const isPast = new Date(event.date) < new Date();

                            return (
                                <div key={ticket._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                                    <div className="p-6 flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold ${isPast ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                                                {isPast ? 'Past Event' : 'Registered'}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">{event.title}</h3>
                                        
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-gray-600 text-sm">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                                    <Calendar size={16} />
                                                </div>
                                                <span className="font-medium">
                                                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at {event.time}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600 text-sm">
                                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
                                                    <MapPin size={16} />
                                                </div>
                                                <span className="font-medium truncate">{event.venue}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-end">
                                        <Link to={`/event/${event._id}`} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                                            Event Details <ExternalLink size={16} />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTickets;