export default function TrendingSkeleton() {
  return (
    <div className="w-full flex flex-col p-2 animate-pulse gap-y-2">
      <span className="w-20 h-4 bg-gray-300 rounded-full " />
      <div className="size-[180px] rounded-md bg-gray-300"></div>
      <div className="flex flex-col gap-y-2">
        <span className="w-24 h-4 bg-gray-300 rounded-full " />
        <span className="w-24 h-4 bg-gray-300 rounded-full " />
      </div>
    </div>
  );
}
