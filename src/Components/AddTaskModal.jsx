import React, { useState, useEffect } from "react";

const AddTaskModal = ({ open, onClose, mode = "add", initialTask, onSave }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("In Progress");

  useEffect(() => {
    if (mode === "edit" && initialTask) {
      setTitle(initialTask.title);
      setStatus(initialTask.status);
    } else {
      setTitle("");
      setStatus("In Progress");
    }
  }, [mode, initialTask, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const task = mode === "edit"
      ? { ...initialTask, title, status }
      : { title, status };
    onSave(task);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
      <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md shadow-xl flex flex-col gap-4 sm:gap-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black">{mode === "edit" ? "Edit Task" : "Add New Task"}</h2>
        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <select
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option>In Progress</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
            <button type="submit" className="flex-1 py-2 sm:py-3 rounded-full bg-[#aff901] text-black font-bold hover:opacity-90 transition">{mode === "edit" ? "Save Changes" : "Add Task"}</button>
            <button type="button" className="flex-1 py-2 sm:py-3 rounded-full bg-black text-[#aff901] font-bold hover:opacity-80 transition" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
