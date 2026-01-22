'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      });
      const data = await res.json();

      if (data.success) {
        // Save token
        document.cookie = `token=${data.token}; path=/; max-age=604800`;
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect
        window.location.href = '/';
      } else {
        setError(data.message || 'Signup failed');
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
          Create Your Account
        </h1>

        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="input w-full border rounded px-3 py-2"
          />

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
            className="input w-full border rounded px-3 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link href="/login" className="hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
