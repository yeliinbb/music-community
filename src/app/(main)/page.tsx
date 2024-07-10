import React from "react";
import Trending from "./_components/Trending";
import Playlists from "./_components/Playlists";
import Profile from "./_components/Profile";
import Artist from "./_components/Artist";

const MainPage = () => {
  return (
    <section className="w-full h-full grid grid-cols-main-layout gap-8 pt-[100px] pb-[60px] px-[60px]">
      <div className="w-full h-full bg-white p-[50px] rounded-2xl">
        <Profile />
      </div>
      <div className="w-full bg-white p-[30px] rounded-2xl">
        MainPage
        {/* <Trending /> */}
        <Playlists />
        <Artist />
      </div>
    </section>
  );
};

export default MainPage;
