import LogoutButton from "@/components/LogoutButton";
import React from "react";
import Trending from "./playlists/_components/Trending";
import Playlists from "./playlists/_components/Playlists";
import Profile from "./_components/Profile";
import Artist from "./artist/_components/mainPage/Artist";

const MainPage = () => {
  return (
    // <section className="w-full h-full grid grid-cols-main-layout gap-8 pt-[100px] pb-[60px] px-[60px]">
    //   <Profile />
    //   <div className="w-full bg-white p-[30px] rounded-2xl overflow-y-scroll scrollbar-hide">
    <>
      <Playlists />
      <Artist />
    </>
    //   </div>
    // </section>
  );
};

export default MainPage;
