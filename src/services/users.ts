import { useMutation } from "@tanstack/react-query";
import type { User } from "../entities/User";
import APIClient from "../services/api-client";

const apiClient = new APIClient<string>("/api/users");

const users = () => {
  return useMutation({
    mutationFn: (user: User) => apiClient.post(user),
  });
};

export default users;
