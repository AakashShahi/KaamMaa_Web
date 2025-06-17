import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllUsersService,
    getOneUserService,
    createUserService,
    updateUserService,
    deleteUserService
} from "../../services/admin/userService";
import { toast } from "react-toastify";
import { ADMIN_USERS, ADMIN_USER_DETAIL } from "../../constants/queryKeys";

// GET all users
export const useAdminUsers = (page = 1, limit = 5) => {
    return useQuery({
        queryKey: [ADMIN_USERS, page, limit],
        queryFn: () => getAllUsersService({ page, limit }),
        keepPreviousData: true
    });
};

// GET single user detail
export const useAdminUserDetail = (id) => {
    return useQuery({
        queryKey: [ADMIN_USER_DETAIL, id],
        queryFn: () => getOneUserService(id),
        enabled: !!id
    });
};

// CREATE new user
export const useCreateAdminUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUserService,
        onSuccess: () => {
            toast.success("User created successfully");
            queryClient.invalidateQueries([ADMIN_USERS]);
        },
        onError: (error) => {
            toast.error(error?.message || "User creation failed");
        }
    });
};

// UPDATE user
export const useUpdateAdminUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateUserService(id, data),
        onSuccess: () => {
            toast.success("User updated successfully");
            queryClient.invalidateQueries([ADMIN_USERS]);
            queryClient.invalidateQueries([ADMIN_USER_DETAIL]);
        },
        onError: (error) => {
            toast.error(error?.message || "User update failed");
        }
    });
};

// DELETE user
export const useDeleteAdminUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteUserService(id),
        onSuccess: () => {
            toast.success("User deleted successfully");
            queryClient.invalidateQueries([ADMIN_USERS]);
        },
        onError: (error) => {
            toast.error(error?.message || "User deletion failed");
        }
    });
};
