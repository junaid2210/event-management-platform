const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Event Image Placeholder */}
      <div className="h-48 bg-blue-100 relative">
        <img 
          src={event.image || 'https://placehold.co/600x400?text=Image'} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600">
          {event.category || 'Workshop'}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
          {event.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="text-sm">
            <p className="font-semibold text-gray-700">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-400">{event.location}</p>
          </div>
          <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-600 hover:text-white transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;