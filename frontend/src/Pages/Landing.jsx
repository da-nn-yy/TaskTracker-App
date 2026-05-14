import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Landing = () => {
  const { currentUser } = useAuth();

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12 sm:px-8 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="float-soft absolute -top-12 -left-20 h-64 w-64 rounded-full bg-[#aff901] opacity-40 blur-3xl" />
        <div className="float-soft-delayed absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-black opacity-10 blur-3xl" />
        <div className="float-soft absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-[#aff901] opacity-30 blur-3xl" />
      </div>

      <div className="container mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="text-left rise-in" style={{ animationDelay: '0.05s' }}>
          <p className="mb-4 inline-flex rounded-full border border-black/20 bg-white/70 px-4 py-2 text-sm font-semibold text-black">
            Built for daily clarity and momentum.
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-black sm:text-5xl md:text-6xl" style={{ fontFamily: 'Fugaz One, sans-serif' }}>
            Plan less. Execute more with a clean
            <span className="text-[#7fb700]"> task flow</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-700 sm:text-lg">
            Capture tasks quickly, filter by status, and focus on what matters next. Task Tracker keeps your workflow simple from start to finish.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 rise-in" style={{ animationDelay: '0.18s' }}>
            <Link
              to={currentUser ? '/dashboard' : '/register'}
              className="rounded-full bg-black px-6 py-3 text-sm font-bold text-[#aff901] transition hover:opacity-90 hover:-translate-y-0.5 sm:text-base"
            >
              {currentUser ? 'Go to Dashboard' : 'Get Started'}
            </Link>
            {!currentUser && (
              <Link
                to="/login"
                className="rounded-full border-2 border-black px-6 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-black hover:text-[#aff901] sm:text-base"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="mt-7 grid max-w-md grid-cols-3 gap-2 text-left rise-in" style={{ animationDelay: '0.3s' }}>
            <div className="rounded-xl bg-white/80 p-3 shadow-sm">
              <p className="text-xl font-bold text-black">Fast</p>
              <p className="text-xs text-gray-600">Task capture</p>
            </div>
            <div className="rounded-xl bg-white/80 p-3 shadow-sm">
              <p className="text-xl font-bold text-black">Clean</p>
              <p className="text-xs text-gray-600">Status tracking</p>
            </div>
            <div className="rounded-xl bg-white/80 p-3 shadow-sm">
              <p className="text-xl font-bold text-black">Simple</p>
              <p className="text-xs text-gray-600">Daily routine</p>
            </div>
          </div>
        </div>

        <div className="rise-in rounded-3xl border border-black/10 bg-white/80 p-6 shadow-xl backdrop-blur sm:p-8" style={{ animationDelay: '0.12s' }}>
          <h2 className="text-left text-xl font-bold text-black sm:text-2xl">Simple workflow</h2>
          <div className="mt-6 space-y-4 text-left">
            <div className="rounded-2xl bg-[#f4ffc9] p-4 rise-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Step 1</p>
              <p className="mt-1 font-semibold text-black">Create tasks in seconds</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm rise-in" style={{ animationDelay: '0.28s' }}>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Step 2</p>
              <p className="mt-1 font-semibold text-black">Track progress by status filters</p>
            </div>
            <div className="rounded-2xl bg-black p-4 rise-in" style={{ animationDelay: '0.36s' }}>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#aff901]">Step 3</p>
              <p className="mt-1 font-semibold text-white">Finish strong and clear your board</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
