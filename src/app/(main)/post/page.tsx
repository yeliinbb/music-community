"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { postingPost } from "./post";

const DetailPage = () => {
  // 이미지 상태
  const [imageURL, setImageURL] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const onClickFileUpload = async (file: File | null) => {
    if (!file) {
      console.log("이미지 없");
      return;
    }
    setIsUploading(true);
    // 확장자 구하기 (jps, png, ...)
    const extension = file.name.split(".").slice(-1);
    // 랜덤값 만들어서 확장자 붙인 후 파일이름 정하기
    // 랜덤값은 uuid나 nanoid 써도되는데 설치한게 없어서 난수로만듬
    const filename = `_${Math.random().toString(36).slice(2, 16)}.${extension}`;
    const supabase = createClient();
    const response = await supabase.storage.from("postsImage").upload(`/${filename}`, file);
    if (!response.data) {
      console.log("업로드 실패");
      setIsUploading(false);
      return;
    }
    // 업로드한 이미지 url
    const url = `https://fjudnzlhchschbqcanpw.supabase.co/storage/v1/object/public/${response.data.fullPath}`;
    setImageURL(url);
    setIsUploading(false);
  };

  const submitFun = async () => {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    if (imageURL.length < 0) {
      console.log("썸네일 없");
      return;
    }

    if (title && content) {
      try {
        await postingPost({ title, content, imageURL });
      } catch (error) {
        console.log(error);
      }
    }
    router.push("/my");
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col p-10 w-4/5 h-[700px] border-2 border-gray-400 bg-white rounded-lg relative gap-y-2">
        <input
          className="border-b border-black mb-4 indent-2.5 h-10 w-10/12 mx-auto outline-none"
          type="text"
          placeholder="제목을 입력하세요!"
          ref={titleRef}
        />
        <div className="w-4/5 mx-auto flex flex-col items-center gap-y-2 select-none">
          {/* 이미지 파일 */}
          <div className="size-40  border border-gray-300 relative aspect-square flex items-center justify-center">
            {isUploading && <div className="font-bold">이미지 업로드중...</div>}
            {!isUploading && !imageURL.length && <div className="font-bold">썸네일 올려주세요..</div>}
            {imageURL.length > 0 && !isUploading && (
              <Image fill className="object-cover" src={imageURL} alt="Thumbnail" sizes="100px" />
            )}
          </div>
          {/* 이미지 파일 받는곳 */}
          <div className="mb-5">
            <label
              className="cursor-pointer hover:shadow-md active:shadow-[inset_0_2px_8px_gray] 
            py-1.5 px-4 border border-black w-16 h-11 rounded-lg bg-[#2c2c2c] text-white font-bold text-sm"
              htmlFor="fileInput"
            >
              썸네일 업로드
            </label>
            <input
              className="hidden"
              id="fileInput"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => onClickFileUpload(e.target.files?.[0] || null)}
            />
          </div>
        </div>
        <textarea
          className="border border-black resize-none w-10/12 mx-auto outline-none rounded-lg p-5 h-[70%]"
          ref={contentRef}
        ></textarea>
        <div className="w-[144px] absolute bottom-[70px] right-[90px] text-white">
          <Link href={"/"}>
            <button className="border border-black w-14 h-11 rounded-lg mr-2 bg-[#CFCFCF]">취소</button>
          </Link>
          <button className="border border-black w-14 h-11 rounded-lg bg-[#2c2c2c]" onClick={submitFun}>
            게시
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
