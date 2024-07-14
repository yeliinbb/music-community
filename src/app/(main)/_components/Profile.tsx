"use client";

import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import ProfileModal from "@/components/ProfileModal";
import { useLoginStore } from "@/store/auth";
import { MdOutlineMail } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Trending from "../playlists/_components/Trending";
import "react-tooltip/dist/react-tooltip.css";
import { useUserData } from "@/hooks/useUserData";

const Profile = () => {
  const userId = useLoginStore((state) => state.userId);

  const { data: userProfileData, isPending } = useUserData(userId);
  const defaultImg =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <div className=" bg-white rounded-2xl w-full h-full grid grid-rows-profile-layout grid-cols-1 mx-auto my-0 gap-3 ">
      <div className="w-full max-h-[300px] flex flex-col gap-3 px-[10px] pt-[30px] ">
        <div className="flex items-center">
          <span className="mr-1.5 text-base">마이 프로필</span>
          <ProfileModal data-tooltip-id="프로필 수정" data-tooltip-content="프로필 수정" userId={userId} />
          <Tooltip id="프로필 수정" place="bottom" style={{ backgroundColor: "#858585", color: "white" }} />
        </div>
        {
          <div className="w-[180px] h-[220px] overflow-hidden rounded-md self-center">
            <img
              src={userProfileData?.profileUrl ? userProfileData.profileUrl : defaultImg}
              alt="사용자 프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>
        }
        <div className="flex flex-col justify-center gap-2 place-self-center">
          <div className="flex gap-1.5 items-center ">
            <IoPersonCircleOutline className="mt-1.5" />
            {isPending ? (
              <span className="w-40 h-4 bg-gray-300 rounded-full" />
            ) : (
              <span className="h-[15px] text-sm">{userProfileData?.nickname}</span>
            )}
          </div>
          <div className="flex gap-1.5 items-center">
            <MdOutlineMail className="mt-1.5" />
            {isPending ? (
              <span className="w-40 h-4 bg-gray-300 rounded-full flex" />
            ) : (
              <span className="h-[15px] text-sm">{userProfileData?.email}</span>
            )}
          </div>
        </div>
      </div>
      <Trending />
    </div>
  );
};

export default Profile;
