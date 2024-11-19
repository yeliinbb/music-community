import React, { MutableRefObject } from "react";
import { BsPencilSquare } from "react-icons/bs";

interface CommentFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  commentRef: MutableRefObject<HTMLInputElement | null>;
  className?: string;
}

const CommentForm = ({ onSubmit, commentRef, className }: CommentFormProps) => {
  return (
    <form
      className={`w-full min-h-300px rounded-lg bg-inherit flex mb-3 p-4 border ${className}`}
      onSubmit={onSubmit}
    >
      <input
        ref={commentRef}
        type="text"
        className="w-full outline-none indent-2.5 h-14"
        placeholder="댓글을 남겨주세요!"
      />
      <button className="flex items-center">
        <BsPencilSquare />
      </button>
    </form>
  );
};

export default CommentForm;
