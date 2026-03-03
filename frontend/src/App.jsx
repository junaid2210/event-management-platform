import './App.css'
import Navbar from './components/navbar';
import {Routes, Route, useLocation} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import GuestRoute from './components/GuestRoute';

const TempHome = () => <div className="p-10">Welcome to JECRC Events!</div>;

function App() {
  const location = useLocation();

  const authPaths = ['/login','/register'];
  const showNavbar = !authPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar/>}
      <main>
        <Routes>
          <Route path="/" element={<TempHome />} />
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
