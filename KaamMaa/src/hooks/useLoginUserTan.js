import { toast } from "react-toastify";
import { loginUserService } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

export const useLoginUserTan = () => {
    const { login } = useContext(AuthContext)
    return useMutation(
        {
            mutationFn: loginUserService,
            mutationKey: ["login-key"],
            onSuccess: (data) => {
                login(data?.data, data?.token)
                toast.success(data?.message || "Login Success")
            },
            onError: (err) => {
                toast.error(err?.message || "Login Failed")
            }
        }
    )
}