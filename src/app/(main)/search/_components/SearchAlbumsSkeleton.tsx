function SearchAlbumsSkeleton() {
  return (
    <div className="flex flex-col gap-y-2 ">
      <div className="relative size-24 aspect-square p-2 bg-gray-300" />
      <div className="flex flex-col gap-y-1">
        <div className="text-xs font-bold w-20 rounded-lg h-3 bg-gray-300"></div>
        <div className="text-xs font-bold w-20 rounded-lg h-3 bg-gray-300"></div>
        <div className="text-xs font-bold w-20 rounded-lg h-3 bg-gray-300"></div>
      </div>
    </div>
  );
}

export default SearchAlbumsSkeleton;
