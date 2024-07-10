"use client";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";

const Comment = ({ id }: { id: string }) => {
  const commentRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: commentList, isError } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("comments").select("*,users(nickname, email)");
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  });

  const { mutateAsync: createComment } = useMutation({
    mutationFn: (newComment: any) => addComment(newComment),
    onSuccess: () => {}
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = commentRef.current?.value;
    const newComment = { content: comment, postId: id, userId: "37a68d71-1c40-4a40-b21f-cb49d28ce82c" }; // userId 바꾸기
    console.log(newComment);
    const response = await createComment(newComment);
  };

  const addComment = async (newComment: any) => {
    const supabase = createClient();
    const response = await supabase.from("comments").insert(newComment);
  };

  return (
    <div className="w-full border-2 border-gray-300 h-[400px] rounded-lg p-5">
      <h3 className="text-xl mb-2">Comment</h3>
      <div className="flex flex-col justify-center items-center">
        <form className="relative w-[88%]" onSubmit={(e) => handleSubmit(e)}>
          <input
            ref={commentRef}
            type="text"
            className="w-full outline-none indent-2.5 h-16 rounded-lg border-2 border-gray-300 bg-inherit mb-5 "
          />
          <button className=" absolute top-[20px] right-[25px]">추가</button>
        </form>

        <div className="w-[90%] h-[230px] overflow-auto">
          {commentList?.map((comment) => (
            <div className="shadow p-4 rounded-lg mb-2" key={comment.id}>
              <p>{comment.users?.nickname}</p>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
