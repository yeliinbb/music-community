"use client";

import useMe from "@/hooks/useMe";
import Link from "next/link";
import MyPostCard from "./MyPostCard";

export default function MyPosts() {
  const { posts } = useMe();

  return (
    <div>
      <ul className="grid grid-cols-4 gap-2 p-2">
        {posts?.map((post) => (
          <li
            className="shadow-md hover:shadow-lg transition-shadow duration-150 
            active:shadow-[inset_0_2px_8px_gray] select-none cursor-pointer
            border border-black rounded "
            key={post.id}
          >
            <Link className="p-2 flex flex-col gap-y-4" href={`/post/${post.id}`}>
              <MyPostCard post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
