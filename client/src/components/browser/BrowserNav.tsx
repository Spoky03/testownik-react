import constants from "../../constants";
import { MdSearch as SearchIcon } from "react-icons/md";
import { GoBackArrow } from "../GoBackArrow";
import { Input } from "../ui/input";

export const BrowserNav = ({
    search,
    setSearch,
  }: {
    search: string;
    setSearch: (search: string) => void;
  }) => {
    return (
      <div className="flex justify-between items-center">
        <div className="w-1/3"><GoBackArrow /></div>
        <h1 className="text-xl font-semibold place-self-center text-center w-1/3">
          {constants.LABELS.BROWSER}
        </h1>
        <div className="flex items-center justify-end relative w-1/3">
          <Input
            type="text"
            placeholder="Search"
            className="rounded-md p-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon size={24} className="absolute right-1" />
        </div>
      </div>
    );
  };