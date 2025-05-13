import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}
