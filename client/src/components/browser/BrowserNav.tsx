import { MdSearch as SearchIcon } from "react-icons/md";
import { GoBackArrow } from "../shared/GoBackArrow";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";
import { SortPopover } from "./sort";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSearchValue, setSortValue } from "@/reducers/browserReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
export const BrowserNav = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation", { keyPrefix: "BROWSER" });
  const search = useSelector((state: RootState) => state.browser.searchValue);
  const setSearch = (value: string) => {
    dispatch(setSearchValue(value));
  };
  useEffect(() => {
    dispatch(setSortValue("likes"));
  });
  return (
    <div className="flex flex-col">
      <div className="flex justify-between pb-2 items-center">
        <div className="w-1/3">
          <GoBackArrow />
        </div>
        <h1 className="font-bold text-center text-xl w-1/3 h-fit">
          {t("TITLE")}
        </h1>
        <div className="flex items-center justify-end relative w-1/3">
          <Input
            type="text"
            placeholder={t("NAV.SEARCH")}
            className="rounded-md p-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon size={24} className="absolute right-1" />
        </div>
      </div>
      <div className="flex justify-end pb-2 items-center">
        <SortPopover />
      </div>
    </div>
  );
};
