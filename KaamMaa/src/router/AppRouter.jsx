import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MainLayout from '../layouts/worker/MainLayout';
import AdminUserRoute from './admin/AdminUserRoute';
import WorkerUserRoute from './worker/WorkerUserRoute';
import WorkerDashboardPage from '../pages/workers_page/WorkerDashBoardPage';
import AdminMainLayout from '../layouts/admin/AdminMainLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminUserManagement from '../components/admin/AdminUserManagement';
import AdminReviewManagement from '../components/admin/AdminReviewManagement';
import AdminProfessionManagement from '../components/admin/AdminProfessionManagement';
import AdminVerificationsManagement from '../components/admin/AdminVerificationsManagement';
import AdminSetting from '../components/admin/AdminSetting';
import WorkerJobListPage from '../pages/workers_page/WorkerJobListPage';
import WorkerJobsPage from '../pages/workers_page/WorkerJobsPage';
import WorkerProfilePage from '../pages/workers_page/WorkerProfilePage';
import WorkerReviewPage from '../pages/workers_page/WorkerReviewPage';
import AdminJobManagement from '../components/admin/AdminJobManagement';

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
        {/* Worker Dashboard and Job Management */}
        <Route path="/worker/*" element={<WorkerUserRoute />}>
          <Route path="dashboard" element={<MainLayout />}>
            <Route index element={<WorkerDashboardPage />} />
            <Route path='jobs' element={<WorkerJobListPage />} />
            <Route path='myjobs' element={<WorkerJobsPage />} />
            <Route path='search' element={<WorkerReviewPage />} />
            <Route path='profile' element={<WorkerProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Admin Protected Routes */}
        <Route path="/admin/*" element={<AdminUserRoute />}>
          <Route path='dashboard' element={<AdminMainLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUserManagement />} />
            <Route path="jobs" element={<AdminJobManagement />} />
            <Route path="reviews" element={<AdminReviewManagement />} />
            <Route path="professions" element={<AdminProfessionManagement />} />
            <Route path="verifications" element={<AdminVerificationsManagement />} />
            <Route path="settings" element={<AdminSetting />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Catch-all fallback (optional) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
