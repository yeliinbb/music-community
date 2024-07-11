"use client";
import React from "react";
import Link from "next/link";
import ProfileModal from "@/components/ProfileModal";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { MdOutlineMail } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";


const Profile = () => {
  return (
    <div className=" bg-white rounded-2xl w-full h-full grid grid-rows-profile-layout grid-cols-1 mx-auto my-0 gap-3 ">
      <div className="w-full max-h-[300px] flex flex-col gap-3 px-[30px] pt-[30px] ">
        <div>
          <span className="mr-1.5">마이 프로필</span>
            <ProfileModal data-tooltip-id="프로필 수정" data-tooltip-content="프로필 수정"/>
          <Tooltip id="프로필 수정" place="bottom" style={{ backgroundColor: "#858585", color: "white" }} />
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
      <div className="w-full max-h-[300px] flex flex-col gap-3 px-[30px] pb-[30px] min-w-[350px]">
        <h2>Featured Playlists</h2>
        {/* {플레이어} */}
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="profile image"
          className="max-w-[180px] max-h-[180px] object-cover rounded-md self-center"
        />
        <div className="flex flex-col items-center gap-2">
          <p className="h-[15px]">플레이리스트 이름</p>
          {/* <Link href={플레이리스트 링크}> */}
          <p className="h-[15px]">바로가기</p>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
