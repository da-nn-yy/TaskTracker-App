import React from 'react';
import Header from "./Components/Header.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Pages/login.jsx";
function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/addtask" element={<h1>Add Task Page</h1>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
