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
  title: React.ReactNode;
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
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-w-secondary dark:bg-secondary text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="dark:bg-secondary bg-w-secondary px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex place-content-center ">
                    {props.icon && (
                      <div className="mx-auto h-12 w-12 flex-shrink-0 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <div
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        >
                          {props.icon}
                        </div>
                      </div>
                    )}
                    <div className="mt-3 text-center place-self-center sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {props.title}
                      </DialogTitle>
                      <div className="mt-2">{props.content}</div>
                    </div>
                  </div>
                </div>
                <div className="dark:bg-faint bg-w-ternary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {props.mainButton}
                  <div className="w-16 h-10">
                    <Button onClick={props.cancelAction || defaultCancelAction } label={props.cancelText || "Cancel"} type="button" />
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
