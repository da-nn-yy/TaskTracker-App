import React, { useEffect, useState } from "react";
import TaskCard from "../../Components/TaskCard.jsx";
import TaskModal from "../../Components/TaskModal.jsx";
import { FiPlus } from "react-icons/fi";
import { taskAPI } from "../../services/api.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import FilterBar from "../../Components/FilterBar.jsx";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const mapFilterToStatusParam = (filter) => {
    switch (filter) {
      case "In Progress":
        return "in_progress";
      case "Completed":
        return "completed";
      case "Pending":
        return "pending";
      default:
        return "all";
    }
  };

  const fetchTasks = async (filter = statusFilter) => {
    try {
      setLoading(true);
      setError("");
      const statusParam = mapFilterToStatusParam(filter);
      const response = await taskAPI.getTasks({ status: statusParam });
      setTasks(response.tasks || []);
    } catch (err) {
      console.error("Error while fetching tasks", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) fetchTasks();
  }, [currentUser]);

  const onFilterChange = (filter) => {
    setStatusFilter(filter);
    fetchTasks(filter);
  };

  const openAddModal = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await taskAPI.deleteTask(taskId);
      fetchTasks();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-8 md:px-12 my-4">
      <div className="-z-1">
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-20 -left-30"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-60 -right-[150px]"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden -bottom-50 left-[300px]"/>
      </div>
      <div className="container">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-black">Dashboard</h1>
            <button
              className="px-6 py-2 rounded-full bg-[#aff901] text-black font-bold shadow hover:opacity-90 transition flex items-center gap-2 text-base sm:text-lg hover:scale-105 active:scale-95"
              onClick={openAddModal}
              disabled={!currentUser}
            >
              <FiPlus className="text-lg" /> Add Task
            </button>
          </div>
          <FilterBar filter={statusFilter} onFilterChange={onFilterChange} />
        </div>

        {!currentUser ? (
          <div className="text-center py-10 text-gray-700">Please sign in to see your tasks.</div>
        ) : error ? (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
        ) : loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#aff901]"></div>
            <p className="mt-2 text-gray-600">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-10 text-gray-700">No tasks yet. Click "Add Task" to create your first task.</div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => openEditModal(task)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </div>
        )}
      </div>

      <TaskModal
        isOpen={showModal}
        onClose={closeModal}
        task={editingTask}
        refreshTasks={() => fetchTasks(statusFilter)}
      />
    </div>
  );
};

export default Dashboard;
