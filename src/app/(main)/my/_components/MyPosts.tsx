"use client";

import useMe from "@/hooks/useMe";
import Link from "next/link";
import MyPostCard from "./MyPostCard";
import MyPostSkeleton from "../../_components/MyPostSkeleton";

export default function MyPosts() {
  const { posts, isPending, error } = useMe();

  if (isPending) return <MyPostSkeleton />;
  if (error) return <div>데이터를 불러오는데 실패했습니다.</div>;
  if (!posts || posts.length === 0) return <div className="h-[150px]">작성한 게시글이 없습니다.</div>;

  return (
    <div>
      <ul className="grid grid-cols-4 gap-10 p-2">
        {posts &&
          posts.length > 0 &&
          posts?.map((post) => (
            <li
              className="shadow-md hover:shadow-lg transition-shadow duration-150 
            active:shadow-[inset_0_2px_8px_gray] select-none cursor-pointer
            border border-gray-300 rounded-lg"
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
