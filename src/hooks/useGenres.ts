import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import type { Genre } from "../entitles/Genre";
import APIClient, { type FetchResponse } from "../services/api-client";

const apiClient = new APIClient<Genre>("/api/genres");

const useGenres = () =>
  useQuery<FetchResponse<Genre>>({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
    // initialData: genres,
  });

export default useGenres;
