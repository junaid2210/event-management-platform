import { useState } from 'react';
import { useCreateEvent } from '../hooks/useCreateEvent';
import InputField from '../components/common/InputField';
import { Calendar, Clock, MapPin, Users, Image as ImageIcon } from 'lucide-react';

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

    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name] : type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (e) => {
        // 1. Prevent default behavior just in case
        e.preventDefault(); 

        // 2. Safety check: Does e.target and e.target.files exist?
        if (e.target && e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImageFile(file);
        } else {
            console.log("Something triggered handleImageChange, but no files were found.", e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitData = new FormData();

        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });

        // Append the image file if the user selected one
        // The name 'image' MUST match upload.single('image') in your backend router
        if (imageFile) {
            submitData.append('image', imageFile); 
        }

        // Pass the FormData object to your custom hook instead of standard JSON
        await createEvent(submitData);
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

                        {/* 👇 4. The Image Upload UI */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Banner Image</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors bg-gray-50">
                                <div className="space-y-1 text-center">
                                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600 justify-center">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2">
                                            <span>Upload a file</span>
                                            <input 
                                                id="file-upload" 
                                                name="file-upload" 
                                                type="file" 
                                                className="sr-only" 
                                                accept="image/png, image/jpeg, image/webp"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {imageFile ? <span className="font-bold text-green-600">{imageFile.name} selected</span> : "PNG, JPG, WEBP up to 5MB"}
                                    </p>
                                </div>
                            </div>
                        </div>

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

