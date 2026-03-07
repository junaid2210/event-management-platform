import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { eventService } from '../services/eventService'; // 👈 Import the service

export const useEvents = (queryParams = {}) => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const queryParamsString = JSON.stringify(queryParams);

    useEffect(() => {
        if (!user?.collegeId) {
            setLoading(false);
            return;
        }

        const fetchEvents = async () => {
            setLoading(true);
            try {
                const parsedParams = JSON.parse(queryParamsString);
                
                // 👈 Use the service instead of Axios!
                const data = await eventService.getAllEvents(parsedParams); 
                
                setEvents(data.events || []); 
            } catch (err) {
                const errorMessage = typeof err === 'string' ? err : 'Failed to load events';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        
        fetchEvents();
    }, [user?.collegeId, queryParamsString]); 

    return { events, loading, error };
};