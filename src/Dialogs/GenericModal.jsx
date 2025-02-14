import Spinner from "../Components/Spinner";
import IconButton from "../Buttons/IconButton";
import React, { Fragment, useRef } from "react";
import FilledButton from "../Buttons/FilledButton";
import OutlinedButton from "../Buttons/OutlinedButton";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";

export const ModalSize = {
  SMALL: "sm",
  MEDIUM: "md",
  LARGE: "lg",
};

export default function GenericModal({
  title,
  loading = false,
  messageLoading = "Chargement en cours ...",
  showFooter = true,
  showHeader = true,
  open,
  setOpen,
  showActionButton = true,
  textActionButton = "Enregistrer",
  onActionButton,
  actionButtonType = "button",
  errorMessgae = null,
  modalSize = ModalSize.MEDIUM,
  className = "",
  ...props
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef} onClose={setOpen}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-40 overflow-y-auto sm:px-2">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              className={
                "relative mx-auto max-h-screen flex flex-col transform bg-background-color shadow-xl transition-all sm:mt-6 sm:w-full " +
                (modalSize === ModalSize.SMALL
                  ? "h-3/4 sm:max-w-2xl rounded-xl"
                  : modalSize === ModalSize.MEDIUM
                  ? "h-4/5 sm:max-w-4xl rounded-2xl"
                  : "h-5/6 sm:max-w-7xl rounded-3xl")
              }
            >
              {showHeader && (
                <div
                  className={
                    "bg-background-color border-b flex items-center flex-grow " +
                    (modalSize === ModalSize.SMALL ? " rounded-t-xl" : modalSize === ModalSize.MEDIUM ? " rounded-t-2xl" : " rounded-t-3xl")
                  }
                >
                  <DialogTitle as="h3" className={"text-text-color font-bold flex-grow " + (modalSize === ModalSize.SMALL ? "p-3 text-base" : "p-4 text-lg")}>
                    {title}
                  </DialogTitle>
                  <IconButton className="ml-auto mr-4" onClick={() => setOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </IconButton>
                </div>
              )}
              <div className={"w-full h-full overflow-auto p-5 " + className}>
                {loading ? (
                  <div data-testid="modal_spinner" className="flex flex-col h-full w-full items-center justify-center p-10">
                    <p className="text-center text-text-light">{messageLoading}</p>
                    <Spinner />
                  </div>
                ) : (
                  props.children
                )}
              </div>
              {showFooter && (
                <div
                  className={
                    "bg-background-color border-t flex justify-end " +
                    (modalSize === ModalSize.SMALL
                      ? "px-3 py-2.5 sm:px-4 space-x-1.5 !text-sm rounded-b-xl"
                      : modalSize === ModalSize.MEDIUM
                      ? "px-4 py-3 sm:px-6 space-x-2 rounded-b-2xl"
                      : "px-5 py-3 sm:px-6 space-x-2 rounded-b-3xl")
                  }
                >
                  {errorMessgae && <p className="text-red-500 text-xs sm:text-sm mr-auto my-auto">{errorMessgae}</p>}
                  <OutlinedButton className="hidden sm:block" onClick={() => setOpen(false)} reference={cancelButtonRef}>
                    Fermer
                  </OutlinedButton>
                  {showActionButton && (
                    <FilledButton disabled={loading} type={actionButtonType} onClick={onActionButton}>
                      {textActionButton}
                    </FilledButton>
                  )}
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
