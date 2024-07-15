import { convertDateFormat } from "@/lib/utils/convertDateFormat";
import { MainPostType } from "@/types/posts.type";

interface PostCardProps {
  post: MainPostType;
}

const PostCard = ({ post }: PostCardProps) => {
  const { id, created_at, title, content, imageURL, users } = post;

  return (
    <div>
      <div className="relative w-full aspect-video border border-gray-300 rounded-lg">
        <img src={imageURL} className="w-full h-32 object-cover" alt={`${id}${created_at}`} />
      </div>
      <div className="flex flex-col gap-y-2 divide-y-2">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-between mt-1.5">
            <h2 className="font-bold text-lg text-gray-800 line-clamp-1 overflow-hidden overflow-ellipsis whitespace-nowrap w-[160px]">
              {title}
            </h2>
            <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap w-[70px] text-right text-gray-500">
              {users?.nickname}
            </p>
          </div>

          <p className="ml-auto text-xs text-gray-500">{convertDateFormat(created_at)}</p>
        </div>
        <p className="text-sm line-clamp-2 pt-2 min-h-[3rem]">{content}</p>
      </div>
    </div>
  );
};

export default PostCard;
