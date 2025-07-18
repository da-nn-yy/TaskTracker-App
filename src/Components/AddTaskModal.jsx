import React, { useState, useEffect } from "react";

const AddTaskModal = ({ open, onClose, mode = "add", initialTask, onSave, showEndingDate }) => {
  const [title, setTitle] = useState("");
  const [startingAt, setStartingAt] = useState("");
  const [endingAt, setEndingAt] = useState("");

  useEffect(() => {
    if (mode === "edit" && initialTask) {
      setTitle(initialTask.title);
      setStartingAt(initialTask.startingAt ? initialTask.startingAt.split('T')[0] : "");
      setEndingAt(initialTask.endingAt ? initialTask.endingAt.split('T')[0] : "");
    } else {
      setTitle("");
      setStartingAt("");
      setEndingAt("");
    }
  }, [mode, initialTask, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const task = mode === "edit"
      ? { ...initialTask, title, startingAt: startingAt ? new Date(startingAt).toISOString() : null, endingAt: endingAt ? new Date(endingAt).toISOString() : null }
      : { title, status: "In Progress", startingAt: startingAt ? new Date(startingAt).toISOString() : null, endingAt: endingAt ? new Date(endingAt).toISOString() : null };
    onSave(task);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4 sm:px-8 md:px-12">
      <div>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-20 -left-30"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-60 -right-[150px]"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden -bottom-50 left-[300px]"/>
      </div>
      <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md shadow-xl flex flex-col gap-4 sm:gap-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black">{mode === "edit" ? "Edit Task" : "Add New Task"}</h2>
        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
          <label className="text-black font-semibold mb-1" htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            type="text"
            placeholder="Task Title"
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          {showEndingDate && (
            <>
              <label className="text-black font-semibold mb-1" htmlFor="start-date">Start Date</label>
              <input
                id="start-date"
                type="date"
                className="px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
                value={startingAt}
                onChange={e => setStartingAt(e.target.value)}
                placeholder="Start Date"
              />
              <label className="text-black font-semibold mb-1" htmlFor="end-date">End Date</label>
              <input
                id="end-date"
                type="date"
                className="px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
                value={endingAt}
                onChange={e => setEndingAt(e.target.value)}
                placeholder="End Date"
              />
            </>
          )}
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
