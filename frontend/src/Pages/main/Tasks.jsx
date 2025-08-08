import React, { useState } from "react";
import TaskCard from "../../Components/TaskCard.jsx";
import TaskModal from "../../Components/TaskModal.jsx";
import { FiPlus } from "react-icons/fi";

const Tasks = ({fetchTasks}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openAddModal = () => {
    setShowModal(true);
    setEditingTask(null);
  }

  const openEditModal = (task) => {
    setShowModal(true);
    setEditingTask(task);
  }

  const closeModal = () => {
    console.log('Closing modal...');
    setShowModal(false);
  };
  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 md:px-12 my-4">
      <div>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-20 left-0"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-60 -right-[150px]"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden -bottom-50 left-[300px]"/>
      </div>
      <div className="container">

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
      <TaskModal
        iopen={showModal}
        onClose={closeModal}
        task={openAddModal ? null : openEditModal}
        refreshTasks={fetchTasks}
      />

      </div>
      </div>
    </div>
  );
};

export default Tasks;
