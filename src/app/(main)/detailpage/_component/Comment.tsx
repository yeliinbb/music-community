"use client";
import { createClient } from "@/utils/supabase/client";
import React from "react";

const Comment = ({ id }: { id: string }) => {
  console.log(id);
  const getComment = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("comments")
      .select("id, createdAt,users(nickname, email), content")
      .eq("postId", id);
    console.log(data);
  };
  getComment();
  return (
    <div className="border border-gray-300 h-1/2 rounded-lg p-5">
      <h3>Comment</h3>
      <input type="text" />
    </div>
  );
};

export default Comment;
