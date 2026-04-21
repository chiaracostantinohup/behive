import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import Layout from './components/Layout';
import Login from './pages/Login';
import NewChat from './pages/NewChat';
import Chat from './pages/Chat';
import ChatHistory from './pages/ChatHistory';
import Agents from './pages/Agents';
import AgentDetail from './pages/AgentDetail';
import Projects from './pages/Projects';
import ProjectDashboard from './pages/ProjectDashboard';
import ProjectConversation from './pages/ProjectConversation';
import Integrations from './pages/Integrations';
import IntegrationDetail from './pages/IntegrationDetail';
import SearchResults from './pages/SearchResults';
import UsersRoles from './pages/UsersRoles';
import Alerts from './pages/Alerts';
import ServiceStatus from './pages/ServiceStatus';
import Payments from './pages/Payments';
import Help from './pages/Help';
import Profile from './pages/Profile';
import OnboardingHome from './pages/OnboardingHome';
import SetupWizard from './pages/SetupWizard';
import CaptureSession from './pages/CaptureSession';
import SessionList from './pages/SessionList';
import OnboardingReview from './pages/OnboardingReview';
import MarketplaceBrowse from './pages/MarketplaceBrowse';
import TemplatePreview from './pages/TemplatePreview';
import MyPublications from './pages/MyPublications';
import PublishWizard from './pages/PublishWizard';
import AcquiredTemplates from './pages/AcquiredTemplates';
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
    <ThemeProvider attribute="class" defaultTheme="dark" storageKey="behive_theme">
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
              <Route path="agents/:agentId" element={<AgentDetail />} />
              <Route path="agents/:agentId/activity" element={<AgentDetail />} />
              <Route path="agents/:agentId/settings" element={<AgentDetail />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:projectId" element={<ProjectDashboard />} />
              <Route path="projects/:projectId/chat/:chatId" element={<ProjectConversation />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="integrations/:integrationId" element={<IntegrationDetail />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="users" element={<UsersRoles />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="service-status" element={<ServiceStatus />} />
              <Route path="payments" element={<Payments />} />
              <Route path="help" element={<Help />} />
              <Route path="profile" element={<Profile />} />
              <Route path="onboarding" element={<OnboardingHome />} />
              <Route path="onboarding/setup" element={<SetupWizard />} />
              <Route path="onboarding/sessions" element={<SessionList />} />
              <Route path="onboarding/session/:sessionId" element={<CaptureSession />} />
              <Route path="onboarding/review" element={<OnboardingReview />} />
              <Route path="onboarding/review/glossary" element={<OnboardingReview />} />
              <Route path="onboarding/review/catalog" element={<OnboardingReview />} />
              <Route path="marketplace" element={<MarketplaceBrowse />} />
              <Route path="marketplace/publications" element={<MyPublications />} />
              <Route path="marketplace/publish" element={<PublishWizard />} />
              <Route path="marketplace/acquired" element={<AcquiredTemplates />} />
              <Route path="marketplace/:templateId" element={<TemplatePreview />} />
            </Route>

            <Route path="*" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} replace />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
