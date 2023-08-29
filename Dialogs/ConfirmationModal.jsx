import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import OutlinedButton from "../Buttons/OutlinedButton";
import { RowEnd } from "../Layout/rows";

export default function ConfirmationModal({}) {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ title: "", message: "", bgColor: "", icon: "" });
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setModal = (props) => {
      setInfo(props);
      setOpen(true);
    };
    return () => {};
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(!open);
          info.onCancel();
        }}
      >
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
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-opacity-20 sm:mx-0 sm:h-10 sm:w-10">
                    {info.icon}
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6" id="modal-title">
                      {info.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-text-light">{info.message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <RowEnd className="bg-background-dark px-4 py-3 sm:px-6 space-x-2 mt-5">
                <OutlinedButton
                  onClick={() => {
                    setOpen(!open);
                    info.onCancel();
                  }}
                >
                  {info.textCancelButton}
                </OutlinedButton>
                <button
                  onClick={() => {
                    setOpen(!open);
                    info.onConfirm();
                  }}
                  className={"btn " + info.bgColor + " " + info.textColor}
                >
                  {info.textConfirmButton}
                </button>
              </RowEnd>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

let setModal;

export function showDangerConfirmationModal(title, message, textCancelButton = "Annuler", textConfirmButton = "Confirmer") {
  return new Promise((resolve, reject) => {
    setModal({
      title: title,
      message: message,
      textCancelButton: textCancelButton,
      textConfirmButton: textConfirmButton,
      icon: (
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-opacity-50 sm:mx-0 sm:h-10 sm:w-10 bg-error-light">
          <svg className="h-6 w-6 text-error-color" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
      ),
      bgColor: "bg-error-color",
      textColor: "text-error-on",
      onConfirm: resolve,
      onCancel: reject,
    });
  });
}

export function showWarningConfirmationModal(title, message, textCancelButton = "Annuler", textConfirmButton = "Confirmer") {
  return new Promise((resolve, reject) => {
    setModal({
      title: title,
      message: message,
      textCancelButton: textCancelButton,
      textConfirmButton: textConfirmButton,
      icon: (
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-opacity-50 sm:mx-0 sm:h-10 sm:w-10 bg-warning-light">
          <svg className="h-6 w-6 text-warning-color" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
      ),
      bgColor: "bg-warning-color",
      textColor: "text-warning-on",
      onConfirm: resolve,
      onCancel: reject,
    });
  });
}

export function showInfoConfirmationModal(title, message, textCancelButton = "Annuler", textConfirmButton = "Confirmer") {
  return new Promise((resolve, reject) => {
    setModal({
      title: title,
      message: message,
      textCancelButton: textCancelButton,
      textConfirmButton: textConfirmButton,
      icon: (
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-opacity-50 sm:mx-0 sm:h-10 sm:w-10 bg-info-light">
          <svg className="h-6 w-6 text-info-color" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </div>
      ),
      bgColor: "bg-info-color",
      textColor: "text-info-on",
      onConfirm: resolve,
      onCancel: reject,
    });
  });
}
