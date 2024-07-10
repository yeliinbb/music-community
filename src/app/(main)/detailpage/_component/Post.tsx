"use client";

import { PostType } from "@/types/posts.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Post = ({ id }: { id: string }) => {
  const { data, error } = useQuery<PostType | null, Error>({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts/${id}`);

      return data;
    }
  });

  if (error) {
    return <>불러오기 실패</>;
  }

  return (
    <div className="border border-gray-300 h-56 rounded-lg p-5 mb-8">
      <div>{data?.title}</div>
      <div>{data?.content}</div>
    </div>
  );
};

export default Post;
