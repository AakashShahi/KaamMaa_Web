import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo/kaammaa_logo.png';
import { AuthContext } from "../../auth/AuthProvider";

export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();
    const { logout, user } = useContext(AuthContext);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const confirmLogout = () => {
        toast.success("Logout successful!");
        setShowLogoutModal(false);
        logout();
        navigate('/login');
    };

    return (
        <>
            <header className="w-full bg-white shadow-sm flex items-center justify-between px-6 py-3 z-50 font-Inter">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img src={logo} alt="KaamMaa Logo" className="w-15 h-14 rounded-md object-contain" />
                </div>

                {/* Navigation */}
                <nav className="flex items-center gap-6 text-[15px] font-medium">
                    {[
                        { to: "/worker/dashboard", label: "Home", exact: true },
                        { to: "/worker/dashboard/jobs", label: "Jobs List" },
                        { to: "/worker/dashboard/myjobs", label: "My Jobs" },
                        { to: "/worker/dashboard/search", label: "Search" },
                    ].map(({ to, label, exact }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={exact}
                            className={({ isActive }) =>
                                `px-4 py-1.5 rounded-full transition font-semibold ${isActive
                                    ? "text-white bg-gradient-to-r from-[#FA5804] to-[#f43f5e]"
                                    : "text-gray-700 hover:text-[#FA5804]"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Right Profile & Notification */}
                <div className="flex items-center gap-4 relative" ref={profileRef}>
                    <div className="relative">
                        <FaBell className="text-gray-600 text-lg cursor-pointer hover:text-[#FA5804]" />
                        <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-pink-500"></span>
                    </div>

                    <div
                        onClick={() => setShowDropdown(prev => !prev)}
                        className="flex items-center gap-3 cursor-pointer bg-orange-50 border border-orange-200 px-3 py-1 rounded-full hover:shadow transition"
                    >
                        <div className="w-7 h-7 rounded-full bg-gray-200 shadow-inner flex items-center justify-center">
                            <img
                                alt="User Avatar"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm font-medium text-gray-800">{user?.name || "User"}</span>
                            <span className="text-[11px] text-green-500 font-semibold">● Online</span>
                        </div>
                    </div>

                    {/* Dropdown */}
                    {showDropdown && (
                        <div className="absolute top-14 right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            <button
                                onClick={() => {
                                    setShowDropdown(false);
                                    navigate('/worker/dashboard/profile');
                                }}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Profile Settings
                            </button>
                            <button
                                onClick={() => {
                                    setShowDropdown(false);
                                    setShowLogoutModal(true);
                                }}
                                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
                        <h2 className="text-lg font-bold mb-4 text-gray-800">Confirm Logout</h2>
                        <p className="text-sm text-gray-600 mb-6">Are you sure you want to logout?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
