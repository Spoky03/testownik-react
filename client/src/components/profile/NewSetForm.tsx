import { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addQuestionSet } from "../../reducers/userReducer";
import { MdAdd } from "react-icons/md";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const NewSetForm = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [nameOfSet, setNameOfSet] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameOfSet.trim() === "") {
      toast({
        variant: "destructive",
        title: "Name of set cannot be empty",
        description: "Please provide a name for your set",
      });
      return;
    }
    const id = await dispatch(addQuestionSet({ name: nameOfSet, description }));
    toast({
      variant: "success",
      title: `Set ${nameOfSet} created`,
      description: "You can now add questions to your set",
      action: (
        <ToastAction
          altText="Add questions"
          onClick={() => navigate(`/profile/sets/${id}`)}
        >
          Add questions
        </ToastAction>
      ),
    });
    setShowModal(false);
    setNameOfSet("");
    setDescription("");
  };
  return (
    <div className="flex flex-col place-content-center gap-5 bg-ternary p-8">
      <h1 className="place-self-center font-semibold">Create new set</h1>
      <form
        className="place-self-center flex gap-1 justify-center flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex place-self-center flex-col gap-3 ">
          <div className="flex place-self-center gap-3">
            <Input
              type="nameOfSet"
              id="nameOfSet"
              className="rounded-md shadow-sm "
              placeholder="Name of your set"
              value={nameOfSet}
              onChange={(e) => setNameOfSet(e.target.value)}
            />
            <div className="place-self-start">
            <Button
              type="submit"
              variant={"outline"}
              className=""
              size={"icon"}
            >
              {<MdAdd className="h-6 w-6" />}
            </Button></div>
          </div>
            <Textarea
              placeholder="Description"
              id="description"
              className="rounded-md shadow-sm place-self-center"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
        </div>
      </form>
    </div>
  );
};
