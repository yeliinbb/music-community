"use client";

import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";

type MyPostsType = {
  id: string;
  title: string;
  userId: string;
  content: string;
  created_at: string;
};

export default function MyPosts() {
  const { data: posts, isFetching } = useQuery<MyPostsType[]>({
    queryKey: ["myPosts"],
    queryFn: () => api.me.getMyPosts()
  });

  // console.log("MY POSTS___", posts);

  return (
    <div>
      <ul className="grid grid-cols-3 gap-2 p-2">
        {posts?.map((post) => (
          <li className="divide-y-2 border border-black rounded p-2" key={post.id}>
            <h2 className="font-bold text-lg">{post.title}</h2>
            <p className="text-sm">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
