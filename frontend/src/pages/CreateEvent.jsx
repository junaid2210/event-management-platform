import { useState } from 'react';
import { useCreateEvent } from '../hooks/useCreateEvent';
import InputField from '../components/common/InputField';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const CreateEvent = () => {
    const { createEvent, loading, error} = useCreateEvent();

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        venue: '',
        capacity: '',
        description: '',
        isPublished: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name] : type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createEvent(formData);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
                    <p className="text-gray-500 mt-2">Fill in the details to publish a new event to your college campus.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 font-medium">
                                {error}
                            </div>
                        )}

                        {/* Title */}
                        <InputField 
                            label="Event Title" 
                            name="title" 
                            placeholder="e.g., Web Backend Hackathon" 
                            value={formData.title} 
                            onChange={handleChange} 
                        />

                        {/* Grid for Date & Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField 
                                label="Date" 
                                name="date" 
                                type="date" 
                                value={formData.date} 
                                onChange={handleChange} 
                            />
                            <InputField 
                                label="Time" 
                                name="time" 
                                type="time" 
                                value={formData.time} 
                                onChange={handleChange} 
                            />
                        </div>

                        {/* Grid for Venue & Capacity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField 
                                label="Venue" 
                                name="venue" 
                                placeholder="e.g., Main Auditorium" 
                                value={formData.venue} 
                                onChange={handleChange} 
                            />
                            <InputField 
                                label="Capacity" 
                                name="capacity" 
                                type="number" 
                                min="1"
                                placeholder="e.g., 150" 
                                value={formData.capacity} 
                                onChange={handleChange} 
                            />
                        </div>

                        {/* Description (Textarea doesn't fit standard InputField, so we write it here) */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                required
                                rows="4"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                                placeholder="Describe the event details, rules, and what students will learn..."
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        {/* Publish Toggle */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">Publish Immediately</h3>
                                <p className="text-xs text-gray-500 mt-1">If turned off, this will be saved as a draft.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="isPublished"
                                    className="sr-only peer" 
                                    checked={formData.isPublished}
                                    onChange={handleChange}
                                />
                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 disabled:bg-blue-400"
                            >
                                {loading ? 'Creating Event...' : 'Create Event'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;

