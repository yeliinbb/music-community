"use client";

import { SpotifyTrack } from "@/types/spotify.type";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const TrackPage = () => {
  const params = useParams();
  const [trackData, setTrackData] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    const fetchTrackData = async () => {
      //console.log(params)
      try {
        if (params.id) {
          const response = await fetch(`/api/spotify/track/${params.id}`);
          //console.log(response)
          if (!response.ok) {
            throw new Error("서버 응답이 올바르지 않습니다.");
          }
          const data = await response.json();
          setTrackData(data);
        }
      } catch (err) {
        console.error("Error fetching track data:", err);
        setError("트랙 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center font-dalmoori">
        <div className="text-xl flex flex-col p-4 justify-center items-center gap-2 rounded-lg w-[400px]">
          <p className="text-lg mt-5">--- 데이터 수집 중 ---</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error(error);
    return <div className="text-xl">에러가 발생했습니다: {error}</div>;
  }

  if (!trackData) {
    return <div className="text-xl">트랙 데이터가 없습니다.</div>;
  }

  console.log(trackData);

  return (
    <div>
      <img src={trackData.album.images[2].url} alt={`${trackData.album.name}의 앨범 이미지`} />
      <p className="text-2xl font-semibold">{trackData.name}</p>
      <p>Artist : {trackData.artists.map((artist) => artist.name).join(", ")}</p>
      <p>앨범명 : {trackData.album.name}</p>
      <p>인기도 : {trackData.popularity}</p>
      {trackData.preview_url && (
        <div>
          <img src={trackData.album.images[2].url} alt={`${trackData.album.name}의 앨범 이미지`} />
          <p>{trackData.name}</p>
          <p>{trackData.artists.map((artist) => artist.name).join(", ")}</p>
          <audio ref={audioRef} src={trackData.preview_url} style={{ display: "none" }} />
          <button
            onClick={togglePlayPause}
            className={`px-4 py-2 mt-2 text-white ${isPlaying ? "bg-black" : "bg-green-500"} rounded`}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TrackPage;
