import { convertDateFormat } from "@/lib/utils/convertDateFormat";
import { CommonCommentType } from "@/types/comment.type";
import React, { ChangeEvent } from "react";
import { RiDeleteBinLine, RiEditFill } from "react-icons/ri";

interface CommentProps {
  comment: CommonCommentType;
  onEdit: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  isPossibleEdit: boolean;
  onEditChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  editingContent: string;
}

const Comment = ({ comment, onEdit, onDelete, isPossibleEdit, onEditChange, editingContent }: CommentProps) => {
  return (
    <li className="shadow rounded-lg mb-2 p-1" key={comment.id}>
      <div className="flex flex-col p-2 gap-3">
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold w-[100px] truncate">{comment.users?.nickname}</span>
            <span className="text-xs text-slate-400">{convertDateFormat(comment.createdAt ?? "")}</span>
          </div>
          <div>
            <button className="mr-1" onClick={() => onEdit(comment.id)}>
              <RiEditFill />
            </button>
            <button onClick={() => onDelete(comment.id)}>
              <RiDeleteBinLine />
            </button>
          </div>
        </div>
        {isPossibleEdit ? (
          <textarea
            value={editingContent}
            onChange={onEditChange}
            className="resize-none outline-none border border-gray-500 mt-5 w-full h-[80px] rounded-md p-1"
          ></textarea>
        ) : (
          <p>{comment.content ?? undefined}</p>
        )}
      </div>
    </li>
  );
};

export default Comment;
