import { Tables } from "./supabase";
export type User = Tables<"users">;

export type UserProfile = {
  userId: string;
  file: File;
}