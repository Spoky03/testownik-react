import { Modal } from "@/components/shared/Modal";
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
  const closeCallback = () => {
    setOpen(false);
    navigate("/");
  };
  return (
    <>
      <Modal
        open={open}
        setOpen={closeCallback}
        cancelAction={() => navigate("/")}
        cancelText="Okay!"
        content={
          <div className="flex flex-col gap-5 items-center bg-ternary p-5">
            <div className="text-success text-center font-bold">Finished</div>
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
