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
      <div className="flex justify-between pb-2 items-center">
        <div className="w-1/3"><GoBackArrow /></div>
        <h1 className="font-bold text-center text-xl w-1/3 h-fit">
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