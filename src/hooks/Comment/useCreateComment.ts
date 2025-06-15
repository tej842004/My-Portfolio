import { useMutation, useQueryClient } from "@tanstack/react-query";
import type Comment from "../../entitles/Comment";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Comment>("/api/comments");

const useCreateComment = (blogId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: string) => apiClient.post({ comment }, blogId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["comments", blogId] }),
  });
};

export default useCreateComment;
