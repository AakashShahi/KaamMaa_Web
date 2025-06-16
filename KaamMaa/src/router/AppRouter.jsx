import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/workers_page/DashBoardPage';
import MainLayout from '../layouts/worker/MainLayout';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          {/* Example: <Route path="jobs" element={<JobsPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
