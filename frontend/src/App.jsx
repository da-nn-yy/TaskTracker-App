
import Header from "./Components/Header.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Pages/login.jsx";
import Dashboard from "./Pages/main/Dashboard.jsx";
import Tasks from "./Pages/main/Tasks.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/tasks" element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          } />
          <Route path="/addtask" element={
            <ProtectedRoute>
              <h1>Add Task Page</h1>
            </ProtectedRoute>
          } />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
