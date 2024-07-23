export const ShotThroughTitle = ({ title, className }: { title: string; className?: string }) => {
  return (
    <div className={`place-self-center w-full flex flex-col m-5 px-3 relative ${className}`}>
      <div className="w-full mx-3 h-0.5 rounded-full place-self-center bg-faint" />
      <h2 className="place-self-center absolute -top-3 bg-primary text-xl px-2">
        {title}
      </h2>
    </div>
  );
};
