import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
            <div className="text-center space-y-6">
                <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">404</h1>
                <div className="bg-blue-100 px-2 text-sm rounded rotate-12 absolute -mt-20 ml-10">
                    Page Not Found
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mt-8">
                    Oops! You seem to be lost.
                </h2>
                <p className="text-gray-500 max-w-md mx-auto">
                    The event or page you are looking for doesn't exist or might have been removed.
                </p>

                <div className="mt-8">
                    <Link 
                        to="/" 
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-200"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;