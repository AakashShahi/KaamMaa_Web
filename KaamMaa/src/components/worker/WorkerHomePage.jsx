import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle, FaClock } from 'react-icons/fa';
import { MdCalendarToday } from 'react-icons/md';
import Lottie from 'lottie-react';

import worker1 from '../../assets/lottie/worker1.json';
import worker2 from '../../assets/lottie/worker2.json';
import worker3 from '../../assets/lottie/worker3.json';

export default function WorkerHomePage() {
    const selectedDate = new Date(2025, 3, 29);
    const today = new Date();

    const jobList = [
        {
            title: "Gardening",
            location: "Maitidevi, Kathmandu, NP",
            deadline: "2025-04-29T17:00:00",
            customer: "David Blawe",
            jobId: "20250429-1",
        },
        {
            title: "Electric Fix",
            location: "New Baneshwor, Kathmandu, NP",
            deadline: "2025-04-29T18:30:00",
            customer: "Aarav Joshi",
            jobId: "20250429-2",
        },
    ];

    const workDates = jobList.map(job => new Date(job.deadline).toDateString());

    const animations = [worker1, worker2, worker3];
    const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAnimationIndex(prev => (prev + 1) % animations.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (isoDateStr) => {
        const date = new Date(isoDateStr);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (isoDateStr) => {
        const date = new Date(isoDateStr);
        return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: '2-digit' });
    };

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
                    <Lottie
                        animationData={animations[currentAnimationIndex]}
                        loop
                        className="w-full h-64 md:h-72"
                    />
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
                            tileClassName={({ date }) =>
                                workDates.includes(date.toDateString())
                                    ? 'bg-[#FA5804] text-white rounded-full'
                                    : undefined
                            }
                            className="react-calendar custom-calendar"
                        />
                        <div className="text-gray-700 space-y-1 text-sm sm:text-base">
                            <p><span className="font-semibold">Today is:</span> {today.toLocaleDateString(undefined, { weekday: 'long' })}</p>
                            <p>
                                <span className="font-semibold">Month-Year:</span>{" "}
                                {today.toLocaleDateString(undefined, {
                                    month: 'short',
                                    year: '2-digit'
                                }).replace(',', '')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Job Cards */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{selectedDate.toDateString()}</h3>
                    <div className="space-y-4">
                        {jobList.map((job) => (
                            <motion.div
                                key={job.jobId}
                                whileHover={{ scale: 1.02 }}
                                className="rounded-xl p-4 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                            >
                                <div className="flex gap-4 items-start">
                                    <div className="w-16 h-16 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-center">
                                        <MdCalendarToday className="text-[#FA5804] text-xl" />
                                    </div>
                                    <div className="flex flex-col text-sm text-gray-700 space-y-1">
                                        <h4 className="text-[#FA5804] font-bold text-lg">{job.title}</h4>
                                        <p><span className="font-medium">Location:</span> {job.location}</p>
                                        <p><span className="font-medium">Date:</span> {formatDate(job.deadline)}</p>
                                        <p><span className="font-medium">Deadline:</span> {formatTime(job.deadline)}</p>
                                        <p><span className="font-medium">Customer:</span> {job.customer}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
