import React from "react";

const Header = () => {
  return (
    <header className="bg-white drop-shadow-md rounded-full py-6 px-6 flex items-center justify-between mt-4 mx-4">
      <div className="flex items-center space-x-3">
        <h1 className="text-3xl font-extrabold text-black tracking-wide drop-shadow-lg font-[Agbalumo]">Task Tracker</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="flex items-center gap-2 bg-[#fcfffc] bg-opacity-90 text-[#5dd62c] font-semibold px-5 py-2 rounded-full shadow hover:bg-blue-100 transition-all duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>
    </header>
  );
};

export default Header;
