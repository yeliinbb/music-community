"use client";

import { useQuery } from "@tanstack/react-query";

export type UserProfile = {
  id: string;
  nickname: string;
  email: string;
  profileUrl: string;
};


const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  const response = await fetch(`/api/profile/${userId}`);

  if (!response.ok) {
    throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  }
  return response.json();
};

export const useUserData = (userId: string) => {
  const { data: userProfileData, isPending, error } = useQuery({
    queryKey: ["userData", userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  });

  return {
    userProfileData,
    isPending,
    error
  }
};
