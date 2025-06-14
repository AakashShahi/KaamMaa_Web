import React, { useState } from 'react';
import logo from '../../assets/logo/kaammaa_logo.png';
import workerImg from '../../assets/logo/login_worker.png';
import {
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaTimesCircle,
    FaUser
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegisterUserTan } from '../../hooks/useRegisterUserTan';

export default function RegisterForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(prev => !prev);
    const { mutate, isPending } = useRegisterUserTan();

    const validationSchema = Yup.object({
        username: Yup.string().min(6, "Min 6 characters").max(20, "Max 20 characters").required("Username required"),
        email: Yup.string().email("Invalid email").required("Email required"),
        password: Yup.string().min(8, "Min 8 characters").required("Password required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password required'),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "worker",
        },
        validationSchema,
        onSubmit: (data) => {
            const { confirmPassword, ...payload } = data;
            mutate(payload, {
                onSuccess: () => navigate("/")
            });
        }
    });

    const isValid = (field) => formik.touched[field] && !formik.errors[field];
    const isInvalid = (field) => formik.touched[field] && formik.errors[field];
    const renderValidationIcon = (field) => {
        if (!formik.touched[field]) return null;
        return isValid(field)
            ? <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            : <FaTimesCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />;
    };

    return (
        <div className="w-screen h-screen flex bg-white">
            {/* Left side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center relative px-6 py-10">
                <img src={logo} alt="KaamMaa Logo" className="absolute top-6 left-6 h-10 md:h-12" />
                <img src={workerImg} alt="Worker" className="w-3/4 max-h-[70vh] object-contain" />
                <h1 className="text-black text-3xl md:text-4xl font-extrabold mt-4 tracking-wide text-center">
                    Join the Workforce
                </h1>
            </div>

            {/* Right side */}
            <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-10">
                <div className="bg-white rounded-2xl shadow-2xl px-6 sm:px-8 py-8 w-full max-w-md">
                    <div className="text-center mb-8">
                        <img src={logo} alt="KaamMaa Logo" className="h-10 mx-auto mb-2" />
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Create your Worker Account</h2>
                        <p className="text-sm text-gray-500">Start your journey with KaamMaa today!</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div className="relative">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                    placeholder="e.g. bikash123"
                                    className="w-full pl-10 pr-10 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-[#FA5804] focus:outline-none"
                                />
                                {renderValidationIcon("username")}
                            </div>
                            {isInvalid("username") && (
                                <p className="text-sm text-red-500 mt-1">{formik.errors.username}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                    <MdEmail />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    placeholder="e.g. example@email.com"
                                    className="w-full pl-10 pr-10 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-[#FA5804] focus:outline-none"
                                />
                                {renderValidationIcon("email")}
                            </div>
                            {isInvalid("email") && (
                                <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                    <RiLockPasswordFill />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    placeholder="********"
                                    className="w-full pl-10 pr-10 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-[#FA5804] focus:outline-none"
                                />
                                <span
                                    className="absolute top-1/2 right-10 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                    onClick={togglePassword}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                                {renderValidationIcon("password")}
                            </div>
                            {isInvalid("password") && (
                                <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                    <RiLockPasswordFill />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                    placeholder="Re-enter password"
                                    className="w-full pl-10 pr-10 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-[#FA5804] focus:outline-none"
                                />
                                {renderValidationIcon("confirmPassword")}
                            </div>
                            {isInvalid("confirmPassword") && (
                                <p className="text-sm text-red-500 mt-1">{formik.errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#FA5804] text-white font-bold py-2 rounded-md hover:bg-black transition-colors duration-300 disabled:opacity-60"
                        >
                            {isPending ? "Registering..." : "Register as Worker"}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="mt-6 text-sm text-center text-gray-600">
                        Already on <span className="font-bold italic">Kaam</span><span className="font-bold italic text-[#FA5804]">Maa</span>?{" "}
                        <Link to="/" className="text-[#FA5804] font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
