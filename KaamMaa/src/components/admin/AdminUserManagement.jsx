import React, { useState } from 'react';
import { FaSearch, FaTrash, FaEdit } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { HiOutlinePlus } from 'react-icons/hi';

export default function AdminUserManagement() {
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState("All Roles");
    const [search, setSearch] = useState("");

    const users = [
        {
            name: "John Doe",
            email: "john@example.com",
            role: "Worker",
            profession: "Plumber",
            status: "Active",
            date: "2024-01-15"
        },
        {
            name: "Sarah Khan",
            email: "sarah@example.com",
            role: "Customer",
            profession: "-",
            status: "Active",
            date: "2024-02-20"
        },
        {
            name: "Ahmed Ali",
            email: "ahmed@example.com",
            role: "Worker",
            profession: "Electrician",
            status: "Pending",
            date: "2024-03-10"
        }
    ];

    const filteredUsers = users.filter(user => {
        return (
            (filter === "All Roles" || user.role === filter) &&
            user.name.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold">User Management</h2>
                    <p className="text-sm text-gray-500">Manage workers and customers</p>
                </div>
                <button
                    className="bg-[#FA5804] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-orange-600"
                    onClick={() => setShowModal(true)}
                >
                    <HiOutlinePlus size={18} />
                    Add User
                </button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-3 mb-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3"
                >
                    <option>All Roles</option>
                    <option>Worker</option>
                    <option>Customer</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-md shadow-sm overflow-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 text-left">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Profession</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Join Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="px-4 py-3 font-semibold">{user.name}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">
                                    <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-semibold">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{user.profession}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${user.status === "Active"
                                        ? "bg-black text-white"
                                        : "bg-gray-200 text-gray-800"
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{user.date}</td>
                                <td className="px-4 py-3 flex gap-3">
                                    <FaEdit className="text-gray-600 hover:text-blue-500 cursor-pointer" />
                                    <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white w-[90%] sm:w-[400px] rounded-lg p-6 shadow-lg relative">
                        <button
                            className="absolute right-4 top-4 text-gray-600 hover:text-black"
                            onClick={() => setShowModal(false)}
                        >
                            <IoMdClose size={20} />
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Add New User</h3>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full border border-gray-300 rounded-md px-4 py-2"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border border-gray-300 rounded-md px-4 py-2"
                            />
                            <select
                                className="w-full border border-gray-300 rounded-md px-4 py-2"
                            >
                                <option>Select Role</option>
                                <option value="Customer">Customer</option>
                                <option value="Worker">Worker</option>
                            </select>
                            <button
                                type="submit"
                                className="w-full bg-[#FA5804] text-white py-2 rounded-md hover:bg-orange-600 font-medium"
                            >
                                Create User
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
