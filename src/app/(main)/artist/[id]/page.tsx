import React from "react";
import Artist from "../_components/Artist";

interface ArtistPageProps {
  params: { id: string };
}

const ArtistPage = ({ params }: ArtistPageProps) => {
  return (
    <div>
      <Artist params={params} />
    </div>
  );
};

export default ArtistPage;
