import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo/kaammaa_logo.png';
import workerImg from '../../assets/logo/login_worker.png';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const togglePassword = () => setShowPassword(prev => !prev);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!email.trim()) {
            newErrors.email = 'Email or Username is required.';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required.';
            isValid = false;
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
            newErrors.password = 'Password must be at least 6 characters and contain letters and numbers.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (email === 'admin' && password === 'admin123') {
                toast.success('Login successful!');
                navigate('/dashboard/home'); // Replace with your actual route
            } else {
                toast.error('Invalid credentials');
            }
        }
    };

    return (
        <div className="w-screen h-screen flex bg-white">
            {/* Left Half - Image Full Size */}
            <div className="w-[55%] h-full relative">
                <img src={logo} alt="KaamMaa Logo" className="absolute h-14 w-auto left-4 top-4 z-10" />
                <img
                    src={workerImg}
                    alt="Worker"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Right Half - Login Form */}
            <div className="w-[45%] h-full p-8 flex flex-col items-center justify-center overflow-y-auto">
                <img src={logo} alt="KaamMaa Logo" className="h-14 w-auto mb-4" />
                <h2 className="text-2xl mb-6 text-black">Login Page</h2>

                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="email">
                            Email or Username
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-secondary text-black w-full px-4 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your email or username"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-2 relative">
                        <label className="block text-gray-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-secondary text-black w-full px-4 py-2 pr-10 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute bg-secondary top-[30px] right-3 text-black"
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div className="text-right mb-6">
                        <a href="#" className="text-sm text-primary hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-black transition"
                    >
                        Login
                    </button>
                </form>

                <div className="flex gap-4 mt-6 w-full max-w-sm">
                    <button className="flex items-center justify-center w-1/2 py-2 bg-black rounded-md hover:bg-primary transition">
                        <FaGoogle className="mr-2 text-xl" />
                        Google
                    </button>
                    <button className="flex items-center justify-center w-1/2 py-2 bg-black rounded-md hover:bg-primary transition">
                        <FaFacebook className="mr-2 text-xl text-blue-600" />
                        Facebook
                    </button>
                </div>

                <div className="flex flex-wrap items-center justify-center mt-6 text-sm">
                    <span className="font-bold text-black mr-1">New in</span>
                    <span className="font-bold italic text-black">KAAM</span>
                    <span className="font-bold italic text-primary ml-1">MAA?</span>
                    <Link to="/register" className="ml-2 text-primary font-bold hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
