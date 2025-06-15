import {
  Avatar,
  Button,
  HStack,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { AxiosError } from "axios";
import { Formik } from "formik";
import Prashant from "../../../assets/images/prash.jpg";
import useCreateComment from "../../../hooks/Comment/useCreateComment";

const CommentForm = ({ blogId }: { blogId: string }) => {
  const toast = useToast();
  const { mutateAsync, isPending } = useCreateComment(blogId);

  const handleSubmit = async ({ commentInput }: { commentInput: string }) => {
    try {
      await mutateAsync(commentInput);
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

  return (
    <Formik
      initialValues={{ commentInput: "" }}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <HStack align="flex-start" spacing={3} mb={6}>
            <Avatar src={Prashant} size="sm" />
            <VStack align="stretch" w="full" spacing={2}>
              <Textarea
                placeholder="Add a comment..."
                onChange={handleChange("commentInput")}
                value={values.commentInput}
              />
              <HStack justify="flex-end">
                <Button
                  type="submit"
                  size="sm"
                  colorScheme="blue"
                  isDisabled={!values.commentInput.trim()}
                  isLoading={isPending}
                >
                  Comment
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </form>
      )}
    </Formik>
  );
};

export default CommentForm;
