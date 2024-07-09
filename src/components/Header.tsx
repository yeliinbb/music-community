import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 px-[65px]">
      <p className="text-2xl font-bold">CyTunes</p>
      <div>
        <input
          type="text"
          placeholder="검색어를 입력해 주세요"
          autoFocus
          className="w-72 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-row items-center">
        <div className="mr-5">
          <button>logout</button>
        </div>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="profile image"
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
