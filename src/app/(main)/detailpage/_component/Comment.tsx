"use client";
import { useLoginStore } from "@/store/auth";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";

const Comment = ({ id }: { id: string }) => {
  const commentRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [loginUser, setLoginUser] = useState("");
  const userId = useLoginStore((state) => state.userId);
  // console.log("코멘트;", userId);
  // useEffect(() => {
  //   const user = async () => {
  //     const supabase = createClient();
  //     const {
  //       data: { session }
  //     } = await supabase.auth.getSession();

  //     if (!session) {
  //       return;
  //     }
  //     const userId = session.user.id;
  //     setLoginUser(userId);
  //   };
  //   user();
  // }, []);

  const { data: commentList } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("comments").select("*,users(nickname, email)");
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  });

  const addComment = async (newComment: any) => {
    const supabase = createClient();
    const response = await supabase.from("comments").insert(newComment);
    return response;
  };

  const { mutate: createComment } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = commentRef.current?.value;

    if (!comment) {
      alert("내용을 입력하세요!");
      return;
    }

    const newComment = { content: comment, postId: id, userId: userId }; // userId 바꾸기
    createComment(newComment);
  };

  return (
    <div className="w-full border-2 border-gray-300 h-[300px] rounded-lg p-5">
      <h3 className="text-xl mb-2">Comment</h3>
      <div className="flex flex-col justify-center items-center">
        <form className="relative w-[88%]" onSubmit={(e) => handleSubmit(e)}>
          <input
            ref={commentRef}
            type="text"
            className="w-full outline-none indent-2.5 h-14 rounded-lg border-2 border-gray-300 bg-inherit mb-5 "
          />
          <button className=" absolute top-[16px] right-[25px]">추가</button>
        </form>

        <div className="w-[90%] h-[135px] overflow-auto">
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
