import NavButton from "@/components/NavButton";
import React from "react";

const NavigationBar = () => {
  return (
    <div className="flex flex-col gap-4 absolute right-[-85px] top-[140px] z-50">
      <NavButton href="/">Home</NavButton>
      <NavButton href="/my">My Page</NavButton>
      <NavButton href="/detailPage">Post</NavButton>
    </div>
  );
};

export default NavigationBar;
