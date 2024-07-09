import React from "react";
import Artist from "../_components/Artist";
import ArtistTrack from "../_components/ArtistTrack";

interface ArtistPageProps {
  params: { id: string };
}

const ArtistPage = ({ params }: ArtistPageProps) => {
  return (
    <div>
      <Artist params={params} />
      <ArtistTrack params={params} />
    </div>
  );
};

export default ArtistPage;
