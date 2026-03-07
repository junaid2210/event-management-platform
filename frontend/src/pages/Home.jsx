import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEvents } from "../hooks/useEvents";
import { useSearchParams } from "react-router-dom";

// Import our new UI components
import HomeHero from "../components/Home/HomeHero";
import EventsGrid from "../components/Home/EventsGrid";

const Home = () => {
    const { user } = useContext(AuthContext);

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;
    const isPast = searchParams.get('past') === 'true';
    
    // Abstracted logic!
    const queryParams = {
        ...(searchQuery && { search: searchQuery }), // Only add search if it exists
        page: Number(page),                          // Ensure it's a number, not a string
        limit: Number(limit),
        past: isPast
    };
    const { events, loading, error } = useEvents(queryParams);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* UI Component 1 */}
            <HomeHero collegeId={user?.collegeId} />

            <div className="max-w-7xl mx-auto px-6 py-12">
                
                {/* Header Row */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
                    <div className="flex gap-2">
                        {/* Perfect spot to drop a <SearchBar /> component later! */}
                        <span className="text-sm text-gray-500">
                            Showing events for {user?.collegeId || 'your campus'}
                        </span>
                    </div>
                </div>

                {/* Main Content Area */}
                {error ? (
                    <div className="text-center py-10 bg-red-50 rounded-2xl text-red-500 font-semibold border border-red-100">
                        {error}
                    </div>
                ) : (
                    /* UI Component 2 */
                    <EventsGrid 
                        events={events} 
                        loading={loading} 
                        role={user?.role} 
                    />
                )}
                
            </div>
        </div>
    );
};

export default Home;