import { getInProgressJobApi } from "../../api/worker/jobApi"

export const getInProgressJobService = async () => {
    try {
        const response = await getInProgressJobApi()
        return response.data
    } catch (err) {
        console.log(err);
        throw err.response?.data || { message: 'Failed to fetch' }
    }
}