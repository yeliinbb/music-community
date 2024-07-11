import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PropsWithChildren } from "react";
import NavigationBar from "../../components/NavigationBar";
import Profile from "./_components/Profile";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="h-screen grid place-items-center">
        <div className="grid place-items-center flex-1 bg-[#D9D9D9] rounded-3xl w-[1280px] relative shadow-xl">
          <Header />
          <NavigationBar />
          <section className="w-full grid grid-cols-main-layout gap-8 px-10 pb-10">
            <Profile />
            <div className="w-full bg-white p-[20px] rounded-xl overflow-y-scroll scrollbar-hide">{children}</div>
          </section>
        </div>
        <div className="grid place-items-end">
          <Footer />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
