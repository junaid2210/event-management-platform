import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useRedirectMessage = () => {
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.authError || null);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000);

            window.history.replaceState({}, document.title);

            return () => clearTimeout(timer);
        }
    }, [message]);

    return { message, setMessage };
}