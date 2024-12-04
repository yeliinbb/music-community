const ArtistSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 w-20 h-4 rounded-full mb-5" />
      <div className="flex items-center gap-x-2">
        <div className="size-[300px] rounded-lg bg-gray-300" />
        <div className="flex flex-col gap-y-2">
          <div className="bg-gray-300 w-20 h-4 rounded-full"></div>
          <div className="bg-gray-300 w-20 h-4 rounded-full"></div>
          <div className="bg-gray-300 w-20 h-4 rounded-full"></div>
          <div className="bg-gray-300 size-[40px] rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ArtistSkeleton;
