import React from "react";
import {
    Users, Briefcase, MessageSquare, FileClock, UserCheck
} from "lucide-react";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from "recharts";

import { motion } from "framer-motion";
import { useAdminUsers } from "../../hooks/admin/useAdminUser";
import { useAdminProfession } from "../../hooks/admin/useAdminProfession";
import { useGetVerificationRequests } from "../../hooks/admin/useAdminVerification";

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function getMonthlyUserData(users) {
    const currentYear = new Date().getFullYear();
    const monthCount = new Array(12).fill(0);
    users.forEach(user => {
        const created = new Date(user.createdAt);
        if (created.getFullYear() === currentYear) {
            const monthIndex = created.getMonth();
            monthCount[monthIndex]++;
        }
    });
    return months.map((month, index) => ({
        month,
        users: monthCount[index],
    }));
}

export default function AdminDashboard() {
    const {
        users,
        isLoading: usersLoading,
        isError: usersError,
    } = useAdminUsers();

    const {
        professions,
        isLoading: professionsLoading,
        isError: professionsError,
    } = useAdminProfession();

    const {
        verifications = [],
        isLoading: verificationLoading,
        isError: verificationError,
    } = useGetVerificationRequests({ page: 1, limit: 1000 });

    const totalCustomers = users.filter((u) => u.role === "customer").length;
    const totalWorkers = users.filter((u) => u.role === "worker").length;
    const totalProfessions = professions.length;
    const pendingVerifications = verifications.length;

    const stats = [
        {
            label: "Total Customers",
            value: totalCustomers,
            icon: <Users className="text-blue-600" size={28} />,
            color: "bg-blue-100",
        },
        {
            label: "Total Workers",
            value: totalWorkers,
            icon: <UserCheck className="text-green-600" size={28} />,
            color: "bg-green-100",
        },
        {
            label: "Total Reviews",
            value: 6543,
            icon: <MessageSquare className="text-purple-600" size={28} />,
            color: "bg-purple-100",
        },
        {
            label: "Pending Verifications",
            value: verificationLoading ? "..." : pendingVerifications,
            icon: <FileClock className="text-yellow-600" size={28} />,
            color: "bg-yellow-100",
        },
        {
            label: "Total Professions",
            value: totalProfessions,
            icon: <Briefcase className="text-orange-600" size={28} />,
            color: "bg-orange-100",
        },
    ];

    const monthlyData = getMonthlyUserData(users);

    if (usersLoading || professionsLoading) {
        return (
            <section className="flex justify-center items-center h-48">
                <p className="text-gray-500 text-lg font-medium animate-pulse">Loading dashboard stats...</p>
            </section>
        );
    }

    if (usersError || professionsError || verificationError) {
        return (
            <section className="flex justify-center items-center h-48">
                <p className="text-red-500 text-lg font-semibold">Failed to load dashboard data.</p>
            </section>
        );
    }

    return (
        <section className="p-6 space-y-10 bg-gray-50 min-h-screen">
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
            >
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600 mt-1">
                    Live overview of user activity and service data
                </p>
            </motion.header>

            {/* Stats Cards */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.15,
                        }
                    }
                }}
            >
                {stats.map(({ icon, label, value, color }, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <StatCard icon={icon} label={label} value={value} color={color} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Bar Chart */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Monthly New User Registrations ({new Date().getFullYear()})
                </h2>
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill="#FA5804" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </motion.section>
        </section>
    );
}

function StatCard({ icon, label, value, color }) {
    return (
        <div className={`flex items-center gap-5 p-6 rounded-2xl shadow-sm border border-gray-200 bg-white hover:shadow-md hover:scale-[1.01] transition-transform duration-300 ease-in-out min-h-[120px]`}>
            <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
            <div>
                <p className="text-gray-600 text-sm font-medium">{label}</p>
                <p className="text-3xl font-extrabold text-gray-900">{value?.toLocaleString?.() ?? value}</p>
            </div>
        </div>
    );
}

