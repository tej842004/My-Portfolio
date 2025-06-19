import { useToast } from "@chakra-ui/react";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type Comment from "../../entitles/Comment";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  comment: string | undefined;
  updateComment: Comment;
  setUpdateComment: Dispatch<SetStateAction<Comment | null>>;
  updateCommentFn: UseMutateAsyncFunction<
    any,
    Error,
    {
      id: number | string;
      comment: Comment;
    },
    unknown
  >;
}

const useHandleCommentUpdation = ({
  comment,
  updateComment,
  setUpdateComment,
  updateCommentFn,
}: Props) => {
  const toast = useToast();

  const handleUpdate = async () => {
    try {
      await updateCommentFn({
        id: updateComment._id!,
        comment: { comment: comment },
      });

      toast({
        title: "Comment updated.",
        description: "Your comment has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setUpdateComment(null);
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: "Error updating comment",
        description:
          typeof err.response?.data === "string"
            ? err.response.data
            : JSON.stringify(err.response?.data),
        status: "error",
        duration: 4000,
        isClosable: true,
      });

      console.log(
        typeof err.response?.data === "string"
          ? err.response.data
          : JSON.stringify(err.response?.data)
      );
    }
  };

  return { handleUpdate };
};

export default useHandleCommentUpdation;
