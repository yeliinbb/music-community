"use client";

import useSearch from "@/hooks/useSearch";
import Image from "next/image";

export default function SearchUser() {
  const { users } = useSearch();
  // console.log("USER DATA___", users);

  return (
    <div className="flex flex-col gap-y-4 min-h-[200px] ">
      <h2 className="font-bold text-2xl">사용자</h2>
      <div className="size-full flex-1">
        {!users?.length && <h2 className="font-bold test-2xl select-none">유저 검색 결과가 없습니다.</h2>}
        <ul className="grid grid-cols-7 gap-4">
          {users?.map((user) => (
            <li className="flex flex-col gap-y-2" key={user.id}>
              <div className="relative aspect-square p-2">
                <Image
                  src={"http://via.placeholder.com/640x480"}
                  className="object-cover"
                  fill
                  alt={user.nickname!}
                  sizes={"100px"}
                />
              </div>
              <div>
                <p className="line-clamp-1 text-sm font-bold">{user.nickname}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
