import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <main className="h-screen grid place-items-center">
      <div className="grid place-items-center flex-1 bg-[#D9D9D9] rounded-3xl w-[1280px] relative shadow-xl">
        <Header />
        <NavigationBar />
        <section className="w-full grid grid-cols-main-layout gap-8 px-10 pb-10">{children}</section>
      </div>
      <div className="grid place-items-end">
        <Footer />
      </div>
    </main>
  );
}
