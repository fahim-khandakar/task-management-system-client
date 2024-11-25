const LoadingPage = (fullPage) => {
  return (
    <div
      className={`flex justify-center items-center ${
        fullPage && "min-h-screen"
      }`}
    >
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
};

export default LoadingPage;
