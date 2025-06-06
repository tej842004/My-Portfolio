import { useMutation } from "@tanstack/react-query";
import type { User } from "../entitles/User";
import APIClient from "../services/api-client";

const apiClient = new APIClient<string>("/api/auth");

const auth = () => {
  return useMutation({
    mutationFn: (user: User) => apiClient.post(user),
  });
};

export default auth;
