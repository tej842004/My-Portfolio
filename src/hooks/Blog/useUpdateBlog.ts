import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../auth/useAuth";
import type { Blog } from "../../entitles/Blog";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Blog>("/api/blogs");

const useUpdateBlog = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      blog,
    }: {
      id: string | undefined;
      blog: Blog | undefined;
    }) => apiClient.put(id!, blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["userblogs", user?._id] });
    },
  });
};

export default useUpdateBlog;
