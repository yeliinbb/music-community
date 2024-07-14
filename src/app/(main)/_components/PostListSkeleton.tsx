export default function PostListSkeleton() {
  return (
    <div className="mt-10 w-full px-2 animate-pulse 0">
      <p className="w-20 h-4 bg-gray-300 rounded-full mb-5" />
      <ul className="grid grid-cols-3 gap-x-2">
        <li className="w-[280px] aspect-square bg-gray-300 rounded" />
        <li className="w-[280px] aspect-square bg-gray-300 rounded" />
        <li className="w-[280px] aspect-square bg-gray-300 rounded" />
      </ul>
    </div>
  );
}
