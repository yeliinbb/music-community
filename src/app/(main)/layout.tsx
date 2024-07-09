import React, { PropsWithChildren } from "react";
import NavigationBar from "./_components/NavigationBar";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="w-full h-full bg-[#D9D9D9] rounded-3xl relative">
      <NavigationBar />
      {children}
    </main>
  );
};

export default MainLayout;
