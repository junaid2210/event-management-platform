import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export const useEvents = (queryParams = {}) => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Don't attempt to fetch if the user context hasn't loaded their collegeId yet
        if (!user?.collegeId) {
            setLoading(false);
            return;
        }

        const fetchEvents = async () => {
            setLoading(true);
            try {
                // We pass queryParams so we can easily add ?search=xyz later!
                const response = await api.get('/events', { params: queryParams });
                
                // Assuming your ApiResponse wraps the array in a 'data.events' object
                setEvents(response.data?.events || []); 
            } catch (err) {
                const errorMessage = typeof err === 'string' ? err : 'Failed to load events';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        
        fetchEvents();
    }, [user?.collegeId, JSON.stringify(queryParams)]); // Reruns if the user logs in/out

    return { events, loading, error };
};