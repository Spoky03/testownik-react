import { useSelector } from "react-redux";
import { QuestionSet, RootState } from "../../types";
import { SingleSet } from "../SingleSet/SingleSet";
import { SetListTypes } from "../../types";
import { MdOutlineSort as SortIcon } from "react-icons/md";
import { useEffect, useState } from "react";
import { ShotThroughTitle } from "../shared/ShotThroughTitile";
export const SetList = () => {
  const [sort, setSort] = useState<boolean>(false);
  const [sortedSetList, setSortedSetList] = useState<QuestionSet[]>([]);
  const [foreignAndNotBookmarked, setforeignAndNotBookmarked] = useState<
    QuestionSet[]
  >([]);
  const setList = useSelector(
    (state: RootState) => state.user.user?.questionSets
  );
  const fetchedProgress = useSelector(
    (state: RootState) => state.user.progress
  );
  //progress
  const sortSetsByProgress = (
    setList: QuestionSet[],
    fetchedProgress: RootState["user"]["progress"]
  ) => {
    return setList
      .map((set: QuestionSet) => {
        const setProgress = fetchedProgress.find(
          (p) => p.questionSetId === set._id
        );
        const correctAnswers =
          setProgress?.questions.filter((q) => q.repeats === 0).length || 0;
        const totalQuestions = set.questions.length;
        const progressPercentage = (correctAnswers / totalQuestions) * 100;
        return { set, progressPercentage };
      })
      .sort((a, b) => b.progressPercentage - a.progressPercentage)
      .map((item) => item.set);
  };
  const bookmarks = useSelector((state: RootState) => state.user.bookmarks);
  useEffect(() => {
    if (setList && bookmarks && !sort) {
      // When sort is true, show bookmarked sets first
      const bookmarkedSets = setList.filter((set) =>
        bookmarks.includes(set._id)
      );
      const nonBookmarkedSets = setList.filter(
        (set) => !bookmarks.includes(set._id) && !set.foreign
      );
      setforeignAndNotBookmarked(
        setList.filter((set) => !bookmarks.includes(set._id) && set.foreign)
      );
      setSortedSetList([...bookmarkedSets, ...nonBookmarkedSets]);
    } else if (setList && fetchedProgress && sort) {
      setSortedSetList(sortSetsByProgress(setList, fetchedProgress));
    }
  }, [setList, bookmarks, fetchedProgress, sort]);
  return (
    <div className="flex flex-col p-5 rounded-xl w-full h-full max-w-6xl  ">
      <div className="flex justify-between">
        <div></div>
        <SortIcon
          size={24}
          onClick={() => setSort(!sort)}
          className={`hover:text-success transition-color duration-300 ${
            0 && "-scale-y-100"
          }`}
        />
      </div>
      <ShotThroughTitle title="Your Sets" />

      <div className="flex gap-2 w-full flex-col">
        {sortedSetList ? (
          sortedSetList.map((set: QuestionSet) => {
            if (!set.questions.length) {
              return (
                <div
                  key={set._id}
                  className={`bg-ternary hover:outline font-bold rounded-md px-2 p-1 flex flex-col justify-cent w-full relative pl-5 opacity-50 cursor-not-allowed`}
                >
                  {set.name}
                </div>
              );
            }
            return (
              <SingleSet set={set} key={set._id} type={SetListTypes.QUIZ} />
            );
          })
        ) : (
          <h1>No sets</h1>
        )}
      </div>
      {foreignAndNotBookmarked.length > 0 && (
        <div className="flex flex-col">
          <ShotThroughTitle title="Foreign Sets" />
          <div className="flex gap-2 w-full flex-col">
            {foreignAndNotBookmarked.map((set: QuestionSet) => {
              return (
                <SingleSet set={set} key={set._id} type={SetListTypes.QUIZ} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
