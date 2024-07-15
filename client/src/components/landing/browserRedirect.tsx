import { Button } from "../ui/button";
import { LaptopMock } from "./LaptopMock";

export const BrowserRedirect = ({ id }: { id?: string }) => {
  return (
    <section
      className="flex flex-col items-center justify-center h-screen"
      id={id}
    >
      <div className="flex flex-col space-y-6 items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-success">
          Register now and start your adventure!
        </h1>
        <div className="flex gap-2">
          <Button variant={"secondary"}>Register Now!</Button>
        </div>
        <LaptopMock>
          <img
            src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen.png"
            className="dark:hidden h-[156px] md:h-[278px] w-full rounded-lg"
            alt=""
          />
          <img
            src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen-dark.png"
            className="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg"
            alt=""
          />
        </LaptopMock>
      </div>
    </section>
  );
};
