'use client';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ArtistTrackSkeleton from '../_components/ArtistTrackSkeleton';
import ArtistSkeleton from '../_components/ArtistSkeleton';
import ArtistAlbumsSkeleton from '../_components/ArtistAlbumsSkeleton';
import ArtistCommentSkeleton from '../_components/ArtistCommentSkeleton';

const Artist = dynamic(() => import('../_components/Artist'), {
  ssr: false,
  loading: () => <ArtistSkeleton />,
});

const ArtistTrack = dynamic(() => import('../_components/ArtistTrack'), {
  ssr: false,
  loading: () => <ArtistTrackSkeleton />,
});

const ArtistAlbums = dynamic(() => import('../_components/ArtistAlbums'), {
  ssr: false,
  loading: () => <ArtistAlbumsSkeleton />,
});

const CommentList = dynamic(() => import('@/components/CommentList'), {
  ssr: false,
  loading: () => <ArtistCommentSkeleton />,
});

interface ArtistPageProps {
  params: { id: string };
}

const ArtistPage = ({ params }: ArtistPageProps) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 auto-rows-auto">
      <div className="col-start-1 row-start-1">
        <Suspense fallback={<ArtistSkeleton />}>
          <Artist params={params} />
        </Suspense>
      </div>
      <div className="col-start-1 row-start-2 mr-[55px]">
        <Suspense fallback={<ArtistTrackSkeleton />}>
          <ArtistTrack params={params} />
        </Suspense>
      </div>
      <div className="col-start-2 row-start-1 row-span-2">
        <Suspense fallback={<ArtistAlbumsSkeleton />}>
          <ArtistAlbums params={params} />
        </Suspense>
      </div>
      <div className="col-start-2 row-start-2 row-span-2">
        <Suspense fallback={<ArtistCommentSkeleton />}>
          <CommentList params={params} type="artist" />
        </Suspense>
      </div>
    </div>
  );
};

export default ArtistPage;
