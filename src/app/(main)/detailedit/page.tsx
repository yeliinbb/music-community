"use client";

import React, { useRef } from "react";
import { postingPost } from "./post";
import Link from "next/link";

const DetailPage = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const submitFun = async () => {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    console.log(title, content);
    if (title && content) {
      try {
        await postingPost({ title, content });
      } catch (error) {
        console.log(error);
      }
    }
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
