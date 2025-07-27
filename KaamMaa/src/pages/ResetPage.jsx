import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "../hooks/useLoginUserTan";

export default function ResetPasswordPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const resetPassword = useResetPassword();
    const validationSchema = Yup.object({
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
    });
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await resetPassword.mutateAsync({ data: values, token });
                navigate("/login");
            } catch (error) {
                console.error("Error resetting password:", error);
            }
        },
    });
    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <>{formik.errors.password}</>
                    ) : null}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <>{formik.errors.confirmPassword}</>
                    ) : null}
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}
