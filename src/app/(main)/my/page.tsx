"use client";
import { getAccessToken } from "@/lib/spotify";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useState } from "react";

type testType = {
  id: string;
  name: string;
  images: {
    width: number;
    url: string;
  }[];
};

export default function MyPage() {
  const [test, setTest] = useState<testType[]>([]);

  const testLogin = async () => {
    const supabase = createClient();
    const response = await supabase.auth.signInWithPassword({
      email: "test@naver.com",
      password: "123123"
    });
    console.log("TEST LOGIN___", response);
  };

  const testGetLikes = async () => {
    const supabase = createClient();
    const response = await supabase.from("likes").select("*").eq("userId", "c0badd14-de12-4bdd-9fc8-e8c22516435d");
    const token = await getAccessToken();
    // console.log("TOKEN___", token);
    let query = "";
    if (response.data) {
      query = response?.data?.map((d) => d.artistId).join(",");
    }
    //TODO query 최대 50개 까지임, 50개 이상일 때 생각할 것
    console.log("TEST GET LIKES___", query);

    const res = await fetch(`https://api.spotify.com/v1/artists?ids=${query}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const d = await res.json();
    console.log("TEST GET ARTISTS___", d);
    setTest(d.artists);
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">My Page</h1>
      <div className="flex flex-col gap-y-2 max-w-[500px] p-10 select-none">
        <button
          className="border border-black rounded py-2 px-4 bg-white hover:shadow-lg active:shadow-[inset_0_2px_8px_gray]"
          onClick={testLogin}
        >
          테스트 용 로그인
        </button>
        <button
          className="border border-black rounded py-2 px-4 bg-white hover:shadow-lg active:shadow-[inset_0_2px_8px_gray]"
          onClick={testGetLikes}
        >
          좋아요 가져오기
        </button>
        <ul className="grid grid-cols-3 gap-2">
          {test?.map((t) => (
            <li key={t.id}>
              <div className="relative aspect-square p-2">
                <Image
                  src={t.images.length ? t.images[0].url : "http://via.placeholder.com/640x480"}
                  className="object-cover"
                  fill
                  alt={t.name}
                  sizes={t.images.length ? `${t.images[0].width}px` : "100px"}
                />
              </div>
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * http GET 'https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6' \
  Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'
 */
