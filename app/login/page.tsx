'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/vault/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push(redirect)
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Retro grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,170,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffaa] via-[#4facfe] to-[#00f2fe] rounded-lg blur-lg opacity-20" />

        {/* Card */}
        <div className="relative bg-black border-2 border-[#00ffaa] rounded-lg p-8 shadow-[0_0_30px_rgba(0,255,170,0.3)]">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-['Orbitron'] font-bold text-[#00ffaa] mb-2 [text-shadow:0_0_20px_rgba(0,255,170,0.5)]">
              VAULT ACCESS
            </h1>
            <p className="text-gray-400 font-['Space_Mono']">
              Enter your credentials
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-[#00ffaa] font-['Space_Mono'] mb-2">
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black border-2 border-[#00ffaa]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#00ffaa] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,170,0.5)] transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#00ffaa] font-['Space_Mono'] mb-2">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black border-2 border-[#00ffaa]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#00ffaa] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,170,0.5)] transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00ffaa] text-black font-['Orbitron'] font-bold py-3 px-6 rounded hover:bg-[#00dd99] transition-all hover:shadow-[0_0_20px_rgba(0,255,170,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'ACCESSING...' : 'ENTER VAULT'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 font-['Space_Mono'] text-sm">
              No access credentials?{' '}
              <Link
                href="/signup"
                className="text-[#00ffaa] hover:text-[#00dd99] underline transition-colors"
              >
                Request Access
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-[#00ffaa] font-['Space_Mono'] text-sm transition-colors"
            >
              ← Back to Main Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
