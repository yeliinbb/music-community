"use client";

import { TracksItems } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";

interface ArtistTrackProps {
  params: { id: string };
}

const fetchArtistTrack = async (id: string): Promise<TracksItems[]> => {
  // console.log(id);
  const response = await fetch(`/api/spotify/artist/${id}/tracks`);
  const data = await response.json();
  // console.log(data);
  return data.tracks;
};

const ArtistTrack = ({ params }: ArtistTrackProps) => {
  const {
    data = [],
    isLoading,
    error
  } = useQuery<TracksItems[]>({
    queryKey: ["artistTrack", params.id],
    queryFn: () => fetchArtistTrack(params.id)
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error : {error.message}</div>;
  }

  const formatDuration = (durationMs: number): string => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <div className="m-4 font-medium">Hot Track</div>
      <div className="overflow-y-auto max-h-[300px]">
        <div className="grid gap-4 ">
          {data.map((track, index) => {
            return (
              <div
                key={track.id}
                className="p-4 border rounded-lg max-w-lg "
                style={{ width: "500px", height: "100px" }}
              >
                <div className="flex items-center space-x-4">
                  <div className="font-bold">{index + 1}</div>
                  <img src={track.album.images[2].url} alt="앨범 이미지" />
                  <div>
                    <div className="mt-2">{track.name}</div>
                    <div className="text-sm text-gray-500">{formatDuration(track.duration_ms)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ArtistTrack;
