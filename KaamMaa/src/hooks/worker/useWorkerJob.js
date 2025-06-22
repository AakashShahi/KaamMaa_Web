import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInProgressJobService } from "../../services/worker/jobService";
import { WORKER_IN_PROGRESS_JOB } from "../../constants/queryKeys";

export const useWorkerInProgressJob = () => {
    const query = useQuery(
        {
            queryKey: [WORKER_IN_PROGRESS_JOB],
            queryFn: () => getInProgressJobService()
        }
    )
    const inProgressJobs = query.data?.data || []
    return {
        ...query,
        inProgressJobs
    }
}