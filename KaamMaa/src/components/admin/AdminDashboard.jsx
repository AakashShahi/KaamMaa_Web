import React from "react";
import {
    Users,
    Briefcase,
    MessageSquare,
    FileClock,
    UserCheck,
} from "lucide-react";

const stats = [
    {
        label: "Total Users",
        value: 4321,
        icon: <Users className="text-blue-600" size={28} />,
        color: "bg-blue-50",
    },
    {
        label: "Total Workers",
        value: 1890,
        icon: <UserCheck className="text-green-600" size={28} />,
        color: "bg-green-50",
    },
    {
        label: "Total Reviews",
        value: 6543,
        icon: <MessageSquare className="text-purple-600" size={28} />,
        color: "bg-purple-50",
    },
    {
        label: "Pending Verifications",
        value: 37,
        icon: <FileClock className="text-yellow-600" size={28} />,
        color: "bg-yellow-50",
    },
    {
        label: "Total Professions",
        value: 58,
        icon: <Briefcase className="text-orange-600" size={28} />,
        color: "bg-orange-50",
    },
];

export default function AdminDashboard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    color={stat.color}
                />
            ))}
        </div>
    );
}

function StatCard({ icon, label, value, color }) {
    return (
        <div
            className={`flex items-center gap-4 p-6 rounded-xl shadow-sm border border-gray-200 bg-white hover:shadow-md transition-all duration-300`}
        >
            <div className={`p-3 rounded-lg ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{label}</p>
                <p className="text-2xl font-bold text-gray-800 animate-pulse">
                    {value.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
