import Header from "@/components/Header";
import React, { PropsWithChildren } from "react";
import NavigationBar from "./_components/NavigationBar";
import Profile from "./_components/Profile";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="w-full h-full bg-[#D9D9D9] rounded-3xl relative min-w-[700px]">
      <Header />
      <NavigationBar />
      <section className="w-full h-full grid grid-cols-main-layout gap-8 pt-[100px] pb-[60px] px-[60px]">
        <Profile />
        <div className="w-full bg-white p-[30px] rounded-2xl overflow-y-scroll scrollbar-hide scroll-smooth">
          {children}
        </div>
      </section>
    </main>
  );
};

export default MainLayout;
