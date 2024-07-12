import React from "react";
import Post from "../_component/Post";
import Comment from "../_component/Comment";

const DetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="rounded-xl flex flex-col h-full w-full gap-4">
      <Post id={params.id} />
      <Comment params={params} />
    </div>
  );
};

export default DetailPage;
