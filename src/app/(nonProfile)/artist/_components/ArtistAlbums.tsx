'use client';
import ResponsiveImage from '@/components/ResponsiveImage';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import type { ArtistAlbums } from '@/types/spotify.type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import ArtistAlbumsSkeleton from './ArtistAlbumsSkeleton';

interface ArtistAlbumsProps {
  params: { id: string };
}

const ArtistAlbums = ({ params }: ArtistAlbumsProps) => {
  const {
    data: albums,
    isSuccess,
    isError,
    isPending,
  } = useQuery<ArtistAlbums[], Error>({
    queryKey: [QUERY_KEYS.artist.albums, params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/spotify/artist/${params.id}/albums`);

      return response.data;
    },
  });

  if (isError) {
    console.error('Error fetching albums');
    return <div>Error loading albums</div>;
  }

  if (isPending) {
    return <ArtistAlbumsSkeleton />;
  }

  return (
    <>
      <div className="ml-4 mb-4 font-medium">Artist Albums</div>
      <div className="grid grid-cols-2 gap-4 justify-items-center content-center">
        {isSuccess
          ? albums.map((album) => {
              return (
                <Link href={`/artist/${album.id}`} key={album.id}>
                  <div
                    key={album.id}
                    className="p-4 border rounded-lg max-w-lg flex"
                    style={{ width: '278px', height: '150px' }}
                  >
                    <div className="relative w-[110px] h-[110px] min-w-[110px] overflow-hidden">
                      <ResponsiveImage
                        src={album.images[1] ? album.images[1].url : 'http://via.placeholder.com/640x480'}
                        alt="앨범 이미지"
                      />
                    </div>
                    <div className="flex items-center">
                      <div className="ml-4 mt-2 font-bold">{album.name}</div>
                    </div>
                  </div>
                </Link>
              );
            })
          : null}
      </div>
    </>
  );
};

export default ArtistAlbums;
