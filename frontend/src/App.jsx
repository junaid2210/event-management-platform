import './App.css'
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';

const TempLogin = () => <div className="p-10">Login Page coming soon...</div>;
const TempRegister = () => <div className="p-10">Register Page coming soon...</div>;
const TempHome = () => <div className="p-10">Welcome to JECRC Events!</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<TempHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<TempRegister />} />
    </Routes>
  );
}

export default App
