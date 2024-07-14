import { Tables } from "./supabase";
export type CommentType = Tables<"comments">;

export type CommonCommentType = CommentType & {
  users: {
    nickname: string | null;
    email: string | null;
  } | null;
};
