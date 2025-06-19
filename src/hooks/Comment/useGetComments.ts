import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import type Comment from "../../entities/Comment";
import APIClient, { type FetchResponse } from "../../services/api-client";

const apiClient = new APIClient<Comment>("/api/comments");

const useGetComment = (blogId: string) =>
  useInfiniteQuery<FetchResponse<Comment>>({
    queryKey: ["comments", blogId],
    queryFn: ({ pageParam }) =>
      apiClient.getAll(
        {
          params: {
            offset: pageParam,
          },
        },
        blogId
      ),
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

export default useGetComment;
