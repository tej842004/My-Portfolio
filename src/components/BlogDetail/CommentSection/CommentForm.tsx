import { Avatar, Button, HStack, Textarea, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import Prashant from "../../../assets/images/prash.jpg";
import useCreateComment from "../../../hooks/Comment/useCreateComment";
import useHandleCommentSubmission from "../../../hooks/Comment/useHandleCommentSubmission";

const CommentForm = ({ blogId }: { blogId: string }) => {
  const { mutateAsync: createComment, isPending: createCommentLoading } =
    useCreateComment(blogId);
  const { handleSubmit } = useHandleCommentSubmission({ createComment });

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
                  isLoading={createCommentLoading}
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
