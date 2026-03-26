import { useState, useEffect } from 'react';
import { eventService } from '../services/eventService';

export const useOrganizerEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                setLoading(true);
                const response = await eventService.getOrganizerEvents();
                setEvents(response || []);
            } catch (err) {
                setError(err || 'Failed to fetch your dashboard data.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyEvents();
    }, []);

    return { events, setEvents, loading, error };
}