// src/components/common/Modal.jsx
import React from 'react';
import { IoMdClose } from 'react-icons/io';

export default function AdminAddUserModal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white w-[90%] max-w-md p-6 rounded-lg relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-black"
                >
                    <IoMdClose size={20} />
                </button>
                {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
                {children}
            </div>
        </div>
    );
}
