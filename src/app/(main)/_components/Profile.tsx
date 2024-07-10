import React from "react";
import Link from "next/link";

const Profile = () => {
  return (
    <div className=" bg-white rounded-2xl w-full h-full grid grid-rows-profile-layout grid-cols-1 mx-auto my-0 gap-3 ">
      <div className="w-full max-h-[300px] flex flex-col gap-3 px-[30px] pt-[30px] ">
        <h2>마이 프로필</h2>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="profile image"
          className="max-w-[180px] max-h-[180px] object-cover rounded-md self-center"
        />
        {/* {수파베이스에서 데이터 가져오기} */}
        <div className="flex flex-col items-center gap-2">
          <p className="h-[15px]">이름</p>
          <p className="h-[15px]">e-mail</p>
          {/* <Link href=""> */}
          <p className="h-[15px]">게시물 작성</p>
          {/* </Link> */}
        </div>
      </div>
      <div className="w-full max-h-[300px] flex flex-col gap-3 px-[30px] pb-[30px] min-w-[350px]">
        <h2>지금 듣고 있는 곡</h2>
        {/* {플레이어} */}
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="profile image"
          className="max-w-[180px] max-h-[180px] object-cover rounded-md self-center"
        />
        <div className="flex flex-col items-center gap-2">
          <p className="h-[15px]">트랙 이름</p>
          <p className="h-[15px]">아티스트</p>
          <button className="h-[15px]">재생 버튼</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
