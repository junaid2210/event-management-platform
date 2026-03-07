import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { eventService } from '../services/eventService'; // 👈 Import the service

export const useEvent = (id) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (!id) return;
        
        const fetchEvent = async () => {
            setLoading(true);
            try {
                // 👈 Use the service!
                const data = await eventService.getEventById(id);
                
                setEvent(data);
                if (data.isUserRegistered) {
                    setIsRegistered(true);
                }
            } catch (err) {
                if (err === 'Not authorized, not token' || err === 'Not authorized, token failed' || err === 'User not found') {
                    setError('auth_required'); 
                } else if (err === 'You are not authorized to view events from other colleges') {
                    setError('wrong_college');
                } else {
                    setError(err || 'Failed to load event details');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRegistration = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setIsRegistering(true);
        setRegisterError('');

        try {
            // 👈 Use the service!
            await eventService.registerForEvent(id);
            
            setIsRegistered(true);
        } catch (err) {
            setRegisterError(err || 'Failed to register. Please try again');
        } finally {
            setIsRegistering(false);
        }
    };

    return { event, loading, error, isRegistering, registerError, isRegistered, handleRegistration };
};