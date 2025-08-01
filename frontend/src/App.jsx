
import React, {useEffect, useState} from 'react';
import Header from "./Components/Header.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Pages/login.jsx";
import Dashboard from "./Pages/main/Dashboard.jsx";
import Tasks from "./Pages/main/Tasks.jsx";
import axios from "axios";
function App() {
  const [taskArray, setTaskArray] = useState([])
  const fetchTasks = async ()=> {
    const response = await axios.get("http://localhost:3000/tasks");
    console.log(response.data.tasks);
    setTaskArray(response.data.tasks);
  }

    useEffect(() => {
      fetchTasks();
    }, []);


  return (
    <>
      <Router >
        <Header />
        {
          taskArray.map((task,id,title) => (
          <div key={task.id} className="task-card">
        <h2>{task.title}</h2>
      </div>
          ))
        }
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/addtask" element={<h1>Add Task Page</h1>} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
