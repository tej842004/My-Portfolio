import { useMutation } from "@tanstack/react-query";
import type { Blog } from "../../entitles/Blog";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Blog>("/api/uploadImage");

interface DeleteImage {
  public_id: string;
}

const useDeleteImage = () => {
  return useMutation({
    mutationFn: (public_id: DeleteImage) => apiClient.deleteImage(public_id),
  });
};

export default useDeleteImage;
