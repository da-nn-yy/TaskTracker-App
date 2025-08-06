import React, { useState } from "react";
import TaskCard from "../../Components/TaskCard.jsx";
import AddTaskModal from "../../Components/AddTaskModal.jsx";
import { FiPlus } from "react-icons/fi";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = (task) => {
    setTasks([
      ...tasks,
      { ...task, id: Date.now(), createdAt: new Date().toISOString() },
    ]);
  };
  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? { ...updatedTask } : t)));
  };
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };
  const openAddModal = () => {
    setModalMode("add");
    setEditingTask(null);
    setShowModal(true);
  };
  const openEditModal = (task) => {
    setModalMode("edit");
    setEditingTask(task);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 md:px-12 my-4">
      <div>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-20 left-0"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-60 -right-[150px]"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden -bottom-50 left-[300px]"/>
      </div>
      <div className="container">

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
        showEndingDate={true}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black">All Tasks</h1>
        <button
          className="px-6 py-2 rounded-full bg-[#aff901] text-black font-bold shadow hover:opacity-90 transition flex items-center gap-2 text-base sm:text-lg hover:scale-105 active:scale-95"
          onClick={openAddModal}
        >
          <FiPlus className="text-lg" /> Add Task
        </button>
      </div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          <TaskCard/>

      </div>
      </div>
    </div>
  );
};

export default Tasks;
