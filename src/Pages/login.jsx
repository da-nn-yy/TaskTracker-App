import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from "../firebase.js";

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        console.log('Google sign-in success, navigating to home');
        navigate("/");
      })
      .catch((error) => {
        alert("Popup was blocked or login failed. Please allow popups and try again.");
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf4f4] px-2">
      <div>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute z-1 blur-[90px] animate-pulse max-md:hidden top-20 left-0" />
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute z-1 blur-[90px] animate-pulse max-md:hidden top-60 -right-[150px]" />
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute z-1 blur-[90px] animate-pulse max-md:hidden -bottom-50 left-[300px]" />
      </div>
      <div className="bg-black rounded-2xl shadow-lg p-6 sm:p-10 flex flex-col items-center w-full max-w-xs sm:max-w-md z-10">
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
            className="w-full py-2 sm:py-3 rounded-full bg-[#aff901] text-black font-bold text-base sm:text-lg hover:opacity-90 transition duration-200"
            to={"/"}
          >
            Sign in
          </Link>
        </form>
        <div className="mt-4 w-full">
          <button
            onClick={signInWithGoogle}
            className="w-full rounded-full border-[#aff901] border-2 py-2 sm:py-3 text-[#aff901] font-semibold sm:text-lg hover:opacity-90 transition duration-200">
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
