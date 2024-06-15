import { Modal } from "../Modal";
import { IoBeerSharp as BeerIcon } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export const Finished = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const navigate = useNavigate();
  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        cancelAction={() => navigate("/")}
        cancelText="Okay!"
        title={<div className="text-success text-center">Finished</div>}
        content={
          <div className="flex flex-col gap-5 items-center">
            <BeerIcon size={64} />
            <p className="text-center">
              Congratulations! You have finished the quiz.
            </p>
            </div>
        }
      />
    </>
  );
};
