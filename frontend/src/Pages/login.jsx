import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from "../firebase.js";
import { useAuth } from '../contexts/AuthContext';
import PasswordReset from '../Components/PasswordReset';

const Login = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuth();

  const [isLogin, setIsLogin] = useState(initialMode !== 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  useEffect(() => {
    setIsLogin(location.pathname !== '/register');
  }, [location.pathname]);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      if (error?.code === 'auth/popup-closed-by-user') {
        setError('Google sign-in was canceled. Please try again.');
      } else if (error?.code === 'auth/popup-blocked') {
        setError('Your browser blocked the Google popup. Please allow popups and try again.');
      } else {
        setError('Google sign-in failed. Please try again.');
        console.error('Unexpected Google sign-in error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isLogin && !displayName) {
      setError('Please enter your name');
      return;
    }

    try {
      setError('');
      setLoading(true);

      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, displayName);
      }

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    const nextIsLogin = !isLogin;
    setIsLogin(nextIsLogin);
    setError('');
    setEmail('');
    setPassword('');
    setDisplayName('');
    navigate(nextIsLogin ? '/login' : '/register');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#eaf4f4] px-4 py-10 sm:px-6 sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -left-20 h-64 w-64 rounded-full bg-[#aff901] opacity-45 blur-[100px]" />
        <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-black opacity-10 blur-[110px]" />
        <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-[#aff901] opacity-35 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-md flex-col rounded-3xl border border-black/10 bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-8">
        <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-gray-500">Welcome to Task Tracker</p>
        <h2 className="text-center text-2xl font-bold text-black sm:text-3xl">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? 'Continue where you left off.' : 'Create your account to start managing tasks.'}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-[#aff901]/30 bg-[#f5ffd9] p-1">
          <button
            type="button"
            onClick={() => {
              if (!isLogin) toggleMode();
            }}
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${isLogin ? 'bg-[#aff901] text-black shadow-sm' : 'text-gray-600 hover:text-black'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              if (isLogin) toggleMode();
            }}
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${!isLogin ? 'bg-[#aff901] text-black shadow-sm' : 'text-gray-600 hover:text-black'}`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mt-4 w-full rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 flex w-full flex-col gap-4">
          {!isLogin && (
            <div className="text-left">
              <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black outline-none transition focus:border-[#aff901] focus:ring-2 focus:ring-[#aff901]/50"
              />
            </div>
          )}
          <div className="text-left">
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black outline-none transition focus:border-[#aff901] focus:ring-2 focus:ring-[#aff901]/50"
            />
          </div>
          <div className="text-left">
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black outline-none transition focus:border-[#aff901] focus:ring-2 focus:ring-[#aff901]/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-xl bg-black py-3 text-base font-bold text-[#aff901] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">or</span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="mt-4 w-full">
          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-black transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.8 3.5 14.6 2.6 12 2.6 6.9 2.6 2.8 6.7 2.8 11.8S6.9 21 12 21c6.9 0 9.2-4.8 9.2-7.3 0-.5 0-.9-.1-1.2H12z" />
              <path fill="#34A853" d="M3.7 7.1l3.2 2.3C7.7 7.2 9.7 5.8 12 5.8c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.8 3.5 14.6 2.6 12 2.6c-3.5 0-6.6 2-8.3 4.5z" />
              <path fill="#FBBC05" d="M12 21c2.5 0 4.7-.8 6.2-2.2l-2.9-2.4c-.8.6-1.9 1.1-3.3 1.1-2.6 0-4.7-1.7-5.5-4l-3.3 2.5C4.8 18.9 8.1 21 12 21z" />
              <path fill="#4285F4" d="M21.2 13.7c0-.5 0-.9-.1-1.2H12v3.9h5.5c-.3 1.4-1.1 2.5-2.2 3.3l2.9 2.4c1.7-1.6 3-4 3-8.4z" />
            </svg>
            <span>{isLogin ? 'Continue with Google' : 'Sign up with Google'}</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-sm text-gray-600 hover:text-black hover:underline"
          >
            {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
          </button>

          {isLogin && (
            <div className="mt-2">
              <button
                onClick={() => setShowPasswordReset(true)}
                className="text-sm text-gray-600 hover:text-black hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}
        </div>
      </div>

      {showPasswordReset && (
        <PasswordReset onClose={() => setShowPasswordReset(false)} />
      )}
    </div>
  );
};

export default Login;
