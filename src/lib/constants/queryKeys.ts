export const QUERY_KEYS = {
  posts: "posts",
  comments: "comments",
  artistComments: "artistComments"
} as const;

export type QueryKey = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
