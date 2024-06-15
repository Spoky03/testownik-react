export const ShotThroughTitle = ({ title }: { title: string }) => {
  return (
    <div className="place-self-center w-full flex flex-col m-5 px-3 relative">
      <div className="w-full mx-3 h-0.5 rounded-full place-self-center dark:bg-faint bg-w-faint" />
      <h2 className="place-self-center absolute -top-3 bg-w-primary dark:bg-primary text-xl px-2">
        {title}
      </h2>
    </div>
  );
};
