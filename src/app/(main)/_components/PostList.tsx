"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "./getAllPost";
import { PostgrestError } from "@supabase/supabase-js";
import { PostType } from "@/types/posts.type";
import PostCard from "./PostCard";
import { CustomNextArrow, CustomPrevArrow } from "@/components/CutomArrow";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

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
    return <div>~~~</div>;
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
    <div className="mt-10 w-full">
      <p className="font-bold mb-5">게시글</p>
      <div className="custom-slider">
        <Slider {...settings}>
          {allPosts?.map((post) => (
            <div key={post.id} className="px-1">
              <div
                className="shadow-md hover:shadow-lg transition-shadow duration-150 
              active:shadow-[inset_0_2px_8px_gray] select-none cursor-pointer
              border border-black rounded max-w-[250px] mx-auto"
              >
                {" "}
                {/* max-w-[250px] 추가 */}
                <Link className="p-2 flex flex-col gap-y-2" href={`/detailpage/${post.id}`}>
                  {" "}
                  {/* gap-y-4를 gap-y-2로 변경 */}
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
