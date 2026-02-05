'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Loader from '../components/Loader';

export default function CheckoutPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        paymentMethod: 'online',
    });

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            if (!tokenVal) {
                router.push('/login');
                return;
            }

            const res = await fetch('http://localhost:5000/api/cart', {
                headers: { 'Authorization': `Bearer ${tokenVal}` }
            });
            const data = await res.json();
            if (data.success && data.data) {
                const items = data.data.items.map(item => ({
                    product: item.product._id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color,
                    image: item.product.images[0]
                }));
                setCartItems(items);

                const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
                setSubtotal(total);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

            const orderData = {
                orderItems: cartItems,
                shippingAddress: {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    address: form.address,
                    city: form.city,
                    state: form.state,
                    pincode: form.pincode
                },
                paymentMethod: form.paymentMethod,
                itemsPrice: subtotal,
                shippingPrice: 0,
                taxPrice: 0,
                totalPrice: subtotal
            };

            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenVal}`
                },
                body: JSON.stringify(orderData)
            });

            const data = await res.json();
            if (data.success) {
                alert('Order Placed Successfully!');
                // Optionally clear cart or redirect to success page
                router.push('/products');
            } else {
                alert('Failed to place order: ' + data.message);
            }
        } catch (err) {
            alert('Something went wrong');
        }
    };

    if (loading) return <Loader fullScreen />;

    return (
        <div className='pt-10'>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-16">
                <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Shipping Details */}
                    <div className="lg:col-span-2 bg-white border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-6">Shipping Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                required
                                onChange={handleChange}
                                className="input"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                onChange={handleChange}
                                className="input"
                            />

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                required
                                onChange={handleChange}
                                className="input"
                            />

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                required
                                onChange={handleChange}
                                className="input"
                            />

                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                required
                                onChange={handleChange}
                                className="input"
                            />

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                required
                                onChange={handleChange}
                                className="input"
                            />
                        </div>

                        <textarea
                            name="address"
                            placeholder="Full Address"
                            required
                            rows={4}
                            onChange={handleChange}
                            className="input mt-4"
                        />

                        {/* Payment Method */}
                        <div className="mt-6">
                            <h3 className="font-medium mb-3">Payment Method</h3>

                            <label className="flex items-center gap-2 mb-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="online"
                                    checked={form.paymentMethod === 'online'}
                                    onChange={handleChange}
                                />
                                Online Payment (UPI / Card / Netbanking)
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    onChange={handleChange}
                                />
                                Cash on Delivery (COD)
                            </label>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 border rounded-lg p-6 h-fit">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>

                        <div className="flex justify-between mb-2">
                            <span>GST</span>
                            <span>Included</span>
                        </div>

                        <hr className="my-4" />

                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
