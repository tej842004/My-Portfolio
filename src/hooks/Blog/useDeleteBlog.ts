import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Blog } from "../../entitles/Blog";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Blog>("/api/blogs");

const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => apiClient.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export default useDeleteBlog;
