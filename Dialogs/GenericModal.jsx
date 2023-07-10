import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Spinner from "../Components/Spinner";
import OutlinedButton from "../Buttons/OutlinedButton";
import FilledButton from "../Buttons/FilledButton";

export default function GenericModal({
  title,
  loading = false,
  showFooter = true,
  showHeader = true,
  open,
  setOpen,
  showActionButton = true,
  textActionButton = "Enregistrer",
  onActtionButton,
  errorMessgae = null,
  ...props
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative mx-auto max-h-screen h-5/6 flex flex-col transform bg-background-dark overflow-hidden rounded-xl shadow-xl transition-all sm:mt-10 sm:mb-4 sm:w-full sm:max-w-4xl">
              {showHeader && (
                <div className="bg-background-color border-b flex-grow">
                  <Dialog.Title as="h3" className=" p-4">
                    {title}
                  </Dialog.Title>
                </div>
              )}
              {loading && (
                <div data-testid="modal_spinner" className="flex h-full justify-center p-20">
                  <Spinner />
                </div>
              )}
              {!loading && props.children}
              {showFooter && (
                <div className="bg-background-color border-t px-4 py-3 sm:flex sm:justify-end sm:px-6 space-y-2 sm:space-y-0 sm:space-x-2">
                  {errorMessgae && <p className="text-red-500 text-sm mr-auto my-auto">{errorMessgae}</p>}
                  <OutlinedButton onClick={() => setOpen(false)} reference={cancelButtonRef}>
                    Fermer
                  </OutlinedButton>
                  {showActionButton && (
                    <FilledButton disable={loading} onClick={onActtionButton}>
                      {textActionButton}
                    </FilledButton>
                  )}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
