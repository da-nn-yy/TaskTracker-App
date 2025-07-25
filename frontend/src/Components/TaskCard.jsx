import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const TaskCard = ({ title, status, createdAt, startingAt, endingAt, onEdit, onDelete }) => {
  return (
    <div
      className="bg-black rounded-2xl p-4 sm:p-6 flex flex-col gap-2 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 focus-within:ring-2 focus-within:ring-[#aff901] focus-within:ring-offset-2 outline-none"
      tabIndex={0}
    >
      <h2 className="text-lg sm:text-xl font-bold text-[#aff901]">{title}</h2>
      <span className="text-white text-xs sm:text-sm font-medium">Status: {status}</span>
      <span className="text-white text-xs">Start: {startingAt ? formatDate(startingAt) : '-'}</span>
      <span className="text-white text-xs">Added: {formatDate(createdAt)}</span>
      <span className="text-white text-xs">Ending: {endingAt ? formatDate(endingAt) : '-'}</span>
      <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
        <button className="px-3 py-1 rounded-full bg-[#aff901] text-black font-semibold text-xs flex items-center gap-1 transition-transform duration-150 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#aff901]" onClick={onEdit}>
          <FiEdit2 className="text-base" /> Edit
        </button>
        <button className="px-3 py-1 rounded-full bg-white text-black font-semibold text-xs border border-[#aff901] flex items-center gap-1 transition-transform duration-150 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#aff901]" onClick={onDelete}>
          <FiTrash2 className="text-base" /> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
