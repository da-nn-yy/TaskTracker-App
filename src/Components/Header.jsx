import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-white drop-shadow-md rounded-full py-4 px-4 sm:py-5 sm:px-8 flex flex-col sm:flex-row items-center sm:justify-between mt-4 mx-2 sm:mt-6 sm:mx-6 relative z-50">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <span className="text-2xl sm:text-3xl font-extrabold text-black tracking-wide" style={{ fontFamily: 'sans-serif' }}>
          Task <span className="text-[#aff901]">Tracker</span>
        </span>
        {!menuOpen && (
          <button className="sm:hidden ml-2 p-2 z-50" onClick={() => setMenuOpen(true)}>
            <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        )}
      </div>
      {/* Desktop Nav */}
      <nav className="hidden sm:flex items-center space-x-6 mt-0 w-auto">
        <a href="#" className="text-black font-semibold hover:text-[#aff901] transition-colors">Dashboard</a>
        <a href="#" className="text-black font-semibold hover:text-[#aff901] transition-colors">Tasks</a>
        <a href="#" className="text-black font-semibold hover:text-[#aff901] transition-colors">Filters</a>
        <a href="#" className="rounded-full bg-[#aff901] text-black px-5 py-2 font-semibold hover:opacity-90 transition-opacity">Add Task</a>
      </nav>
      {/* Mobile Drawer Nav & Overlay */}
      {menuOpen && (
        <>
          {/* Blur overlay for the rest of the page */}
          <div
            className="fixed inset-0 backdrop-blur-md z-40"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer Nav */}
          <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
            <div className="flex justify-end p-4">
              <button onClick={() => setMenuOpen(false)} className="text-black p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#aff901] active:bg-gray-100 transition w-14 h-14 flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="flex flex-col items-center justify-start bg-white flex-1 py-10 rounded-xl gap-8 w-full shadow-xl">
              <a href="#" className="text-black text-2xl font-semibold hover:text-[#aff901] transition-colors" onClick={() => setMenuOpen(false)}>Dashboard</a>
              <a href="#" className="text-black text-2xl font-semibold hover:text-[#aff901] transition-colors" onClick={() => setMenuOpen(false)}>Tasks</a>
              <a href="#" className="text-black text-2xl font-semibold hover:text-[#aff901] transition-colors" onClick={() => setMenuOpen(false)}>Filters</a>
              <a href="#" className="rounded-full bg-[#aff901] text-black px-8 py-3 font-semibold text-xl hover:opacity-90 transition-opacity" onClick={() => setMenuOpen(false)}>Add Task</a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
