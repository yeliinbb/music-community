export const TABLE_NAMES = {
  posts: "posts",
  comments: "comments",
  artistComments: "artistComments"
} as const;

export type TableName = (typeof TABLE_NAMES)[keyof typeof TABLE_NAMES];
