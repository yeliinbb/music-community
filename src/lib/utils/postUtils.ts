import { PostType } from "@/types/posts.type";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const enableMutation = async () => {
  const supabase = createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  return userId;
};

export const editPost = async ({ id, title, content }: PostType) => {
  const { error } = await supabase.from("posts").update({ title, content }).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return;
};

export const deletePost = async (id: PostType["id"]) => {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    console.error("게시물 삭제 실패", error);
    throw new Error("Failed to delete post");
  }
  return;
};
