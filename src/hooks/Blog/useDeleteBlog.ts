import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Blog } from "../../entities/Blog";
import APIClient from "../../services/api-client";
import useAuth from "../../auth/useAuth";

const apiClient = new APIClient<Blog>("/api/blogs");

const useDeleteBlog = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => apiClient.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["userblogs", user?._id] });
    },
  });
};

export default useDeleteBlog;
