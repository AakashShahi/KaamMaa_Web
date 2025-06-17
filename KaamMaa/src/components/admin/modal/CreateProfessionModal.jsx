import React from "react";
import { useForm } from "react-hook-form";
import { useCreateProfession } from "../../../hooks/admin/useAdminProfession";
import { toast } from "react-toastify";

export default function CreateProfessionModal({ isOpen, onClose }) {
    const { register, handleSubmit, reset } = useForm();
    const { mutate, isPending } = useCreateProfession();

    const onSubmit = (data) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("category", data.category);
        formData.append("description", data.description);
        if (data.icon && data.icon[0]) {
            formData.append("icon", data.icon[0]);
        }

        mutate(formData, {
            onSuccess: () => {
                toast.success("Profession created");
                reset();
                onClose();
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || "Failed to create profession");
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-md rounded-md shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Add Profession</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <input
                            {...register("name", { required: true })}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Category</label>
                        <input
                            {...register("category")}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            {...register("description")}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Icon Image</label>
                        <input
                            type="file"
                            {...register("icon", { required: true })}
                            accept="image/*"
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-4 py-2 bg-primary text-white rounded"
                        >
                            {isPending ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
