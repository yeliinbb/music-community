import { createClient } from "@/utils/supabase/client";
import { MainPostType } from "@/types/posts.type";

export const getAllPost = async (): Promise<MainPostType[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("*,users(nickname, email)").order("created_at", { ascending: false }).limit(10);

  if (error) {
    console.error("전체 게시글 가져오기 실패", error);
    throw new Error("전체 게시글 가져오기 실패");
  }

  return data;
};
