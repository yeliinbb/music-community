"use client";

// import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface ArtistProps {
  params: { id: string };
}

const Artist = ({ params }: ArtistProps) => {
  console.log(params.id);
  //   const {data, isLoading, error} = useQuery({
  //       queryKey:[],
  //       queryFn:
  //   })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/spotify/artist/${params.id}`);
        const data = await response.json();
        console.log("이것이 콘솔=>", data);
      } catch (error) {
        console.error("이것은 오류 =>", error);
      }
    };
    fetchData();
  }, [params.id]);

  return <div>ArtistPage</div>;
};

export default Artist;
