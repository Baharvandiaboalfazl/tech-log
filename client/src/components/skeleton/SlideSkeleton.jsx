import { ContainerScroll } from "../ui/ContainerScrollAnimation";

const SlideSkeleton = () => {
  return (
    <ContainerScroll>
      <div className="relative w-full max-w-5xl h-[500px] mx-auto overflow-hidden rounded-2xl shadow-2xl">
        <div className="w-full h-full bg-gray-300 dark:bg-slate-700 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="h-8 w-3/4 max-w-md bg-gray-400 dark:bg-slate-600 rounded-md animate-pulse"></div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-7">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 bg-gray-300 dark:bg-slate-700 rounded-full animate-pulse"
          ></div>
        ))}
      </div>
    </ContainerScroll>
  );
};

export default SlideSkeleton;
