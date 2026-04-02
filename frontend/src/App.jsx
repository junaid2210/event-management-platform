import './App.css'
import Navbar from './components/navbar';
import {Routes, Route, useLocation} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import GuestRoute from './components/GuestRoute';
import Home from './pages/Home';
import Landing from './pages/Landing';
import EventDetails from './pages/EventDetails';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import CreateEvent from './pages/CreateEvent';
import ProtectedRoute from './components/common/ProtectedRoutes';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import AttendeesList from './pages/AttendeesList';
import EditEvent from './pages/EditEvent';


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
          <Route path="/event/:id" element={
                <ProtectedRoute>
                    <EventDetails />
                </ProtectedRoute>
            } />
          <Route path="/create-event" element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <CreateEvent />
                </ProtectedRoute>
            } />
          <Route path="/my-events" element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <Dashboard />
                </ProtectedRoute>
            } />
          <Route path="/dashboard/attendees/:id" element={
                <ProtectedRoute allowedRoles={['organizer']}>
                    <AttendeesList />
                </ProtectedRoute>
            } />
          <Route path="/edit-event/:id" element={
                <ProtectedRoute allowedRoles={['organizer']}>
                    <EditEvent />
                </ProtectedRoute>
            } />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
