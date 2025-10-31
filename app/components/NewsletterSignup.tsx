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
    <>
      <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : 'Subscribe!'}
        </button>
      </form>

      {status === 'success' && (
        <p style={{
          color: 'white',
          fontFamily: 'var(--font-poppins), sans-serif',
          fontWeight: 600,
          marginTop: '1rem',
          fontSize: '0.95rem'
        }}>
          ⚛ Success! Check your email to confirm your subscription.
        </p>
      )}

      {status === 'error' && (
        <p style={{
          color: 'white',
          fontFamily: 'var(--font-poppins), sans-serif',
          fontWeight: 600,
          marginTop: '1rem',
          fontSize: '0.95rem',
          opacity: 0.95
        }}>
          Oops! Something went wrong. Please try again.
        </p>
      )}
    </>
  );
}
