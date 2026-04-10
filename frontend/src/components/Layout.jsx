import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export const Layout = ({ onLogout }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar onLogout={onLogout} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
