"use client";

import api from "@/api/api";
import { useQueries } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useSearch() {
  const searchParams = useSearchParams();
  const params = searchParams.get("params");

  const results = useQueries({
    queries: [
      {
        queryKey: ["searchSpotify", { params }],
        queryFn: () => api.search.searchSpotify(params),
        retry: 0
      },
      {
        queryKey: ["searchUsers", { params }],
        queryFn: () => api.search.searchUsers(params),
        retry: 0
      }
    ]
  });
  return { spotifyDatas: results[0].data, users: results[1].data, params };
}
