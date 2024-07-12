import { HiMiniPlay } from "react-icons/hi2";
import { Tooltip } from "react-tooltip";

interface PlayBtnProps {
  previewUrl: string;
  playTrack: () => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const PlayBtn = ({ previewUrl, playTrack, audioRef }: PlayBtnProps) => {
  return (
    <>
      {previewUrl !== "none" ? (
        <>
          <button
            className="bg-white rounded-[50%] min-w-[35px] min-h-[35px] flex items-center justify-center"
            onClick={playTrack}
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
          <Tooltip id="플레이버튼" place="left" style={{ backgroundColor: "#858585", color: "white" }} />
          <audio ref={audioRef} className="hidden" />
        </>
      )}
    </>
  );
};

export default PlayBtn;
