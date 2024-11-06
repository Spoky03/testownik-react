import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NewSetForm } from "./NewSetForm";
import { QuestionSet } from "../../../types";
import { useState } from "react";
import {
  deleteOneQuestionSet,
  switchPrivacyOfSet,
} from "../../../reducers/userReducer";
import { AppDispatch, RootState } from "../../../store";

import { DeleteConfirmation } from "../../shared/DeleteConfirmation";
import { MdEdit as EditIcon } from "react-icons/md";
import { MdPublicOff as PrivateIcon } from "react-icons/md";
import { MdPublic as PublicIcon } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Modal } from "@/components/shared/Modal";
import { Button } from "../../ui/button";
import { Card } from "@/components/ui/card";
const SingleSet = ({ set }: { set: QuestionSet }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [effect, setEffect] = useState(false);
  const navigate = useNavigate();
  const handleDelete = () => {
    window.confirm(
      "Are you sure you want to delete this set? This action is irreversible"
    ) && setEffect(true);
  };
  const handlePrivate = (event: React.MouseEvent<Element, MouseEvent>) => {
    event?.stopPropagation();
    dispatch(switchPrivacyOfSet(set._id));
  };
  const effectCleanup = () => {
    if (effect) {
      dispatch(deleteOneQuestionSet(set._id));
      setEffect(false);
    }
  };
  const handleRedirect = () => {
    navigate(`${set._id}`);
  };
  return (
    <Card
      className="flex px-2 mx-2 md:mx-4 cursor-pointer hover:bg-success"
      onClick={handleRedirect}
    >
      <div
        className={`bg-secondary font-bold rounded-md px-2 flex justify-between w-full ${
          effect && "animate-explode"
        }`}
        onAnimationEnd={effectCleanup}
      >
        <div className="flex">
          <div className="flex w-full h-full py-3">
            <EditIcon className="shrink-0 mr-2 place-self-center hover:text-success duration-300 transition-colors" size={22} />

            <p className="flex text-wrap break-all opacity-90 hover:opacity-100">
              {set.name}
            </p>
          </div>
        </div>
        <div className="flex place-items-center gap-2 ">
          <DeleteConfirmation handleDelete={handleDelete} />
          <div
            onClick={handlePrivate}
            className="flex place-items-center gap-2"
          >
            {set.private ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <PrivateIcon
                      className="hover:text-warning transition-colors duration-300"
                      size={24}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This set is currently private. Press to publish it.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <PublicIcon
                      className="hover:text-success transition-colors duration-300"
                      size={24}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This set is public. Press to hide it.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <p className="p-3 w-12">{set.questions.length}</p>
        </div>
      </div>
    </Card>
  );
};
export const SetList = () => {
  const sets = useSelector((state: RootState) => state.user.user.questionSets);
  const [showModal, setShowModal] = useState(false);
  const usersSets = sets?.filter((set: QuestionSet) => !set.foreign);
  return (
    <div className="w-full">
      <div className="flex w-full place-content-end p-2">
        <Button type={"button"} onClick={() => setShowModal(true)}>
          {"Create new set"}
        </Button>
      </div>
      <br />
      {usersSets && usersSets.length > 0 && (
        <div className="flex justify-between mx-2 md:mx-4">
          <h1 className="py-1 px-4">Your Sets</h1>
          <h1 className="py-1 px-4">Questions</h1>
        </div>
      )}
      <div className="flex min-h-full gap-2 w-full flex-col">
        {usersSets && usersSets.length > 0 ? (
          usersSets.map((set: QuestionSet) => {
            return (
              <div key={set._id} className="flex flex-col">
                <SingleSet set={set} />
              </div>
            );
          })
        ) : (
          <div className="min-h-full flex">
            <a
              className="text-center place-self-center w-full mt-5 font-semibold text-xl underline hover:cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Add your first set
            </a>
          </div>
        )}
        <p className="place-self-end p-3 opacity-70 text-xs">
          Note: Sets without at least 1 question won't be visible to other
          users.
        </p>
      </div>
      <Modal
        content={<NewSetForm setShowModal={setShowModal} />}
        open={showModal}
        setOpen={setShowModal}
      />
    </div>
  );
};
