'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (authError) {
        setError(authError.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
    } catch {
      setError('Google signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-plugin-light flex flex-col md:flex-row-reverse">
      {/* Right side - Visual/Branding */}
      <div className="hidden md:flex flex-1 bg-plugin-dark relative p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
        <div className="relative z-10 flex justify-end">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="font-display text-2xl font-bold tracking-[0.2em] text-plugin-light">
              PLUGINSCIENCE<span className="text-theme-data">.</span>
            </span>
          </Link>
        </div>
        <div className="relative z-10 max-w-md ml-auto text-right">
           <h2 className="text-4xl font-display font-medium text-plugin-light leading-tight">
             Create your account.
           </h2>
        </div>
      </div>

      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-12 md:hidden">
             <Link href="/" className="inline-flex items-center gap-2">
                <span className="font-display text-2xl font-bold tracking-[0.2em] text-plugin-dark">
                  PLUGINSCIENCE<span className="text-theme-data">.</span>
                </span>
             </Link>
          </div>

          {success ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-plugin-dark rounded-full flex items-center justify-center mx-auto mb-8">
                 <Check className="w-10 h-10 text-plugin-light" />
              </div>
              <h2 className="text-display font-display font-bold text-plugin-dark uppercase tracking-tight mb-4">
                CHECK YOUR EMAIL
              </h2>
              <p className="text-sm font-mono text-plugin-text-muted mb-12">
                We've sent a verification link to <br/><span className="text-plugin-dark font-bold">{email}</span>.
              </p>
              <Link href="/login">
                <button className="px-8 py-4 bg-plugin-dark text-plugin-light text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-theme-data transition-colors">
                  Return to Login
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h1 className="text-3xl font-display font-medium text-plugin-dark mb-2">
                  Create Account
                </h1>
                <p className="text-sm text-plugin-text-muted">Register a new profile</p>
              </div>

              {error && (
                <div className="p-4 border border-plugin-danger bg-plugin-danger/5 mb-8">
                  <p className="text-[11px] text-plugin-danger font-mono font-bold uppercase tracking-widest">{error}</p>
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <label className="text-[10px] font-mono font-bold text-plugin-dark uppercase tracking-widest block mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-plugin-text-muted" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="JOHN DOE"
                      required
                      className="w-full bg-plugin-surface border border-plugin-border pl-12 pr-4 py-4 text-sm text-plugin-dark placeholder:text-plugin-text-muted/50 focus:outline-none focus:border-plugin-dark transition-colors font-mono rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-plugin-dark uppercase tracking-widest block mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-plugin-text-muted" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="PILOT@EXAMPLE.COM"
                      required
                      className="w-full bg-plugin-surface border border-plugin-border pl-12 pr-4 py-4 text-sm text-plugin-dark placeholder:text-plugin-text-muted/50 focus:outline-none focus:border-plugin-dark transition-colors font-mono rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-plugin-dark uppercase tracking-widest block mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-plugin-text-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="MIN. 6 CHARACTERS"
                      required
                      minLength={6}
                      className="w-full bg-plugin-surface border border-plugin-border pl-12 pr-12 py-4 text-sm text-plugin-dark placeholder:text-plugin-text-muted/50 focus:outline-none focus:border-plugin-dark transition-colors font-mono rounded-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-plugin-text-muted hover:text-plugin-dark transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-plugin-dark text-plugin-light text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-theme-data transition-colors flex items-center justify-center gap-3 mt-8"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Account'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-plugin-border" />
                <span className="text-[10px] font-mono font-bold text-plugin-text-muted uppercase tracking-widest">OR</span>
                <div className="flex-1 h-px bg-plugin-border" />
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full py-4 border border-plugin-border text-sm font-display font-medium text-plugin-dark hover:bg-plugin-surface transition-colors flex justify-center items-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <p className="text-center text-sm text-plugin-text-muted mt-12">
                Already have an account?{' '}
                <Link href="/login" className="text-plugin-dark font-medium hover:text-theme-data transition-colors">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
