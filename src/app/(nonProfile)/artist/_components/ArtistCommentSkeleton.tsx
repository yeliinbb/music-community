export default function ArtistCommentSkeleton() {
  return (
    <div className="animate-pulse h-full w-full mt-4">
      <div className="my-4 w-20 h-4 rounded-full bg-gray-300"></div>
      <div className="h-full rounded-lg p-5 max-h-[330px] w-[570px] bg-gray-300">
        <div className="flex flex-col px-10 pb-4 justify-center items-center h-full w-full">
          <ul className="w-full max-h-[250px] h-full overflow-y-scroll scrollbar-hide px-2"></ul>
        </div>
      </div>
    </div>
  );
}
