"use client";
import { getPosts } from "@/app/api/posts/route";
import { useQuery } from "@tanstack/react-query";

const Post = ({ id }: { id: string }) => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(id)
  });
  console.log(data);

  return <div>{data[0]?.title}</div>;
};

export default Post;
