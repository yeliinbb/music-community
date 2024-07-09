"use client";

import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function SearchUser({ searchParams }: { searchParams: string }) {
  const { data: users } = useQuery({
    queryKey: ["searchUsers", { params: searchParams }],
    queryFn: () => api.search.searchUsers(searchParams),
    retry: 0
  });

  // console.log("USER DATA___", users);
  return (
    <div>
      <h2 className="font-bold text-xl">유저</h2>
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
  );
}
