import { generateHTML, type JSONContent } from "@tiptap/core";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

export const convertTipTapToHtml = (content: JSONContent | undefined): string => {
  if (!content || typeof content !== "object" || !content.type) return "";

  try {
    const html = generateHTML(content, [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ]);
    return html;
  } catch (err) {
    console.error("Error generating HTML from TipTap JSON:", err);
    return "";
  }
};
