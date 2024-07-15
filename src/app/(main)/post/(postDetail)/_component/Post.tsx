"use client";

import { deletePost, editPost, uploadImg } from "@/lib/utils/postUtils";
import { PostType } from "@/types/posts.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useLoginStore } from "@/store/auth";
import PostSkeleton from "./PostSkeleton";
import { toast } from "react-toastify";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const Post = ({ id }: { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const userId = useLoginStore((state) => state.userId);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const {
    data: post,
    error,
    isPending,
    isSuccess
  } = useQuery<PostType, Error>({
    queryKey: ["posts", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts/${id}`);
      return data;
    }
  });

  const editMutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      setIsEditing(false);
      toast.success("수정되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("삭제되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });

  const onEdit = async () => {
    if (userId !== post?.userId) {
      toast.warn("작성자만 게시글을 수정할 수 있습니다");
      return;
    }

    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    let uploadImageURL = post?.imageURL;

    try {
      if (file) {
        const formData = new FormData();
        formData.append("postImg", file);

        const response = await uploadImg(formData);
        if (!response) {
          throw new Error("Failed to upload profile picture");
        }

        uploadImageURL = `${SUPABASE_URL}/storage/v1/object/public/postsImage/${response.path}`;
      }

      if (titleRef.current && contentRef.current) {
        const title: PostType["title"] = titleRef.current.value;
        const content: PostType["content"] = contentRef.current.value;

        if ((title !== undefined && content !== undefined) || uploadImageURL !== undefined) {
          const editedPost: PostType = {
            id: id,
            title: title,
            content: content,
            created_at: post?.created_at ?? "",
            imageURL: uploadImageURL,
            userId: userId || null
          };

          editMutation.mutate(editedPost);
        }
      }
    } catch (error) {
      console.error("Error in edit process:", error);
      toast.error("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  const onDelete = async () => {
    if (userId !== post?.userId) {
      toast.warn("작성자만 게시글을 삭제할 수 있습니다.");
      return;
    }

    if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        deleteMutation.mutate(id);
        router.push("/my");
        console.log("게시글 삭제가 완료되었습니다.");
      } catch (error) {
        console.error("게시글 삭제 중 오류 발생", error);
        toast.warn("게시글 삭제 중 오류가 발생했습니다.");
      }
    } else {
      toast.success("게시글 삭제가 취소되었습니다.");
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  if (isPending) {
    return <PostSkeleton />;
  }
  if (error) {
    return <div>게시글 불러오기 실패</div>;
  }

  return (
    <div className="border-2 border-gray-300 rounded-lg p-3 relative h-full max-h-[940px]">
      {isEditing ? (
        <>
          <div className="absolute top-[10px] right-[10px] flex gap-2 text-white">
            <button className="border border-gray-400 bg-[#54b2d3] rounded-lg p-[3px] text-[15px]" onClick={onEdit}>
              완료
            </button>
            <button className="border border-black rounded-lg bg-[#2c2c2c] p-[3px] text-[15px]" onClick={onDelete}>
              삭제
            </button>
            <button className="border border-gray-400 rounded-lg bg-[#CFCFCF] p-[3px] text-[15px]" onClick={() => {setIsEditing(false)}}>
              취소
            </button>
          </div>
          <div className="flex flex-row mb-3 gap-x-5">
            <div>
              {file ? (
                <img src={URL.createObjectURL(file)} alt="미리보기" className="rounded-md w-[100px] h-[100px]" />
              ) : (
                <img src={post?.imageURL} alt="현재 이미지" className="rounded-md w-[100px] h-[100px]" />
              )}
            </div>
            <input
              onChange={handleFileInputChange}
              type="file"
              id="hiddenFileInput"
              className="mt-5"
              accept="image/*"
            />
          </div>
          <input
            className="text-lg mb-1 h-8 border border-gray-500 outline-none p-1 rounded-md"
            ref={titleRef}
            defaultValue={post?.title ?? undefined}
          ></input>

          <textarea
            ref={contentRef}
            defaultValue={post?.content ?? undefined}
            className="resize-none outline-none border border-gray-500 mt-5 w-full rounded-md p-1 h-full max-h-[150px]"
          ></textarea>
        </>
      ) : (
        <>
          <div className="absolute top-[10px] right-[10px] flex gap-2 text-white">
            <button className="border border-gray-400 bg-[#CFCFCF] rounded-lg p-[3px] text-[15px]" onClick={onEdit}>
              수정
            </button>
            <button className="border border-black rounded-lg bg-[#2c2c2c] p-[3px] text-[15px]" onClick={onDelete}>
              삭제
            </button>
          </div>
          {isSuccess && (
            <>
              <div className="flex items-center">
                <img src={post?.imageURL} alt="썸네일 이미지" className="rounded-md w-[100px] h-[100px]" />
                <div className="text-lg mb-3 ml-8 h-8">{post?.title}</div>
              </div>
              <div className="mt-4 h-full max-h-[200px] w-full overflow-y-scroll scrollbar-hide">{post?.content}</div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
