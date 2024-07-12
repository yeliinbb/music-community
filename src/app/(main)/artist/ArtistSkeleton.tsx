export default function ArtistSkeleton() {
  return (
    <div className="mt-10 animate-pulse">
      <p className="w-20 h-4 bg-gray-300 rounded-full mb-5" />
      <ul className="grid grid-cols-5 gap-x-8 place-items-center">
        {Array.from({ length: 5 }).map((_, idx) => (
          <li key={idx} className="flex flex-col items-center gap-y-2">
            <div className="size-[100px] bg-gray-300 rounded-md"></div>
            <div className="w-20 h-4 bg-gray-300 rounded-full"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
