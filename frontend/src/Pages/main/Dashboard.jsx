import React, {useEffect, useState} from "react";
import TaskCard from "../../Components/TaskCard.jsx";
import TaskModal from "../../Components/TaskModal.jsx";
import { FiPlus } from "react-icons/fi";
import axios from "axios";

const Dashboard = ({task}) => {
  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(true);

    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        console.log(response.data.tasks);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error while fecthing data", error);
      }
    }

  useEffect(() => {
      fetchTasks()
  },[])
  return (
    <div className="min-h-screen  py-8 px-4 sm:px-8 md:px-12 my-4">
      <div className="-z-1">
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-20 -left-30"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-60 -right-[150px]"/>
        <div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden -bottom-50 left-[300px]"/>
      </div>
      <div className="container">



        {tasks.map((task, index) => (
          <div  className="grid grid-rows-3 gap-2 mt-3 sm:mt-4"><TaskCard
          key={task.id}
          task={task}
          />
        </div>
        ))}

      {/*<TaskModal*/}
      {/*  isOpen={showModal}*/}
      {/*  onClose={() => setShowModal(false)}*/}
      {/*  refreshTasks={fetchTasks}*/}
      {/*  task={task}*/}
      {/*/>*/}

      </div>
      </div>
  );
};

export default Dashboard;


