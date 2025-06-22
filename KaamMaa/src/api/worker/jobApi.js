import axios from "../api"

export const getInProgressJobApi = () => axios.get("/worker/jobs/in-progress")