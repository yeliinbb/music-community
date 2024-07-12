import { Tables } from "./supabase";
export type CommentType = Tables<"comments">;

export type CommonCommentType = CommentType;
