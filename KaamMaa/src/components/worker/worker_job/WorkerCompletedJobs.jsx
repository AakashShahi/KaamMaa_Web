import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaBriefcase, FaSearch } from "react-icons/fa";
import { useWorkerCompletedJob } from "../../../hooks/worker/useWorkerJob";
import { getBackendImageUrl } from "../../../utils/backend_image";

export default function WorkerCompletedJobs() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [queryParams, setQueryParams] = useState({});

    const {
        completedJobs,
        pagination,
        isLoading,
        isError
    } = useWorkerCompletedJob({ page, limit: 10, ...queryParams });

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        setQueryParams({
            search: search.trim()
        });
    };

    return (
        <div className="space-y-6">
            {/* 🔍 Search */}
            <form
                onSubmit={handleSearchSubmit}
                className="flex flex-wrap gap-4 items-end bg-white p-6 rounded-xl shadow-md mb-6"
            >
                <div className="flex-1 min-w-[250px]">
                    <label className="block text-sm font-medium text-gray-700">Search</label>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#FA5804] text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition duration-300 flex items-center gap-2"
                >
                    <FaSearch /> Search
                </button>
            </form>

            {/* 🌀 Loading */}
            {isLoading && (
                <div className="text-center text-gray-500">Loading completed jobs...</div>
            )}

            {/* ❌ Error */}
            {isError && (
                <div className="text-center text-red-500">Failed to load completed jobs.</div>
            )}

            {/* ⚠️ No Data */}
            {!isLoading && !isError && completedJobs.length === 0 && (
                <div className="text-center text-gray-400">No completed jobs found.</div>
            )}

            {/* ✅ Data */}
            {!isLoading && !isError && completedJobs.map((job, index) => {
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
                                        : job.completedAt
                                            ? new Date(job.completedAt).toLocaleString()
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
                    </motion.div>
                );
            })}

            {/* Pagination */}
            {!isLoading && !isError && pagination?.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="font-semibold text-gray-700">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                        disabled={page === pagination.totalPages}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
