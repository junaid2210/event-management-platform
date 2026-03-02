import './App.css'
import Navbar from './components/navbar';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';

const TempRegister = () => <div className="p-10">Register Page coming soon...</div>;
const TempHome = () => <div className="p-10">Welcome to JECRC Events!</div>;

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<TempHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<TempRegister />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
