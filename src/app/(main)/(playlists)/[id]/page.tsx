import Playlists from "@/app/(main)/_components/Playlists";
import React from "react";

interface PlaylistPage {
  params: { id: string };
}

const PlaylistPage = ({ params: { id } }: PlaylistPage) => {
  return (
    <div>
      PlaylistPage
      <Playlists playlistId={id} />
    </div>
  );
};

export default PlaylistPage;
