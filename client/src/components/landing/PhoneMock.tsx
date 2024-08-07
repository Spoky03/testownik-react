export const PhoneMock = ({children, className}: {children?: React.ReactNode, className?:string}) => {
  return (
    <div className={`relative mx-auto outline-0  border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] transition-shadow duration-1000 ${className}`}>
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
      <div className="w-[36px] h-[4px] bg-gray-700 top-1.5 rounded-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
      <div className="w-[8px] h-[8px] bg-gray-700 top-1 rounded-full left-[168px] -translate-x-1/2 absolute"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 hover:translate-x-2 absolute transition-transform -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 hover:translate-x-2 absolute transition-transform -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 peer hover:-translate-x-2 absolute transition-transform -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] peer-hover:opacity-5 overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
};
