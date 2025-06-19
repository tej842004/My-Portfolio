import { useMutation, useQueryClient } from "@tanstack/react-query";
import type Comment from "../../entities/Comment";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Comment>("/api/comments");

const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, comment }: { id: number | string; comment: Comment }) =>
      apiClient.put(id, comment),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });
};

export default useUpdateComment;
