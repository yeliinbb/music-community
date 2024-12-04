'use client';

import { CustomNextArrow, CustomPrevArrow } from '@/components/CustomArrow';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import MainArtistSkeleton from './MainArtistSkeleton';
import { useMainPageData } from '@/hooks/useMainPageData';
import ResponsiveImage from '@/components/ResponsiveImage';

const MainArtist = () => {
  const { artistData, isSuccess, isPending, error } = useMainPageData();

  if (isPending) {
    return <MainArtistSkeleton />;
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
    nextArrow: <CustomNextArrow />,
  };

  const defaultAvatarUrl =
    'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';

  return (
    <div className="w-full mt-10">
      <p className="font-bold mb-5">아티스트</p>
      <div className="custom-slider ml-3 mr-3">
        <Slider {...settings}>
          {isSuccess &&
            artistData?.map((artist, index) => (
              <Link href={`/artist/${artist.id}`} key={artist.id} className="flex flex-col items-center">
                <div className="flex justify-center">
                  {artist.images && artist.images ? (
                    <div className="relative w-[100px] h-[100px] rounded-md overflow-hidden">
                      <ResponsiveImage
                        src={artist.images[2].url ?? defaultAvatarUrl}
                        alt={`${artist.name + artist.id}` ?? 'artist image'}
                        priority={index < 5}
                      />
                    </div>
                  ) : null}
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

export default MainArtist;
