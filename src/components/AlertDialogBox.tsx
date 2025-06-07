import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import type { RefObject } from "react";

interface AlertDialogBoxProps {
  isOpen: boolean;
  cancelRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  handleDelete: () => void;
  deletingImage?: boolean;
  deletingBlog?: boolean;
}

const AlertDialogBox = ({
  isOpen,
  cancelRef,
  onClose,
  handleDelete,
  deletingImage,
  deletingBlog,
}: AlertDialogBoxProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size={{ base: "xs", md: "md" }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Blog
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete this blog?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              ml={3}
              isLoading={deletingBlog || deletingImage}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDialogBox;
