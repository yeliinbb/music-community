"use client";

import api from "@/api/api";
import { ArtistsItems, TracksItems, SpotifyAlbums } from "@/types/spotify.type";
import { User } from "@/types/users.type";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useSearch() {
  const searchParams = useSearchParams();
  const params = searchParams.get("params");

  const { data: users } = useQuery({
    queryKey: ["users", { params }],
    queryFn: () => api.search.searchUsers(params),
    retry: 0
  });

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
    spotifyDatas: { albums, artists },
    users,

    albumsIsFetching,
    albumsHasNextPage,
    albumsFetchNextPage,

    artistsIsFetching,
    artistsHasNextPage,
    artistsFetchNextPage,

    params
  };
}
