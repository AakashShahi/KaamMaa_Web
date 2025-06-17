import { Bell, User, LogOut } from "lucide-react";
import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider"; // adjust path if needed

export default function AdminHeader() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();

    const { logout, user } = useContext(AuthContext);

    // Click outside logic
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-40 flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 font-Inter">
            {/* Center stats */}
            <div className="hidden md:flex items-center space-x-8 text-sm text-gray-600">
                <div className="text-center">
                    <p className="font-semibold text-gray-500">Pending</p>
                    <p className="text-primary font-bold text-lg">23</p>
                </div>
                <div className="text-center">
                    <p className="font-semibold text-gray-500">Active Users</p>
                    <p className="text-green-600 font-bold text-lg">2,847</p>
                </div>
                <div className="text-center">
                    <p className="font-semibold text-gray-500">Today</p>
                    <p className="text-gray-900 font-medium">
                        {new Date().toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4 relative" ref={profileRef}>
                <button
                    className="relative p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring"
                    aria-label="Notifications"
                >
                    <Bell size={24} />
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-primary rounded-full">
                        3
                    </span>
                </button>

                <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring"
                    aria-label="User menu"
                >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {user?.username?.slice(0, 2)?.toUpperCase() || "AD"}
                    </div>
                    <div className="hidden sm:flex flex-col text-left">
                        <span className="text-sm font-medium text-gray-900">{user?.name || "Admin User"}</span>
                        <span className="text-xs text-gray-500">{user?.email || "admin@kaammaa.com"}</span>
                    </div>
                </button>

                {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 text-gray-700 font-Inter">
                            <User size={18} />
                            Profile Settings
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-red-100 text-red-600 font-Inter"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
