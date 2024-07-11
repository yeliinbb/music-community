"use client";

import api from "@/api/api";
import { ArtistsItems, TracksItems } from "@/types/spotify.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useSearch() {
  const searchParams = useSearchParams();
  const params = searchParams.get("params");

  // const results = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["searchSpotify", { params }],
  //       queryFn: () => api.search.searchSpotify(params),
  //       retry: 0
  //     },
  //     {
  //       queryKey: ["searchUsers", { params }],
  //       queryFn: () => api.search.searchUsers(params),
  //       retry: 0
  //     }
  //   ]
  // });

  const {
    data: albums,
    isFetching: albumsIsFetching,
    hasNextPage: albumsHasNextPage,
    fetchNextPage: albumsFetchNextPage
  } = useInfiniteQuery({
    queryKey: ["albums"],
    queryFn: ({ pageParam }) => api.search.searchSpotifyAlbums(params, pageParam),
    getNextPageParam: (lastPage: TracksItems[], allPage: TracksItems[][]) => {
      const nextPage = lastPage.length ? allPage.length : undefined;
      return nextPage;
    },
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((p) => p)
  });

  const {
    data: artists,
    isFetching: artistsIsFetching,
    hasNextPage: artistsHasNextPage,
    fetchNextPage: artistsFetchNextPage
  } = useInfiniteQuery({
    queryKey: ["artists"],
    queryFn: ({ pageParam }) => api.search.searchSpotifyArtists(params, pageParam),
    getNextPageParam: (lastPage: ArtistsItems[], allPage: ArtistsItems[][]) => {
      const nextPage = lastPage.length ? allPage.length : undefined;
      return nextPage;
    },
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((p) => p)
  });

  return {
    albums,
    albumsIsFetching,
    albumsHasNextPage,
    albumsFetchNextPage,

    artists,
    artistsIsFetching,
    artistsHasNextPage,
    artistsFetchNextPage,

    // spotifyDatas: results[0].data,
    // users: results[1].data,
    params
  };
}
