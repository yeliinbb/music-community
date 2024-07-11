"use client";

import React from "react";
import Link from "next/link";
import ProfileModal from "@/components/ProfileModal";
import { MdOutlineMail } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useLoginStore } from "@/store/auth";
import {Tooltip} from "react-tooltip";
import Trending from "../playlists/_components/Trending";

const Profile = () => {
  const userId = useLoginStore((state) => state.userId);
  console.log(userId)

  const { data: userProfileData, isPending, error } = useQuery({
    queryKey: ["userData", userId],
    queryFn: async ({ queryKey }) => {
      const [_key, userId] = queryKey;
      const response = await fetch(`/api/profile/${userId}`);
      if (!response.ok) {
        throw new Error("사용자 정보를 가져오는데 실패했습니다.");
      }
      const data = await response.json();
      return data;
    },
  });

  console.log(userProfileData);    
  return (
    <div className=" bg-white rounded-2xl w-full h-full grid grid-rows-profile-layout grid-cols-1 mx-auto my-0 gap-3 ">
      <div className="w-full max-h-[300px] flex flex-col gap-3 px-[30px] pt-[30px] ">
        <div>
          <span className="mr-1.5">마이 프로필</span>
          <ProfileModal data-tooltip-id="프로필 수정" data-tooltip-content="프로필 수정" userId={userId} />
          <Tooltip id="프로필 수정" place="bottom" style={{ backgroundColor: "#858585", color: "white" }} />
        </div>
        {
          userProfileData ? <img src={userProfileData.profileUrl ?? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} alt='사용자 프로필 이미지' className="max-w-[180px] max-h-[180px] object-cover rounded-md self-center" /> : 
          <img
          src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="profile image"
          className="max-w-[180px] max-h-[180px] object-cover rounded-md self-center"
        />
        }
        
        {/* {수파베이스에서 데이터 가져오기} */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5 flex-row">
            <IoPersonCircleOutline className="mt-2" />
            <span className="h-[15px]">{userProfileData?.nickname}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-row">
            <MdOutlineMail className="mt-2" />
            <span className="h-[15px]">{userProfileData?.email}</span>
          </div>
        </div>
      </div>
      <Trending />
    </div>
  );
};

export default Profile;
