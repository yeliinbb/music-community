"use client";

import useSearch from "@/hooks/useSearch";
import Image from "next/image";

export default function SearchUser() {
  const { users } = useSearch();
  // console.log("USER DATA___", users);
  const defaultImg =
  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <div className="flex flex-col gap-y-4 min-h-[200px]">
      <h2 className="font-bold text-2xl">사용자</h2>
      <div className="size-full flex-1">
        {!users?.length && <h2 className="font-bold test-2xl select-none">유저 검색 결과가 없습니다.</h2>}
        <ul className="grid grid-cols-7 gap-4">
          {users?.map((user) => (
            <li className="flex flex-col gap-y-2" key={user.id}>
              <div className="relative aspect-square p-2">
                <img
                  src={user.profileUrl ?? defaultImg}
                  className="object-cover w-[100px] h-[100px] rounded-lg"
                  alt={user.nickname ?? "사용자 프로필"}
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <p className="line-clamp-1 text-sm font-bold ml-2">{user.nickname}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
