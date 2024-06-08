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
    return (
      <div className="place-self-center flex">
        {confirmDelete ? (
          <>
            <button onClick={handleDelete} className="pr-1">
              <CheckIcon size={24} />
            </button>
            <button onClick={() => setConfirmDelete(false)}>
              <CancelIcon size={24} />
            </button>
          </>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="">
            <DeleteIcon size={24} />
          </button>
        )}
      </div>
    );
  };