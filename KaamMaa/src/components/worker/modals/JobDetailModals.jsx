import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaMapMarkerAlt, FaPhone, FaUserTie, FaClock, FaBriefcase, FaPaperPlane } from "react-icons/fa";

const mockMessages = [
    { from: "customer", text: "Hi, are you coming on time?" },
    { from: "worker", text: "Yes, I will be there at 10:00 AM." },
    { from: "customer", text: "Great, see you!" },
    { from: "worker", text: "Looking forward to it!" },
];

export default function JobDetailModal({ job, onClose }) {
    const [messages, setMessages] = useState(mockMessages);
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef(null);

    const customer = job?.postedBy || {};

    const handleSend = () => {
        if (newMessage.trim()) {
            setMessages((prev) => [...prev, { from: "worker", text: newMessage.trim() }]);
            setNewMessage("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (!job) return null;

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
                        <span><strong>Customer:</strong> {customer.name}</span>
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

                    <div className="bg-gray-100 rounded-lg h-64 overflow-y-auto p-3 space-y-3">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.from === "worker" ? "justify-start" : "justify-end"}`}
                            >
                                <div
                                    className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow ${msg.from === "worker"
                                        ? "bg-white text-gray-800 border border-gray-300"
                                        : "bg-[#FA5804] text-white"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
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
