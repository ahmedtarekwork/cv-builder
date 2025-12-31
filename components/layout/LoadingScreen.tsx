const LoadingScreen = () => {
  return (
    <div className="flex-1 grid place-content-center overflow-hidden">
      <h1 className="text-primary font-bold loading-text-animation text-[36px] max-[265px]:text-[20px]">
        <span>Loading...</span>
      </h1>
    </div>
  );
};
export default LoadingScreen;
