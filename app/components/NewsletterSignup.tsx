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
    <div style={{
      background: '#1a2332',
      border: '1px solid rgba(201, 209, 217, 0.3)',
      borderRadius: '8px',
      padding: '32px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom right, rgba(255, 107, 53, 0.05), transparent, rgba(46, 196, 182, 0.05))',
        pointerEvents: 'none'
      }}></div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontFamily: 'var(--font-audiowide)',
          fontSize: '30px',
          fontWeight: 'normal',
          marginBottom: '12px',
          color: '#ff6b35'
        }}>
          Join the Supernova Community
        </h3>

        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '16px',
          color: 'rgba(201, 209, 217, 0.9)',
          marginBottom: '24px',
          lineHeight: '1.6'
        }}>
          Subscribe for weekly vintage sci-fi discoveries, reviews, and audio drama recommendations delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={status === 'loading'}
              style={{
                fontFamily: 'var(--font-inter)',
                flex: 1,
                padding: '12px 16px',
                background: 'white',
                border: '2px solid rgba(201, 209, 217, 0.4)',
                borderRadius: '6px',
                fontSize: '16px',
                color: '#1a2332',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                fontFamily: 'var(--font-inter)',
                padding: '12px 32px',
                background: '#ff6b35',
                color: 'white',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
        </form>

        {status === 'success' && (
          <p style={{
            fontFamily: 'var(--font-inter)',
            color: '#2ec4b6',
            fontWeight: 500,
            marginTop: '16px',
            fontSize: '14px'
          }}>
            Success! Check your email to confirm your subscription.
          </p>
        )}

        {status === 'error' && (
          <p style={{
            fontFamily: 'var(--font-inter)',
            color: '#e63946',
            fontWeight: 500,
            marginTop: '16px',
            fontSize: '14px'
          }}>
            Oops! Something went wrong. Please try again.
          </p>
        )}

        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '12px',
          color: 'rgba(201, 209, 217, 0.6)',
          marginTop: '16px'
        }}>
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
