import { useMutation, useQueryClient } from "@tanstack/react-query";
import type Comment from "../../entitles/Comment";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Comment>("/api/comments");

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => apiClient.delete(commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });
};

export default useDeleteComment;
