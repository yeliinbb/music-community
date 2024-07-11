"use client";
import React from "react";
import Link from "next/link";
import ProfileModal from "@/components/ProfileModal";
import { MdOutlineMail } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import Trending from "../playlists/_components/Trending";

const Profile = () => {
  return (
    <div className=" bg-white rounded-2xl w-full h-full grid grid-rows-profile-layout grid-cols-1 mx-auto my-0 gap-3 ">
      <div className="w-full max-h-[300px] flex flex-col gap-3 px-[30px] pt-[30px] ">
        <div>
          <span className="mr-1.5">마이 프로필</span>
          <ProfileModal data-tooltip-id="프로필 수정" data-tooltip-content="프로필 수정" />
        </div>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="profile image"
          className="max-w-[180px] max-h-[180px] object-cover rounded-md self-center"
        />
        {/* {수파베이스에서 데이터 가져오기} */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            <IoPersonCircleOutline />
            <span className="h-[15px]">이름</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MdOutlineMail />
            <span className="h-[15px]">e-mail</span>
          </div>
        </div>
      </div>
      <Trending />
    </div>
  );
};

export default Profile;
