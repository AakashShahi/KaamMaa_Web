import axios from "axios"

const API_URL = import.meta.env.VITE_API_BASE_URL ||
    "localhost:5050/api"

const instance = axios.create(
    {
        baseURL: API_URL,
        headers: {
            "Content-Type": "application/json"
        }
    }
)

export default instance;