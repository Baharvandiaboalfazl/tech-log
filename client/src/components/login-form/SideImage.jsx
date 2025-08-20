import ThreeScene from "../threejs/ThreeScene";

const SideImage = () => {
  return (
    <div className="hidden lg:flex w-1/2 h-screen items-center justify-center p-4 dark:bg-slate-800">
      <div className="relative w-full h-full max-h-[95vh] overflow-hidden rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.2)] bg-cover">
        <div className="absolute inset-0 bg-cover bg-center bg-[url(https://s34.picofile.com/file/8486542318/background.jpg)] opacity-60 scale-105"></div>
        <div className="relative z-10 w-full h-full">
          <ThreeScene />
        </div>
      </div>
    </div>
  );
};

export default SideImage;
