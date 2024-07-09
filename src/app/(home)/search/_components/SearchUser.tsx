"use client";

import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SearchUser() {
  const searchParams = useSearchParams();
  // console.log("PARAMS___", searchParams);
  const query = searchParams.get("params") ? (searchParams.get("params") as string) : "";

  const { data: searchUsers, isLoading } = useQuery({
    queryKey: ["search", { query, type: "user" }],
    queryFn: () => api.getSearchUsers(query)
  });

  console.log("USER DATA___", searchUsers);
  return (
    <div>
      <h2 className="font-bold text-xl">유저</h2>
      <ul className="grid grid-cols-6 gap-4">
        {searchUsers?.map((searchUser) => (
          <li key={searchUser.id}>
            <div className="relative aspect-square p-2">
              <Image
                src={"http://via.placeholder.com/640x480"}
                className="object-cover"
                fill
                alt={searchUser.nickname!}
                sizes={"100px"}
              />
            </div>
            {searchUser.nickname}
          </li>
        ))}
      </ul>
    </div>
  );
}
