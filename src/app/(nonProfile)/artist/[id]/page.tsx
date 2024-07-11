import React from "react";
import Artist from "../_components/Artist";
import ArtistTrack from "../_components/ArtistTrack";
import RelateedArtist from "../_components/RelateedArtist";

interface ArtistPageProps {
  params: { id: string };
}

const ArtistPage = ({ params }: ArtistPageProps) => {
  return (
    <div>
      <Artist params={params} />
      <ArtistTrack params={params} />
      <RelateedArtist params={params} />
    </div>
  );
};

export default ArtistPage;
