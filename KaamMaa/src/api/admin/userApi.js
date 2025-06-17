// services/userApi.js
import axios from "../api";

//Create User (Admin only)
export const createUserApi = async (formData) => {
    const res = await axios.post("/admin/user/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

//Get All Users
export const getAllUsersApi = async () => {
    const res = await axios.get("/admin/user");
    return res.data;
};

// Get One User by ID
export const getOneUserApi = async (id) => {
    const res = await axios.get(`/admin/user/${id}`);
    return res.data;
};

//Update User by ID
export const updateUserApi = async (id, formData) => {
    const res = await axios.put(`/admin/user/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

// Delete User by ID
export const deleteUserApi = async (id) => {
    const res = await axios.delete(`/admin/user/${id}`);
    return res.data;
};
