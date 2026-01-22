'use client';

import { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import { Link } from 'lucide-react';
import Link from "next/link";

import Loader from '../components/Loader';

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            if (!tokenVal) {
                // Handle guest cart later if needed, for now just empty
                setLoading(false);
                return;
            }

            const res = await fetch('http://localhost:5000/api/cart', {
                headers: { 'Authorization': `Bearer ${tokenVal}` }
            });
            const data = await res.json();
            if (data.success && data.data) {
                const items = data.data.items.map(item => ({
                    id: item._id, // cart item id
                    productId: item.product._id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    size: item.size,
                    image: item.product.images[0] || '/placeholder.jpg'
                }));
                setCartItems(items);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (id, qty) => {
        try {
            const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            await fetch('http://localhost:5000/api/cart/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenVal}`
                },
                body: JSON.stringify({ itemId: id, quantity: qty })
            });
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    const removeItem = async (id) => {
        try {
            const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            await fetch(`http://localhost:5000/api/cart/remove/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${tokenVal}` }
            });
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (loading) return <Loader fullScreen />;

    return (
        <div className='pt-16'>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-16">
                <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500 mb-4">Your cart is empty.</p>
                        <Link href="/products" className="text-blue-600 hover:underline">Continue Shopping</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={{ ...item, id: item.productId }} // Pass productId as id for Link
                                    cartItemId={item.id} // Pass actual cart item id for updates
                                    updateQuantity={(pid, qty) => updateQuantity(item.id, qty)}
                                    removeItem={(pid) => removeItem(item.id)}
                                />
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gray-50 p-6 rounded-lg h-fit">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>

                            <hr className="my-4" />

                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <Link href="/checkout" >
                                <button className='w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-900 transition'>
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
