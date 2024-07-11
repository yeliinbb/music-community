"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

interface ArtistProps {
  params: { id: string };
}

interface EditLikeParams {
  id: string;
  isDelete: boolean;
}

const fetchArtist = async (id: string) => {
  const response = await fetch(`/api/spotify/artist/${id}`);
  const data = await response.json();
  // console.log(data);
  return data;
};

const likeState = async (id: string) => {
  console.log(id);
  const res = await fetch(`/api/artist/likes/${id}`);
  const likeData = await res.json();

  // console.log(likeData);
  return likeData;
};

const editLike = async ({ id, isDelete }: EditLikeParams) => {
  console.log(id);
  if (isDelete) {
    const res = await fetch(`/api/artist/likes/${id}`, {
      method: "DELETE"
    });
  } else {
    const res = await fetch(`/api/artist/likes/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artistId: id, userId: "69a8c208-3941-43c2-acc6-8562129a2fc6" })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  }
};

const Artist = ({ params }: ArtistProps) => {
  const queryclient = useQueryClient();

  const {
    data: artistData,
    isLoading,
    error: artistError,
    isSuccess
  } = useQuery({
    queryKey: ["artist", params.id],
    queryFn: () => fetchArtist(params.id)
  });

  const { data: like } = useQuery({ queryKey: ["artistLike"], queryFn: () => likeState(params.id) });

  const { mutateAsync: editLikeMutate } = useMutation<void, Error, EditLikeParams>({
    mutationFn: async (mutationParam: EditLikeParams): Promise<void> => editLike(mutationParam)
  });

  const onChangeLiked = async () => {
    try {
      await editLikeMutate({ id: params.id, isDelete: like ? true : false });
      queryclient.invalidateQueries({ queryKey: ["artistLike"] });
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
        {isSuccess && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default Artist;
