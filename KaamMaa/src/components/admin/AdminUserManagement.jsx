import React, { useState } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { HiOutlinePlus } from 'react-icons/hi';
import AdminAddUserModal from './modal/AdminAddUserModal';
import AdminDeleteUserModal from './modal/AdminDeleteUserModal';
import {
    useAdminUsers,
    useDeleteAdminUser,
    useCreateAdminUser
} from '../../hooks/admin/useAdminUser';
import { useAdminProfession } from '../../hooks/admin/useAdminProfession';

export default function AdminUserManagement() {
    const [showModal, setShowModal] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        phone: '',
        role: '',
        password: '',
        profession: '',
    });

    const {
        users, setPageNumber, error, pagination,
        isPending, canPreviousPage, canNextPage, setSearch
    } = useAdminUsers();

    const { mutate: deleteUser } = useDeleteAdminUser();
    const { mutate: createUser } = useCreateAdminUser();

    // fetch professions
    const { professions, isLoading: isProfessionsLoading } = useAdminProfession();

    const handlePrev = () => {
        if (pagination.page > 1) setPageNumber(prev => prev - 1);
    };

    const handleNext = () => {
        if (pagination.page < pagination.totalPages) setPageNumber(prev => prev + 1);
    };

    const handleSearch = (e) => {
        setPageNumber(1);
        setSearch(e.target.value);
    };

    const handleCreateUser = (e) => {
        e.preventDefault();
        createUser(formData, {
            onSuccess: () => {
                setFormData({
                    username: '',
                    name: '',
                    email: '',
                    phone: '',
                    role: '',
                    password: '',
                    profession: '',
                });
                setShowModal(false);
            }
        });
    };

    const filteredUsers = formData.role
        ? users.filter(user => {
            // If a role filter is active, filter by role
            return user.role === formData.role;
        })
        : users;

    // color coding role badges
    const getRoleColorClass = (role) => {
        switch (role) {
            case 'admin': return 'bg-blue-100 text-blue-700';
            case 'worker': return 'bg-orange-100 text-orange-700';
            case 'customer': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

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
                    <HiOutlinePlus size={18} /> Add User
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search users..."
                        onChange={handleSearch}
                        className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <select
                    className="border border-gray-300 rounded-md px-3 py-2"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="worker">Worker</option>
                    <option value="customer">Customer</option>
                </select>
            </div>

            <div className="bg-white rounded-md shadow-sm overflow-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 text-left">
                        <tr>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Availability</th>
                            <th className="px-4 py-2">Profession</th>
                            <th className="px-4 py-2">Join Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isPending ? (
                            <tr><td colSpan="9" className="text-center py-6">Loading...</td></tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr><td colSpan="9" className="text-center py-6">No users found</td></tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user._id} className="border-b">
                                    <td className="px-4 py-3 font-semibold">{user.username}</td>
                                    <td className="px-4 py-3">{user.name || '-'}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.phone || '-'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getRoleColorClass(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {user.role === 'worker' ? (
                                            <span className={`px-3 py-1 text-xs rounded-full font-medium ${user.availability ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {user.availability ? 'Open to Work' : 'Working'}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-sm">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {user.role === 'worker' ? (
                                            <span className="text-sm text-gray-700 font-medium">
                                                {user.profession?.category || '—'}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-sm">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <FaTrash
                                            onClick={() => {
                                                setSelectedUserToDelete(user);
                                                setDeleteModalOpen(true);
                                            }}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center text-sm">
                <button
                    onClick={handlePrev}
                    disabled={!canPreviousPage}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={!canNextPage}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Create Modal */}
            <AdminAddUserModal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New User">
                <form className="space-y-4" onSubmit={handleCreateUser}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData({
                            ...formData,
                            role: e.target.value,
                            profession: '', // reset profession if role changes
                        })}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="worker">Worker</option>
                        <option value="customer">Customer</option>
                    </select>

                    {formData.role === 'worker' && (
                        <select
                            value={formData.profession || ''}
                            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                            required
                        >
                            <option value="">Select Profession</option>
                            {isProfessionsLoading ? (
                                <option disabled>Loading professions...</option>
                            ) : (
                                professions.map((prof) => (
                                    <option key={prof._id} value={prof._id}>
                                        {prof.category}
                                    </option>
                                ))
                            )}
                        </select>
                    )}

                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#FA5804] text-white py-2 rounded-md hover:bg-orange-600 font-medium"
                    >
                        Create User
                    </button>
                </form>
            </AdminAddUserModal>

            {/* Delete Modal */}
            <AdminDeleteUserModal
                isOpen={deleteModalOpen}
                user={selectedUserToDelete}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={(id) => {
                    deleteUser(id, {
                        onSuccess: () => {
                            setDeleteModalOpen(false);
                            setSelectedUserToDelete(null);
                        }
                    });
                }}
            />
        </div>
    );
}
