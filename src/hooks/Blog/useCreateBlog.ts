import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Blog } from "../../entitles/Blog";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Blog>("/api/blogs");

const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blog: Blog) => apiClient.post(blog),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export default useCreateBlog;
