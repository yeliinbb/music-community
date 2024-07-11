import { MyPostsType } from "@/hooks/useMe";
import { convertDateFormat } from "@/utils/convertDateFormet";
import Image from "next/image";

export default function MyPostCard({ post }: { post: MyPostsType }) {
  const { id, created_at, title, content, imageURL } = post;

  return (
    <>
      <div className="relative w-full aspect-video border border-gray-300">
        <Image src={imageURL} fill className="object-cover" sizes="100px" alt={`${id}${created_at}`} />
      </div>
      <div className="flex flex-col gap-y-2 divide-y-2">
        <div className="flex flex-col ">
          <h2 className="font-bold text-lg line-clamp-1">{title}</h2>
          <p className="ml-auto text-xs text-gray-300">{convertDateFormat(created_at)}</p>
        </div>
        <p className="text-sm line-clamp-2 pt-2">{content}</p>
      </div>
    </>
  );
}
