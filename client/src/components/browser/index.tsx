import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { QuestionSet, RootState, SetListTypes } from "../../types";
import { initializeBrowser } from "../../reducers/browserReducer";
import { SingleSet } from "../SingleSet/SingleSet";
import { Modal } from "../Modal";
import { BrowserNav } from "./BrowserNav";
import constants from "@/constants";
const SetDescription = ({ set }: { set: QuestionSet }) => {
  return (
    <div className="p-3 shadow-x bg-ternary">
      <SingleSet set={set} type={SetListTypes.MODAL} />
    </div>
  );
}

const SetList = () => {
  const sets = useSelector((state: RootState) => state.browser.sets);
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const  navigate  = useNavigate();
  const [selectedSet, setSelectedSet] = useState<QuestionSet | null>(null);
  const filteredSets = sets.filter(
    (set) =>
      set.name.toLowerCase().replace(/\s+/g, "").includes(searchValue.replace(/\s+/g, "").toLowerCase()) ||
      set.description.toLowerCase().replace(/\s+/g, "").includes(searchValue.replace(/\s+/g, "").toLowerCase())
  );
  useEffect(() => {
    if (id) {
      const set = sets.find((set) => set._id === id);
      if (set) {
        setSelectedSet(set);
        setOpen(true);
      }
    }
  }, [id, sets]);
  const handleOpen = (open: boolean) => {
    if (open) {
      setOpen(true);
    } else {
      setOpen(false);
      navigate("/browser");
    }
  };
  return (
    <div className="flex flex-col place-items-center w-screen px-5 sm:p-8">
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className={`flex flex-col p-5 rounded-xl shadow-2xl w-full h-full bg-primary ${constants.STYLES.MAX_WIDTH} gap-2  `}>
          <BrowserNav search={searchValue} setSearch={setSearchValue} />
          {filteredSets.map((set) => (
            <div key={set._id} onClick={(e) => {
              e.preventDefault();
              navigate(`/browser/${set._id}`)
            }}>
              <SingleSet key={set._id} set={set} type={SetListTypes.BROWSER} />
            </div>
          ))}
          {filteredSets.length === 0 && (
            <h1 className="text-2xl text-center p-10">No sets found</h1>
          )}
        </div>
      </Suspense>
      <Modal open={open} setOpen={handleOpen}
        content={<SetDescription set={selectedSet as QuestionSet} />}
      />
    </div>
  );
};
const BrowserContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
      dispatch(initializeBrowser());
  }, [dispatch]);
  return (
    <>
    <Routes>
      <Route path="" element={<SetList />} />
      <Route path=":id" element={<SetList />} />
    </Routes>
    </>
  );
};

export default BrowserContainer;
