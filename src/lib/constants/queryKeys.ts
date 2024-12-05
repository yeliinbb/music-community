export const QUERY_KEYS = {
  posts: 'posts',
  comments: 'comments',
  artistComments: 'artistComments',
  artist: {
    comments: 'artistComments',
    albums: 'artistAlbums',
    tracks: 'artistTracks',
    artists: 'artist',
    artistLike: 'artistLike',
  },
} as const;

export type queryKey = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
