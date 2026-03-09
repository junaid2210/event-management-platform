import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEvents } from "../hooks/useEvents";
import { useSearchParams } from "react-router-dom";

// Import our new UI components
import HomeHero from "../components/home/HomeHero";
import EventsGrid from "../components/home/EventsGrid";
import SearchBar from "../components/home/SearchBar";
import Pagination from "../components/home/Pagination";
import PastEventsToggle from "../components/home/PastEventToggle";

const Home = () => {
    const { user } = useContext(AuthContext);

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const currentPage = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const isPast = searchParams.get('past') === 'true';
    
    // Abstracted logic!
    const queryParams = {
        ...(searchQuery && { search: searchQuery }), // Only add search if it exists
        page: currentPage,                          // Ensure it's a number, not a string
        limit: limit,
        past: isPast
    };
    const { events, loading, error } = useEvents(queryParams);

    const hasMore = events.length === 10;

return (
        <div className="min-h-screen bg-gray-50">
            {/* UI Component 1 */}
            <HomeHero collegeId={user?.collegeId} />

            <div className="max-w-7xl mx-auto px-6 py-12">
                
                {/* Header Row - FIXED FLEXBOX */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    
                    {/* LEFT SIDE: Titles & Subtitles */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {searchQuery 
                                ? `Results for "${searchQuery}"` 
                                : isPast 
                                    ? "Past Events" 
                                    : "Upcoming Events"
                            }
                        </h2>
                        <span className="text-sm text-gray-500 block mt-1">
                            Showing events for {user?.collegeId || 'your campus'}
                        </span>
                    </div>

                    {/* RIGHT SIDE: Search and Filters */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <PastEventsToggle />
                        <SearchBar />
                    </div>
                </div>

                {/* Main Content Area */}
                {error ? (
                    <div className="text-center py-10 bg-red-50 rounded-2xl text-red-500 font-semibold border border-red-100">
                        {error}
                    </div>
                ) : (
                    /* UI Component 2 */
                    <>
                        <EventsGrid 
                            events={events} 
                            loading={loading} 
                            role={user?.role} 
                        />

                        {/* FIXED CASE SENSITIVITY: currentpage -> currentPage */}
                        {!loading && (events.length > 0 || currentPage > 1) && (
                            <Pagination currentPage={currentPage} hasMore={hasMore} />
                        )}
                    </>
                )}
                
            </div>
        </div>
    );
};

export default Home;