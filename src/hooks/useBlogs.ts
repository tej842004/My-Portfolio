import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../services/api-client";
import type { Blog } from "../entitles/Blog";

const apiClient = new APIClient<Blog>("/api/blogs");

const useBlogs = () =>
  useQuery({
    queryKey: ["blogs"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });

export default useBlogs;
