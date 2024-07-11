"use client";

import { PostType } from "@/types/posts.type";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";

const editPost = async ({ id, title, content }: { id: string; title: string; content: string }) => {
  const supabase = createClient();
  const { error } = await supabase.from("posts").update({ title, content });
  if (error) {
    throw new Error(error.message);
  }
  return;
};

const Post = ({ id }: { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const { data, error } = useQuery<PostType, Error>({
    queryKey: ["posts", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts/${id}`);
      console.log(data);
      return data;
    }
  });

  const editMutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      setIsEditing(false);
      alert("수정되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });

  if (error) {
    return <div>불러오기 실패</div>;
  }

  const enableEditing = async () => {
    const supabase = createClient();
    const {
      data: { session }
    } = await supabase.auth.getSession();
    const userId = session?.user.id;

    if (userId !== data?.userId) {
      alert("작성자만 수정할 수 있습니다");
      return;
    }
    setIsEditing(true);
  };

  const onEdit = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const title: string = titleRef.current?.value;
    const content: string = contentRef.current?.value;

    editMutation.mutate({ id, title, content });
  };

  return (
    <div className="border-2 border-gray-300 h-56 rounded-lg p-3 mb-8 relative overflow-auto">
      {isEditing ? (
        <>
          <div className="absolute top-[10px] right-[10px] flex gap-2 text-white">
            <button className="border border-gray-400 bg-[#CFCFCF] rounded-lg p-[3px] text-[15px]" onClick={onEdit}>
              완료
            </button>
            <button className="border border-black rounded-lg bg-[#2c2c2c] p-[3px] text-[15px]">삭제</button>
          </div>

          <div className="flex items-center">
            <Image src={data?.imageURL} alt="썸네일 이미지" width={100} height={100} className="rounded-md" />
            <input
              className="text-lg mb-3 ml-8 h-8 border border-gray-500 outline-none p-1 rounded-md"
              ref={titleRef}
              defaultValue={data?.title}
            ></input>
          </div>

          <textarea
            ref={contentRef}
            defaultValue={data?.content}
            className="resize-none outline-none border border-gray-500 mt-5 w-full h-[80px] rounded-md p-1"
          ></textarea>
        </>
      ) : (
        <>
          <div className="absolute top-[10px] right-[10px] flex gap-2 text-white">
            <button
              className="border border-gray-400 bg-[#CFCFCF] rounded-lg p-[3px] text-[15px]"
              onClick={enableEditing}
            >
              수정
            </button>
            <button className="border border-black rounded-lg bg-[#2c2c2c] p-[3px] text-[15px]">삭제</button>
          </div>

          <div className="flex items-center">
            <Image src={data?.imageURL} alt="썸네일 이미지" width={100} height={100} className="rounded-md" />
            <div className="text-lg mb-3 ml-8 h-8">{data?.title}</div>
          </div>

          <div className="mt-4">{data?.content}</div>
        </>
      )}
    </div>
  );
};

export default Post;
