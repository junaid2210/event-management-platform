import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [existingColleges, setExistingColleges] = useState([]);
    
    const { login: setGlobalUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Fetch colleges on load
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const data = await authService.getColleges();
                setExistingColleges(data || []);
            } catch (err) {
                console.error("Failed to load colleges");
            }
        };
        fetchColleges();
    }, []);

    const register = async (formData) => {
        setLoading(true);
        setError('');

        try {
            // 1. Register the user
            await authService.register(formData);

            // 2. Immediately login to get the cookie/token
            const loginData = await authService.login({
                email: formData.email,
                password: formData.password
            });

            setGlobalUser(loginData);
            navigate('/'); // Redirect to Home
        } catch (err) {
            setError(err || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error, existingColleges };
};