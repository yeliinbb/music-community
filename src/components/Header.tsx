import SearchInput from "@/app/(main)/search/_components/SearchInput";
import LogoutButton from "./LogoutButton";

const Header = () => {
  return (
    <header className="w-full h-[90px] grid grid-cols-main-layout items-center gap-8 pt-3 px-[60px] absolute">
      <p className="text-2xl font-bold">CyTunes</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-row">
          <img src="/search.svg" alt="검색 아이콘" className="w-7 h-7 mt-1 mr-3" />
          <SearchInput />
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-5">
            <div>
              <LogoutButton />
            </div>
          </div>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            alt="profile image"
            className="w-10 h-10 object-cover rounded-full border-white border-[1.5px] border-solid"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
