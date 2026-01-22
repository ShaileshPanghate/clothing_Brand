'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check auth
        // const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        // if (!token) {
        //   router.push('/admin/login');
        //   return;
        // }

        async function fetchStats() {
            try {
                // Need to pass token in headers
                const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

                const res = await fetch('http://localhost:5000/api/admin/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${tokenVal}`
                    }
                });
                const data = await res.json();
                if (data.success) {
                    setStats(data.data);
                } else {
                    // If unauthorized, redirect
                    if (res.status === 401) router.push('/admin/login');
                }
            } catch (err) {
                console.error(err);
            }
        }

        fetchStats();
    }, [router]);

    if (!stats) return <div className="text-center p-10">Loading Dashboard...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Revenue</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Orders</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Users</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Products</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</p>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 font-medium text-sm">
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stats.recentOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">#{order._id.substring(20, 24)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{order.user?.name || 'Guest'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{order.totalPrice}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full ${order.status === 'delivered'
                                                    ? 'bg-green-100 text-green-700'
                                                    : order.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {stats.recentOrders.length === 0 && (
                        <p className="text-center py-6 text-gray-500">No recent orders found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
