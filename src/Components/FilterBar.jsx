import React from "react";

const FilterBar = () => {
  return (
    <div className="flex flex-wrap gap-2 w-full">
      <button className="flex-1 min-w-[110px] px-3 py-2 rounded-full bg-[#aff901] text-black font-semibold hover:opacity-90 transition text-xs sm:text-base">All</button>
      <button className="flex-1 min-w-[110px] px-3 py-2 rounded-full bg-black text-[#aff901] font-semibold hover:opacity-80 transition text-xs sm:text-base">In Progress</button>
      <button className="flex-1 min-w-[110px] px-3 py-2 rounded-full bg-black text-[#aff901] font-semibold hover:opacity-80 transition text-xs sm:text-base">Completed</button>
      <button className="flex-1 min-w-[110px] px-3 py-2 rounded-full bg-black text-[#aff901] font-semibold hover:opacity-80 transition text-xs sm:text-base">Pending</button>
    </div>
  );
};

export default FilterBar;
