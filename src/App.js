import React, { useState } from 'react';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import LoginPage from './pages/LoginPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (role, user, authToken) => {
    setUserRole(role);
    setCurrentUser(user);
    setToken(authToken);
    localStorage.setItem('token', authToken); // Backend se token aayega
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="App">
      {!currentUser ? (
        <LoginPage onLogin={handleLogin} />
      ) : userRole === 'admin' ? (
        <AdminDashboard user={currentUser} token={token} onLogout={handleLogout} />
      ) : (
        <StudentDashboard user={currentUser} token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;