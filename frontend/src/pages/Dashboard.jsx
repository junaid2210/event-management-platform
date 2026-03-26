import { Link } from 'react-router-dom';
import { useOrganizerEvents } from '../hooks/useOrganizerEvents';
import { Calendar, MapPin, Users, Edit, Trash2, ExternalLink, Plus } from 'lucide-react';
import { eventService } from '../services/eventService';

const Dashboard = () => {
    const { events, setEvents, loading, error } = useOrganizerEvents();

    const now = new Date();
    const totalEvents = events.length;
    
    // Drafts: Anything that isn't published yet
    const drafts = events.filter(e => !e.isPublished).length;
    
    // Upcoming: Published AND the date hasn't happened yet
    const upcomingEvents = events.filter(e => e.isPublished && new Date(e.date) >= now).length;
    
    // Past: Published AND the date has already passed
    const pastEvents = events.filter(e => e.isPublished && new Date(e.date) < now).length;

    if(loading) {
        return <div className="min-h-screen flex justify-center items-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    }

    const handleDelete = async (eventId) => {
        if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
            try {
                await eventService.deleteEvent(eventId);
                // Instantly remove the deleted event from the UI
                setEvents(events.filter(event => event._id !== eventId));
            } catch (err) {
                alert(err || "Failed to delete the event.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
                        <p className="text-gray-500 mt-1">Manage your events, track attendance, and update details.</p>
                    </div>
                    <Link to="/create-event" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                        <Plus size={20} />
                        Create New Event
                    </Link>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-sm font-semibold mb-1">Total Events</p>
                        <p className="text-3xl font-bold text-gray-900">{totalEvents}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-sm bg-green-50/30">
                        <p className="text-green-600 text-sm font-semibold mb-1">Upcoming</p>
                        <p className="text-3xl font-bold text-green-700">{upcomingEvents}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-sm font-semibold mb-1">Past Events</p>
                        <p className="text-3xl font-bold text-gray-700">{pastEvents}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-yellow-100 shadow-sm bg-yellow-50/30">
                        <p className="text-yellow-600 text-sm font-semibold mb-1">Drafts</p>
                        <p className="text-3xl font-bold text-yellow-700">{drafts}</p>
                    </div>
                </div>

                {/* Main Table Content */}
                {error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium border border-red-100">{error}</div>
                ) : events.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-500 mb-6">You haven't created any events yet. Let's get started!</p>
                        <Link to="/create-event" className="inline-block bg-blue-50 text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-100 transition-colors">
                            Create Your First Event
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                                        <th className="p-4 font-semibold">Event Details</th>
                                        <th className="p-4 font-semibold">Date & Venue</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event) => {
                                        const isPast = new Date(event.date) < now;
                                        let statusText = 'Draft';
                                        let statusStyle = 'bg-yellow-100 text-yellow-700';

                                        if (event.isPublished) {
                                            if (isPast) {
                                                statusText = 'Past';
                                                statusStyle = 'bg-gray-100 text-gray-600';
                                            } else {
                                                statusText = 'Upcoming';
                                                statusStyle = 'bg-green-100 text-green-700';
                                            }
                                        }

                                        return (
                                        <tr key={event._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            
                                            <td className="p-4">
                                                <p className="font-bold text-gray-900">{event.title}</p>
                                                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                    <Users size={14} />
                                                    <span>Capacity: {event.capacity}</span>
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                                                    <Calendar size={14} className="text-blue-500" />
                                                    {new Date(event.date).toLocaleDateString()} at {event.time}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <MapPin size={14} className="text-gray-400" />
                                                    {event.venue}
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle}`}>
                                                    {statusText}
                                                </span>
                                            </td>

                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link to={`/event/${event._id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Public Page">
                                                        <ExternalLink size={18} />
                                                    </Link>
                                                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit Event">
                                                        <Edit size={18} />
                                                    </button>
                                                    
                                                    <button onClick={() => handleDelete(event._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Event">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Dashboard;