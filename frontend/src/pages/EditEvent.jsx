import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { ArrowLeft, Save } from 'lucide-react';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        capacity: '',
        isPublished: true 
    });
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await eventService.getEventById(id);
                const event = response; 
                
                const formattedDate = new Date(event.date).toISOString().split('T')[0];

                setFormData({
                    title: event.title,
                    description: event.description,
                    date: formattedDate,
                    time: event.time,
                    venue: event.venue,
                    capacity: event.capacity,
                    isPublished: event.isPublished 
                });
            } catch (err) {
                setError(err || 'Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            await eventService.updateEvent(id, formData);
            navigate('/my-events'); 
        } catch (err) {
            setError(err || 'Failed to update event. Please try again.');
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex justify-center items-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                
                <div className="mb-8">
                    <Link to="/my-events" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-4 font-medium">
                        <ArrowLeft size={20} />
                        Cancel Editing
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
                    <p className="text-gray-500 mt-1">Update your event details below.</p>
                </div>

                {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                            <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Venue</label>
                            <input type="text" name="venue" value={formData.venue} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
                            <input type="number" min="1" name="capacity" value={formData.capacity} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
                        </div>
                    </div>

                    {/* 👈 4. The Publish Toggle Switch */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 mt-4">
                        <div>
                            <p className="font-bold text-gray-900">Publish Event</p>
                            <p className="text-sm text-gray-500">Unpublish to hide this event from students and save as a draft.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={saving} className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed shadow-lg shadow-blue-200">
                            {saving ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <><Save size={20} /> Save Changes</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;