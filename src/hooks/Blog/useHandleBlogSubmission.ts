import { useToast } from "@chakra-ui/react";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { Editor } from "@tiptap/core";
import type { AxiosError } from "axios";
import type { SetStateAction } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../auth/useAuth";
import type { Blog } from "../../entitles/Blog";
import usePortfolioQueryStore from "../../store/store";
import useGenre from "../Genre/useGenre";

interface FetchResponse {
  imageUrl: string;
  public_id: string;
}

interface Props {
  titleEditor: Editor | null;
  bodyEditor: Editor | null;
  imageFile: File | undefined;
  tags: string[];
  setTags: React.Dispatch<SetStateAction<string[]>>;
  createBlog: UseMutateAsyncFunction<Blog, Error, Blog, unknown>;
  setImageFile: React.Dispatch<SetStateAction<File | undefined>>;
  uploadImage: UseMutateAsyncFunction<FetchResponse, Error, File, unknown>;
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
}: Props) => {
  const toast = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const setGenreId = usePortfolioQueryStore((s) => s.setGenreId);
  const selectedGenreId = usePortfolioQueryStore(
    (s) => s.portfolioQuery.genreId
  );
  const selectedGenre = useGenre(selectedGenreId);

  const handleSave = async () => {
    try {
      let imageUrl = "";
      let imagePublicId = "";

      if (imageFile) {
        const imageResult = await uploadImage(imageFile);
        imageUrl = imageResult.imageUrl;
        imagePublicId = imageResult.public_id;
      }

      const { _id } = await createBlog({
        title: titleEditor?.getText(),
        content: bodyEditor?.getJSON(),
        tags,
        genreId: selectedGenre?._id,
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

      titleEditor?.commands.setContent("<p>Write title</p>");
      bodyEditor?.commands.setContent("<p>Write something</p>");
      setTags([]);
      setImageFile(undefined);
      setGenreId(undefined);

      navigate(`/detail/${_id}`);
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
