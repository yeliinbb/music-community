'use client';
import { SpotifyFeaturedPlaylist } from '@/types/spotify.type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TrendingSkeleton from './TrendingSkeleton';
import 'react-tooltip/dist/react-tooltip.css';
import ResponsiveImage from '@/components/ResponsiveImage';

const Trending = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: featuredPlaylists,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      const response = await axios<SpotifyFeaturedPlaylist[]>('/api/spotify/featuredPlaylists');
      return response.data;
    },
  });

  if (!mounted || isPending) {
    return <TrendingSkeleton />;
  }

  if (isError) {
    return <div>Error fetching playlists.</div>;
  }
  if (!featuredPlaylists?.length) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * featuredPlaylists.length);
  const selectedPlaylist = featuredPlaylists[randomIndex];

  return (
    <div className="w-full flex flex-col p-2 gap-y-2">
      {isSuccess && selectedPlaylist && (
        <>
          <span className="text-base">추천 플레이리스트 🎵</span>
          <Link href={selectedPlaylist?.trackLink ?? '#'} target="_blank" rel="noopener noreferrer">
            <div className="flex flex-col items-center text-sm gap-2 place-self-center">
              {selectedPlaylist?.imageUrl ? (
                <div className="relative w-[200px] h-[200px] max-w-[180px] max-h-[180px] rounded-md overflow-hidden">
                  <ResponsiveImage
                    src={selectedPlaylist?.imageUrl || ''}
                    alt={selectedPlaylist?.name ?? '플레이리스트 이미지'}
                  />
                </div>
              ) : null}
              <div className="flex flex-col text-sm gap-2 text-center">
                <p
                  className="h-[15px] text-base hover:underline"
                  data-tooltip-id="플레이리스트 바로가기"
                  data-tooltip-content="바로가기"
                >
                  {selectedPlaylist?.name}
                </p>
              </div>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default Trending;
