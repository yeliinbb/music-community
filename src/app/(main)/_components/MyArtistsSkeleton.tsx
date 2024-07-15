export default function MyArtistsSkeleton() {
  return (
    <ul className="grid grid-cols-4 gap-10 p-2 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <li className="shadow-md bg-gray-300 rounded-lg w-[182px] h-[198px]" key={index}></li>
      ))}
    </ul>
  );
}
