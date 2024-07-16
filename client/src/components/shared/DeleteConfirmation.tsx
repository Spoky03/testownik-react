import {
  MdDelete as DeleteIcon,
  MdCheck as CheckIcon,
  MdClose as CancelIcon,
} from "react-icons/md";
import { useState } from "react";
export const DeleteConfirmation = ({
    handleDelete,
  }: {
    handleDelete: (event: React.MouseEvent) => void;
  }) => {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [effect, setEffect] = useState<boolean>(false);
    const handleDeleteCallback = (event: React.MouseEvent) => {
      event.stopPropagation();
      handleDelete(event);
      setConfirmDelete(false);
    }

    return (
      <div className="place-self-center flex">
        {confirmDelete ? (
          <>
            <button onClick={handleDeleteCallback} className="pr-1">
              <CheckIcon size={24} className="hover:text-success transition-colors" />
            </button>
            <button onClick={() => setConfirmDelete(false)}>
              <CancelIcon size={24} className="hover:text-error transition-colors" />
            </button>
          </>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="">
            <DeleteIcon size={24} className={`${
            effect && "animate-wiggle"
          } hover:text-success transition-colors duration-300`}
          onClick={() => setEffect(true)}
          onAnimationEnd={() => setEffect(false)} />
          </button>
        )}
      </div>
    );
  };

  