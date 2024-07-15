import { Tables } from "./supabase";
export type PostType = Tables<"posts">;

export type CommonPostType = PostType & {
  users: {
    nickname: string | null;
    email: string | null;
  } | null;
};

export type MainPostType = PostType & {
  users: {
    nickname: string | null;
    email: string | null;
  } | null;
}