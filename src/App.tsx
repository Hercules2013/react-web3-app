import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import SwapPage from './pages/Swap';
import PortfolioPage from './pages/Portfolio';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import styles from './App.module.css'; // Adjust your CSS module as necessary

export default function App() {
  const location = useLocation();

  // Function to map pathname to tab value
  const getPathTabValue = (path: string) => {
    switch(path) {
      case '/': return 0;
      case '/portfolio': return 1;
      default: return 0;
    }
  };

  return (
    <main className={styles.main}>
      <AppBar position="static" color="default" className={styles.header}>
        <Toolbar>
          <Tabs value={getPathTabValue(location.pathname)} indicatorColor="primary" textColor="primary">
            <Tab label="Swap" component={Link} to="/" />
            <Tab label="Transaction" component={Link} to="/portfolio" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<SwapPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </main>
    </main>
  );
}
