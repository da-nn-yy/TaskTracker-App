import React, { useState, useEffect } from "react";
import TaskCard from "../../Components/TaskCard.jsx";
import TaskModal from "../../Components/TaskModal.jsx";
import { FiPlus } from "react-icons/fi";
import { taskAPI } from "../../services/api.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

const Tasks = () => {
  const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await taskAPI.getTasks();
      setTasks(response.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Refresh tasks after adding/editing
  const refreshTasks = () => {
    fetchTasks();
  };

  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    }
  }, [currentUser]);

  const openAddModal = () => {
    setShowModal(true);
    setEditingTask(null);
  };

  const openEditModal = (task) => {
    setShowModal(true);
    setEditingTask(task);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const deleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        refreshTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Please sign in to view tasks</h2>
          <p className="text-gray-600">You need to be authenticated to access your tasks.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 md:px-12 my-4">
      <div>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-20 left-0"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-60 -right-[150px]"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden -bottom-50 left-[300px]"/>
      </div>

      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-black">My Tasks</h1>
          <button
            className="px-6 py-2 rounded-full bg-[#aff901] text-black font-bold shadow hover:opacity-90 transition flex items-center gap-2 text-base sm:text-lg hover:scale-105 active:scale-95"
            onClick={openAddModal}
          >
            <FiPlus className="text-lg" /> Add Task
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#aff901]"></div>
            <p className="mt-2 text-gray-600">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">No tasks yet. Create your first task!</p>
          </div>
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
        refreshTasks={refreshTasks}
      />
    </div>
  );
};

export default Tasks;
