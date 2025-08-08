import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskModal = ({task, isOpen,onClose,refreshTasks}) => {

  const [title, setTitle] = useState('')

  const [description, setDescription] = useState('')

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle('');
      setDescription('');
    }
  },[task])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (task) {
        const response = await axios.put(`http://localhost:3000/tasks/${task.id}`, {
          title,
          description
        });
        console.log("Task updated successfully:", response.data);
      }else{
      const response = await axios.post('http://localhost:3000/tasks', {
          title, description
        });
      console.log("Task added successfully:", response.data);
    }
      if (refreshTasks) {
        refreshTasks();
      }
      onClose();

}catch (error) {
      console.error("Error submitting task:", error);
    }

  }

  if(!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4 sm:px-8 md:px-12">
      <div>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-20 -left-30"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-60 -right-[150px]"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden -bottom-50 left-[300px]"/>
      </div>
      <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md shadow-xl flex flex-col gap-4 sm:gap-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black">{task ? "Edit Task" : "Add New Task"}</h2>
        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
          <label className="text-black font-semibold mb-1" htmlFor="task-title">Task Title</label>
          <input
            type="text"
            placeholder="Task Title"
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
            required
          />
          <input
            placeholder = "Task Description"
            type="text"
            value = {description}
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-[#aff901] focus:outline-none focus:ring-2 focus:ring-[#aff901] text-black bg-white"
            onChange={e => setDescription(e.target.value)}/>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
            <button type="submit" className="flex-1 py-2 sm:py-3 rounded-full bg-[#aff901] text-black font-bold hover:opacity-90 transition">{task ? 'Update' : "Add"}</button>
            <button type="button" className="flex-1 py-2 sm:py-3 rounded-full bg-black text-[#aff901] font-bold hover:opacity-80 transition" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
