import React, {useEffect, useState} from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import tasks from "../Pages/main/Tasks.jsx";
import TaskModal from "./TaskModal.jsx";

const TaskCard = ({refreshTasks}) => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null)

    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        console.log(response.data.tasks);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error while fecthing data",error);
      }
    }
  useEffect(() => {
      fetchTasks()
  },[])

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    }catch (error) {
      console.error("Error deleting task:", error);
    }
  }


  const openEditModal = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  return (


<>
  {tasks.length > 0 ? (tasks.map((task) => (
    <div
      className="bg-black rounded-2xl p-4 sm:p-6 flex flex-col gap-2 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 focus-within:ring-2 focus-within:ring-[#aff901] focus-within:ring-offset-2 outline-none"
    key={task.id}
    >

      <h2 className="text-lg sm:text-xl font-bold text-[#aff901]">{task.title}</h2>
      <span className="text-lg sm:text-xl font-bold text-[#aff901]">{task.description}</span>

      <span className="text-white text-xs sm:text-sm font-medium">Status: {task.status}</span>
      <span className="text-white text-xs sm:text-sm font-medium">Added: {task.created_at}</span>


      <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
        <button className="px-3 py-1 rounded-full bg-[#aff901] text-black font-semibold text-xs flex items-center gap-1 transition-transform duration-150 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#aff901]"
        onClick={() => openEditModal(task)}>
          <FiEdit2 className="text-base" /> Edit
        </button>
        <button className="px-3 py-1 rounded-full bg-white text-black font-semibold text-xs border border-[#aff901] flex items-center gap-1 transition-transform duration-150 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#aff901]"
                onClick={() => deleteTask(task.id)}
        >
          <FiTrash2 className="text-base" /> Delete
        </button>
        <TaskModal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  refreshTasks={fetchTasks}
                  task={task}
                />
      </div>
    </div>
  ))):(
    <div  className="col-span-full text-center text-gray-400 py-12 text-lg">No tasks available</div>)
      }
  </>
  );
};

export default TaskCard;


