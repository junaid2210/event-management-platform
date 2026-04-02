import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { ArrowLeft, Mail, UserCircle } from 'lucide-react';

const AttendeesList = () => {
    const { id } = useParams();
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAttendees = async () => {
            try {
                const response = await eventService.getEventAttendees(id);
                setAttendees(response || []);
            } catch (err) {
                setError(err || 'Failed to load attendees');
            } finally {
                setLoading(false);
            }
        };
        fetchAttendees();
    }, [id]);

    if (loading) return <div className="min-h-screen flex justify-center items-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                
                {/* Header */}
                <div className="mb-8">
                    <Link to="/my-events" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-4 font-medium">
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Guest List</h1>
                    <p className="text-gray-500 mt-1">Total Registered: <span className="font-bold text-blue-600">{attendees.length}</span></p>
                </div>

                {/* Table Content */}
                {error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">{error}</div>
                ) : attendees.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                        <UserCircle size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Registrations Yet</h3>
                        <p className="text-gray-500">When students register for this event, they will appear here.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                                    <th className="p-4 font-semibold">Student Name</th>
                                    <th className="p-4 font-semibold">College ID</th>
                                    <th className="p-4 font-semibold">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendees.map((reg) => (
                                    <tr key={reg._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                                    {reg.userId?.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-bold text-gray-900">{reg.userId?.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-gray-600">{reg.userId?.collegeId}</td>
                                        <td className="p-4 text-gray-500">
                                            <a href={`mailto:${reg.userId?.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                                <Mail size={16} />
                                                {reg.userId?.email}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttendeesList;