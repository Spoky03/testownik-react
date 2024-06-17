import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Button } from "./Button";
interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  content: React.ReactNode;
  mainButton?: React.ReactNode;
  icon?: React.ReactNode;
  cancelText?: string;
  cancelAction?: () => void;
}
export const Modal = (props: ModalProps) => {
  const darkMode = localStorage.getItem("darkMode") === "true";
  const defaultCancelAction = () => props.setOpen(false);
  return (
    <Transition show={props.open}>
      <Dialog className={`relative z-10 ${darkMode ? "dark" : ""}`} onClose={props.setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-faint bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg text-left transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="">
                      {props.content}
                </div>
                {props.cancelText && (<div className="dark:bg-faint bg-w-ternary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {props.mainButton}
                  <div className="w-16 h-10">
                    <Button onClick={props.cancelAction || defaultCancelAction } label={props.cancelText || "Cancel"} type="button" />
                  </div>
                </div>)}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
