"use client";

import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
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
  return <div>{searchUsers?.map((searchUser) => <li key={searchUser.id}>{searchUser.nickname}</li>)}</div>;
}
