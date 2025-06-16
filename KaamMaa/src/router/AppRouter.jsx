import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MainLayout from '../layouts/worker/MainLayout';
import AdminUserRoute from './admin/AdminUserRoute';
import WorkerUserRoute from './worker/WorkerUserRoute';
import WorkerDashboardPage from '../pages/workers_page/WorkerDashBoardPage';

// Optional: NotFound component for consistency
const NotFound = () => <div className="text-center text-xl font-bold mt-10">404 Ghar Jaa</div>;

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Worker Protected Routes */}
        <Route path="/worker/*" element={<WorkerUserRoute />}>
          <Route path="dashboard" element={<MainLayout />}>
            <Route index element={<WorkerDashboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Admin Protected Routes */}
        <Route path="/admin/*" element={<AdminUserRoute />}>
          <Route path="dashboard" element={<>Admin Dashboard</>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Catch-all fallback (optional) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
