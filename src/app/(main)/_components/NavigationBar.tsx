import Button from "@/components/Button";
import React from "react";

const NavigationBar = () => {
  return (
    <div className="flex flex-col gap-4 absolute right-[-85px] top-[140px]">
      <Button href="/">Home</Button>
      <Button href="/my">My Page</Button>
      <Button href="/search">Search</Button>
    </div>
  );
};

export default NavigationBar;
