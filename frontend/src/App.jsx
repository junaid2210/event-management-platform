import './App.css'
import Navbar from './components/navbar';
import {Routes, Route, useLocation} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import GuestRoute from './components/GuestRoute';
import Home from './pages/Home';
import Landing from './pages/Landing';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


function App() {
  const { user, loading } = useContext(AuthContext);
  
  const location = useLocation();

  if (loading) return <div className="h-screen flex items-center justify-center">Loading EventSphere...</div>;

  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isLandingPage = location.pathname === '/' && !user;
  
  const showNavbar = !isAuthPage && !isLandingPage;

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar/>}
      <main>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Landing />} />
          <Route path="/login" element={
            <GuestRoute>
              <Login />
            </GuestRoute>
            } />
          <Route path="/register" element={
            <GuestRoute>
              <Register />
            </GuestRoute>
            } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
