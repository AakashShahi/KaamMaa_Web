import React, { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaClock } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";
import Lottie from "lottie-react";
import { getBackendImageUrl } from "../../utils/backend_image";

import { useWorkerInProgressJob } from "../../hooks/worker/useWorkerJob";

import worker1 from "../../assets/lottie/worker1.json";
import worker2 from "../../assets/lottie/worker2.json";
import worker3 from "../../assets/lottie/worker3.json";

export default function WorkerHomePage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = new Date();

    const { inProgressJobs: jobList, isLoading, isError } = useWorkerInProgressJob();

    // Normalize date string to YYYY-MM-DD (timezone safe)
    const toISODate = (date) => {
        if (typeof date === "string") {
            // Assume format YYYY-MM-DD or similar
            const parts = date.split("-");
            const year = parts[0];
            const month = parts[1].padStart(2, "0");
            const day = parts[2].padStart(2, "0");
            return `${year}-${month}-${day}`;
        } else {
            // Construct date as local YYYY-MM-DD to avoid timezone shift
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            return `${year}-${month}-${day}`;
        }
    };

    // Dates with jobs for calendar highlights (unique dates)
    const workDatesSet = new Set(jobList.map((job) => toISODate(new Date(job.date))));
    const workDates = Array.from(workDatesSet);

    // Filter jobs for the selected date
    const filteredJobs = jobList.filter(
        (job) => toISODate(new Date(job.date)) === toISODate(selectedDate)
    );

    // Find the latest job date among all jobs
    const latestJobDate = jobList.length
        ? new Date(Math.max(...jobList.map((job) => new Date(job.date).getTime())))
        : null;

    const latestJobDateStr = latestJobDate
        ? latestJobDate.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
        : "No upcoming jobs";

    // Animations for hero section
    const animations = [worker1, worker2, worker3];
    const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAnimationIndex((prev) => (prev + 1) % animations.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen w-full px-4 md:px-10 py-10 bg-[#fefefe]">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#fff3ec] via-[#fff8f4] to-[#fefefe] p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/3 drop-shadow-xl"
                >
                    <Lottie animationData={animations[currentAnimationIndex]} loop className="w-full h-64 md:h-72" />
                </motion.div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-gray-800 leading-snug">
                        Your Work, <span className="text-[#FA5804]">Your Way</span>
                    </h2>
                    <p className="text-gray-600 text-base max-w-md">
                        Update your skills and availability, view nearby job posts, accept and manage work, and track your ratings — all in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                        <button className="flex items-center gap-2 bg-[#FA5804] text-white px-6 py-2.5 rounded-full hover:bg-black transition-all text-sm shadow-md">
                            Take me to Jobs <FaArrowRight />
                        </button>
                    </div>
                </div>
            </section>

            {/* Dashboard */}
            <section className="max-w-7xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                <div className="bg-white border-l-4 border-green-500 shadow-md rounded-2xl p-6 hover:shadow-lg transition-all flex items-center gap-4">
                    <FaCheckCircle className="text-green-600 text-3xl" />
                    <div>
                        <h4 className="text-3xl font-bold text-green-600">17</h4>
                        <p className="text-sm text-gray-700 mt-1">Jobs Completed</p>
                    </div>
                </div>
                <div className="bg-white border-l-4 border-yellow-400 shadow-md rounded-2xl p-6 hover:shadow-lg transition-all flex items-center gap-4">
                    <FaClock className="text-yellow-500 text-3xl" />
                    <div>
                        <h4 className="text-3xl font-bold text-yellow-500">5</h4>
                        <p className="text-sm text-gray-700 mt-1">Jobs Pending</p>
                    </div>
                </div>
            </section>

            {/* Calendar + Job Cards */}
            <section className="max-w-7xl mx-auto mt-12 grid md:grid-cols-2 gap-10">
                {/* Calendar */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Calendar</h3>
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 flex flex-col sm:flex-row items-start justify-between gap-6">
                        <Calendar
                            value={selectedDate}
                            onChange={setSelectedDate}
                            tileClassName={({ date }) =>
                                workDates.includes(toISODate(date)) ? "react-calendar__tile--highlight" : undefined
                            }
                            className="react-calendar custom-calendar"
                        />
                        <div className="text-gray-700 space-y-1 text-sm sm:text-base flex flex-col justify-center">
                            {latestJobDate ? (
                                <p>
                                    <span className="font-semibold">Upcoming Job Date:</span> {latestJobDateStr}
                                </p>
                            ) : (
                                <p>No upcoming jobs</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Job Cards */}
                <div>
                    {/* Filtered jobs section */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        Jobs on {selectedDate.toDateString()}
                    </h3>

                    {isLoading && <p className="text-gray-500">Loading jobs...</p>}
                    {isError && <p className="text-red-500">Failed to load jobs.</p>}

                    <div className="space-y-4 mb-12">
                        {filteredJobs.length === 0 ? (
                            <div className="text-gray-500 text-sm italic">No jobs on this day.</div>
                        ) : (
                            filteredJobs.map((job) => (
                                <motion.div
                                    key={job._id}
                                    whileHover={{ scale: 1.02 }}
                                    className="rounded-xl p-4 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                                >
                                    <div className="flex gap-4 items-start">
                                        {/* Job Icon if exists */}
                                        {job.icon ? (
                                            <img
                                                src={getBackendImageUrl(job.icon)}
                                                alt={job.category?.name || "Job Icon"}
                                                className="w-16 h-16 object-contain rounded-lg border border-orange-200 bg-orange-50"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-center">
                                                <MdCalendarToday className="text-[#FA5804] text-xl" />
                                            </div>
                                        )}
                                        <div className="flex flex-col text-sm text-gray-700 space-y-1">
                                            <h4 className="text-[#FA5804] font-bold text-lg">{job.category?.name || "No Category"}</h4>
                                            <p>
                                                <span className="font-medium">Location:</span> {job.location}
                                            </p>
                                            <p>
                                                <span className="font-medium">Date:</span> {toISODate(new Date(job.date))}
                                            </p>
                                            <p>
                                                <span className="font-medium">Time:</span> {job.time}
                                            </p>
                                            <p>
                                                <span className="font-medium">Customer:</span> {job.postedBy?.name || "Unknown"}
                                            </p>
                                            <p>
                                                <span className="font-medium">Description:</span> {job.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* All jobs section */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">All In-Progress Jobs</h3>
                    <p className="text-gray-600 mb-6 font-medium">Latest job date: {latestJobDateStr}</p>

                    <div className="space-y-4">
                        {jobList.length === 0 ? (
                            <div className="text-gray-500 text-sm italic">No jobs to do.</div>
                        ) : (
                            jobList.map((job) => (
                                <motion.div
                                    key={job._id}
                                    whileHover={{ scale: 1.02 }}
                                    className="rounded-xl p-4 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                                >
                                    <div className="flex gap-4 items-start">
                                        {job.icon ? (
                                            <img
                                                src={getBackendImageUrl(job.icon)}
                                                alt={job.category?.name || "Job Icon"}
                                                className="w-16 h-16 object-contain rounded-lg border border-orange-200 bg-orange-50"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-center">
                                                <MdCalendarToday className="text-[#FA5804] text-xl" />
                                            </div>
                                        )}
                                        <div className="flex flex-col text-sm text-gray-700 space-y-1">
                                            <h4 className="text-[#FA5804] font-bold text-lg">{job.category?.name || "No Category"}</h4>
                                            <p>
                                                <span className="font-medium">Location:</span> {job.location}
                                            </p>
                                            <p>
                                                <span className="font-medium">Date:</span> {toISODate(new Date(job.date))}
                                            </p>
                                            <p>
                                                <span className="font-medium">Time:</span> {job.time}
                                            </p>
                                            <p>
                                                <span className="font-medium">Customer:</span> {job.postedBy?.name || "Unknown"}
                                            </p>
                                            <p>
                                                <span className="font-medium">Description:</span> {job.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
