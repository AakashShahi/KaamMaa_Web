import { toast } from "react-toastify";
import { loginUserService } from "../services/authService";
import { useMutation } from "@tanstack/react-query";

export const useLoginUserTan = () => {
    return useMutation(
        {
            mutationFn: loginUserService,
            mutationKey: ["login-key"],
            onSuccess: (data) => {
                toast.success(data?.message || "Login Success")
            },
            onError: (err) => {
                toast.error(err?.message || "Login Failed")
            }
        }
    )
}