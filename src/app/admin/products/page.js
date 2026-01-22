'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/products');
            const data = await res.json();
            if (data.success) {
                setProducts(data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${tokenVal}`
                }
            });
            const data = await res.json();
            if (data.success) {
                fetchProducts();
            } else {
                alert('Failed to delete: ' + data.message);
            }
        } catch (err) {
            alert('Error deleting product');
        }
    };

    if (loading) return <div className="p-8">Loading products...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    + Add Product
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 font-semibold text-gray-600">Image</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Name</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Category</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Price</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Stock</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <img
                                        src={product.images[0] || '/placeholder.jpg'}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-medium">{product.name}</td>
                                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                <td className="px-6 py-4 text-gray-900">₹{product.price}</td>
                                <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                                <td className="px-6 py-4 space-x-3">
                                    <Link
                                        href={`/admin/products/${product._id}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-500 hover:text-red-700 font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <p className="text-center py-10 text-gray-500">No products found. Add one to get started.</p>
                )}
            </div>
        </div>
    );
}
