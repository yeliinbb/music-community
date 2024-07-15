import { PostType } from "@/types/posts.type";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const editPost = async ({ id, title, content, imageURL }: PostType) => {
  const { error } = await supabase.from("posts").update({ title, content, imageURL }).eq("id", id);
  if (error) {
    console.error("게시물 수정 실패", error);
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

export const uploadImg = async (formData: FormData) => {
  const file = formData.get("postImg");

  if (file instanceof File) {
    const extension = file.name.split(".").pop();
    const filename = `_${Math.random().toString(36).slice(2, 16)}.${extension}`;

    try {
      const { data, error } = await supabase.storage.from("postsImage").upload(`/${filename}`, file);

      if (error) {
        console.error("포스트 이미지 변경 업로드 실패");
        throw new Error("Failed to upload post image");
      }

      return data || undefined;
    } catch (error) {
      console.error("Error in file upload:", error);
      throw error;
    }
  }
};
