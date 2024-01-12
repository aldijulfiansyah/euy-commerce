const Skeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-3 w-auto lg:w-96">
        <div className="skeleton h-[300px] w-full "></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-3 w-28"></div>
        <div className="skeleton h-3 w-10"></div>
        <div className="skeleton justify-end h-11 w-28 ml-auto"></div>
      </div>
    </>
  );
};

export default Skeleton;
