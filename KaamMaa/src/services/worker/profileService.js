import { getWorkerProfileApi, updateWorkerPasswordApi, updateWorkerProfileApi } from "../../api/worker/profileApi";

// Get worker profile
export const getWorkerProfileService = async () => {
    try {
        const response = await getWorkerProfileApi();
        return response.data;
    } catch (err) {
        console.error("Error fetching worker profile:", err);
        throw err.response?.data || { message: "Failed to fetch worker profile" };
    }
};

// Update worker profile
export const updateWorkerProfileService = async (payload) => {
    try {
        const response = await updateWorkerProfileApi(payload);
        return response.data;
    } catch (err) {
        console.error("Error updating worker profile:", err);
        throw err.response?.data || { message: "Failed to update profile" };
    }
};

// Change worker password
export const updateWorkerPasswordService = async (payload) => {
    try {
        const response = await updateWorkerPasswordApi(payload);
        return response.data;
    } catch (err) {
        console.error("Error updating password:", err);
        throw err.response?.data || { message: "Failed to change password" };
    }
};