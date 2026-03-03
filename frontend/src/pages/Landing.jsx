import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <nav className="flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-2">
          <img src="/image (1).png" alt="Logo" className="w-11 h-10 rounded-lg" />
          <span className="text-2xl font-bold text-blue-600">EventSphere</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2 text-gray-600 font-semibold">Login</Link>
          <Link to="/register" className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            Join Now
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-10 py-20 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
            Connecting Campus <br /> 
            <span className="text-blue-600">Through Events.</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            The ultimate platform for College students to discover workshops, 
            hackathons, and cultural fests. Stay updated, get certified, and grow your network.
          </p>
          <div className="flex gap-4">
            <Link to="/register" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform">
              Get Started for Free
            </Link>
          </div>
        </div>
        
        <div className="lg:w-1/2 bg-blue-50 rounded-[40px] p-8">
           {/* You can put a nice illustration or screenshot of your app cards here */}
           <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-3">
              <div className="h-40 bg-blue-100 rounded-xl mb-4 animate-pulse"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;