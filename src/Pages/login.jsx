import React from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf4f4] px-2 container">
      <div className="bg-black rounded-2xl shadow-lg p-6 sm:p-10 flex flex-col items-center w-full max-w-xs sm:max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#aff901] mb-6">Sign In</h2>
        <form className="w-full flex flex-col gap-4 sm:gap-5">
          <input
            type="email"
            placeholder="Email"
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-full bg-white text-black border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901]"
            disabled
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-full bg-white text-black border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901]"
            disabled
          />
          <Link
            className="w-full py-2 sm:py-3 rounded-full bg-[#aff901] text-black font-bold text-base sm:text-lg hover:opacity-90 transition"
            to={"/"}
          >
            Sign in
          </Link>
        </form>
        <p className="text-white mt-6 text-xs sm:text-sm">Demo only. No authentication implemented.</p>
      </div>
    </div>
  );
};

export default Login;
