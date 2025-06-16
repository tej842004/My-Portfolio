import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import useAuth from "../../../auth/useAuth";
import type { Blog } from "../../../entitles/Blog";
import APIClient, { type FetchResponse } from "../../../services/api-client";

const apiClient = new APIClient<Blog>("/api/users/blogs");

const useUserBlogs = () => {
  const { user } = useAuth();

  return useInfiniteQuery<FetchResponse<Blog>>({
    queryKey: ["userblogs", user?._id],
    queryFn: ({ pageParam }) =>
      apiClient.getAll({
        params: {
          offset: pageParam,
        },
      }),
    staleTime: ms("24h"),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      const nextoffset = (pagination?.offset ?? 0) + (pagination?.count ?? 0);
      return pagination?.total_count !== undefined &&
        nextoffset < pagination.total_count
        ? nextoffset
        : undefined;
    },
  });
};

export default useUserBlogs;
