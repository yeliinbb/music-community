'use client';

import useComment from '@/hooks/useComment';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import CommentForm from '@/components/CommentForm';
import ArtistCommentSkeleton from '@/app/(nonProfile)/artist/_components/ArtistCommentSkeleton';
import CommentSkeleton from '@/app/(main)/post/(postDetail)/_component/CommentSkeleton';
import Comment from './Comment';
import { TABLE_NAMES } from '@/lib/constants/tableNames';

interface CommentProps {
  params: { id: string };
  type: 'artist' | 'regular';
}

const CommentList = ({ params, type }: CommentProps) => {
  const isArtistType = type === 'artist';

  const {
    commentList,
    isCommentSuccess,
    isCommentPending,
    isCommentError,
    commentRef,
    editState,
    setEditState,
    handleSubmitComment,
    handleEditComment,
    handleDeleteComment,
  } = useComment({
    queryKey: isArtistType ? QUERY_KEYS.artistComments : QUERY_KEYS.comments,
    postId: params.id,
    tableName: isArtistType ? TABLE_NAMES.artistComments : TABLE_NAMES.comments,
  });

  if (isCommentPending) {
    return isArtistType ? <ArtistCommentSkeleton /> : <CommentSkeleton />;
  }
  if (isCommentError) {
    return <div>댓글 불러오기 실패</div>;
  }

  return (
    <>
      {isArtistType ? <div className="m-4 font-medium">Comment</div> : null}
      <div
        className={`w-full border h-full rounded-lg p-5 min-h-[300px] ${isArtistType ? 'max-h-[300px]' : 'max-h-[400px]'}`}
      >
        {isArtistType ? null : <h3 className="text-xl mb-2">Comment</h3>}
        <div className="flex flex-col px-10 pb-4 justify-center items-center h-full w-full">
          <CommentForm onSubmit={(e) => handleSubmitComment(e)} commentRef={commentRef} />
          <ul className="w-full max-h-[250px] h-full overflow-y-scroll scrollbar-hide px-2">
            {isCommentSuccess &&
              commentList?.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onEdit={() => handleEditComment(comment.id)}
                  onDelete={() => handleDeleteComment(comment.id)}
                  onEditChange={(e) =>
                    setEditState((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  isPossibleEdit={editState.isEditing && editState.commentId === comment.id}
                  editingContent={editState.content}
                />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CommentList;
