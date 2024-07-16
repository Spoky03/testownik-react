export const Spinner = ({className}: {className?: string}) => {
    if (!className) className = "h-16 w-16 border-success";
  return (
    <div className="flex justify-center items-center h-full">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 ${className}`}></div>
    </div>
  );
};
