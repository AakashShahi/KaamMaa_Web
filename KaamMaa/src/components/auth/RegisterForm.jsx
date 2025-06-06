import React, { useState } from 'react';
import logo from '../../assets/logo/kaammaa_logo.png';
import workerImg from '../../assets/logo/login_worker.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterUserTan } from '../../hooks/useRegisterUserTan';

export default function RegisterForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(prev => !prev);
    const { mutate, isPending } = useRegisterUserTan();

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(6, "Min 3 characters")
            .max(20, "Max 20 characters")
            .required("Username required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email required"),
        password: Yup.string()
            .min(8, "Min 8 characters")
            .required("Password required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password required'),
        role: Yup.string()
            .oneOf(['admin', 'worker'], 'Select a role')
            .required('Role is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: ""
        },
        validationSchema,
        onSubmit: (data) => {
            const { confirmPassword, ...payload } = data;
            mutate(payload, { onSuccess: () => { navigate("/dashboard/home") } }); // send username, email, password, role
        }
    });

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

                <form className="w-full max-w-sm" onSubmit={formik.handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1 text-Inter" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            className="bg-secondary text-black w-full px-4 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your username"
                        />
                        {formik.touched.username && formik.errors.username && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1 text-Inter" htmlFor="email">
                            Email or Username
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="bg-secondary text-black w-full px-4 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-Inter mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
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
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-Inter mb-1" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            className="bg-secondary text-black w-full px-4 py-2 pr-10 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Confirm your password"
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
                        )}
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
                                    checked={formik.values.role === 'admin'}
                                    onChange={formik.handleChange}
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
                                    checked={formik.values.role === 'worker'}
                                    onChange={formik.handleChange}
                                />
                                <span className="w-5 h-5 inline-block rounded-full border-2 border-[#FA5804] mr-2 peer-checked:bg-[#FA5804] peer-checked:border-[#FA5804]"></span>
                                Worker
                            </label>
                        </div>
                        {formik.touched.role && formik.errors.role && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.role}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-1/2 bg-primary font-Inter text-white py-2 rounded-md hover:bg-black transition focus:outline-none disabled:opacity-50"
                    >
                        {isPending ? "Registering..." : "Register"}
                    </button>
                </form>

                {/* Already have an account */}
                <div className="flex flex-wrap items-center justify-center mt-6 text-sm">
                    <span className="font-bold text-black mr-1">Already in</span>
                    <span className="font-bold italic text-black">KAAM</span>
                    <span className="font-bold italic text-primary">MAA?</span>
                    <Link to="/" className="ml-2 text-primary font-bold hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
