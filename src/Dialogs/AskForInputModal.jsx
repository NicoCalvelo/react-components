import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import OutlinedButton from "../Buttons/OutlinedButton";
import { RowEnd } from "../Layout/Rows";
import FormInput from "../Forms/FormInput";

export default function AskForInputModal({}) {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ title: "", message: "", inputOptions: {} });
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setModal = (props) => {
      setInfo(props);
      if (props?.inputOptions?.defaultValue) setInfo({ ...props, value: props.inputOptions.defaultValue });
      setOpen(true);
    };
    return () => {};
  }, []);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(!open);
          info.onCancel();
        }}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className="relative mx-auto transform overflow-hidden rounded-lg bg-background-color text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-opacity-20 sm:mx-0 sm:h-10 sm:w-10">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-opacity-50 sm:mx-0 sm:h-10 sm:w-10 bg-secondary-light">
                      <svg className="h-6 w-6 text-secondary-color" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h1 className="text-base font-bold leading-6" id="modal-title">
                      {info.title}
                    </h1>
                    <div className="mt-2">
                      <p className="text-sm text-text-light">{info.message}</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 mx-auto w-3/4">
                  <FormInput
                    {...info.inputOptions}
                    setValue={(e) => {
                      setInfo({ ...info, value: e.target.value });
                    }}
                  />
                </div>
              </div>
              <RowEnd className="bg-background-dark px-4 py-3 sm:px-6 space-x-2 mt-5">
                <OutlinedButton
                  className="!border-gray-400"
                  onClick={() => {
                    setOpen(!open);
                    info.onCancel(false);
                  }}
                >
                  {info.textCancelButton}
                </OutlinedButton>
                <button
                  onClick={() => {
                    setOpen(!open);
                    info.onConfirm(info.value);
                  }}
                  className={"btn bg-secondary-color text-secondary-on"}
                >
                  {info.textConfirmButton}
                </button>
              </RowEnd>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

let setModal;

export function showAskForInputModal(title, message, inputOptions, textConfirmButton = "Confirmer", textCancelButton = "Annuler") {
  return new Promise((resolve, reject) => {
    setModal({
      title: title,
      message: message,
      textCancelButton: textCancelButton,
      textConfirmButton: textConfirmButton,
      inputOptions: inputOptions,
      onConfirm: resolve,
      onCancel: reject,
    });
  });
}
