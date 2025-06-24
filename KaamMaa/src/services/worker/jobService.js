import { getInProgressJobApi, getPublicJobApi } from "../../api/worker/jobApi"

export const getInProgressJobService = async () => {
    try {
        const response = await getInProgressJobApi()
        return response.data
    } catch (err) {
        console.log(err);
        throw err.response?.data || { message: 'Failed to fetch' }
    }
}

export const getPublicJobService = async (queryParams) => {
    try {
        const response = await getPublicJobApi(queryParams);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err.response?.data || { message: "Failed to fetch public jobs" };
    }
};