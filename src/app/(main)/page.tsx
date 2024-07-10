import LogoutButton from "@/components/LogoutButton";
import React from "react";
import Trending from "./_components/Trending";
import Playlists from "./_components/Playlists";
import Profile from "./_components/Profile";

const MainPage = () => {
  return (
    <section className="w-full h-full grid grid-cols-main-layout gap-8 pt-[100px] pb-[60px] px-[60px]">
      {/* <div className="w-full h-full bg-white rounded-2xl"> */}
      <Profile />
      {/* </div> */}
      <div className="w-full bg-white p-[30px] rounded-2xl overflow-y-scroll">
        {/* <Trending /> */}
        <Playlists />
      </div>
    </section>
  );
};

export default MainPage;
