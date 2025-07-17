import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-white drop-shadow-md rounded-full py-4 px-4 sm:py-5 sm:px-8 flex flex-col sm:flex-row items-center sm:justify-between mt-4 mx-2 sm:mt-6 sm:mx-6 relative">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <span className="text-2xl sm:text-3xl font-extrabold text-black tracking-wide" style={{ fontFamily: 'sans-serif' }}>
          Task <span className="text-[#aff901]">Tracker</span>
        </span>
        <button className="sm:hidden ml-2 p-2 z-50" onClick={() => setMenuOpen(true)}>
          <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      {/* Desktop Nav */}
      <nav className="hidden sm:flex items-center space-x-6 mt-0 w-auto">
        <a href="#" className="text-black font-semibold hover:text-[#aff901] transition-colors">Dashboard</a>
        <a href="#" className="text-black font-semibold hover:text-[#aff901] transition-colors">Tasks</a>
        <a href="#" className="text-black font-semibold hover:text-[#aff901] transition-colors">Filters</a>
        <a href="#" className="rounded-full bg-[#aff901] text-black px-5 py-2 font-semibold hover:opacity-90 transition-opacity">Add Task</a>
      </nav>
      {/* Mobile Drawer Nav */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col">
          <div className="flex justify-end p-4">
            <button onClick={() => setMenuOpen(false)} className="text-black p-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            <a href="#" className="text-black text-2xl font-semibold hover:text-[#aff901] transition-colors" onClick={() => setMenuOpen(false)}>Dashboard</a>
            <a href="#" className="text-black text-2xl font-semibold hover:text-[#aff901] transition-colors" onClick={() => setMenuOpen(false)}>Tasks</a>
            <a href="#" className="text-black text-2xl font-semibold hover:text-[#aff901] transition-colors" onClick={() => setMenuOpen(false)}>Filters</a>
            <a href="#" className="rounded-full bg-[#aff901] text-black px-8 py-3 font-semibold text-xl hover:opacity-90 transition-opacity" onClick={() => setMenuOpen(false)}>Add Task</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
