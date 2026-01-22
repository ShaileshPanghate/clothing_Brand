'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
                const res = await fetch('http://localhost:5000/api/orders', {
                    headers: {
                        'Authorization': `Bearer ${tokenVal}`
                    }
                });
                const data = await res.json();
                if (data.success) {
                    setOrders(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    if (loading) return <div className="p-8">Loading orders...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 font-semibold text-gray-600">Order ID</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">User</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Date</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Total</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Payment</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {order._id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {order.user?.name || order.shippingAddress.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    ₹{order.totalPrice}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 uppercase">
                                    {order.paymentMethod}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 text-xs rounded-full ${order.status === 'delivered'
                                                ? 'bg-green-100 text-green-700'
                                                : order.status === 'cancelled'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <Link
                                        href={`/admin/orders/${order._id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <p className="text-center py-10 text-gray-500">No orders found.</p>
                )}
            </div>
        </div>
    );
}
