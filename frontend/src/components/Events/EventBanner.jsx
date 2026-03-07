const EventBanner = ({ event }) => {
    return (
        <div className="relative h-64 md:h-80 w-full bg-gray-200">
            {event.image ? (
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-white/20 font-bold text-4xl uppercase tracking-widest">
                        {event.title.substring(0, 2)}
                    </span>
                </div>
            )}
            
            {!event.isPublished && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Draft Mode
                </div>
            )}
        </div>
    );
};

export default EventBanner;