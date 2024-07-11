"use client";

import { RelatedArtist } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface RelatedProps {
  params: { id: string };
}

const fetchRelated = async (id: string) => {
  const reponse = await fetch(`/api/spotify/artist/${id}/relatedArtist`);
  const { artists } = await reponse.json();
  console.log(artists);
  return artists;
};

const RelateedArtist = ({ params }: RelatedProps) => {
  const { data = [], error } = useQuery<RelatedArtist[], Error>({
    queryKey: ["relate"],
    queryFn: () => fetchRelated(params.id)
  });

  if (error) {
    console.error(error.message);
  }

  return (
    <>
      <div className="m-4">관련 아티스트</div>
      <div className="grid gap-4">
        {data.map((artist) => {
          return (
            <div
              key={artist.id}
              className="p-4 border rounded-lg max-w-lg "
              style={{ width: "194px", height: "250px" }}
            >
              <img src={artist.images[2].url} alt="앨범 이미지" />
              <div>
                <div className="mt-2 font-bold ">{artist.name}</div>
                <div className="text-sm text-gray-500">{artist.type}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RelateedArtist;
