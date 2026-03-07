import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const EventInfoGrid = ({ event }) => {
    return (
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
    );
};

export default EventInfoGrid;