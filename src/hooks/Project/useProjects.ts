import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import type { Project } from "../../entities/Project";
import APIClient, { type FetchResponse } from "../../services/api-client";

const apiClient = new APIClient<Project>("/api/projects");

const useProjects = () =>
  useInfiniteQuery<FetchResponse<Project>>({
    queryKey: ["projects"],
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

export default useProjects;
