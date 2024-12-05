const ArtistAlbumsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 w-20 h-4 rounded-full mb-5" />
      <ul className="grid grid-cols-2 gap-y-4 ">
        <li className="bg-gray-300 rounded-lg w-[280px] h-[150px]"></li>
        <li className="bg-gray-300 rounded-lg w-[280px] h-[150px]"></li>
        <li className="bg-gray-300 rounded-lg w-[280px] h-[150px]"></li>
        <li className="bg-gray-300 rounded-lg w-[280px] h-[150px]"></li>
      </ul>
    </div>
  );
};

export default ArtistAlbumsSkeleton;
