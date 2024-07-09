import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const query = searchParams.get("params") ? (searchParams.get("params") as string) : "";
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", { query }],
    queryFn: () => api.getSearchResult(query)
  });

  console.log("DATA___", searchResults);

  return (
    <div>
      {!isLoading && searchResults && (
        <>
          <div>
            <h2>앨범</h2>
            {searchResults.albums.items.map((item) => (
              <li key={item.id}>
                <Image src={item.images[0].url} className="object-cover" fill alt={item.name} />
                {item.name}
              </li>
            ))}
          </div>
          <div>
            <h2>아티스트</h2>
            {searchResults.artists.items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
