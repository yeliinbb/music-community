"use client";

import { RelatedArtist } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface RelatedProps {
  params: { id: string };
}

const fetchRelated = async (id: string) => {
  const reponse = await fetch(`/api/spotify/artist/${id}/relatedArtist`);
  const { artists } = await reponse.json();
  return artists;
};

const RelateedArtist = ({ params }: RelatedProps) => {
  const { data = [], error } = useQuery<RelatedArtist[], Error>({
    queryKey: ["relate", params.id],
    queryFn: () => fetchRelated(params.id)
  });

  if (error) {
    console.error(error.message);
  }

  return (
    <>
      <div className="ml-4 mb-4 font-medium">Related Artist</div>
      <div className="grid grid-cols-2 gap-4 justify-items-center content-center">
        {data.slice(0, 4).map((artist) => {
          return (
            <Link href={`/artist/${artist.id}`} key={artist.id}>
              <div
                key={artist.id}
                className="p-4 border rounded-lg max-w-lg flex"
                style={{ width: "278px", height: "150px" }}
              >
                <img src={artist.images[2].url} alt="앨범 이미지" width={110} height={110} />
                <div className="flex items-center ">
                  <div className="ml-4">
                    <div className="mt-2 font-bold ">{artist.name}</div>
                    <div className="text-sm text-gray-500">{artist.type}</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default RelateedArtist;
