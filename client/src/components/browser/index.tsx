import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AppDispatch } from "../../store";
import { RootState, SetListTypes } from "../../types";
import constants from "../../constants";
import { initializeBrowser } from "../../reducers/browserReducer";
import { SingleSet } from "../SingleSet/SingleSet";
import { MdSearch as SearchIcon } from "react-icons/md";

const BrowserNav = ({ search, setSearch }: { search: string, setSearch: (search: string) => void }) => {
  return (
    <div className="flex justify-between">
    <h1 className="text-xl font-semibold place-self-center">
      {constants.LABELS.BROWSER}
    </h1>
    <div className="flex place-items-center relative">
      <input
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
const SetList = () => {
  const sets = useSelector((state: RootState) => state.browser.sets);
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredSets = sets.filter((set) =>
    set.name.toLowerCase().includes(searchValue.toLowerCase()) || set.description.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div className="flex flex-col place-items-center w-screen px-5 sm:p-8">
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="flex flex-col p-5 rounded-xl shadow-2xl w-full h-full bg-w-primary dark:bg-primary max-w-[900px] gap-2  ">
          <BrowserNav search={searchValue} setSearch={setSearchValue} />
          {!searchValue ? sets.map((set) => (
            <SingleSet key={set._id} set={set} type={SetListTypes.BROWSER}  />
          )) : filteredSets.map((set) => (
            <SingleSet key={set._id} set={set} type={SetListTypes.BROWSER}  />
          ))}
        </div>
      </Suspense>
    </div>
  );
};
const BrowserContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.user.token);
  useEffect(() => {
    if (token) {
      dispatch(initializeBrowser());
    }
  }, [dispatch, token]);
  if (!token) {
    return <h1>Not logged in</h1>;
  }
  return (
    <Routes>
      <Route path="/" element={<SetList />} />
    </Routes>
  );
};

export default BrowserContainer;
