'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProductPage({ params }) {
    const router = useRouter();
    // Unwrap params using React.use()
    const { id } = use(params);
    const isNew = id === 'new';

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: '', // comma separated for now
    });

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/categories');
                const data = await res.json();

                if (data.success) {
                    setCategories(data.data || []);
                } else {
                    setError('Failed to load categories');
                }
            } catch (err) {
                setError('Error loading categories');
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Fetch product details if editing
    useEffect(() => {
        if (!isNew) {
            setLoading(true);
            // Fetch product details
            fetch(`http://localhost:5000/api/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const p = data.data;
                        setFormData({
                            name: p.name,
                            description: p.description,
                            price: p.price,
                            category: p.category,
                            stock: p.stock,
                            images: p.images.join(', ')
                        });
                        setPreviewImages(p.images);
                    }
                })
                .catch(err => {
                    console.error('Error fetching product:', err);
                    setError('Failed to load product details');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id, isNew]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        // Previews
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

        // Use FormData for file upload
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('stock', formData.stock);

        // Append selected files
        selectedFiles.forEach(file => {
            data.append('images', file);
        });

        // Also allow passing existing image URLs (as a fallback or for keeping old ones)
        if (formData.images && !selectedFiles.length) {
            formData.images.split(',').forEach(url => {
                data.append('images', url.trim());
            });
        }

        const url = isNew
            ? 'http://localhost:5000/api/products'
            : `http://localhost:5000/api/products/${id}`;

        const method = isNew ? 'POST' : 'PUT';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${tokenVal}`
                },
                body: data // Sending FormData, no Content-Type header needed (browser sets it)
            });
            const result = await res.json();

            if (result.success) {
                router.push('/admin/products');
            } else {
                alert('Error: ' + result.message);
            }
        } catch (err) {
            alert('Something went wrong');
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-gray-500">Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                {isNew ? 'Create New Product' : 'Edit Product'}
            </h1>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                            placeholder="e.g. Premium Cotton Hoodie"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
                        <input
                            type="number"
                            required
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                            placeholder="e.g. 1299"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                        placeholder="Detailed product description..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Category</label>
                        {categories.length > 0 ? (
                            <select
                                required
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none bg-white"
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category._id || category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                required
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                                placeholder="e.g. Hoodies, T-Shirts"
                            />
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                            {categories.length === 0 ? "No categories found. Enter category name manually." : "Select from existing categories"}
                        </p>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Stock Quantity</label>
                        <input
                            type="number"
                            required
                            value={formData.stock}
                            onChange={e => setFormData({ ...formData, stock: e.target.value })}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                            placeholder="e.g. 100"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Product Images</label>

                    <div className="flex flex-wrap gap-4 mb-4">
                        {previewImages.map((src, idx) => (
                            <div key={idx} className="w-24 h-24 border rounded-lg overflow-hidden relative group">
                                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-white text-xs">Preview</span>
                                </div>
                            </div>
                        ))}
                        <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-[10px] text-gray-500 mt-1">Upload</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <p className="text-xs text-gray-500 mb-2">Or provide image URLs (comma separated):</p>
                    <input
                        type="text"
                        value={formData.images}
                        onChange={e => setFormData({ ...formData, images: e.target.value })}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                        placeholder="https://image1.com, https://image2.com"
                    />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
                    >
                        {isNew ? 'Create Product' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}