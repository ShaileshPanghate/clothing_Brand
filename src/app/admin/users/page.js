'use client';
import { useEffect, useState } from 'react';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const tokenVal = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
                const res = await fetch('http://localhost:5000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${tokenVal}`
                    }
                });
                const data = await res.json();
                if (data.success) {
                    setUsers(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (loading) return <div className="p-8">Loading users...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Users</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 font-semibold text-gray-600">Name</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Email</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Role</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Member Since</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-900 font-medium">{user.name}</td>
                                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <p className="text-center py-10 text-gray-500">No users found.</p>
                )}
            </div>
        </div>
    );
}
