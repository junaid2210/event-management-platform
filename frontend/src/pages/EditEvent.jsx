import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { ArrowLeft, Save, Image as ImageIcon, Pencil, Trash2 } from 'lucide-react'; 

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
    
    // States for handling the images
    const [imageFile, setImageFile] = useState(null); // For the new file object
    const [currentImage, setCurrentImage] = useState(''); // To display the existing Cloudinary URL
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const event = await eventService.getEventById(id);
                
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
                
                // Save the existing image URL to state so we can show a preview
                if (event.image) {
                    setCurrentImage(event.image);
                }

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

    const handleImageChange = (e) => {
        e.preventDefault();
        if (e.target && e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        const submitData = new FormData();
        
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });

        // Only append the image if the user actually selected a NEW one
        if (imageFile) {
            submitData.append('image', imageFile);
        }

        try {
            // Pass the FormData object to your custom service
            await eventService.updateEvent(id, submitData); 
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
                
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link to="/my-events" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-4 font-medium">
                            <ArrowLeft size={20} />
                            Cancel Editing
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
                        <p className="text-gray-500 mt-1">Update your event details below.</p>
                    </div>
                    {/* 👇 Optional: An extra visual indicator if the event is live or draft */}
                    <div className={`px-4 py-2 rounded-full text-xs font-bold ${formData.isPublished ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {formData.isPublished ? "Live on Campus" : "Saved as Draft"}
                    </div>
                </div>

                {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* 👇 CRITICAL UPGRADE: The Professional 21:9 Aspect Ratio Banner Component */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Event Banner</label>
                        
                        <div className="relative group rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 aspect-[21/9] overflow-hidden hover:border-blue-400 transition-colors">
                            
                            {/* State 1: Displaying Existing Cloudinary Image (If no new file selected) */}
                            {currentImage && !imageFile && (
                                <img 
                                    src={currentImage} 
                                    alt="Current Event Banner" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                            )}

                            {/* State 2: Default "Upload New" Placeholder (If creating new or existing has no image) */}
                            {(!currentImage && !imageFile) && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 space-y-2">
                                    <ImageIcon className="h-16 w-16" strokeWidth={1}/>
                                </div>
                            )}

                            {/* Overlay Prompt: Appears on hover, encouraging the user to click the container */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                                <ImageIcon className="h-10 w-10 mb-2" />
                                <span className="font-bold">
                                    {currentImage ? "Change Banner Image" : "Upload Banner Image"}
                                
                                </span>
                                <span className="text-xs text-white/70">PNG, JPG, WEBP (Max 5MB)</span>
                            </div>

                            {/* State 3: User Selected a new file (Feedback text) */}
                            {imageFile && (
                                <div className="absolute top-2 right-2 bg-green-50 text-green-700 font-semibold px-4 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-md">
                                    <Trash2 size={14} className="cursor-pointer" onClick={() => setImageFile(null)}/> {imageFile.name}
                                </div>
                            )}
                            
                            {/* The Invisible Native File Input (Now covering the whole container) */}
                            <input 
                                id="file-upload" 
                                name="file-upload" 
                                type="file" 
                                className="absolute inset-0 opacity-0 cursor-pointer" // Overlays the entire component
                                accept="image/png, image/jpeg, image/webp"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all shadow-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows="5" className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all shadow-sm resize-none"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                            <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all shadow-sm" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Venue</label>
                            <input type="text" name="venue" value={formData.venue} onChange={handleChange} required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
                            <input type="number" min="1" name="capacity" value={formData.capacity} onChange={handleChange} required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all shadow-sm" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-200 mt-4">
                        <div>
                            <p className="font-bold text-gray-900">Publish Event Immediately</p>
                            <p className="text-sm text-gray-500 max-w-sm">When drafted, events are hidden from the student feed until you are ready to launch.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                            <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="sr-only peer" />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <button type="submit" disabled={saving} className="w-full flex justify-center items-center gap-2.5 bg-blue-600 text-white p-5 rounded-2xl font-bold hover:bg-blue-700 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed shadow-xl shadow-blue-100">
                            {saving ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <><Save size={20} /> Update Campus Event</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;