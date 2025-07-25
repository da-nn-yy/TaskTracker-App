import React from "react";

const FILTERS = ["All", "In Progress", "Completed", "Pending"];

const FilterBar = ({ filter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2 w-full">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={`flex-1 min-w-[110px] px-3 py-2 rounded-full font-semibold transition text-xs sm:text-base
            ${filter === f
              ? "bg-[#aff901] text-black"
              : "bg-black text-[#aff901] hover:opacity-80"}
          `}
          onClick={() => onFilterChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
