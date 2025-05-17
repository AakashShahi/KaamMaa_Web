import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes under Dashboard */}
        <Route path="/dashboard" element={<MainLayout />}>
          <Route path="home" element={<HomePage />} />
          {/* Add more nested routes like `jobs`, `my-jobs` here later */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
