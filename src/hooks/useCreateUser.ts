import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import type { User } from "../entitles/User";

const apiClient = new APIClient<User>("/api/users");

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: User) => apiClient.post(user),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export default useCreateUser;
