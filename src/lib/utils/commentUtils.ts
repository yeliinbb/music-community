import { CommentType } from "@/types/comment.type";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const fetchComments = async (id : string) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*,users(nickname, email)")
      .eq("postId", id)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("댓글 불러오기 실패", error);
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (newComment: CommentType) => {
  const response = await supabase.from("comments").insert(newComment);
  return response.data;
};

export const editComment = async ({ content, id }: CommentType) => {
  const { error } = await supabase.from("comments").update({ content }).eq("id", id);
  if (error) {
    console.error("댓글 수정 실패", error);
    throw new Error(error.message);
  }
  return;
};

export const deleteComment = async (id: CommentType["id"]) => {
  const { error } = await supabase.from("comments").delete().eq("id", id);
  if (error) {
    console.error("댓글 삭제 실패", error);
    throw new Error("Failed to delete post");
  }
  return;
};
