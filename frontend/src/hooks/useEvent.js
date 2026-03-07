import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export const useEvent = (id) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // State
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    // Fetch Event Logic
    useEffect(() => {
        if (!id) return;
        
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/events/${id}`);
                setEvent(response.data);
                if (response.data.isUserRegistered) {
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

    // Registration Logic
    const handleRegistration = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setIsRegistering(true);
        setRegisterError('');

        try {
            await api.post(`/events/${id}/register`);
            setIsRegistered(true);
        } catch (err) {
            setRegisterError(err || 'Failed to register. Please try again');
        } finally {
            setIsRegistering(false);
        }
    };

    return { 
        event, 
        loading, 
        error, 
        isRegistering, 
        registerError, 
        isRegistered, 
        handleRegistration 
    };
};