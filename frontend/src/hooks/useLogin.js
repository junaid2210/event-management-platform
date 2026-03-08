import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // We rename the context function to 'setGlobalUser' here so it doesn't clash with our hook's 'login' function
    const { login: setGlobalUser } = useContext(AuthContext); 
    const navigate = useNavigate();

    const login = async (credentials) => {
        setLoading(true);
        setError('');
        
        try {
            const data = await authService.login(credentials);
            setGlobalUser(data); // Save to context
            navigate('/');       // Redirect to home
        } catch (err) {
            setError(err || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};