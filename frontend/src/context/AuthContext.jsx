import { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                // Use the service!
                const data = await authService.getMe();
                setUser(data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkLoggedIn();
    }, []);

    const login = (userData) => setUser(userData);
    
    const logout = async () => {
        try {
            // Use the service!
            await authService.logout();
        } catch (err) {
            console.error('Logout Failed', err);
        } finally {
            setUser(null);
        }  
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {!loading ? children : <div className="p-10 flex justify-center items-center h-screen font-bold text-gray-500">Loading session...</div>}
        </AuthContext.Provider>
    );
};