import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from "../firebase.js";
import { useAuth } from '../contexts/AuthContext';
import PasswordReset from '../Components/PasswordReset';

const Login = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
      console.error(error);
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

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setDisplayName('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf4f4] px-2">
      <div>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute z-1 blur-[90px] animate-pulse max-md:hidden top-20 left-0" />
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute z-1 blur-[90px] animate-pulse max-md:hidden top-60 -right-[150px]" />
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute z-1 blur-[90px] animate-pulse max-md:hidden -bottom-50 left-[300px]" />
      </div>
      <div className="bg-black rounded-2xl shadow-lg p-6 sm:p-10 flex flex-col items-center w-full max-w-xs sm:max-w-md z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#aff901] mb-6">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>

        {error && (
          <div className="w-full mb-4 p-3 bg-red-500 text-white rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 sm:gap-5">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="px-3 py-2 sm:px-4 sm:py-3 rounded-full bg-white text-black border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901]"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-full bg-white text-black border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-full bg-white text-black border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 sm:py-3 rounded-full bg-[#aff901] text-black font-bold text-base sm:text-lg hover:opacity-90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-4 w-full">
          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="w-full rounded-full border-[#aff901] border-2 py-2 sm:py-3 text-[#aff901] font-semibold sm:text-lg hover:opacity-90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            Sign in with Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-[#aff901] hover:underline text-sm"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>

          {isLogin && (
            <div className="mt-2">
              <button
                onClick={() => setShowPasswordReset(true)}
                className="text-[#aff901] hover:underline text-sm"
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
