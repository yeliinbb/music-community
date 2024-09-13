"use client";

import { useLoginStore } from "@/store/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface ArtistProps {
  params: { id: string };
}

type LikeType = {
  artistId: string;
  isLiked: boolean;
  userId: string;
};

type MutationContext = {
  previousLike: LikeType | undefined;
};

const fetchArtist = async (artistId: string) => {
  const response = await fetch(`/api/spotify/artist/${artistId}`);
  const data = await response.json();
  return data;
};

const fetchArtistLike = async (artistId: string) => {
  const res = await fetch(`/api/artist/likes/${artistId}`);
  const likeData = await res.json();
  console.log("fetchArtistLike", likeData);
  return { isLiked: likeData.isLiked };
};

const toggleLike = async ({ artistId, isLiked, userId }: LikeType & { userId: string }) => {
  const method = isLiked ? "DELETE" : "POST";
  const body = method === "POST" ? JSON.stringify({ artistId: artistId, userId }) : undefined;

  const res = await fetch(`/api/artist/likes/${artistId}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data;
};

const Artist = ({ params }: ArtistProps) => {
  const artistId = params.id;
  const userId = useLoginStore((state) => state.userId);
  const queryClient = useQueryClient();

  const {
    data: artistData,
    isLoading,
    error: artistError,
    isSuccess
  } = useQuery({
    queryKey: ["artist", artistId],
    queryFn: () => fetchArtist(artistId)
  });

  const { data: likeData } = useQuery({
    queryKey: ["artistLike", artistId],
    queryFn: () => fetchArtistLike(artistId)
  });

  const toggleLikeMutation = useMutation<void, Error, LikeType, MutationContext>({
    mutationFn: toggleLike,
    onMutate: async ({ artistId, isLiked }) => {
      await queryClient.cancelQueries({ queryKey: ["artistLike", artistId] });
      const previousLike = queryClient.getQueryData<LikeType>(["artistLike", artistId]);

      queryClient.setQueryData<LikeType>(["artistLike", artistId], {
        userId,
        artistId,
        isLiked: !isLiked
      });
      return { previousLike };
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData<LikeType>(["artistLike", variables.artistId], {
        ...variables,
        isLiked: !variables.isLiked
      });
      queryClient.invalidateQueries({ queryKey: ["artistLike", variables.artistId] });
    },
    onError: (err, variables, context) => {
      // context는 onMutate 콜백에서 반환한 컨텍스트 객체
      if (context?.previousLike) {
        queryClient.setQueryData<LikeType>(["artistLike", variables.artistId], context.previousLike);
      }
    }
  });

  const handleToggleLike = () => {
    console.log("handleToggleLike => ", !!likeData?.isLiked);
    // if (!likeData) return;

    toggleLikeMutation.mutate({
      artistId: params.id,
      isLiked: !!likeData?.isLiked,
      userId
    });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-300 w-20 h-4 rounded-full mb-5" />
        <div className="flex items-center gap-x-2">
          <div className="size-[300px] rounded-lg bg-gray-300" />
          <div className="flex flex-col gap-y-2">
            <div className="bg-gray-300 w-20 h-4 rounded-full"></div>
            <div className="bg-gray-300 w-20 h-4 rounded-full"></div>
            <div className="bg-gray-300 w-20 h-4 rounded-full"></div>
            <div className="bg-gray-300 size-[40px] rounded-lg"></div>
          </div>
        </div>
      </div>
    );
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
              src={artistData.images.length ? artistData.images[0].url : "http://via.placeholder.com/640x640"}
              alt="이미지"
              width={300}
              height={300}
              className=" object-cover rounded-lg shadow-lg mb-4"
            />

            <div className="flex flex-col">
              <div className="font-bold text-xl">{artistData.name}</div>
              <div className="text-gray-600">{artistData.genres[0]}</div>
              <div className="text-gray-600">{artistData.followers.total.toLocaleString()}</div>
              <button onClick={handleToggleLike} disabled={toggleLikeMutation.isPending}>
                {likeData?.isLiked ? (
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
