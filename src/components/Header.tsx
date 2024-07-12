import SearchInput from "@/app/(main)/search/_components/SearchInput";
import LogoutButton from "./LogoutButton";
import logo from "../../public/logo.svg";

const Header = () => {
  return (
    <header className="flex w-full gap-32 justify-between py-4 px-10 items-center">
      <img src="/logo.svg" alt="logo" className="w-[150px] " />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-grow max-w-[600px]">
          <SearchInput />
        </div>
        <div className="flex items-center">
          <div className="mr-5">
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
