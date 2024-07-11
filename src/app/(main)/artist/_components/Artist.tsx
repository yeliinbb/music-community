"use client";

import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  const supabase = createClient();
  const [like, setLike] = useState<boolean | null>(false);

  const {
    data: artistData,
    isLoading,
    error: artistError
  } = useQuery({
    queryKey: ["artist", params.id],
    queryFn: () => fetchArtist(params.id)
  });

  useEffect(() => {
    const likeState = async () => {
      const { data: likeData, error: likeError } = await supabase
        .from("likes")
        .select("*")
        .match({ artistId: params.id, userId: "69a8c208-3941-43c2-acc6-8562129a2fc6" });

      if (likeData && likeData.length) {
        setLike(true);
      } else {
        setLike(false);
      }

      console.log(likeData);
    };
    likeState();
  }, [params.id]);

  const onChangeLiked = async () => {
    try {
      if (like) {
        await supabase
          .from("likes")
          .delete()
          .match({ artistId: params.id, userId: "69a8c208-3941-43c2-acc6-8562129a2fc6" });
        setLike(false);
      } else {
        await supabase.from("likes").insert({ artistId: params.id, userId: "69a8c208-3941-43c2-acc6-8562129a2fc6" });
        setLike(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (artistError) {
    return <div>error : {artistError.message}</div>;
  }

  return (
    <>
      <div className="m-4">아티스트</div>
      <div className="flex items-center space-x-4">
        <Image
          src={artistData.images[0].url}
          alt="이미지"
          width={500}
          height={500}
          className=" object-cover rounded-lg shadow-lg"
        />

        <div className="flex flex-col">
          <div className="font-bold text-xl">{artistData.name}</div>
          <div className="text-gray-600">{artistData.genres[0]}</div>
          <div className="text-gray-600">{artistData.followers.total.toLocaleString()}</div>
          <button onClick={onChangeLiked}>
            {like ? (
              <Image src="/heart.svg" alt="플러스" width={40} height={40} />
            ) : (
              <Image src="/heart_plus.svg" alt="플러스하트" width={40} height={40} />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Artist;
