import React from "react";
import Artist from "../_components/Artist";
import ArtistTrack from "../_components/ArtistTrack";
import RelateedArtist from "../_components/RelatedArtist";

interface ArtistPageProps {
  params: { id: string };
}

const ArtistPage = ({ params }: ArtistPageProps) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 auto-rows-auto">
      <div className="col-start-1 row-start-1">
        <Artist params={params} />
      </div>
      <div className="col-start-1 row-start-2 mr-[55px]">
        <ArtistTrack params={params} />
      </div>
      <div className="col-start-2 row-start-1 row-span-2">
        <RelateedArtist params={params} />
      </div>
    </div>
  );
};

export default ArtistPage;
