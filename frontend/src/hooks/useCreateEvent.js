import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../services/eventService';

export const useCreateEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const createEvent = async (eventData) => {
        setLoading(true);
        setError('');

        try{
            const newEvent = await eventService.createEvent(eventData);
            navigate('/');

            return {success: true, data: newEvent};

        } catch(err) {
            setError(err || 'Failed to create event. Please try again.');
            return {success: false};

        } finally {
            setLoading(false);
        }
    };

    return { createEvent, loading, error};
};