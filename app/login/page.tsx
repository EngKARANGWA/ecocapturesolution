'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Suspense } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? 'Login failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-dark via-eco-primary to-eco-medium flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo + heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm border border-white/20">
            <Image
              src="/assets/logos/logo-ecocapture.png"
              alt="EcoCapture"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-green-200 text-sm mt-1">EcoCapture Solutions Ltd</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-card-hover p-8">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="w-5 h-5 text-eco-primary" />
            <h2 className="text-lg font-bold text-gray-900">Sign in to continue</h2>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-eco-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-eco-dark transition-colors shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            This area is restricted to authorised personnel only.
          </p>
        </div>

        <p className="text-center text-green-200/60 text-xs mt-6">
          © {new Date().getFullYear()} EcoCapture Solutions Ltd
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
