'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { User, MapPin, Package, Settings, LogOut, Save, Edit2 } from 'lucide-react';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [profileForm, setProfileForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        }
    });

    useEffect(() => {
        fetchUserData();
        fetchOrders();
    }, []);

    const fetchUserData = async () => {
        try {
            const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            if (!tokenVal) {
                router.push('/login');
                return;
            }

            const res = await fetch('http://localhost:5000/api/auth/me', {
                headers: { 'Authorization': `Bearer ${tokenVal}` }
            });
            const data = await res.json();
            if (data.success) {
                const userData = data.data;
                setUser(userData);
                setProfileForm({
                    name: userData.name || '',
                    email: userData.email || '',
                    phone: userData.phone || '',
                    address: userData.addresses?.[0] || {
                        street: '',
                        city: '',
                        state: '',
                        zipCode: '',
                        country: ''
                    }
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            const res = await fetch('http://localhost:5000/api/orders/myorders', {
                headers: { 'Authorization': `Bearer ${tokenVal}` }
            });
            const data = await res.json();
            if (data.success) {
                setOrders(data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        try {
            const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            const res = await fetch('http://localhost:5000/api/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenVal}`
                },
                body: JSON.stringify(profileForm)
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                setUser(data.data);
                setIsEditing(false);
            } else {
                setMessage({ type: 'error', text: data.message || 'Update failed' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Something went wrong' });
        }
    };

    const handleLogout = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    if (loading) return <Loader fullScreen />;

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar */}
                    <div className="w-full md:w-64 space-y-2">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                        >
                            <User size={20} /> Personal Info
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'orders' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                        >
                            <Package size={20} /> My Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'security' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                        >
                            <Settings size={20} /> Security
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition mt-4"
                        >
                            <LogOut size={20} /> Logout
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border p-6 md:p-8">

                        {message.text && (
                            <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="space-y-8">
                                <div className="flex justify-between items-center border-b pb-4">
                                    <h2 className="text-2xl font-bold">Personal Information</h2>
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                                    >
                                        {isEditing ? 'Cancel' : <><Edit2 size={16} /> Edit Info</>}
                                    </button>
                                </div>

                                <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            value={profileForm.name}
                                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 transition"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                                        <input
                                            type="email"
                                            disabled={!isEditing}
                                            value={profileForm.email}
                                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 transition"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                        <input
                                            type="tel"
                                            disabled={!isEditing}
                                            value={profileForm.phone}
                                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 transition"
                                        />
                                    </div>

                                    <div className="md:col-span-2 pt-4 border-t">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <MapPin size={20} /> Shipping Address
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Street Address</label>
                                                <input
                                                    type="text"
                                                    disabled={!isEditing}
                                                    value={profileForm.address.street}
                                                    onChange={(e) => setProfileForm({
                                                        ...profileForm,
                                                        address: { ...profileForm.address, street: e.target.value }
                                                    })}
                                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 transition"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">City</label>
                                                <input
                                                    type="text"
                                                    disabled={!isEditing}
                                                    value={profileForm.address.city}
                                                    onChange={(e) => setProfileForm({
                                                        ...profileForm,
                                                        address: { ...profileForm.address, city: e.target.value }
                                                    })}
                                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 transition"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">State / Province</label>
                                                <input
                                                    type="text"
                                                    disabled={!isEditing}
                                                    value={profileForm.address.state}
                                                    onChange={(e) => setProfileForm({
                                                        ...profileForm,
                                                        address: { ...profileForm.address, state: e.target.value }
                                                    })}
                                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 transition"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Zip / Postal Code</label>
                                                <input
                                                    type="text"
                                                    disabled={!isEditing}
                                                    value={profileForm.address.zipCode}
                                                    onChange={(e) => setProfileForm({
                                                        ...profileForm,
                                                        address: { ...profileForm.address, zipCode: e.target.value }
                                                    })}
                                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 transition"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Country</label>
                                                <input
                                                    type="text"
                                                    disabled={!isEditing}
                                                    value={profileForm.address.country}
                                                    onChange={(e) => setProfileForm({
                                                        ...profileForm,
                                                        address: { ...profileForm.address, country: e.target.value }
                                                    })}
                                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 transition"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="md:col-span-2 pt-6">
                                            <button
                                                type="submit"
                                                className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                                            >
                                                <Save size={20} /> Save Changes
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold border-b pb-4">My Order History</h2>

                                {orders.length === 0 ? (
                                    <div className="text-center py-20 text-gray-500">
                                        <Package size={48} className="mx-auto mb-4 opacity-20" />
                                        <p>You haven't placed any orders yet.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50 border-b">
                                                <tr>
                                                    <th className="px-4 py-3 text-sm font-semibold">Order ID</th>
                                                    <th className="px-4 py-3 text-sm font-semibold">Date</th>
                                                    <th className="px-4 py-3 text-sm font-semibold">Status</th>
                                                    <th className="px-4 py-3 text-sm font-semibold">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {orders.map(order => (
                                                    <tr key={order._id} className="hover:bg-gray-50">
                                                        <td className="px-4 py-4 text-sm font-mono text-gray-600">#{order._id.substring(18)}</td>
                                                        <td className="px-4 py-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                        <td className="px-4 py-4 text-sm">
                                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                                                        'bg-yellow-100 text-yellow-700'
                                                                }`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-bold">₹{order.totalPrice}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold border-b pb-4">Security Settings</h2>
                                <p className="text-gray-600 italic">Password change functionality coming soon...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
