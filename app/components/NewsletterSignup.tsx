'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Integrate with Mailchimp/ConvertKit API
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="relative bg-[#1a2332] border border-[#c9d1d9]/20 rounded-lg p-8 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 via-transparent to-[#2ec4b6]/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[600px] mx-auto text-center">
        <h3
          className="text-3xl font-normal mb-3 text-[#ff6b35]"
          style={{ fontFamily: 'var(--font-audiowide)' }}
        >
          Join the SF Supernova Community
        </h3>

        <p
          className="text-base text-[#c9d1d9]/80 mb-6 leading-relaxed"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Subscribe for weekly vintage sci-fi discoveries, reviews, and audio drama recommendations delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 bg-white border-2 border-[#c9d1d9]/40 rounded-md text-base text-[#1a2332] focus:border-[#ff6b35] focus:outline-none focus:ring-0 transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-3 bg-[#ff6b35] text-white font-semibold rounded-md border-none text-sm uppercase tracking-wider cursor-pointer hover:bg-[#e63946] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status === 'success' && (
          <p
            className="text-[#2ec4b6] font-medium mt-4 text-sm"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Success! Check your email to confirm your subscription.
          </p>
        )}

        {status === 'error' && (
          <p
            className="text-[#e63946] font-medium mt-4 text-sm"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Oops! Something went wrong. Please try again.
          </p>
        )}

        <p
          className="text-xs text-[#c9d1d9]/60 mt-4"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
