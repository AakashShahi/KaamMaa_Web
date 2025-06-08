import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';

import logo from '../../assets/logo/kaammaa_logo.png';
import workerImg from '../../assets/logo/login_worker.png';
import { useLoginUserTan } from '../../hooks/useLoginUserTan';

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(prev => !prev);
    const { mutate, isPending } = useLoginUserTan();

    // Dynamic Yup schema based on identifier value
    const validationSchema = Yup.object({
        identifier: Yup.string()
            .required("Email or Username is required")
            .test('email-or-username', 'Invalid email or username', function (value) {
                if (!value) return false;

                if (value.includes('@')) {

                    return Yup.string().email().isValidSync(value);
                } else {
                    return /^[a-zA-Z0-9_]{3,20}$/.test(value);
                }
            }),
        password: Yup.string()
            .min(8, "Minimum 8 characters required")
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            identifier: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            // Prepare data for backend: decide field email or username
            const payload = values.identifier.includes('@')
                ? { email: values.identifier, password: values.password }
                : { username: values.identifier, password: values.password };

            mutate(payload, {
                onSuccess: () => {
                    navigate('/dashboard');
                }
            });
        },
    });

    return (
        <div className="w-screen h-screen flex bg-white">
            {/* Left side */}
            <div className="w-[55%] h-full relative">
                <img src={logo} alt="KaamMaa Logo" className="absolute h-14 w-auto left-4 top-4 z-10" />
                <img src={workerImg} alt="Worker" className="w-full h-full object-contain" />
            </div>

            {/* Right side form */}
            <div className="w-[45%] h-full p-8 flex flex-col items-center justify-center overflow-y-auto">
                <img src={logo} alt="KaamMaa Logo" className="h-14 w-auto mb-4" />
                <h2 className="text-2xl mb-6 text-black">Login Page</h2>

                <form className="w-full max-w-sm" onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block text-gray-700 mb-1">
                            Email or Username
                        </label>
                        <input
                            id="identifier"
                            name="identifier"
                            type="text"
                            placeholder="Enter your email or username"
                            className="bg-secondary text-black w-full px-4 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            value={formik.values.identifier}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.identifier && formik.errors.identifier && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.identifier}</p>
                        )}
                    </div>

                    <div className="mb-2 relative">
                        <label htmlFor="password" className="block text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="bg-secondary text-black w-full px-4 py-2 pr-10 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute bg-secondary top-[30px] right-3 text-black"
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    <div className="text-right mb-6">
                        <a href="#" className="text-sm text-primary hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-black transition disabled:opacity-50"
                    >
                        {isPending ? "Logging in..." : "Login"}
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
