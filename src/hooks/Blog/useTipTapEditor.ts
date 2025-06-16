import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CustomEnterExtension from "../../utils/CustomEnterExtension";

const useTipTapEditor = () => {
  const titleEditor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write title</p>",
  });

  const bodyEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CustomEnterExtension,
    ],
    content: "<p>Write something</p>",
  });

  return { titleEditor, bodyEditor };
};

export default useTipTapEditor;
