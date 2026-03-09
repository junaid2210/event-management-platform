import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, hasMore }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (newPage) => {
        searchParams.set('page', newPage);
        
        setSearchParams(searchParams);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex justify-center items-center gap-4 mt-12">
            
            {/* PREVIOUS BUTTON */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1} // Disable if we are on the very first page
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
                    ${currentPage === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 shadow-sm'
                    }`}
            >
                <ChevronLeft size={20} />
                Previous
            </button>

            {/* CURRENT PAGE INDICATOR */}
            <span className="text-gray-600 font-medium">
                Page <span className="font-bold text-gray-900">{currentPage}</span>
            </span>

            {/* NEXT BUTTON */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasMore} // Disable if the backend didn't give us a full 10 items
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
                    ${!hasMore 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 shadow-sm'
                    }`}
            >
                Next
                <ChevronRight size={20} />
            </button>
            
        </div>
    );
};

export default Pagination;