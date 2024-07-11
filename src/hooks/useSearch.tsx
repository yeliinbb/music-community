"use client";

import api from "@/api/api";
import { TracksItems } from "@/types/spotify.type";
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
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

  const {
    data: albums,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ["albums"],
    queryFn: ({ pageParam }) => api.search.searchSpotifyAlbums(params, pageParam),
    getNextPageParam: (lastPage: TracksItems[], allPage: TracksItems[][]) => {
      // console.log("LAST PAGE___", lastPage);
      // console.log("ALL PAGE___", allPage);
      const nextPage = lastPage.length ? allPage.length : undefined;
      return nextPage;
    },
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((p) => p)
  });

  return {
    albums,
    isFetching,
    hasNextPage,
    fetchNextPage,
    spotifyDatas: results[0].data,
    users: results[1].data,
    params
  };
}
