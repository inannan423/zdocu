// 回到顶部
const BackTop = () => {
  return (
    <div
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }}
      className="border-brand border-2 border-solid flex justify-center items-center cursor-pointer h-8 w-8 rounded-full fixed z-80 bottom-10 right-10 bg-gray-300 dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-900 bg-opacity-25 transition-all ease-in-out duration-800"
    >
      <div className="i-carbon-arrow-up text-xl"></div>
    </div>
  );
};

export default BackTop;
