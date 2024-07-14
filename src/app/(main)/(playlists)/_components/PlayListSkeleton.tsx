export default function PlayListSkeleton() {
  return (
    <div className="size-full self-center animate-pulse">
      <h2 className="mb-2 w-20 h-4 rounded-full border border-gray-300 bg-gray-300" />
      <div className="flex size-full gap-2.5 px-1">
        <div className="size-[270px] bg-gray-300 rounded-md" />
        <ul className="grid grid-cols-2 gap-2">
          {Array.from({ length: 8 }).map((_, idx) => (
            <li key={idx} className="w-72 h-14 bg-gray-300 rounded-lg"></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
