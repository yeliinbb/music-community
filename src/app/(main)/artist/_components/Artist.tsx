"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface ArtistProps {
  params: { id: string };
}

const fetchArtist = async (id: string) => {
  const response = await fetch(`/api/spotify/artist/${id}`);
  const data = await response.json();
  console.log(data);
  return data;
};

const Artist = ({ params }: ArtistProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["artist", params.id],
    queryFn: () => fetchArtist(params.id)
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error : {error.message}</div>;
  }

  return (
    <>
      <div className="m-4">아티스트</div>
      <div className="flex items-center space-x-4">
        <img
          src={data.images[0].url}
          alt="이미지"
          width={500}
          height={500}
          className=" object-cover rounded-lg shadow-lg"
        />
        <div className="flex flex-col">
          <div className="font-bold text-xl">{data.name}</div>
          <div className="text-gray-600">{data.genres[0]}</div>
          <div className="text-gray-600">{data.popularity}</div>
        </div>
      </div>
    </>
  );
};

export default Artist;
