import { RowEnd } from "../Layout/rows";
import { useBlocker } from "react-router-dom";
import React, { Fragment, useRef } from "react";
import OutlinedButton from "../Buttons/OutlinedButton";
import { Dialog, Transition } from "@headlessui/react";

export default function SaveBeforeLeavingModal({ when, pathPattern = undefined }) {
  const cancelButtonRef = useRef(null);

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      (when === true && pathPattern === undefined) ||
      (when === true && currentLocation.pathname !== nextLocation.pathname && nextLocation.pathname.match(pathPattern) === null)
  );

  return (
    <Transition.Root show={blocker.state === "blocked"} as={Fragment} key={"blocker_" + (blocker.state === "blocked")}>
      <Dialog as="div" className="absolute z-40" initialFocus={cancelButtonRef} onClose={blocker.reset}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
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
            <Dialog.Panel className="relative mx-auto transform overflow-hidden rounded-lg bg-background-color text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-warning-color bg-opacity-20 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-warning-dark"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6" id="modal-title">
                      Quitter sans enregistrer ?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-text-light">Les modifications que vous avez apportées ne seront pas enregistrées.</p>
                    </div>
                  </div>
                </div>
              </div>
              <RowEnd className="bg-background-dark px-4 py-3 sm:px-6 space-x-2 mt-5">
                <OutlinedButton onClick={blocker.reset}>Annuler</OutlinedButton>
                <button onClick={blocker.proceed} className="btn bg-warning-color text-warning-on">
                  Quiter
                </button>
              </RowEnd>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
