import React, { useState, useRef, useEffect } from "react";
import {
    FaTimes, FaMapMarkerAlt, FaPhone, FaUserTie,
    FaClock, FaBriefcase, FaPaperPlane
} from "react-icons/fa";
import { useGetChatHistory, useSendMessage } from "../../../hooks/chat/useChat";
import socket from "../../../utils/socket";

export default function JobDetailModal({ job, onClose }) {
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef(null);
    const { messages, refetch } = useGetChatHistory(job._id);
    const { mutate: sendMessage } = useSendMessage();

    const userId = localStorage.getItem("userId");

    // Join socket room
    useEffect(() => {
        if (!job?._id) return;

        socket.emit("joinRoom", { jobId: job._id });

        socket.on("receiveMessage", (msg) => {
            if (msg.jobId === job._id) {
                refetch();
            }
        });

        return () => socket.off("receiveMessage");
    }, [job?._id]);

    // Auto-scroll to bottom on new message
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = () => {
        const trimmed = newMessage.trim();
        if (!trimmed) return;

        const payload = {
            jobId: job._id,
            content: trimmed,
        };

        sendMessage(payload, {
            onSuccess: () => {
                socket.emit("sendMessage", {
                    jobId: job._id,
                    content: trimmed,
                    createdAt: new Date(),
                });
                setNewMessage("");
            },
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    if (!job) return null;

    const customer = job?.postedBy || {};

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
                    onClick={onClose}
                >
                    <FaTimes size={20} />
                </button>

                <h2 className="text-2xl font-semibold text-[#FA5804] mb-4">Job Details</h2>

                {/* Job Info */}
                <div className="space-y-3 text-gray-800 text-sm">
                    <div className="flex items-center gap-2">
                        <FaBriefcase className="text-[#FA5804]" />
                        <span><strong>Category:</strong> {job.category?.name || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaClock className="text-[#FA5804]" />
                        <span><strong>Date:</strong> {job.date} {job.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#FA5804]" />
                        <span><strong>Location:</strong> {job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaUserTie className="text-[#FA5804]" />
                        <span><strong>Customer:</strong> {customer.username}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaPhone className="text-[#FA5804]" />
                        <span><strong>Phone:</strong> {customer.phone}</span>
                    </div>
                    <div className="mt-1 text-gray-700"><strong>Description:</strong> {job.description}</div>
                </div>

                {/* Chat Section */}
                <div className="mt-6 border-t pt-5">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">💬 Chat with Customer</h3>

                    {/* Messages */}
                    <div className="bg-gray-100 rounded-lg h-64 overflow-y-auto p-3 space-y-3">
                        {messages.length === 0 ? (
                            <p className="text-center text-gray-400 italic">
                                No messages yet. Start the conversation!
                            </p>
                        ) : (
                            messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.senderId?._id === userId ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow
                                            ${msg.senderId?._id === userId
                                                ? "bg-[#FA5804] text-white"
                                                : "bg-white text-gray-800 border border-gray-300"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <div className="mt-3 flex items-center gap-2">
                        <input
                            type="text"
                            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FA5804]"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-[#FA5804] hover:bg-orange-600 text-white p-2 rounded-full transition"
                            aria-label="Send message"
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
