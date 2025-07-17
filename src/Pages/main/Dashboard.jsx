import React, { useState } from "react";
import TaskCard from "../../Components/TaskCard.jsx";
import FilterBar from "../../Components/FilterBar.jsx";
import AddTaskModal from "../../Components/AddTaskModal.jsx";
import { FiPlus } from "react-icons/fi";

const initialTasks = [
  { id: 1, title: "Design UI Mockups", status: "In Progress" },
  { id: 2, title: "Set up Database", status: "Completed" },
  { id: 3, title: "Write Documentation", status: "Pending" },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [editingTask, setEditingTask] = useState(null);

  // Add Task
  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  // Edit Task
  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Open Add Modal
  const openAddModal = () => {
    setModalMode("add");
    setEditingTask(null);
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (task) => {
    setModalMode("edit");
    setEditingTask(task);
    setShowModal(true);
  };

  // Filtered Tasks
  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  return (
    <div className="container min-h-screen bg-[#eaf4f4] py-8 px-4 sm:px-8 md:px-12 my-4">
      <AddTaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        mode={modalMode}
        initialTask={editingTask}
        onSave={(task) => {
          if (modalMode === "add") handleAddTask(task);
          else handleEditTask(task);
          setShowModal(false);
        }}
      />
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-3 sm:gap-4">
        <FilterBar filter={filter} onFilterChange={setFilter} />
      </div>
      {/* Task List */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            status={task.status}
            onEdit={() => openEditModal(task)}
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))}
        {filteredTasks.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12 text-lg">No tasks found.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
