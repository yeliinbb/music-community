"use client";
import { CustomNextArrow, CustomPrevArrow } from "@/components/CustomArrow";
import { SpotifyPlaylistTracks, SpotifyTrack } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";
import Slider from "react-slick";
import "react-tooltip/dist/react-tooltip.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Track from "../../_components/Track";
import PlayListSkeleton from "./PlayListSkeleton";

const Playlists = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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

  const settings = {
    infinite: true,
    speed: 1000,
    cssEase: "ease-in-out",
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  if (isPending) return <PlayListSkeleton />;
  if (isError) return <div>Error loading playlists</div>;

  return (
    <div className="w-full h-full">
      <div className="custom-slider">
        <Slider {...settings}>
          {isSuccess &&
            playlists.map((playlist, index) => (
              <div key={playlist.id} className="w-full h-full self-center">
                {index === currentIndex && (
                  <>
                    <h2 className="mb-2 font-bold">{playlist.name}</h2>
                    <div className="flex w-full h-full gap-2.5 pl-1 pr-1">
                      <img
                        src={currentTrack?.album.images[0].url || playlist.tracks[0].album.images[0].url}
                        alt={currentTrack?.name || playlist.tracks[0].name}
                        className="w-[270px] h-[270px] object-fill  rounded-xl min-w-[270px] min-h-[270px] shadow"
                      />
                      <ul className="grid grid-cols-2 gap-2 ">
                        {playlist.tracks.map((track) => (
                          <Track key={track.id} track={track} audioRef={audioRef} playTrack={playTrack} />
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Playlists;
