import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main style={{ marginLeft: '250px', marginTop: '56px', padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;