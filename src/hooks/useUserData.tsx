"use client";

import { useQuery } from "@tanstack/react-query";

const fetchUserProfile = async (userId: string) => {
  const response = await fetch(`/api/profile/${userId}`);
  if (!response.ok) {
    throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  }
  return response.json();
};

export const useUserData = (userId: string) => {
  return useQuery({
    queryKey: ["userData", userId],
    queryFn: () => fetchUserProfile(userId)
  });
};
