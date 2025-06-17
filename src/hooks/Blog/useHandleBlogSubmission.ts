import { useToast } from "@chakra-ui/react";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { Editor } from "@tiptap/core";
import type { AxiosError } from "axios";
import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../auth/useAuth";
import type { Blog } from "../../entitles/Blog";
import usePortfolioQueryStore from "../../store/store";

interface FetchResponse {
  imageUrl: string;
  public_id: string;
}

interface DeleteImage {
  public_id: string;
}

interface Props {
  tags: string[];
  bodyEditor: Editor | null;
  titleEditor: Editor | null;
  imageFile: File | undefined;
  editingBlog: Blog | undefined;
  setTags: Dispatch<SetStateAction<string[]>>;
  setImageFile: Dispatch<SetStateAction<File | undefined>>;
  createBlog: UseMutateAsyncFunction<Blog, Error, Blog, unknown>;
  deleteImage: UseMutateAsyncFunction<Blog, Error, DeleteImage, unknown>;
  uploadImage: UseMutateAsyncFunction<FetchResponse, Error, File, unknown>;
  updateBlog: UseMutateAsyncFunction<
    any,
    Error,
    {
      id: string | undefined;
      blog: Blog | undefined;
    },
    unknown
  >;
}

const useHandleBlogSubmission = ({
  titleEditor,
  bodyEditor,
  imageFile,
  tags,
  uploadImage,
  createBlog,
  setImageFile,
  setTags,
  editingBlog,
  deleteImage,
  updateBlog,
}: Props) => {
  const toast = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const setGenreId = usePortfolioQueryStore((s) => s.setGenreId);
  const selectedGenreId = usePortfolioQueryStore(
    (s) => s.portfolioQuery.genreId
  );

  const handleSave = async () => {
    try {
      let imageUrl = editingBlog?.imageUrl || "";
      let imagePublicId = editingBlog?.imagePublicId || "";

      if (editingBlog && imageFile) {
        if (editingBlog.imagePublicId) {
          await deleteImage({ public_id: editingBlog.imagePublicId });
        }
      }

      if (imageFile) {
        const imageResult = await uploadImage(imageFile);
        imageUrl = imageResult.imageUrl;
        imagePublicId = imageResult.public_id;
      }

      if (!editingBlog) {
        const { _id } = await createBlog({
          title: titleEditor?.getText(),
          content: bodyEditor?.getJSON(),
          tags,
          genre: selectedGenreId,
          imageUrl,
          imagePublicId,
          author: user?._id,
        });

        toast({
          title: "Blog created.",
          description: "Your blog has been successfully posted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate(`/detail/${_id}`);
      } else {
        const params: { id: string | undefined; blog: Blog | undefined } = {
          id: editingBlog._id,
          blog: {
            title: titleEditor?.getText(),
            content: bodyEditor?.getJSON(),
            tags: tags,
            author: user?._id,
            genre: selectedGenreId,
            imageUrl,
            imagePublicId,
          },
        };

        await updateBlog(params);

        toast({
          title: "Blog updated.",
          description: "Your blog has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate(`/detail/${editingBlog._id}`);
      }

      titleEditor?.commands.setContent("<p>Write title</p>");
      bodyEditor?.commands.setContent("<p>Write something</p>");
      setTags([]);
      setImageFile(undefined);
      setGenreId(undefined);
    } catch (error) {
      const err = error as AxiosError;

      toast({
        title: "Error creating blog",
        description:
          typeof err.response?.data === "string"
            ? err.response.data
            : JSON.stringify(err.response?.data),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return { handleSave };
};

export default useHandleBlogSubmission;
