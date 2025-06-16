import { useToast } from "@chakra-ui/react";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { Blog } from "../../../entitles/Blog";

interface DeleteImage {
  public_id: string;
}

interface Props {
  deleteUserPost: UseMutateAsyncFunction<any, Error, string | number, unknown>;
  deleteImage: UseMutateAsyncFunction<Blog, Error, DeleteImage, unknown>;
  onClose: () => void;
  selectedPost: Blog;
}

const useHandleBlogDeletion = ({
  deleteImage,
  deleteUserPost,
  onClose,
  selectedPost,
}: Props) => {
  const toast = useToast();

  const handleDelete = async () => {
    await deleteUserPost(selectedPost._id!, {
      onSuccess: () => {
        toast({
          title: "Blog Deleted",
          description: "The blog has been successfully removed.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      },
      onError: (error: Error) => {
        const err = error as AxiosError;
        toast({
          title: "Failed to delete blog",
          description:
            typeof err.response?.data === "string"
              ? err.response.data
              : JSON.stringify(err.response?.data),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });

    if (!selectedPost?.imagePublicId || !selectedPost._id) return;
    await deleteImage({ public_id: selectedPost.imagePublicId });
  };

  return { handleDelete };
};

export default useHandleBlogDeletion;
