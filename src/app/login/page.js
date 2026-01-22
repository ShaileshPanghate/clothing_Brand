'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (data.success) {
        // Save token
        document.cookie = `token=${data.token}; path=/; max-age=604800`;
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect
        window.location.href = '/';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Login to Your Account
        </h1>

        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            onChange={handleChange}
            className="input w-full border rounded px-3 py-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="input w-full border rounded px-3 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="flex justify-between items-center mt-4 text-sm">
          <Link href="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
          <Link href="/signup" className="hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
