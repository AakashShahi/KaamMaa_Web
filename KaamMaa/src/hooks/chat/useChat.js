import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChatHistoryService, saveMessageService } from "../../services/chat/chatService";
import { toast } from "react-toastify";

export const useGetChatHistory = (jobId) => {
    const query = useQuery({
        queryKey: ["chat-history", jobId],
        queryFn: () => getChatHistoryService(jobId),
        enabled: !!jobId,
    });

    return {
        ...query,
        messages: query.data?.chat?.messages || [],
    };
};

export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) => saveMessageService(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["chat-history", data.chat.jobId]);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to send message");
        },
    });
};