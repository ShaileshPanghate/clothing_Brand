'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CheckoutPage() {
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

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Checkout Data:', form);
        // 👉 Razorpay / Backend integration goes here
    };

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
                            <span>₹3,298</span>
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
                            <span>₹3,298</span>
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
