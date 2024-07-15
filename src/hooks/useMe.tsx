"use client";

import api from "@/api/api";
import { useLoginStore } from "@/store/auth";
import { ArtistsItems } from "@/types/spotify.type";
import { useQueries, UseQueryResult } from "@tanstack/react-query";

export type MyPostsType = {
  id: string;
  title: string;
  userId: string;
  content: string;
  created_at: string;
  imageURL: string;
};

type LikeType = {
  artists: ArtistsItems[];
};

export default function useMe() {
  const { userId } = useLoginStore();

  const [posts, likes] = useQueries({
    queries: [
      {
        queryKey: ["myPosts"],
        queryFn: () => api.me.getMyPosts(userId),
        gcTime: 0
      },
      {
        queryKey: ["myLikes"],
        queryFn: () => api.me.getMyLikes(userId),
        gcTime: 0
      }
    ]
  }) as [UseQueryResult<MyPostsType[]>, UseQueryResult<LikeType>];

  return { posts: posts.data, likes: likes.data };
}
