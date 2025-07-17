import React from "react";

const AddTaskModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
      <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md shadow-xl flex flex-col gap-4 sm:gap-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black">Add New Task</h2>
        <form className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Task Title"
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
            disabled
          />
          <select
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
            disabled
          >
            <option>Status</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
            <button type="button" className="flex-1 py-2 sm:py-3 rounded-full bg-[#aff901] text-black font-bold hover:opacity-90 transition" disabled>Save</button>
            <button type="button" className="flex-1 py-2 sm:py-3 rounded-full bg-black text-[#aff901] font-bold hover:opacity-80 transition" onClick={onClose}>Cancel</button>
          </div>
        </form>
        <p className="text-xs text-gray-500 text-center">Demo only. No functionality implemented.</p>
      </div>
    </div>
  );
};

export default AddTaskModal;
