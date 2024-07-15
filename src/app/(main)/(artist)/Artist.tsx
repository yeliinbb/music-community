"use client";

import { useQuery } from "@tanstack/react-query";

import type { SpotifyArtist } from "@/types/spotify.type";

import { CustomNextArrow, CustomPrevArrow } from "@/components/CustomArrow";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ArtistSkeleton from "./ArtistSkeleton";
import { useMainPageData } from "@/hooks/useMainPageData";

const Artist = () => {
  const { artistData, isSuccess, isPending, error } = useMainPageData();

  if (isPending) {
    return <ArtistSkeleton />;
  }

  if (error) {
    console.error(error);
    return <div className="text-xl">에러가 발생했습니다.</div>;
  }

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  return (
    <div className="w-full mt-10">
      <p className="font-bold mb-5">아티스트</p>
      <div className="custom-slider ml-3 mr-3">
        <Slider {...settings}>
          {isSuccess &&
            artistData?.map((artist) => (
              <Link href={`/artist/${artist.id}`} key={artist.id} className="flex flex-col items-center">
                <div className="flex justify-center">
                  {artist.images && artist.images ? (
                    <img
                      src={artist.images[2].url}
                      alt={`${artist.name}`}
                      className="w-[100px] h-[100px] rounded-md object-cover"
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
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Artist;
