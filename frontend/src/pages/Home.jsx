import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from '../api/axios';
import EventCard from "../components/EventCard";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      console.log("useEffect triggered. Current user state:", user);
        const fetchEvents = async () => {
            try {
            const response = await api.get('/events');
            console.log("Full Events Response:", response);
            setEvents(response.data.events || []);
        } catch(err){
            console.error('Error fetching events', err);
        } finally {
            setLoading(false);
        }
        };
        
        if(user?.collegeId) fetchEvents();
    }, [user]);

return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 py-16 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          What's happening at {user?.collegeId?.toUpperCase()}?
        </h1>
        <p className="text-blue-100 text-lg">
          Discover workshops, fests, and hackathons near you.
        </p>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
          <div className="flex gap-2">
             {/* Filter buttons could go here later */}
             <span className="text-sm text-gray-500">Showing events for {user?.collegeId}</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => <div key={n} className="h-80 bg-gray-200 animate-pulse rounded-2xl"></div>)}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <h3 className="text-xl font-medium text-gray-400">No events found for your college yet.</h3>
            {user?.role === 'organizer' && (
              <button className="mt-4 text-blue-600 font-bold">Host the first event!</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;