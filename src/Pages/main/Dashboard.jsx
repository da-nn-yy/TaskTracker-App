import React, { useState } from "react";
import TaskCard from "../../Components/TaskCard.jsx";
import FilterBar from "../../Components/FilterBar.jsx";
import AddTaskModal from "../../Components/AddTaskModal.jsx";

const tasks = [
  { id: 1, title: "Design UI Mockups", status: "In Progress" },
  { id: 2, title: "Set up Database", status: "Completed" },
  { id: 3, title: "Write Documentation", status: "Pending" },
];

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen bg-white py-4 px-2 sm:py-8 sm:px-4 md:px-16">
      <AddTaskModal open={showModal} onClose={() => setShowModal(false)} />
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-3 sm:gap-4">
        <FilterBar />
        <button
          className="w-full sm:w-auto px-6 py-2 rounded-full bg-[#aff901] text-black font-bold shadow hover:opacity-90 transition"
          onClick={() => setShowModal(true)}
        >
          + Add Task
        </button>
      </div>
      {/* Task List */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} title={task.title} status={task.status} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
