"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { SpotifyArtist } from "@/types/spotify.type";

const Artist = () => {
  const artistId = [
    "0LigV2SSsRZaeX2htEFXV9",
    "4Va11kshAHkYONJgZqhi0C",
    "2c3IakpImjWyeXNvyyGsdn",
    "7AVa6rcpTQWVqgy91llPP5",
    "6WeDO4GynFmK4OxwkBzMW8",
    '7jFUYMpMUBDL4JQtMZ5ilc',
    '3zYyfrb4r6ZHI5Di0rB9bV'
  ];
  const [artistData, setArtistData] = useState<SpotifyArtist[] | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArtistData = async () => {
      //console.log(params)
      try {
        const responses = await Promise.all(
          artistId.map(async (artistId) => {
            const response = await fetch(`/api/spotify/artist/${artistId}`);
            if (!response.ok) {
              throw new Error("서버 응답이 올바르지 않습니다.");
            }
            return response.json();
          })
        );
        setArtistData(responses);
      } catch (err) {
        console.error("Error fetching track data:", err);
        setError("가수 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistData();
  }, []);

  if (isLoading) {
    return <div>--- 데이터 수집 중 ---</div>;
  }

  if (error) {
    console.error(error);
    return <div className="text-xl">에러가 발생했습니다: {error}</div>;
  }

  if (!artistData) {
    return <div className="text-xl">트랙 데이터가 없습니다.</div>;
  }

  console.log(artistData);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <div className="w-[800px]">
      <p className="font-bold mb-5">아티스트</p>
      <Slider {...settings}>
          {artistData.map((artist) => (
            <div key={artist.id} className="flex flex-col">
              <div className='flex justify-center'>
              {artist.images ? (
                <img src={artist.images[2].url} alt={`${artist.name}`} className="w-20 h-20 " />
              ) : (
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                  alt="artist image"
                  className="w-10 h-10 object-cover rounded-md"
                />
              )}
              </div>
              
              
              <p className="truncate text-center" title={artist.name}>
                {artist.name}
              </p>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Artist;
