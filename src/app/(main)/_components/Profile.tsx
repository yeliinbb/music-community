"use client";
import Image from "next/image";
import { IoIosSettings } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Profile = () => {
  return (
    <div className=" bg-white grid grid-rows-profile-layout grid-cols-1 mx-auto my-0 gap-3 rounded-xl">
      <div className="w-full flex flex-col p-2 gap-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">마이 프로필</span>
          <button className="z-10" data-tooltip-id="프로필 수정" data-tooltip-content="프로필 수정">
            <IoIosSettings />
          </button>
          <Tooltip id="프로필 수정" place="top" style={{ backgroundColor: "#858585", color: "white" }} />
        </div>
        <div className="relative aspect-square size-[180px] border border-gray-300">
          <Image
            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            alt="profile image"
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>
        {/* {수파베이스에서 데이터 가져오기} */}
        <div className="flex flex-col text-sm">
          <div className="flex items-center gap-x-1">
            <IoPersonCircleOutline />
            <span>이름</span>
          </div>
          <div className="flex items-center gap-x-1">
            <MdOutlineMail />
            <span>e-mail</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col p-2 gap-y-2">
        <span className="text-sm text-gray-400">플레이 리스트</span>
        {/* {플레이어} */}
        <div className="relative aspect-square size-[180px] border border-gray-300">
          <Image
            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            alt="profile image"
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col  text-sm">
          <p>플레이리스트 이름</p>
          {/* <Link href={플레이리스트 링크}> */}
          <p>바로가기</p>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
