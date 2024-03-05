import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Spinner from "../Components/Spinner";

export default function NotDismissableModal({ title, loading = false, ...props }) {
  function onTryClose() {
    document.getElementById("dialog_panel").classList.add("not-dismissable");
    setTimeout(() => {
      document.getElementById("dialog_panel").classList.remove("not-dismissable");
    }, 500);
  }
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-40" open onClose={onTryClose}>
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
            <Dialog.Panel
              id="dialog_panel"
              className="relative mx-auto max-h-screen h-3/4 flex flex-col transform bg-background-color overflow-hidden shadow-xl transition-all sm:mt-10 sm:mb-4 sm:w-full sm:max-w-4xl"
            >
              <div className="bg-background-color border-b flex items-center flex-grow">
                <Dialog.Title as="h3" className="p-4 text-text-color">
                  {title}
                </Dialog.Title>
              </div>
              {loading && (
                <div data-testid="modal_spinner" className="flex h-full justify-center p-20">
                  <Spinner />
                </div>
              )}
              {!loading && props.children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
