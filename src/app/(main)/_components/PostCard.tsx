import { PostType } from '@/types/posts.type'
import React from 'react'
import Image from "next/image";import { convertDateFormat } from "@/utils/convertDateFormet";

interface PostCardProps {
  post: PostType;
}

const PostCard = ({post}: PostCardProps) => {
  const { id, created_at, title, content, imageURL } = post;

  return (
    <div>
       <div className="relative w-full aspect-video border border-gray-300 rounded-lg">
        <Image src={imageURL} fill className="object-cover" sizes="100px" alt={`${id}${created_at}`} />
      </div>
      <div className="flex flex-col gap-y-2 divide-y-2">
        <div className="flex flex-col ">
          <h2 className="font-bold text-xl text-gray-800 line-clamp-1">{title}</h2>
          <p className="ml-auto text-xs text-gray-500">{convertDateFormat(created_at)}</p>
        </div>
        <p className="text-sm line-clamp-2 pt-2">{content}</p>
      </div>
    </div>
  )
}

export default PostCard