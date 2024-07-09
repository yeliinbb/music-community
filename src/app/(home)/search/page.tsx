"use client";
import { useEffect, useState } from "react";

function SearchPage() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const test = async () => {
      const res = await fetch("http://localhost:3000/api/search", { method: "POST" });

      const data = await res.json();

      localStorage.setItem("token", JSON.stringify(data));
      console.log(data.access_token);
      setToken(data.access_token);
    };

    test();
  }, []);

  useEffect(() => {
    const test = async () => {
      const res = await fetch(
        "https://api.spotify.com/v1/search?q=%EC%97%A0%EC%94%A8%EB%8D%94%EB%A7%A5%EC%8A%A4&type=album&market=KR",
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = await res.json();
      console.log("SEARCH RESULT___", data);
    };

    if (token) {
      test();
    }
  }, [token]);
  console.log(token);

  return <div>검색 페이지</div>;
}

export default SearchPage;

/**
 * http GET 'https://api.spotify.com/v1/search?q=%EB%9F%AC%EB%B8%94%EB%A6%AC%EC%A6%88&type=album' \
  Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'
 * 
 */
