"use client";

import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getAllPost } from "./getAllPost";

import { PostType } from "@/types/posts.type";
import PostCard from "./PostCard";

import { CustomNextArrow, CustomPrevArrow } from "@/components/CutomArrow";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import PostListSkeleton from "./PostListSkeleton";

const PostList = () => {
  const {
    data: allPosts,
    isPending,
    error
  } = useQuery<PostType[], PostgrestError>({
    queryKey: ["allPosts"],
    queryFn: getAllPost
  });

  if (isPending) {
    return <PostListSkeleton />;
  }

  if (error) {
    console.error(error);
    return <div className="text-xl">에러가 발생했습니다: {error?.message}</div>;
  }

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  return (
    <div className="mt-10 w-full px-2">
      <p className="font-bold mb-5">게시글</p>
      <div className="custom-slider">
        <Slider {...settings}>
          {allPosts?.map((post) => (
            <div key={post.id} className="px-1">
              <div
                className="shadow-md hover:shadow-lg transition-shadow duration-150 
                active:shadow-[inset_0_2px_8px_gray] select-none cursor-pointer
                border border-black rounded"
              >
                <Link className="p-2 flex flex-col gap-y-4" href={`/detailpage/${post.id}`}>
                  <PostCard post={post} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PostList;
