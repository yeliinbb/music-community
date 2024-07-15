export default function PostSkeleton () {
  return     (<div className="border-2 border-gray-300 rounded-lg p-3 relative h-full max-h-[940px] animate-pulse w-full">
      <div className="flex items-center">
        <div className="rounded-md size-[100px] bg-gray-300"></div>
        <div className="mb-3 ml-8 w-24 h-4 rounded-full bg-gray-300"></div>
      </div>
      <div className="mt-4 h-4 max-h-[200px] w-full overflow-y-scroll scrollbar-hide bg-gray-300 rounded-full"></div>
      <div className="mt-4 h-4 max-h-[200px] w-full overflow-y-scroll scrollbar-hide bg-gray-300 rounded-full"></div>
    </div>);
}
