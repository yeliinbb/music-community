import { PostType } from "@/types/posts.type";
import Image from "next/image";
import { convertDateFormat } from "@/utils/convertDateFormet";

interface PostCardProps {
  post: PostType;
}

const PostCard = ({ post }: PostCardProps) => {
  const { id, created_at, title, content, imageURL } = post;

  return (
    <div>
      <div className="relative w-full aspect-video border border-gray-300 rounded-lg">
        <img src={imageURL} className="w-full h-32 object-cover" alt={`${id}${created_at}`} />
      </div>
      <div className="flex flex-col gap-y-2 divide-y-2">
        <div className="flex flex-col ">
          <h2 className="font-bold text-xl text-gray-800 line-clamp-1 mt-0.5">{title}</h2>
          <p className="ml-auto text-xs text-gray-500">{convertDateFormat(created_at)}</p>
        </div>
        <p className="text-sm line-clamp-2 pt-2 min-h-[3rem]">{content}</p>
      </div>
    </div>
  );
};

export default PostCard;
