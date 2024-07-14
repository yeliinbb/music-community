import { SpotifyTrack } from "@/types/spotify.type";
import Link from "next/link";
import { HiMiniPlay } from "react-icons/hi2";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface TrackProps {
  track: SpotifyTrack;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  playTrack: (track: SpotifyTrack) => void;
}

const Track = ({ track, audioRef, playTrack }: TrackProps) => {
  return (
    <li
      key={track.id}
      className="grow shrink-0 flex items-center px-[15px] py-[8px] bg-[#D9D9D9] min-w-[300px] max-w-[50%] basis-[45%] place-self-center rounded-xl justify-between gap-4"
    >
      <div className="flex items-center gap-3 w-full">
        <img src={track.album.images[1].url} alt={track.name} className="w-[35px] h-[35px] object-fill" />
        <div className="w-full">
          <h4 className="h-[20px] overflow-hidden overflow-ellipsis font-semibold">{track.name}</h4>
          <div className="flex justify-between items-center w-full">
            <Link
              href={`/artist/${track.artists[0].id}`}
              className="w-[130px] overflow-hidden overflow-ellipsis whitespace-nowrap"
            >
              <span className="w-[230px] h-[20px] overflow-hidden overflow-ellipsis hover:underline">
                {track.artists[0].name}
              </span>
            </Link>
            <span>
              {(track.duration_ms / 1000 / 60).toFixed(0)}:{(track.duration_ms / 1000 / 60).toFixed(2).split(".")[1]}
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
          <Tooltip id="플레이버튼" place="left" style={{ backgroundColor: "#858585", color: "white" }} />
          <audio ref={audioRef} className="hidden" />
        </>
      )}
    </li>
  );
};

export default Track;
