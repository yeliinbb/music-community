import { useQueries } from '@tanstack/react-query';
import { getAllPost } from '@/lib/utils/getAllPost';
import { getPlaylists } from '@/lib/utils/getPlaylists';
import { getSpotifyArtists } from '@/lib/utils/getSpotifyArtists';
import { MainPostType } from '@/types/posts.type';
import { SpotifyArtist, SpotifyPlaylistTracks } from '@/types/spotify.type';

export function useMainPageData() {
  const queries = useQueries({
    queries: [
      {
        queryKey: ['allPosts'],
        queryFn: getAllPost,
      },
      {
        queryKey: ['playlists'],
        queryFn: getPlaylists,
      },
      {
        queryKey: ['artistData'],
        queryFn: getSpotifyArtists,
      },
    ],
  });

  const [allPostsQuery, playlistsQuery, artistDataQuery] = queries;
  const isSuccess = queries.every((query) => query.isSuccess);
  const isPending = queries.some((query) => query.isPending);
  const error = queries.some((query) => query.isError);

  return {
    allPosts: allPostsQuery.data as MainPostType[] | undefined,
    playlists: playlistsQuery.data as SpotifyPlaylistTracks[] | undefined,
    artistData: artistDataQuery.data as SpotifyArtist[] | undefined,
    isSuccess,
    isPending,
    error,
    allPostsError: allPostsQuery.error,
    playlistsError: playlistsQuery.error,
    artistDataError: artistDataQuery.error,
  };
}
