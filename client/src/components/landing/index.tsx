import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { IoBeerSharp as BeerIcon } from "react-icons/io5";
import { RootState } from "../../types";
import constants from "../../constants";
export const LandingPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl sm:text-5xl font-bold text-success pt-10 place-self-center inline">
        {constants.APP_NAME}
      </h1>
      <BeerIcon
        size={64}
        className="hover:animate-spin pl-2 place-self-center drop-shadow-xl inline"
      />
      <h2 className="text-xl sm:text-2xl font-bold dark:text-whit place-self-center p-5">
        {user ? (
          `${constants.LABELS.WELCOME_BACK}` + user?.username
        ) : (
          <Link to="/profile" className="animate-pulse">
            {constants.LABELS.WELCOME}
          </Link>
        )}
      </h2>
      <div className="flex gap-5 place-self-center">
        <Link to="/dashboard" className="place-self-center text-2xl">
          <Button type="button">Quiz</Button>
        </Link>
        <Link to="/browser" className="place-self-center text-2xl">
          <Button type="button">Browse</Button>
        </Link>
        <Link to="/profile/sets" className="place-self-center text-2xl">
          <Button type="button">Edit</Button>
        </Link>
      </div>
      <div>
      </div>
    </div>
  );
};
