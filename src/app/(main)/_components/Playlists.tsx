"use client";
import { PLAYLIST_IDS } from "@/app/api/spotify/playlists/route";
import { SpotifyPlaylistTracks, SpotifyTrack } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

const Playlists = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [selectedTracks, setSelectedTracks] = useState<SpotifyPlaylistTracks | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    data: playlists,
    isPending,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const response = await axios.get<SpotifyPlaylistTracks[]>(`/api/spotify/playlists`);
      console.log("response => ", response);
      return response.data;
    }
  });

  const playTrack = (previewUrl: SpotifyTrack["preview_url"]) => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = previewUrl || "";
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next)
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading playlists</div>;

  const currentPlaylist = playlists?.[currentIndex];

  return (
    <div className="w-full h-full">
      <Slider {...settings}>
        {isSuccess &&
          playlists.map((playlist, index) => (
            <div key={playlist.id} className="w-full h-full self-center">
              {index === currentIndex && (
                <>
                  <h2 className="mb-2">{playlist.name}</h2>
                  <ul className="w-full grid grid-cols-2 grid-rows-4 gap-2 my-0 mx-auto">
                    {playlist.tracks.map((track) => (
                      <li
                        key={track.id}
                        className=" flex items-center px-[15px] py-[8px] bg-[#D9D9D9] min-w-[300px] place-self-center rounded-xl justify-between gap-4 w-full"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <Image
                            src={track.album.images[1].url}
                            alt={track.name}
                            width={35}
                            height={35}
                            className="w-auto h-auto object-fit"
                          />
                          <div className="w-full">
                            <h4 className="w-[90%] h-[20px] overflow-hidden overflow-ellipsis">{track.name}</h4>
                            <div className="flex justify-between items-center w-full">
                              <span>{track.artists[0].name}</span>
                              <span>
                                {(track.duration_ms / 1000 / 60).toFixed(0)}:
                                {(track.duration_ms / 1000 / 60).toFixed(2).split(".")[1]}
                              </span>
                            </div>
                          </div>
                        </div>

                        {track.preview_url !== "none" ? (
                          <>
                            <button
                              className="bg-white rounded-[50%] min-w-[30px] min-h-[30px]"
                              onClick={() => playTrack(track.preview_url)}
                            >
                              ⏯
                            </button>
                            <audio ref={audioRef} className="hidden" />
                          </>
                        ) : (
                          <span>미리 듣기를 지원하지 않는 곡입니다.</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Playlists;
