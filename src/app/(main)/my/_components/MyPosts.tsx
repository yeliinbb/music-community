"use client";

import useMe from "@/hooks/useMe";

type MyPostsType = {
  id: string;
  title: string;
  userId: string;
  content: string;
  created_at: string;
};

export default function MyPosts() {
  const { posts } = useMe();

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
