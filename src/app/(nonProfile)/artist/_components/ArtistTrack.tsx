"use client";

import { SpotifyTrack, TracksItems } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import PlayBtn from "./PlayBtn";
import { useRef, useState } from "react";

interface ArtistTrackProps {
  params: { id: string };
}

const fetchArtistTrack = async (id: string): Promise<TracksItems[]> => {
  const response = await fetch(`/api/spotify/artist/${id}/tracks`);
  const data = await response.json();
  return data.tracks;
};

const ArtistTrack = ({ params }: ArtistTrackProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);

  const {
    data = [],
    isLoading,
    error
  } = useQuery<TracksItems[]>({
    queryKey: ["artistTrack", params.id],
    queryFn: () => fetchArtistTrack(params.id)
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = (track: SpotifyTrack) => {
    if (audioRef.current) {
      if (isPlaying && currentTrack?.id === track.id) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = track.preview_url || "";
        audioRef.current.play();
        setIsPlaying(true);
        setCurrentTrack(track);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="mt-4 animate-pulse">
        <div className="bg-gray-300 h-4 w-20 rounded-full mb-4" />
        <ul className="grid gap-y-4  h-[300px]">
          <li className="rounded-lg bg-gray-300 w-full h-[100px]" />
          <li className="rounded-lg bg-gray-300 w-full h-[100px]" />
          <li className="rounded-lg bg-gray-300 w-full h-[100px]" />
        </ul>
      </div>
    );
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
                <div className="flex items-center space-x-4 justify-between">
                  <div className="flex flex-row gap-x-5 items-center ">
                    <div className="font-bold">{index + 1}</div>
                    <img src={track.album.images[2].url} alt="앨범 이미지" />
                    <div>
                      <div className="mt-2">{track.name}</div>
                      <div className="text-sm text-gray-500">{formatDuration(track.duration_ms)}</div>
                    </div>
                  </div>

                  <div>
                    <PlayBtn
                      previewUrl={track.preview_url}
                      playTrack={() => playTrack(track)}
                      audioRef={audioRef}
                      isPlaying={isPlaying}
                    />
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
