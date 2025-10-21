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
    <div className="bg-dark-purple/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-8 neon-border">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-2 text-primary text-glow" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Join the Supernova Collective
        </h3>
        <p className="text-foreground/80 mb-6">
          Subscribe to receive weekly reviews, audio drama recommendations, and vintage sci-fi discoveries straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 bg-background/50 border-2 border-retro-cyan/50 rounded focus:outline-none focus:border-retro-cyan text-foreground placeholder-foreground/40"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-3 bg-primary/20 border-2 border-primary text-primary font-bold rounded retro-button hover:bg-primary hover:text-background transition-all duration-300 disabled:opacity-50"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-retro-green text-glow">
            Success! Check your email to confirm your subscription.
          </p>
        )}

        {status === 'error' && (
          <p className="mt-4 text-retro-pink text-glow">
            Oops! Something went wrong. Please try again.
          </p>
        )}

        <p className="text-xs text-foreground/60 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
