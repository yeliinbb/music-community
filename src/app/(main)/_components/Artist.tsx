"use client";

import React from "react";
import axios from "axios";

import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { SpotifyArtist } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import { MainArtist } from "@/types/main_artist";

const Artist = () => {
  const {
    data: artistIds,
    isLoading: isArtistLoading,
    isError: isArtistError,
    error: artistError
  } = useQuery<(string | null)[], Error>({
    queryKey: ["artistIds"],
    queryFn: async () => {
      const { data } = await axios.get<MainArtist[]>("/api/artist");
      return data.map((artist) => artist.artistId);
    }
  });

  const {
    data: artistData,
    isLoading: isArtistDataLoading,
    isError: isArtistDataError,
    error: artistDataError
  } = useQuery<SpotifyArtist[], Error>({
    queryKey: ["artistData", artistIds],
    queryFn: async (): Promise<SpotifyArtist[]> => {
      if (!artistIds) return []; // artistIds가 없으면 빈 배열 반환
      const responses = await Promise.all(
        artistIds.map(async (artistId) => {
          const response = await fetch(`/api/spotify/artist/${artistId}`);
          if (!response.ok) {
            throw new Error("서버 응답이 올바르지 않습니다.");
          }
          return response.json();
        })
      );
      return responses;
    },
    enabled: !!artistIds // artistIds가 존재할 때만 쿼리 실행
  });

  if (isArtistLoading || isArtistDataLoading) {
    return <div>--- 데이터 수집 중 ---</div>;
  }

  if (isArtistError) {
    console.error(artistError);
    return <div className="text-xl">에러가 발생했습니다: {artistError.message}</div>;
  }

  if (isArtistDataError) {
    console.error(artistDataError);
    return <div className="text-xl">에러가 발생했습니다: {artistDataError.message}</div>;
  }

  if (!artistData || artistData.length === 0) {
    return <div className="text-xl">트랙 데이터가 없습니다.</div>;
  }

  const CustomPrevArrow = ({ onClick, className }: CustomArrowProps) => (
    <div className={`custom-arrow custom-prev-arrow ${className}`} onClick={onClick}>
      <img src="arrow-left.svg" alt="이전 아티스트" />
    </div>
  );
  
  const CustomNextArrow = ({ onClick, className }: CustomArrowProps) => (
    <div className={`custom-arrow custom-next-arrow ${className}`} onClick={onClick}>
      <img src="arrow-right.svg" alt="다음 아티스트" />
    </div>
  );

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  return (
    <div className="w-[700px]">
      <p className="font-bold mb-5">아티스트</p>
      <div className="custom-slider ml-9">
        <Slider {...settings}>
          {artistData.map((artist) => (
            <div key={artist.id} className="flex flex-col items-center">
              <div className="flex justify-center">
                {artist.images ? (
                  <img
                    src={artist.images[2].url}
                    alt={`${artist.name}`}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                ) : (
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    alt="artist image"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                )}
              </div>
              <p className="truncate text-center mt-2 w-full" title={artist.name}>
                {artist.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Artist;
