import EventCard from '../EventCard'; 

const EventsGrid = ({ events, loading, role }) => {
    // 1. Loading State
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(n => (
                    <div key={n} className="h-80 bg-gray-200 animate-pulse rounded-2xl"></div>
                ))}
            </div>
        );
    }

    // 2. Empty State
    if (events.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <h3 className="text-xl font-medium text-gray-400">No events found for your college yet.</h3>
                {role === 'organizer' && (
                    <button className="mt-4 text-blue-600 font-bold hover:underline">Host the first event!</button>
                )}
            </div>
        );
    }

    // 3. Success State
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
                <EventCard key={event._id} event={event} />
            ))}
        </div>
    );
};

export default EventsGrid;