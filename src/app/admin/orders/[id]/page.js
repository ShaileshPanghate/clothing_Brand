'use client';
import { useEffect, useState, use } from 'react';

export default function OrderDetailsPage({ params }) {
    const { id } = use(params);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrder() {
            try {
                const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
                const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${tokenVal}`
                    }
                });
                const data = await res.json();
                if (data.success) {
                    setOrder(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchOrder();
    }, [id]);

    const updateStatus = async (status) => {
        try {
            const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenVal}`
                },
                body: JSON.stringify({ status })
            });
            const data = await res.json();
            if (data.success) {
                setOrder(data.data);
                alert('Order updated!');
            }
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (!order) return <div className="p-8">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Order #{order._id}</h1>
                <div className="space-x-2">
                    <button
                        onClick={() => updateStatus('shipped')}
                        disabled={order.status === 'shipped' || order.status === 'delivered'}
                        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-50"
                    >
                        Mark Shipped
                    </button>
                    <button
                        onClick={() => updateStatus('delivered')}
                        disabled={order.status === 'delivered'}
                        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 disabled:opacity-50"
                    >
                        Mark Delivered
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    {/* Items */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-lg mb-4">Order Items</h3>
                        <div className="space-y-4">
                            {order.items.map(item => (
                                <div key={item._id} className="flex gap-4 border-b pb-4 last:border-0">
                                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                        {item.image && <img src={item.image} className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium">{item.name}</h4>
                                        <p className="text-sm text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                                    </div>
                                    <div className="font-medium">
                                        ₹{item.price * item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-lg mb-4">Shipping Address</h3>
                        <p className="font-medium">{order.shippingAddress.name}</p>
                        <p className="text-gray-600">{order.shippingAddress.address}</p>
                        <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                        <p className="text-gray-600 mt-2">Email: {order.shippingAddress.email}</p>
                        <p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
                    </div>
                </div>

                <div className="col-span-1 space-y-6">
                    {/* Summary */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-lg mb-4">Summary</h3>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>Subtotal</span>
                            <span>₹{order.itemsPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>Shipping</span>
                            <span>₹{order.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>Tax</span>
                            <span>₹{order.taxPrice}</span>
                        </div>
                        <hr className="my-3" />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{order.totalPrice}</span>
                        </div>
                    </div>

                    {/* Status Card */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-lg mb-4">Status</h3>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                            <p className="font-medium uppercase">{order.paymentMethod}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                            <span className={`px-2 py-1 text-xs rounded ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {order.isPaid ? 'PAID' : 'PENDING'}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Delivery Status</p>
                            <span className={`px-2 py-1 text-xs rounded ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {order.status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
