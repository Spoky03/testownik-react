import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { Question, QuestionSet, RootState } from "../../types";
import { DropFiles } from "./DropFiles";
import { GoBackArrow } from "../GoBackArrow";
import { NewQuestionForm } from "./NewQuestionForm";
import { SingleQuestion } from "./SingleQuestion";
import { MdEdit as EditIcon } from "react-icons/md";
import { MdClose as CancelIcon, MdCheck as CheckIcon } from "react-icons/md";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { editQuestionSet } from "@/reducers/userReducer";
import { AppDispatch } from "@/store";
import { Label } from "@headlessui/react";
const EditDescriptionInput = ({
  singleSet,
  editDescription,
  setEditDescription,
  description,
  setDescription,
}: {
  singleSet: QuestionSet;
  editDescription: boolean;
  setEditDescription: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex flex">
      <Textarea
        value={description}
        className="m-2"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <div className="flex-col place-self-center">
        <button
          className="cursor-pointer hover:bg-success transition-colors hover:bg-opacity-50 rounded-full p-1"
          onClick={() => {
            setEditDescription(!editDescription);
            dispatch(
              editQuestionSet({
                name: singleSet.name,
                description,
                id: singleSet._id,
              })
            );
          }}
        >
          <CheckIcon size={20} />
        </button>
        <button
          className="cursor-pointer hover:bg-success transition-colors hover:bg-opacity-50 rounded-full p-1"
          onClick={() => {
            setEditDescription(!editDescription);
            setDescription(singleSet.description);
          }}
        >
          <CancelIcon size={20} />
        </button>
      </div>
    </div>
  );
};
export const SingleSetPreview = () => {
  const match = useMatch("/profile/sets/:id");
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const singleSet = useSelector((state: RootState) => {
    return state.user?.user?.questionSets?.find(
      (set: QuestionSet) => set._id === match?.params.id
    );
  });
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    singleSet && setDescription(singleSet.description);
  }, [singleSet]);

  return (
    <div className="flex flex-col place-items-center justify-center align-center w-full gap-5 ">
      <div className="place-self-start">
        <GoBackArrow />
      </div>
      {singleSet ? (
        <>
          <div className="flex flex-col font-semibold w-full px-2">
            <h1 className="text-2xl">{singleSet.name}</h1>
            <div className="flex gap-1">
              <div className="flex flex-col text-wrap w-1/3 gap-1">
                <p className="text-xs opacity-45">description: </p>

                {editDescription ? (
                  <EditDescriptionInput
                    singleSet={singleSet}
                    editDescription={editDescription}
                    setEditDescription={setEditDescription}
                    description={description}
                    setDescription={setDescription}
                  />
                ) : (
                  <div className="flex">
                    <p className="font-normal">{description}</p>
                    <EditIcon
                      className="cursor-pointer place-self-center hover:text-success transition-colors "
                      onClick={() => setEditDescription(!editDescription)}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col text-wrap w-1/6 gap-1">
                <p className="text-xs opacity-45">number of questions: </p>
                <div className="">
                  <p className="">{singleSet.questions.length}</p>
                </div>
              </div>
              <div className="flex flex-col text-wrap w-1/6 gap-1 items-center">
                <p className="text-xs opacity-45">likes: </p>
                <div className="flex">
                  <p>x</p>
                </div>
              </div>
            </div>
          </div>
          <DropFiles setId={singleSet._id} />
          <div className="px-2 flex flex-col justify-between w-full">
            <NewQuestionForm />
            <div className="flex flex-col">
              {singleSet.questions.map((question: Question) => {
                return (
                  <SingleQuestion key={question._id} question={question} />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <h1>Set not found/Not authorized/Loading</h1>
      )}
    </div>
  );
};
