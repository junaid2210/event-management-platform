import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try{
                const Response = await api.get('/auth/me');
                setUser(Response.data);
            } catch(err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkLoggedIn();
    },[]);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{user, setUser, login, logout, loading}}>
            {!loading ? children : <div className="p-10">Loading session...</div>}
        </AuthContext.Provider>
    )
}