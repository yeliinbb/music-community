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
import "react-tooltip/dist/react-tooltip.css";
import Link from "next/link";
import { HiMiniPlay } from "react-icons/hi2";
import { Tooltip } from "react-tooltip";

type CustomArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Playlists = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [selectedTracks, setSelectedTracks] = useState<SpotifyPlaylistTracks | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
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

  const CustomPrevArrow = ({ onClick, className }: CustomArrowProps) => (
    <div className={`custom-arrow custom-prev-arrow ${className}`} onClick={onClick}  style={{ width: '30px', height: '30px' }}>
      <img src="chevrons-left.svg" alt="이전 아티스트" />
    </div>
  );

  const CustomNextArrow = ({ onClick, className }: CustomArrowProps) => (
    <div className={`custom-arrow custom-next-arrow ${className}`} onClick={onClick}  style={{ width: '30px', height: '30px' }}>
      <img src="chevrons-right.svg" alt="다음 아티스트"  />
    </div>
  );

  const settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    cssEase: "ease-in-out",
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    // autoplay: true,
    // autoplaySpeed: 8000
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading playlists</div>;

  return (
    <div className="w-full h-full">
      <Slider {...settings}>
        {isSuccess &&
          playlists.map((playlist, index) => (
            <div key={playlist.id} className="w-full h-full self-center">
              {index === currentIndex && (
                <>
                  <h2 className="mb-2">{playlist.name}</h2>
                  <div className="flex w-full h-full gap-2.5 pl-2">
                    <Image
                      width={500}
                      height={500}
                      src={currentTrack?.album.images[0].url || playlist.tracks[0].album.images[0].url}
                      alt={currentTrack?.name || playlist.tracks[0].name}
                      className="w-[270px] h-[270px] object-fill  rounded-xl min-w-[270px] min-h-[270px] shadow-custom"
                    />
                    <ul className="flex flex-wrap w-fit gap-2 my-0 mx-auto">
                      {playlist.tracks.map((track) => (
                        <li
                          key={track.id}
                          className="grow shrink-0 flex items-center px-[15px] py-[8px] bg-[#D9D9D9] min-w-[300px] max-w-[50%] basis-[45%] place-self-center rounded-xl justify-between gap-4"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <Image
                              src={track.album.images[1].url}
                              alt={track.name}
                              width={35}
                              height={35}
                              className="w-[35px] h-[35px] object-fill"
                            />
                            <div className="w-full">
                              <h4 className="w-[230px] h-[20px] overflow-hidden overflow-ellipsis">{track.name}</h4>
                              <div className="flex justify-between items-center w-full">
                                <Link href={`http://localhost:3000/artist/${track.artists[0].id}`}>
                                  <span className="w-[230px] h-[20px] overflow-hidden overflow-ellipsis hover:underline">
                                    {track.artists[0].name}
                                  </span>
                                </Link>
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
                                className="bg-white rounded-[50%] min-w-[35px] min-h-[35px] flex items-center justify-center"
                                onClick={() => playTrack(track)}
                              >
                                <HiMiniPlay />
                              </button>
                              <audio ref={audioRef} className="hidden" />
                            </>
                          ) : (
                            <>
                              <button
                                className="bg-white rounded-[50%] min-w-[35px] min-h-[35px] flex items-center justify-center cursor-default"
                                disabled
                                data-tooltip-id="플레이버튼"
                                data-tooltip-content="미리 듣기를 지원하지 않는 곡입니다."
                              >
                                <HiMiniPlay />
                              </button>
                              <Tooltip
                                id="플레이버튼"
                                place="left"
                                style={{ backgroundColor: "#858585", color: "white" }}
                              />
                              <audio ref={audioRef} className="hidden" />
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Playlists;
