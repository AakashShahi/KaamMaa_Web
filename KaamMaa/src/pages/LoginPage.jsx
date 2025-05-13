import React from 'react'
import logo from '../assets/logo/kaammaa_logo.png'
import workerImg from '../assets/logo/login_worker.png'

export default function LoginPage() {
  return (
    <div className="w-screen h-screen bg-white p-4 relative">
      {/* Logo in top-left corner */}
      <div className="absolute top-4 left-4">
        <img
          src={logo}
          alt="KaamMaa Logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Worker image vertically centered */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-full max-w-md">
        <img
          src={workerImg}
          alt="Worker"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  )
}