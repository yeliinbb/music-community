"use client";

import useSearch from "@/hooks/useSearch";
import Image from "next/image";

export default function SearchUser() {
  const { users } = useSearch();
  // console.log("USER DATA___", users);

  return (
    <div>
      <h2 className="font-bold text-xl">유저</h2>
      <div className="min-h-[100px]">
        {!users?.length && <div className="flex items-center justify-center flex-1">유저 검색 결과가 없습니다.</div>}
        <ul className="grid grid-cols-6 gap-4">
          {users?.map((user) => (
            <li key={user.id}>
              <div className="relative aspect-square p-2">
                <Image
                  src={"http://via.placeholder.com/640x480"}
                  className="object-cover"
                  fill
                  alt={user.nickname!}
                  sizes={"100px"}
                />
              </div>
              {user.nickname}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
