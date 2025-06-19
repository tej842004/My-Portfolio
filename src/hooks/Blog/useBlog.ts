import { useQuery } from "@tanstack/react-query";
import type { Blog } from "../../entities/Blog";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Blog>("/api/blogs");

const useBlog = (id: string) =>
  useQuery({
    queryKey: ["blog", id],
    queryFn: () => apiClient.get(id),
  });

export default useBlog;
