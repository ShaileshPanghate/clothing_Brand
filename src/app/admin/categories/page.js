'use client';
import { useEffect, useState } from 'react';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCatName, setNewCatName] = useState('');

    const fetchCategories = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/categories');
            const data = await res.json();
            if (data.success) {
                setCategories(data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newCatName) return;

        try {
            const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            const res = await fetch('http://localhost:5000/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenVal}`
                },
                body: JSON.stringify({ name: newCatName })
            });
            const data = await res.json();
            if (data.success) {
                setNewCatName('');
                fetchCategories();
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Error adding category');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this category?')) return;
        try {
            const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${tokenVal}`
                }
            });
            const data = await res.json();
            if (data.success) {
                fetchCategories();
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Error deleting category');
        }
    };

    if (loading) return <div className="p-8">Loading categories...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Categories</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Add Form */}
                <div className="bg-white p-6 rounded-lg shadow h-fit">
                    <h3 className="font-semibold text-lg mb-4">Add New Category</h3>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <input
                            type="text"
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            placeholder="Category Name"
                            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                        <button type="submit" className="w-full bg-black text-white py-2 rounded">
                            Add Category
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="col-span-2 bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-gray-600">Name</th>
                                <th className="px-6 py-3 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.map((cat) => (
                                <tr key={cat._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3">{cat.name}</td>
                                    <td className="px-6 py-3">
                                        <button
                                            onClick={() => handleDelete(cat._id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {categories.length === 0 && <p className="p-6 text-gray-500 text-center">No categories yet.</p>}
                </div>
            </div>
        </div>
    );
}
