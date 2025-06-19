import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../auth/useAuth";
import type { Blog } from "../../entities/Blog";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Blog>("/api/blogs");

const useCreateBlog = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blog: Blog) => apiClient.post(blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["userblogs", user?._id] });
    },
  });
};

export default useCreateBlog;
