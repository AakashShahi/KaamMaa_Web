import axios from "../api"

export const getInProgressJobApi = () => axios.get("/worker/jobs/in-progress")

export const getPublicJobApi = (params) =>
    axios.get("/worker/jobs/public", { params });
