import { PropsWithChildren } from "react";

export default function NonProfileLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="w-full bg-white p-[20px] rounded-xl overflow-y-scroll scrollbar-hide">{children}</div>
    </>
  );
}
