import { useQueries } from "@tanstack/react-query";
import { getAllPost } from "@/app/(main)/_components/getAllPost";
import { getPlaylists } from "@/app/(main)/_components/getPlaylists";
import { getSpotifyArtists } from "@/app/(main)/_components/getSpotifyArtists";
import { PostType } from "@/types/posts.type";
import { SpotifyArtist, SpotifyPlaylistTracks } from "@/types/spotify.type";

export function useMainPageData() {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["allPosts"],
        queryFn: getAllPost
      },
      {
        queryKey: ["playlists"],
        queryFn: getPlaylists
      },
      {
        queryKey: ["artistData"],
        queryFn: getSpotifyArtists
      }
    ]
  });

  const [allPostsQuery, playlistsQuery, artistDataQuery] = queries;
  const isSuccess = queries.some((query) => query.isSuccess);
  const isPending = queries.some((query) => query.isPending);
  const error = queries.some((query) => query.isError);

  return {
    allPosts: allPostsQuery.data as PostType[] | undefined,
    playlists: playlistsQuery.data as SpotifyPlaylistTracks[] | undefined,
    artistData: artistDataQuery.data as SpotifyArtist[] | undefined,
    isSuccess,
    isPending,
    error,
    allPostsError: allPostsQuery.error,
    playlistsError: playlistsQuery.error,
    artistDataError: artistDataQuery.error
  };
}
