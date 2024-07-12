"use client";

import { useLoginStore } from "@/store/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface ArtistProps {
  params: { id: string };
}

interface EditLikeParams {
  id: string;
  isDelete: boolean;
  userId: string;
}

const fetchArtist = async (id: string) => {
  const response = await fetch(`/api/spotify/artist/${id}`);
  const data = await response.json();
  return data;
};

const likeState = async ({ id, userId }: { id: string; userId: string }) => {
  const res = await fetch(`/api/artist/likes/${id}`);
  const likeData = await res.json();
  return likeData;
};

const editLike = async ({ id, isDelete, userId }: EditLikeParams & { userId: string }) => {
  if (isDelete) {
    const res = await fetch(`/api/artist/likes/${id}`, {
      method: "DELETE"
    });
  } else {
    const res = await fetch(`/api/artist/likes/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artistId: id, userId })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  }
};

const Artist = ({ params }: ArtistProps) => {
  const queryclient = useQueryClient();
  const userId = useLoginStore((state) => state.userId);

  const {
    data: artistData,
    isLoading,
    error: artistError,
    isSuccess
  } = useQuery({
    queryKey: ["artist", params.id],
    queryFn: () => fetchArtist(params.id)
  });

  const { data: like } = useQuery({
    queryKey: ["artistLike", params.id],
    queryFn: () => likeState({ id: params.id, userId })
  });

  const { mutateAsync: editLikeMutate } = useMutation<void, Error, EditLikeParams>({
    mutationFn: async (mutationParam: EditLikeParams): Promise<void> => editLike(mutationParam),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["artistLike"] });
    }
  });

  const onChangeLiked = async () => {
    try {
      await editLikeMutate({ id: params.id, isDelete: like ? true : false, userId });
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
      <div className="ml-4 mb-4 font-medium">Artist</div>
      <div className="flex items-center space-x-4">
        {isSuccess && (
          <>
            <img
              src={artistData.images[0].url}
              alt="이미지"
              width={300}
              height={300}
              className=" object-cover rounded-lg shadow-lg"
            />

            <div className="flex flex-col">
              <div className="font-bold text-xl">{artistData.name}</div>
              <div className="text-gray-600">{artistData.genres[0]}</div>
              <div className="text-gray-600">{artistData.followers.total.toLocaleString()}</div>
              <button onClick={onChangeLiked}>
                {like && like.userId && like.artistId ? (
                  <img src="/heart.svg" alt="꽉찬하트" width={40} height={40} />
                ) : (
                  <img src="/heart_plus.svg" alt="빈하트" width={40} height={40} />
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
