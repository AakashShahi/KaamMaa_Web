import React, { useState } from 'react';
import logo from '../../assets/logo/kaammaa_logo.png';
import workerImg from '../../assets/logo/login_worker.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('worker');
    const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

    const togglePassword = () => setShowPassword(prev => !prev);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '', confirmPassword: '' };

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

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password.';
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert(`Registration successful!\nRole: ${role}`);
            console.log({ email, password, role });
        }
    };

    return (
        <div className="w-screen h-screen bg-white flex">
            {/* Left Half - Worker Image */}
            <div className="w-[55%] flex items-center justify-center relative">
                <img src={logo} alt="KaamMaa Logo" className="absolute h-14 w-auto left-4 top-4" />
                <div className="w-full h-full flex items-center justify-center">
                    <img
                        src={workerImg}
                        alt="Worker"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* Right Half - Registration Form */}
            <div className="w-[45%] p-8 flex flex-col items-center justify-start overflow-y-auto max-h-screen">
                <img src={logo} alt="KaamMaa Logo" className="h-14 w-auto mb-4" />
                <h2 className="text-2xl font-Inter font-bold mb-6 text-black">Register</h2>

                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    {/* Email / Username */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1 text-Inter" htmlFor="email">
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

                    {/* Password */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-Inter mb-1" htmlFor="password">
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
                            className="absolute top-[30px] right-3 text-black bg-transparent focus:outline-none hover:text-primary"
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-Inter mb-1" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-secondary text-black w-full px-4 py-2 pr-10 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* Role Selection */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-Inter mb-2">Select Role</label>
                        <div className="flex items-center gap-6">
                            {/* Admin */}
                            <label className="flex items-center cursor-pointer text-black font-medium">
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    className="hidden peer"
                                    checked={role === 'admin'}
                                    onChange={() => setRole('admin')}
                                />
                                <span className="w-5 h-5 inline-block rounded-full border-2 border-[#FA5804] mr-2 peer-checked:bg-[#FA5804] peer-checked:border-[#FA5804]"></span>
                                Admin
                            </label>

                            {/* Worker */}
                            <label className="flex items-center cursor-pointer text-black font-medium">
                                <input
                                    type="radio"
                                    name="role"
                                    value="worker"
                                    className="hidden peer"
                                    checked={role === 'worker'}
                                    onChange={() => setRole('worker')}
                                />
                                <span className="w-5 h-5 inline-block rounded-full border-2 border-[#FA5804] mr-2 peer-checked:bg-[#FA5804] peer-checked:border-[#FA5804]"></span>
                                Worker
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-1/2 bg-primary font-Inter text-white py-2 rounded-md hover:bg-black transition focus:outline-none"
                    >
                        Register
                    </button>
                </form>

                {/* Already have an account */}
                <div className="flex flex-wrap items-center justify-center mt-6 text-sm">
                    <span className="font-bold text-black mr-1">Already in</span>
                    <span className="font-bold italic text-black">KAAM</span>
                    <span className="font-bold italic text-primary ">MAA?</span>
                    <Link to="/" className="ml-2 text-primary font-bold hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
