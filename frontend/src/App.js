import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import Layout from './components/Layout';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import OnboardingSession from './pages/OnboardingSession';
import NewChat from './pages/NewChat';
import Chat from './pages/Chat';
import ChatHistory from './pages/ChatHistory';
import Agents from './pages/Agents';
import Projects from './pages/Projects';
import ProjectChats from './pages/ProjectChats';
import Integrations from './pages/Integrations';
import Knowledge from './pages/Knowledge';
import KnowledgeNewSession from './pages/KnowledgeNewSession';
import UsersRoles from './pages/UsersRoles';
import Alerts from './pages/Alerts';
import ServiceStatus from './pages/ServiceStatus';
import Payments from './pages/Payments';
import Help from './pages/Help';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('behive_authenticated') === 'true'
  );
  
  useEffect(() => {
    // Initialize theme on app startup
    const savedTheme = localStorage.getItem('theme') || 'auto';
    const root = document.documentElement;
    
    if (savedTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
      root.classList.toggle('light', !prefersDark);
    } else {
      root.classList.add(savedTheme);
      root.classList.remove(savedTheme === 'dark' ? 'light' : 'dark');
    }
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
            isAuthenticated ? <Navigate to="/onboarding" replace /> : <Login onLogin={handleLogin} />
          } />
          
          <Route path="/onboarding" element={
            isAuthenticated ? <Onboarding /> : <Navigate to="/login" replace />
          } />
          
          <Route path="/onboarding/session" element={
            isAuthenticated ? <OnboardingSession /> : <Navigate to="/login" replace />
          } />
          
          <Route path="/knowledge/new-session" element={
            isAuthenticated ? <KnowledgeNewSession /> : <Navigate to="/login" replace />
          } />
          
          <Route path="/" element={
            isAuthenticated ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }>
            <Route index element={<Navigate to="/onboarding" replace />} />
            <Route path="chat" element={<ChatHistory />} />
            <Route path="chat/new" element={<NewChat />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="agents" element={<Agents />} />
            <Route path="knowledge" element={<Knowledge />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectChats />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="users" element={<UsersRoles />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="service-status" element={<ServiceStatus />} />
            <Route path="payments" element={<Payments />} />
            <Route path="help" element={<Help />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          <Route path="*" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
