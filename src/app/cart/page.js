'use client';

import { useState } from 'react';
import CartItem from '../components/CartItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import { Link } from 'lucide-react';
import Link from "next/link";

const initialCart = [
    {
        id: 1,
        name: 'Cotton Oversized T-Shirt',
        price: 799,
        quantity: 1,
        size: 'L',
        image: '/tshirt.jpg',
    },
    {
        id: 2,
        name: 'Denim Jacket',
        price: 2499,
        quantity: 1,
        size: 'M',
        image: '/jacket.jpg',
    },
];

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCart);

    const updateQuantity = (id, qty) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: qty } : item
            )
        );
    };

    const removeItem = id => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className='pt-16'>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-16">
                <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    updateQuantity={updateQuantity}
                                    removeItem={removeItem}
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
