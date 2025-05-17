import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaEllipsisV } from 'react-icons/fa';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo/kaammaa_logo.png';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [showConfirmLogout, setShowConfirmLogout] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setShowConfirmLogout(true)

    };

    const confirmLogout = () => {
        setShowConfirmLogout(false);
        toast.success('Logout successful!');
        navigate('/login');
    };

    return (
        <header className="w-full relative z-50 flex items-center justify-between px-6 py-3 shadow-sm bg-white">
            {/* Left Section */}
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="KaamMaa Logo" className="h-8 w-auto" />
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-10 text-[15px] font-semibold">
                    <NavLink
                        to="/dashboard/home"
                        className={({ isActive }) =>
                            `transform transition-transform duration-200 hover:scale-105 ${isActive
                                ? 'text-[#FA5804] border-b-2 border-[#FA5804] pb-1'
                                : 'text-gray-700 hover:text-[#FA5804] pb-1'
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <Link className="text-gray-700 hover:text-[#FA5804] hover:scale-105 transition-transform duration-200 pb-1">
                        Jobs List
                    </Link>
                    <Link className="text-gray-700 hover:text-[#FA5804] hover:scale-105 transition-transform duration-200 pb-1">
                        My Jobs
                    </Link>
                    <Link className="text-gray-700 hover:text-[#FA5804] hover:scale-105 transition-transform duration-200 pb-1">
                        Search
                    </Link>
                </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 relative" ref={menuRef}>
                <FaUserCircle className="text-2xl text-black" />
                <span className="text-[#FA5804] font-medium">David</span>
                <FaEllipsisV
                    className="text-xl text-black cursor-pointer hover:text-[#FA5804]"
                    onClick={() => setShowMenu(!showMenu)}
                />

                {/* Dropdown */}
                {showMenu && (
                    <div className="absolute right-0 top-14 w-48 bg-white shadow-md rounded-lg py-2 border z-50">
                        <Link
                            to="/dashboard/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowMenu(false)}
                        >
                            View Profile
                        </Link>
                        <Link
                            to="/dashboard/my-jobs"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowMenu(false)}
                        >
                            My Jobs
                        </Link>
                        <Link
                            to="/dashboard/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowMenu(false)}
                        >
                            Settings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Logout Confirmation Modal */}
            {showConfirmLogout && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-sm">
                        <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
                        <p className="mb-6 text-sm text-gray-600">Are you sure you want to logout?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowConfirmLogout(false)}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
