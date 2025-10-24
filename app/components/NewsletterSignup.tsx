'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Integrate with Mailchimp/ConvertKit API
    // For now, simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="bg-[#1a2332] border border-[#c9d1d9]/30 rounded-lg p-8 relative overflow-hidden">
      {/* Subtle retro chrome effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 via-transparent to-[#2ec4b6]/5 pointer-events-none"></div>

      <div className="newsletter-signup relative z-10">
        <h3
          style={{
            fontFamily: 'var(--font-audiowide)',
            fontSize: '1.875rem',
            fontWeight: 'normal',
            marginBottom: '0.75rem',
            color: '#ff6b35'
          }}
        >
          Join the Supernova Community
        </h3>
        <p style={{
          fontFamily: 'var(--font-inter)',
          color: 'rgba(201, 209, 217, 0.9)'
        }}>
          Subscribe for weekly vintage sci-fi discoveries, reviews, and audio drama recommendations delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 bg-white border-2 border-[#c9d1d9]/40 rounded-md focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 text-[#1a2332] placeholder-[#1a2332]/50 disabled:opacity-50 transition-all"
            style={{ fontFamily: 'var(--font-inter)' }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-3 bg-[#ff6b35] text-white font-semibold rounded-md hover:bg-[#e63946] transition-all duration-300 disabled:opacity-50 uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status === 'success' && (
          <p style={{
            color: '#2ec4b6',
            fontWeight: '500',
            fontFamily: 'var(--font-inter)'
          }}>
            Success! Check your email to confirm your subscription.
          </p>
        )}

        {status === 'error' && (
          <p style={{
            color: '#e63946',
            fontWeight: '500',
            fontFamily: 'var(--font-inter)'
          }}>
            Oops! Something went wrong. Please try again.
          </p>
        )}

        <p style={{
          fontSize: '0.75rem',
          color: 'rgba(201, 209, 217, 0.6)',
          fontFamily: 'var(--font-inter)'
        }}>
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
