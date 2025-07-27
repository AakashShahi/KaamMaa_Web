import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRequestResetPassword } from "../hooks/useLoginUserTan";

export default function RequestResetPasswordPage() {
    const navigate = useNavigate();
    const requestResetPassword = useRequestResetPassword();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // to use await in mutate
                await requestResetPassword.mutateAsync(values);
                navigate("/login");
            } catch (error) {
                console.error("Error requesting reset password:", error);
            }
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <>
                            {formik.errors.email}
                        </>
                    ) : null}
                </div>
                <button
                    type="submit"
                >
                    Request Reset
                </button>
            </form>
        </div>
    );
}