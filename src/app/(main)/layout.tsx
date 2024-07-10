import Header from "@/components/Header";
import React, { PropsWithChildren } from "react";
import NavigationBar from "./_components/NavigationBar";
import Header from "@/components/Header";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="w-full h-full bg-[#D9D9D9] rounded-3xl relative min-w-[700px]">
      <Header />
      <NavigationBar />
      {children}
    </main>
  );
};

export default MainLayout;
