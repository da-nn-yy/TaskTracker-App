import React from "react";

const TaskCard = ({ title, status }) => {
  return (
    <div className="bg-black rounded-2xl p-4 sm:p-6 flex flex-col gap-2 shadow-lg">
      <h2 className="text-lg sm:text-xl font-bold text-[#aff901]">{title}</h2>
      <span className="text-white text-xs sm:text-sm font-medium">Status: {status}</span>
      <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
        <button className="px-3 py-1 rounded-full bg-[#aff901] text-black font-semibold text-xs">Edit</button>
        <button className="px-3 py-1 rounded-full bg-white text-black font-semibold text-xs border border-[#aff901]">Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
