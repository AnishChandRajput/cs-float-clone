import React from 'react';
import { loginUser, registerUser, type StoredUser, getCurrentUser } from '../utils/auth';

interface AuthPageProps {
  onAuthSuccess: (user: StoredUser) => void;
}

type AuthMode = 'register' | 'signin';

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = React.useState<AuthMode>('register');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const clearFeedback = () => {
    setError('');
    setSuccess('');
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    clearFeedback();
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearFeedback();
    setIsSubmitting(true);

    const result =
      mode === 'register'
        ? await registerUser({ username, email, password, confirmPassword })
        : await loginUser({ email, password });

    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setSuccess(result.message);
    const currentUser = result.user ?? getCurrentUser();
    if (currentUser) {
      onAuthSuccess(currentUser);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-28 -left-28 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute -bottom-20 -right-12 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <div className="w-full max-w-md bg-surface/85 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-label mb-3">CS Float Access</p>
        <h1 className="text-3xl font-headline font-black tracking-tight mb-2">
          {mode === 'register' ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="text-zinc-400 mb-8">
          {mode === 'register'
            ? 'Register to start trading and managing your inventory.'
            : 'Sign in to continue to your marketplace dashboard.'}
        </p>

        <div className="grid grid-cols-2 gap-2 bg-surface-container rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => switchMode('register')}
            className={`py-2 rounded-lg text-sm font-bold transition ${
              mode === 'register' ? 'bg-primary text-on-primary' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => switchMode('signin')}
            className={`py-2 rounded-lg text-sm font-bold transition ${
              mode === 'signin' ? 'bg-primary text-on-primary' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Sign In
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400">Username</label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="ghost_trader"
                className="mt-2 w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50"
                autoComplete="username"
              />
            </div>
          )}

          <div>
            <label className="text-xs uppercase tracking-wider text-zinc-400">Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50"
              type="email"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-zinc-400">Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              className="mt-2 w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50"
              type="password"
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter password"
                className="mt-2 w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50"
                type="password"
                autoComplete="new-password"
              />
            </div>
          )}

          {error && <p className="text-sm text-error">{error}</p>}
          {success && <p className="text-sm text-secondary">{success}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:brightness-110 transition"
          >
            {isSubmitting ? 'Please wait...' : mode === 'register' ? 'Register Account' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};
