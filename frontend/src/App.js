import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import Layout from './components/Layout';
import Login from './pages/Login';
import NewChat from './pages/NewChat';
import Chat from './pages/Chat';
import ChatHistory from './pages/ChatHistory';
import Agents from './pages/Agents';
import Projects from './pages/Projects';
import Integrations from './pages/Integrations';
import UsersRoles from './pages/UsersRoles';
import Alerts from './pages/Alerts';
import ServiceStatus from './pages/ServiceStatus';
import Payments from './pages/Payments';
import Help from './pages/Help';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated (mock)
    const authStatus = localStorage.getItem('behive_authenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);
  
  const handleLogin = () => {
    localStorage.setItem('behive_authenticated', 'true');
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    localStorage.setItem('behive_authenticated', 'false');
    setIsAuthenticated(false);
  };
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/chat/new" replace /> : <Login onLogin={handleLogin} />
          } />
          
          <Route path="/" element={
            isAuthenticated ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }>
            <Route index element={<Navigate to="/chat/new" replace />} />
            <Route path="chat" element={<ChatHistory />} />
            <Route path="chat/new" element={<NewChat />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="agents" element={<Agents />} />
            <Route path="projects" element={<Projects />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="users" element={<UsersRoles />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="service-status" element={<ServiceStatus />} />
            <Route path="payments" element={<Payments />} />
            <Route path="help" element={<Help />} />
          </Route>
          
          <Route path="*" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
