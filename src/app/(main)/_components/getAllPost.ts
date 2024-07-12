import { createClient } from "@/utils/supabase/client";
import { PostType } from "@/types/posts.type";

export const getAllPost = async (): Promise<PostType[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(10);

  if (error) {
    console.error("전체 게시글 가져오기 실패", error);
    throw new Error("전체 게시글 가져오기 실패");
  }

  return data;
};
