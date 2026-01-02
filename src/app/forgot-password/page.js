'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: '',
    otp: '',
    newPassword: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = e => {
    e.preventDefault();
    console.log('Send OTP to email:', form.email);
    // 👉 API: send OTP to email
    setStep(2);
  };

  const resetPassword = e => {
    e.preventDefault();
    console.log('Reset Password Data:', form);
    // 👉 API: verify OTP + update password
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h1>

        {step === 1 && (
          <form onSubmit={sendOtp} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your Gmail"
              required
              onChange={handleChange}
              className="input"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={resetPassword} className="space-y-4">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP sent to your email"
              required
              onChange={handleChange}
              className="input"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              required
              onChange={handleChange}
              className="input"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
