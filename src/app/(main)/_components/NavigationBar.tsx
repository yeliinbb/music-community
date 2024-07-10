import Button from "@/components/Button";
import React from "react";

const NavigationBar = () => {
  return (
    <div className="flex flex-col gap-4 absolute right-[-85px] top-[140px] z-50">
      <Button>Home</Button>
      <Button>My Page</Button>
      <Button>Home</Button>
    </div>
  );
};

export default NavigationBar;
