import { SpotifyTrack } from '@/types/spotify.type';
import Link from 'next/link';
import 'react-tooltip/dist/react-tooltip.css';
import PlayButton from '../../../components/PlayButton';
import Image from 'next/image';
import ResponsiveImage from '@/components/ResponsiveImage';

interface TrackProps {
  track: SpotifyTrack;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  playTrack: (track: SpotifyTrack) => void;
  isPlaying: boolean;
  isTrackIdMatch: boolean;
}

const Track = ({ track, audioRef, playTrack, isPlaying, isTrackIdMatch }: TrackProps) => {
  return (
    <li
      key={track.id}
      className="grow shrink-0 flex items-center px-[15px] py-[8px] bg-[#D9D9D9] min-w-[300px] max-w-[50%] basis-[45%] place-self-center rounded-xl justify-between gap-4"
    >
      <div className="flex items-center w-full">
        <div className="relative w-[35px] h-[35px] min-w-[35px] overflow-hidden mr-3">
          <ResponsiveImage src={track.album.images[1].url} alt={track.name} />
        </div>
        <div className="w-full">
          <h4 className="h-[20px] overflow-hidden overflow-ellipsis font-semibold">{track.name}</h4>
          <div className="flex justify-between items-center w-full">
            <Link
              href={`/artist/${track.artists[0].id}`}
              className="w-[130px] overflow-hidden overflow-ellipsis whitespace-nowrap"
            >
              <span className="w-[230px] h-[20px] hover:underline">{track.artists[0].name}</span>
            </Link>
            <span>
              {(track.duration_ms / 1000 / 60).toFixed(0)}:{(track.duration_ms / 1000 / 60).toFixed(2).split('.')[1]}
            </span>
          </div>
        </div>
      </div>
      <PlayButton
        track={track}
        onPlay={playTrack}
        audioRef={audioRef}
        isThisTrackPlaying={isPlaying && isTrackIdMatch}
        playerBgColor="white"
        playerColor="black"
      />
    </li>
  );
};

export default Track;
