import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

export interface Mail {
  name: string;
  email: string;
  message: string;
}

const apiClient = new APIClient<Mail>("/api/contact");

const mail = () => {
  return useMutation({
    mutationFn: (mail: Mail) => apiClient.post(mail),
  });
};

export default mail;
