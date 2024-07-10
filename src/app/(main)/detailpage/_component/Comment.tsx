"use client";
import { CommentType } from "@/types/comments";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const Comment = ({ id }: { id: string }) => {
  const [commentList, setCommentList] = useState<CommentType[]>([]);

  const { isError } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("comments").select("id, createdAt,users(nickname, email), content");
      console.log(data);
      setCommentList(data);
    }
  });

  // useEffect(() => {
  //   const getComment = async () => {
  //     const supabase = createClient();
  //     const { data } = await supabase.from("comments").select("id, createdAt,users(nickname, email), content");
  //     // .eq("postId", id);
  //     console.log(data);
  //     setCommentList(data);
  //   };
  //   getComment();
  // }, []);

  return (
    <div className="w-full border-2 border-gray-300 h-[400px] rounded-lg p-5">
      <h3 className="text-xl mb-2">Comment</h3>
      <div className="flex flex-col justify-center items-center">
        <form></form>
        <input
          type="text"
          className="w-[88%] outline-none indent-2.5 h-16 rounded-lg border-2 border-gray-300 bg-inherit mb-5"
        />

        <div className="w-[90%] h-[230px] overflow-auto">
          {commentList.map((comment) => (
            <div className="shadow p-4 rounded-lg mb-2" key={comment.id}>
              <p>{comment.users.nickname}</p>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
