import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
    </Routes>
    </BrowserRouter>
  )
}
