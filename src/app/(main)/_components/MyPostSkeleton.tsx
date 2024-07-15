export default function MyPostSkeleton() {
  return (
    <div className="w-full h-full animate-pulse">
      <ul className="w-full h-full grid grid-cols-4 gap-10 p-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            className="shadow-md 
             bg-gray-300 rounded-lg w-[182px] h-[227px]"
            key={index}
          ></li>
        ))}
      </ul>
    </div>
  );
}
