import SearchInput from "@/app/(main)/search/_components/SearchInput";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Header = () => {
  return (
    <header className="grid grid-cols-main-layout w-full gap-2.5 justify-between py-4 px-10 items-center">
      <Link href={"/"}>
        <img src="/logo.svg" alt="logo" className="w-[200px] h-[38px] ml-[0.2rem] cursor-pointer" />
      </Link>
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-grow max-w-[400px]">
          <SearchInput />
        </div>
        <div className="flex items-center">
          <div className="mr-0.5">
            <div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
