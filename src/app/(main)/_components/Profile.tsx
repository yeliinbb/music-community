"use client";

import ProfileModal from "@/components/ProfileModal";

import { IoPersonCircleOutline } from "react-icons/io5";
import { useLoginStore } from "@/store/auth";
import { MdOutlineMail } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Trending from "../playlists/_components/Trending";

import { useUserData } from "@/hooks/useUserData";

const Profile = () => {
  const userId = useLoginStore((state) => state.userId);
  // console.log(userId);
  const { data: userProfileData, isPending, error } = useUserData(userId);

  const defaultImg = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'

  return (
    <div className=" bg-white rounded-2xl w-full h-full grid grid-rows-profile-layout grid-cols-1 mx-auto my-0 gap-3 ">
      <div className="w-full max-h-[300px] flex flex-col gap-3 px-[10px] pt-[30px] ">
        <div>
          <span className="mr-1.5">마이 프로필</span>
          <ProfileModal data-tooltip-id="프로필 수정" data-tooltip-content="프로필 수정" userId={userId} />
          <Tooltip id="프로필 수정" place="bottom" style={{ backgroundColor: "#858585", color: "white" }} />
        </div>

        {
          <img
            src={
              userProfileData?.profileUrl
                ? userProfileData.profileUrl
                : defaultImg
            }
            alt="사용자 프로필 이미지"
            className="w-[200px] h-[180px] object-cover rounded-md self-center"
          />
        }
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
