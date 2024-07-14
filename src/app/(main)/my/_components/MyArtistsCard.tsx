import { ArtistsItems } from "@/types/spotify.type";

export default function MyArtistsCard({ artist }: { artist: ArtistsItems }) {
  return (
    <>
      <div className="relative w-full aspect-video border border-gray-300 rounded-lg">
        <img
          src={artist.images.length ? artist.images[0].url : "http://via.placeholder.com/640x480"}
          className="object-cover  w-full h-[130px]"
          alt={artist.name}
        />
      </div>
      <h2 className="font-bold text-xl text-gray-800 line-clamp-1">{artist.name}</h2>
    </>
  );
}
