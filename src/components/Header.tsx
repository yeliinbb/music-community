import SearchInput from "@/app/(main)/search/_components/SearchInput";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Header = () => {
  return (
    <header className="flex w-full gap-32 justify-between py-4 px-10">
      <Link href={"/"}>
        <p className="cursor-pointer text-2xl font-bold">CyTunes</p>
      </Link>
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
          {/* <img
            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            alt="profile image"
            className="w-10 h-10 object-cover rounded-full border-white border-[1.5px] border-solid"
          /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
