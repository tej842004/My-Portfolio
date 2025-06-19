import { Box, Button, HStack, Textarea } from "@chakra-ui/react";
import { useState, type Dispatch, type SetStateAction } from "react";
import type Comment from "../../../entitles/Comment";
import useHandleCommentUpdation from "../../../hooks/Comment/useHandleCommentUpdation";
import useUpdateComment from "../../../hooks/Comment/useUpdateComment";

interface Props {
  updateComment: Comment;
  setUpdateComment: Dispatch<SetStateAction<Comment | null>>;
}

const EditComment = ({ updateComment, setUpdateComment }: Props) => {
  const [comment, setComment] = useState(updateComment.comment);
  const { mutateAsync: updateCommentFn, isPending: updateCommentLoading } =
    useUpdateComment();
  const { handleUpdate } = useHandleCommentUpdation({
    comment,
    updateComment,
    setUpdateComment,
    updateCommentFn,
  });

  console.log(comment);

  return (
    <Box>
      <Textarea
        value={comment}
        width="50%"
        onChange={(e) => setComment(e.target.value)}
        mb={2}
      />
      <HStack>
        <Button
          size="sm"
          colorScheme="teal"
          onClick={handleUpdate}
          isLoading={updateCommentLoading}
        >
          Save
        </Button>
        <Button size="sm" onClick={() => setUpdateComment(null)}>
          Cancel
        </Button>
      </HStack>
    </Box>
  );
};

export default EditComment;
