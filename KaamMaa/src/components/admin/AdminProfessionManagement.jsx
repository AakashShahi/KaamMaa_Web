import React, { useState } from "react";
import { useAdminProfession } from "../../hooks/admin/useAdminProfession";
import CreateProfessionModal from "./modal/CreateProfessionModal";
import UpdateProfessionModal from "./modal/UpdateProfessionModal";
import DeleteProfessionModal from "./modal/DeleteProfessionModal";
import { getBackendImageUrl } from "../../utils/backend_image";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function AdminProfessionManagement() {
    const { professions, isLoading } = useAdminProfession();

    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedProfession, setSelectedProfession] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const handleEdit = (profession) => {
        setSelectedProfession(profession);
        setShowEdit(true);
    };

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowDelete(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Profession Management</h1>
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                    <Plus size={18} />
                    Add Profession
                </button>
            </div>

            {isLoading ? (
                <p className="text-gray-600">Loading professions...</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow rounded-md">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-4 py-3 text-sm font-semibold">#</th>
                                <th className="px-4 py-3 text-sm font-semibold">Icon</th>
                                <th className="px-4 py-3 text-sm font-semibold">Name</th>
                                <th className="px-4 py-3 text-sm font-semibold">Category</th>
                                <th className="px-4 py-3 text-sm font-semibold">Description</th>
                                <th className="px-4 py-3 text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {professions.map((profession, index) => (
                                <tr key={profession._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        {profession.icon ? (
                                            <img
                                                src={getBackendImageUrl(profession.icon)}
                                                alt="icon"
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                        ) : (
                                            <span className="text-gray-400 text-sm">No image</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium">{profession.name}</td>
                                    <td className="px-4 py-3 text-sm">{profession.category || "—"}</td>
                                    <td className="px-4 py-3 text-sm">{profession.description || "—"}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(profession)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(profession._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modals */}
            <CreateProfessionModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
            <UpdateProfessionModal
                isOpen={showEdit}
                onClose={() => setShowEdit(false)}
                profession={selectedProfession}
            />
            <DeleteProfessionModal
                isOpen={showDelete}
                onClose={() => setShowDelete(false)}
                professionId={selectedId}
            />
        </div>
    );
}
