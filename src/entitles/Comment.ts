import type { Blog } from "./Blog";
import type { User } from "./User";

export default interface Comment {
  _id: string;
  comment: string;
  user?: User;
  blog?: Blog;
}
