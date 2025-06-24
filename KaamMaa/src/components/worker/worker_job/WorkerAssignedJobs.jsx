import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaBriefcase } from "react-icons/fa";
import { useWorkerAssignedJob, useAcceptAssignedJob, useRejectAssignedJob } from "../../../hooks/worker/useWorkerJob";
import { getBackendImageUrl } from "../../../utils/backend_image";

export default function WorkerAssignedJobs() {
    const { assignedJobs, isLoading, isError } = useWorkerAssignedJob();
    const { mutate: acceptJob, isLoading: isAccepting } = useAcceptAssignedJob();
    const { mutate: rejectJob, isLoading: isRejecting } = useRejectAssignedJob();
    const [selectedJobId, setSelectedJobId] = useState(null);

    if (isLoading) {
        return <div className="text-center text-gray-500">Loading assigned jobs...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500">Failed to load assigned jobs.</div>;
    }

    if (assignedJobs.length === 0) {
        return <div className="text-center text-gray-400">No assigned jobs found.</div>;
    }

    return (
        <div className="space-y-6">
            {assignedJobs.map((job, index) => {
                const customer = job.postedBy || {};

                return (
                    <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white shadow-md rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition duration-300"
                    >
                        {/* Icon */}
                        <div className="w-24 h-24 flex-shrink-0">
                            {job.category?.icon ? (
                                <img
                                    src={getBackendImageUrl(job.category.icon)}
                                    alt="icon"
                                    className="w-full h-full object-contain rounded"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded text-sm text-gray-500">
                                    No Icon
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 space-y-2">
                            <h3 className="text-xl font-semibold text-gray-800">{job.description}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <FaMapMarkerAlt className="text-[#FA5804]" />
                                    {job.location || "N/A"}
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaBriefcase className="text-blue-500" />
                                    {job.category?.name || "General"}
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaClock className="text-green-500" />
                                    {job.date && job.time
                                        ? `${job.date} ${job.time}`
                                        : job.createdAt
                                            ? new Date(job.createdAt).toLocaleString()
                                            : "N/A"}
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaMapMarkerAlt className="text-purple-500" />
                                    <span className="font-medium">Customer:</span>{" "}
                                    {customer.name || "Unknown"} - {customer.location || "N/A"}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 justify-center">
                            <button
                                onClick={() => acceptJob(job._id)}
                                disabled={isAccepting && selectedJobId === job._id}
                                className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {isAccepting && selectedJobId === job._id ? "Accepting..." : "Accept"}
                            </button>
                            <button
                                onClick={() => rejectJob(job._id)}
                                disabled={isRejecting && selectedJobId === job._id}
                                className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
                            >
                                {isRejecting && selectedJobId === job._id ? "Rejecting..." : "Reject"}
                            </button>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
