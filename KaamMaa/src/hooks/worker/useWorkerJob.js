import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInProgressJobService, getPublicJobService } from "../../services/worker/jobService";
import { WORKER_IN_PROGRESS_JOB, WORKER_PUBLIC_JOB } from "../../constants/queryKeys";

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

export const useWorkerPublicJob = (queryParams) => {
    const query = useQuery({
        queryKey: [WORKER_PUBLIC_JOB, queryParams],
        queryFn: () => getPublicJobService(queryParams),
        keepPreviousData: true,
    });

    return {
        ...query,
        publicJobs: query.data?.data || [],
        pagination: query.data?.pagination || { page: 1, totalPages: 1 },
    };
};