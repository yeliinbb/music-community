export default function CommentSkeleton() {
  return (
    <div className="w-full border-2 border-gray-300 h-full rounded-lg p-5 min-h-[200px] max-h-[400px] animate-pulse">
      <h3 className="text-xl w-24 h-7 mb-2 bg-gray-300 rounded-full"></h3>
      <div className="flex flex-col px-10 pb-4 justify-center items-center h-full w-full bg-gray-300 rounded-lg max-h-[280px]">
        <div className="w-full min-h-300px rounded-lg border-2 border-gray-300 bg-inherit flex mb-3 p-4"></div>
        <ul className="w-full max-h-[250px] h-full overflow-y-scroll scrollbar-hide px-2"></ul>
      </div>
    </div>
  );
}
