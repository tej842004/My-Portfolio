import { useToast } from "@chakra-ui/react";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  deleteComment: UseMutateAsyncFunction<any, Error, string, unknown>;
  onClose: () => void;
  setSelectedCommentId: Dispatch<SetStateAction<string | null>>;
}

const useHandleCommentDeletion = ({
  deleteComment,
  onClose,
  setSelectedCommentId,
}: Props) => {
  const toast = useToast();

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      onClose();
      setSelectedCommentId(null);
    } catch (err) {
      const error = err as AxiosError;
      toast({
        title: "Error deleting comment",
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

  return { handleDelete };
};

export default useHandleCommentDeletion;
