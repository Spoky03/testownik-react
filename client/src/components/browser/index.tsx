import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { QuestionSet, RootState, SetListTypes } from "../../types";
import { initializeBrowser } from "../../reducers/browserReducer";
import { SingleSet } from "../SingleSet/SingleSet";
import { Modal } from "../Modal";
import { BrowserNav } from "./BrowserNav";
const SetDescription = ({ set }: { set: QuestionSet }) => {
  return (
    <div className="p-3 shadow-x bg-ternary">
      <SingleSet set={set} type={SetListTypes.MODAL} />
    </div>
  );
};


const SetList = () => {
  const sets = useSelector((state: RootState) => state.browser.sets);
  const { id } = useParams();
  const searchValue = useSelector(
    (state: RootState) => state.browser.searchValue
  );
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedSet, setSelectedSet] = useState<QuestionSet | null>(null);
  const filteredSets = sets.filter(
    (set) =>
      set.questions.length > 0 &&
      (set.name
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(searchValue.replace(/\s+/g, "").toLowerCase()) ||
        set.description
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(searchValue.replace(/\s+/g, "").toLowerCase()) ||
        set.metaData.tags.some((tag) =>
          tag
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(searchValue.replace(/\s+/g, "").toLowerCase())
        ) ||
        searchValue === "")
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
    <div className="flex flex-col place-items-center px-5 sm:p-8 mt-4">
      <Suspense fallback={<h1>Loading...</h1>}>
        <div
          className={`flex flex-col p-1 sm:p-5 rounded-xl shadow-2xl w-full h-full bg-primary max-w-6xl gap-2 `}
        >
          <BrowserNav />
          {filteredSets.map((set) => (
            <div
              key={set._id}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/browser/${set._id}`);
              }}
            >
              <SingleSet key={set._id} set={set} type={SetListTypes.BROWSER} />
            </div>
          ))}
          {filteredSets.length === 0 && (
            <h1 className="text-2xl text-center p-10">No sets found</h1>
          )}
        </div>
      </Suspense>
      <Modal
        open={open}
        setOpen={handleOpen}
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
