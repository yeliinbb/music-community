"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { postingPost } from "./post";

const DetailPage = () => {
  // 이미지 상태
  const [image, setImage] = useState<File | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const submitFun = async () => {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    if (!image) {
      console.log("이미지 없");
      return;
    }

    // 확장자 구하기 (jps, png, ...)
    const extension = image.name.split(".").slice(-1);
    // 랜덤값 만들어서 확장자 붙인 후 파일이름 정하기
    // 랜덤값은 uuid나 nanoid 써도되는데 설치한게 없어서 난수로만듬
    const filename = `_${Math.random().toString(36).slice(2, 16)}.${extension}`;
    const supabase = createClient();
    const response = await supabase.storage.from("postsImage").upload(`/${filename}`, image);
    console.log(response);
    if (!response.data) {
      console.log("업로드 실패");
      return;
    }
    // 업로드한 이미지 url
    const imageURL = `https://fjudnzlhchschbqcanpw.supabase.co/storage/v1/object/public/${response.data.fullPath}`;

    if (title && content) {
      try {
        await postingPost({ title, content, imageURL });
      } catch (error) {
        console.log(error);
      }
    }

    // router.push("/"); // 이거 마이페이지로 이동해야됨 ~
  };

  //   const mutation = useMutation({
  //     mutationFn: submitFun,
  //     onSuccess:()=>{

  //     }
  //   });

  return (
    <div className="flex flex-col p-10 w-4/5 h-[700px] border-2 border-gray-400 bg-white rounded-lg relative">
      <input
        className=" border-b border-black mb-4 indent-2.5 h-10 w-10/12 mx-auto outline-none"
        type="text"
        placeholder="제목을 입력하세요!"
        ref={titleRef}
      />
      {/* 이미지 파일 받는곳 */}
      <div>
        <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      </div>
      <textarea
        className="border border-black resize-none w-10/12 mx-auto outline-none rounded-lg p-5 h-[70%]"
        ref={contentRef}
      ></textarea>
      <div className="w-[144px] absolute bottom-[70px] right-[100px] text-white">
        <Link href={"/"}>
          <button className="border border-black w-16 h-11 rounded-lg mr-4 bg-[#CFCFCF]">취소</button>
        </Link>
        <button className="border border-black w-16 h-11 rounded-lg bg-[#2c2c2c]" onClick={submitFun}>
          게시
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
