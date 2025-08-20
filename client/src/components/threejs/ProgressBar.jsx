const ProgressBar = ({ progress }) => {
  return (
    <div className="w-4/5 max-w-[400px] bg-white/20 rounded-full overflow-hidden border border-white/30">
      <div
        className="h-2.5 bg-white rounded-full transition-width duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
