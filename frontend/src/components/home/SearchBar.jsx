import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Initialize the input with whatever is already in the URL
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent page reload
        
        if (searchTerm.trim()) {
            searchParams.set('search', searchTerm.trim());
        } else {
            searchParams.delete('search'); // Clear it if they search for an empty string
        }
        
        // Always reset to page 1 when doing a fresh search!
        searchParams.delete('page'); 
        
        setSearchParams(searchParams); // This actually updates the browser URL
    };

    return (
        <form onSubmit={handleSearch} className="flex w-full md:w-auto">
            <div className="relative w-full md:w-80 shadow-sm rounded-xl">
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-12 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                <button 
                    type="submit" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label="Search"
                >
                    <Search size={20} />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;