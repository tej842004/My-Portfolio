import type { Blog } from "../entitles/Blog";

const formatDate = (blog: Blog) => {
  return blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date";
};

export default formatDate;
