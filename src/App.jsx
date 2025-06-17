import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Notification from './Components/Notificatons';
import axios from 'axios';

import Input from './Components/Input';
import Tasklist from './Components/Tasklist';
import UserMenu from './Components/UserMenu';

import SignIn from './Pages/signin';
import SignUp from './Pages/signup';
import Logout from './Pages/logout';

function App() {
  const location = useLocation();
  const [notification, setNotification] = useState({ message: '', type: '' });

// Function to trigger notification
const showNotification = (message, type = 'info') => {
  setNotification({ message, type });
};
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/todos", {
        headers: { token: token },
      });
      const titles = response.data.todos.map(todo => todo.title);
      setTasks(titles);
    } catch (err) {
      navigate("/signin");
      console.error("Failed to fetch todos", err);
    }
  };

  // Run fetch only on home and /todos route
  if (location.pathname === '/' || location.pathname === '/todos') {
    fetchTodos();
  }
}, [navigate, location]);


  const handleAddTask = async (task) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:3000/todo",
        { title: task, done: false },
        { headers: { token: token } }
      );
      setTasks((prev) => [...prev, task]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleDeleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleAllClear = () => {
    setTasks([]);
  };

  return (
    <div style={{
      backgroundColor: '#0f172a', // Dark blue background
      minHeight: '100vh',
      padding: '40px',
    }}>
      <h1
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '40px',
          fontWeight: '700',
          letterSpacing: '1px',
          textAlign: 'center',
          marginBottom: '30px',
          color: '#f8fafc',
          textTransform: 'uppercase',
        }}
      >
        Todo App
      </h1>
<Notification
  message={notification.message}
  type={notification.type}
  onClose={() => setNotification({ message: '', type: '' })}
/>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Input handleAddTask={handleAddTask} handleAllClear={handleAllClear} />
              <Tasklist tasks={tasks} handleDeleteTask={handleDeleteTask} />
            </>
          }
        />
        <Route path="/signin" element={<SignIn showNotification={showNotification} />} />
        <Route path="/signup" element={<SignUp showNotification={showNotification}/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/todos" element={
          <>
            <Input handleAddTask={handleAddTask} handleAllClear={handleAllClear} />
            <Tasklist tasks={tasks} handleDeleteTask={handleDeleteTask} />
          </>
        } />
      </Routes>

      <UserMenu />
    </div>
  );
}

export default App;
