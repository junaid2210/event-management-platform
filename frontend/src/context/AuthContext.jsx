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
            {!loading ? children : /* The Upgraded Splash Screen */
                <div className="min-h-screen bg-white flex flex-col justify-center items-center">
                    <div className="relative flex flex-col items-center">
                        {/* The pulsing glow behind the logo */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500 rounded-full blur-2xl animate-pulse opacity-20"></div>
                        
                        {/* Your Logo (Make sure the image path matches what you have in your public folder) */}
                        <img 
                            src="/image (1).png" 
                            alt="EventSphere Logo" 
                            className="w-16 h-16 object-contain rounded-xl shadow-lg shadow-blue-100 animate-bounce" 
                        />
                        
                        {/* Brand Name */}
                        <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
                            Event<span className="text-blue-600">Sphere</span>
                        </h2>
                        
                        {/* Smooth loading bar */}
                        <div className="mt-6 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-blue-600 rounded-full animate-[shimmer_1.5s_infinite] origin-left"></div>
                        </div>
                    </div>
                </div>}
        </AuthContext.Provider>
    );
};