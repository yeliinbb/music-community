export default function CommentSkeleton() {
  return (
    <div className="w-full border-2 border-gray-300 h-full rounded-lg p-5 min-h-[200px] max-h-[400px] animate-pulse">
      <h3 className="text-xl w-24 h-7 mb-2 bg-gray-300 rounded-full"></h3>
      <div className="flex flex-col px-10 pb-4 justify-center items-center h-full w-full">
        <div className="w-full min-h-300px rounded-lg border-2 border-gray-300 bg-inherit flex mb-3 p-4">
          <input type="text" className="w-full outline-none indent-2.5 h-14" />
          <button className="flex items-center"></button>
        </div>
        <ul className="w-full max-h-[250px] h-full overflow-y-scroll scrollbar-hide px-2">
          {/* {Array.from({ length: 2 }).map((_, index) => {
            return (
              <li className="shadow rounded-lg mb-2 p-1" key={index}>
                <div className="flex flex-col p-2 gap-3">
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-[100px]  bg-gray-300"></span>
                      <span className=" bg-gray-300"></span>
                    </div>
                    <div>
                      <button className="mr-1"></button>
                      <button></button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })} */}
        </ul>
      </div>
    </div>
  );
}
