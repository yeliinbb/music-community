"use client";
import { getPosts } from "@/app/api/posts/route";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Post = () => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
  });
  console.log(data);

  return <div></div>;
};

export default Post;
