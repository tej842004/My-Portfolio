import { useMutation } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

interface FetchResponse {
  imageUrl: string;
  public_id: string;
}

const apiClient = new APIClient<FetchResponse>("/api/uploadImage");

const useCreateImage = () => {
  return useMutation({
    mutationFn: async (imageFile: File) => {
      const formData = new FormData();
      formData.append("image", imageFile);
      return await apiClient.post(formData, undefined, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  });
};

export default useCreateImage;
