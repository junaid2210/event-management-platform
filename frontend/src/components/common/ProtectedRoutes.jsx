import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles}) => {
    const { user, loading } = useContext(AuthContext);

    if(loading) return null;

    // Unauthenticated users get kicked to Login with a message
    if(!user) {
        return <Navigate 
            to="/login"
            state={{authError: 'Please log in to access that page.'}} 
            replace />;
    }

    if(allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate 
            to="/" 
            state={{authError: 'Access Denied. Only Organizers can view that page.'}}
            replace />
    }

    return children;
};

export default ProtectedRoute;