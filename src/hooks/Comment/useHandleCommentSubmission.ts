import { useToast } from "@chakra-ui/react";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type Comment from "../../entities/Comment";

interface Props {
  createComment: UseMutateAsyncFunction<Comment, Error, string, unknown>;
}

const useHandleCommentSubmission = ({ createComment }: Props) => {
  const toast = useToast();

  const handleSubmit = async ({ commentInput }: { commentInput: string }) => {
    try {
      await createComment(commentInput);
      toast({
        title: "Comment created.",
        description: "Your comment has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      const error = err as AxiosError;
      toast({
        title: "Error creating blog",
        description:
          typeof error.response?.data === "string"
            ? error.response.data
            : JSON.stringify(error.response?.data),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return { handleSubmit };
};

export default useHandleCommentSubmission;
