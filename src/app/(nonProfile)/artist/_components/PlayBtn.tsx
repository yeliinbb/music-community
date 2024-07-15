"use client";

import { HiMiniPlay } from "react-icons/hi2";
import { Tooltip } from "react-tooltip";
import { FaPause } from "react-icons/fa6";

interface PlayBtnProps {
  previewUrl: string;
  playTrack: () => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
}

const PlayBtn = ({ previewUrl, playTrack, audioRef, isPlaying }: PlayBtnProps) => {
  return (
    <>
      {previewUrl !== "none" ? (
        <>
          <button
            className="bg-black rounded-[50%] min-w-[35px] min-h-[35px] flex items-center justify-center mr-5"
            onClick={playTrack}
          >
            <HiMiniPlay color="white" />
          </button>

          <audio ref={audioRef} className="hidden" />
        </>
      ) : (
        <>
          <button
            className="bg-black  rounded-[50%] min-w-[35px] min-h-[35px] flex items-center justify-center cursor-default mr-5"
            disabled
            data-tooltip-id="플레이버튼"
            data-tooltip-content="미리 듣기를 지원하지 않는 곡입니다."
            onClick={playTrack}
          >
            <HiMiniPlay color="white" />
          </button>
          <Tooltip id="플레이버튼" place="left" style={{ backgroundColor: "#858585", color: "white" }} />
          <audio ref={audioRef} className="hidden" />
        </>
      )}
    </>
  );
};

export default PlayBtn;
