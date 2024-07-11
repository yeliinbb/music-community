import Profile from "@/app/(main)/_components/Profile";
import { PropsWithChildren } from "react";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Profile />
      <div className="w-full bg-white p-[20px] rounded-xl overflow-y-scroll scrollbar-hide">{children}</div>
    </>
  );
}
