import { SpotifyTrack } from "@/types/spotify.type";
import { HiMiniPause, HiMiniPlay } from "react-icons/hi2";
import { Tooltip } from "react-tooltip";

interface PlayButtonProps {
  track: SpotifyTrack;
  onPlay: (track: SpotifyTrack) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isThisTrackPlaying: boolean;
  playerBgColor: string;
  playerColor: string;
}

const PlayButton = ({ track, onPlay, audioRef, isThisTrackPlaying, playerBgColor, playerColor }: PlayButtonProps) => {
  const isPlayingAvailable = track.preview_url;
  return (
    <>
      <button
        className={`bg-${playerBgColor} rounded-[50%] min-w-[35px] min-h-[35px] flex items-center justify-center ${!isPlayingAvailable ? "cursor-default" : undefined}`}
        onClick={() => onPlay(track)}
        disabled={!isPlayingAvailable}
        data-tooltip-id="플레이버튼"
        data-tooltip-content={!isPlayingAvailable ? "미리 듣기를 지원하지 않는 곡입니다." : undefined}
      >
        {isThisTrackPlaying ? <HiMiniPause color={playerColor} /> : <HiMiniPlay color={playerColor} />}
      </button>
      {!isPlayingAvailable ? (
        <Tooltip id="플레이버튼" place="left" style={{ backgroundColor: "#858585", color: "white" }} />
      ) : null}
      <audio ref={audioRef} className="hidden" />
    </>
  );
};

export default PlayButton;
