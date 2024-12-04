const ArtistTrackSkeleton = () => {
  return (
    <div className="mt-4 animate-pulse">
      <div className="bg-gray-300 h-4 w-20 rounded-full mb-4" />
      <ul className="grid gap-y-4  h-[300px]">
        <li className="rounded-lg bg-gray-300 w-full h-[100px]" />
        <li className="rounded-lg bg-gray-300 w-full h-[100px]" />
        <li className="rounded-lg bg-gray-300 w-full h-[100px]" />
      </ul>
    </div>
  );
};

export default ArtistTrackSkeleton;
