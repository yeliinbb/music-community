"use client";
import useComment from "@/hooks/useComment";
import { getDateTime } from "@/lib/utils/getDateTime";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";

interface ArtistCommentsProps {
  params: { id: string };
}

const ArtistComments = ({ params }: ArtistCommentsProps) => {
  const artistId = params.id;
  // console.log(artistId);
  const queryKey = "artistComments";

  const {
    data: artistCommentList,
    error,
    isPending,
    isSuccess,
    commentRef,
    isEditing,
    editingCommentId,
    editingContent,
    setEditingContent,
    handleSubmitComment,
    handleEditComment,
    handleDeleteComment
  } = useComment({
    queryKey,
    id: artistId
  });

  if (isPending) {
    return <div>댓글 불러오는 중...</div>;
  }
  if (error) {
    return <div>댓글 불러오기 실패</div>;
  }
  return (
    <div>
      <div className="w-full border-2 border-gray-300  rounded-lg p-5">
        <h3 className="text-xl mb-2">Comment</h3>
        <div className="flex flex-col justify-center items-center">
          <form className="relative w-[88%]" onSubmit={(e) => handleSubmitComment(e)}>
            <input
              ref={commentRef}
              type="text"
              className="w-full outline-none indent-2.5 h-14 rounded-lg border-2 border-gray-300 bg-inherit mb-5 "
            />
            <button className=" absolute top-[16px] right-[25px]">추가</button>
          </form>

          <div className="w-[90%] h-[200px] overflow-auto">
            {isSuccess &&
              artistCommentList?.map((comment) => {
                return (
                  <div className="shadow p-4 rounded-lg mb-2" key={comment.id}>
                    <div>
                      <li className="flex justify-between p-2">
                        <span>{comment.users?.nickname}</span>
                        <span>{getDateTime(comment.createdAt ?? "")}</span>
                        <button>
                          <RiEditFill onClick={() => handleEditComment(comment.id)} />
                        </button>
                        <button>
                          <RiDeleteBinLine onClick={() => handleDeleteComment(comment.id)} />
                        </button>
                      </li>
                    </div>
                    {isEditing && editingCommentId === comment.id ? (
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="resize-none outline-none border border-gray-500 mt-5 w-full h-[80px] rounded-md p-1"
                      ></textarea>
                    ) : (
                      <p>{comment.content}</p>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistComments;
