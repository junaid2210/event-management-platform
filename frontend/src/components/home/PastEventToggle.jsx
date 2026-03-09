import { useSearchParams } from 'react-router-dom';

const PastEventsToggle = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Check if the URL currently has ?past=true
    const isPast = searchParams.get('past') === 'true';

    const handleToggle = () => {
        if (isPast) {
            // If it's already true, turning it off means deleting the parameter
            searchParams.delete('past');
        } else {
            // If it's false, turn it on!
            searchParams.set('past', 'true');
        }
        
        // Always reset to page 1 when changing filters!
        searchParams.delete('page');
        
        setSearchParams(searchParams);
    };

    return (
        <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="relative">
                <input 
                    type="checkbox" 
                    className="sr-only" // Hides the default ugly checkbox
                    checked={isPast}
                    onChange={handleToggle}
                />
                {/* The visual toggle track */}
                <div className={`block w-10 h-6 rounded-full transition-colors ${isPast ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                {/* The visual toggle dot */}
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isPast ? 'translate-x-4' : ''}`}></div>
            </div>
            <span className="text-sm font-semibold text-gray-700 select-none">
                Show Past Events
            </span>
        </label>
    );
};

export default PastEventsToggle;