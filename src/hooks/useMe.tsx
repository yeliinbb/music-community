"use client";

import api from "@/api/api";
import { useLoginStore } from "@/store/auth";
import { ArtistsItems } from "@/types/spotify.type";
import { useQueries } from "@tanstack/react-query";

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

  const queries = useQueries({
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
  });

  const [posts, likes] = queries;
  const isPending = queries.some((query) => query.isPending);

  return {
    posts: posts.data as MyPostsType[] | undefined,
    likes: likes.data as LikeType | undefined,
    isPending
  };
}
