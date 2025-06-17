import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateOneProfession } from "../../../hooks/admin/useAdminProfession";

export default function UpdateProfessionModal({ isOpen, onClose, profession }) {
    const { register, handleSubmit, reset } = useForm();
    const { mutate, isPending } = useUpdateOneProfession();

    useEffect(() => {
        if (profession) {
            reset({
                name: profession.name,
                category: profession.category,
                description: profession.description
            });
        }
    }, [profession]);

    const onSubmit = (data) => {
        mutate(
            { id: profession._id, data },
            {
                onSuccess: () => {
                    onClose();
                }
            }
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-md rounded-md shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Update Profession</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <input {...register("name")} required className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Category</label>
                        <input {...register("category")} className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea {...register("description")} className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                            Cancel
                        </button>
                        <button type="submit" disabled={isPending} className="px-4 py-2 bg-primary text-white rounded">
                            {isPending ? "Saving..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
