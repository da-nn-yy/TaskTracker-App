import React, { useState, useEffect } from "react";
import { taskAPI } from "../services/api.js";

const TaskModal = ({ task, isOpen, onClose, refreshTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStartDate(task.start_date || '');
      setEndDate(task.end_date || '');
      setPriority(task.priority || 'medium');
    } else {
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setPriority('medium');
    }
    setError('');
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !startDate) {
      setError('Title and start date are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        startDate,
        endDate: endDate || null,
        priority
      };

      if (task) {
        // Update existing task
        await taskAPI.updateTask(task.id, taskData);
        console.log("Task updated successfully");
      } else {
        // Create new task
        await taskAPI.createTask(taskData);
        console.log("Task added successfully");
      }

      if (refreshTasks) {
        refreshTasks();
      }
      onClose();
    } catch (error) {
      console.error("Error submitting task:", error);
      setError(error.message || 'Failed to save task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4 sm:px-8 md:px-12">
      <div>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-20 -left-30"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-60 -right-[150px]"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden -bottom-50 left-[300px]"/>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md shadow-xl flex flex-col gap-4 sm:gap-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black">
          {task ? "Edit Task" : "Add New Task"}
        </h2>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-black font-semibold mb-1 block" htmlFor="task-title">
              Task Title *
            </label>
            <input
              type="text"
              id="task-title"
              placeholder="Enter task title"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div>
            <label className="text-black font-semibold mb-1 block" htmlFor="task-description">
              Description
            </label>
            <textarea
              id="task-description"
              placeholder="Enter task description"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white resize-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-black font-semibold mb-1 block" htmlFor="start-date">
                Start Date *
              </label>
              <input
                type="date"
                id="start-date"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-black font-semibold mb-1 block" htmlFor="end-date">
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                min={startDate}
              />
            </div>
          </div>

          <div>
            <label className="text-black font-semibold mb-1 block" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 sm:py-3 rounded-full bg-[#aff901] text-black font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (task ? 'Update' : 'Add')}
            </button>
            <button
              type="button"
              className="flex-1 py-2 sm:py-3 rounded-full bg-black text-[#aff901] font-bold hover:opacity-80 transition"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
