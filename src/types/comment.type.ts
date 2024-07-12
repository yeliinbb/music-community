import { Tables } from "./supabase";
export type CommentType = Tables<"comments">;

export type CommentWithUserType = CommentType & {
  users: Array<{
    email: string;
    nickname: string;
  }>;
};
