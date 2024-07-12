import { Tables } from "./supabase";
export type CommentType = Tables<"comments">;

export type CommonCommentType = {
  content: string;
  createdAt: string | null;
  id: string;
  postId: string;
  userId: string;
  users: {
    nickname: string | null;
    email: string | null;
  } | null;
};
