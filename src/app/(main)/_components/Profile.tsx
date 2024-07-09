import React from "react";
import Link from "next/link";

const Profile = () => {
  return (
    <div className="w-full h-full grid grid-rows-profile-layout mx-auto my-0 gap-3">
      <div className="w-full flex flex-col gap-1.5">
        <h2>마이 프로필</h2>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="profile image"
          className="w-[200px] h-[200px] object-cover rounded-md self-center"
        />
        {/* {수파베이스에서 데이터 가져오기} */}
        <p>이름</p>
        <p>e-mail</p>
        {/* <Link href=""> */}
        <p>게시물 작성</p>
        {/* </Link> */}
      </div>
      <div className="w-full h-full">
        <h2>지금 듣고 있는 곡</h2>
        {/* {플레이어} */}
      </div>
    </div>
  );
};

export default Profile;
