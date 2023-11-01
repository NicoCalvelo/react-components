import React, { useState, useEffect } from "react";

// Permet d'attendre quelques secondes avant de continuer
export function awaitForSeconds(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

export function Toasts({}) {
  const [toast, setT] = useState(null);
  useEffect(() => {
    setToast = setT;
  }, []);

  useEffect(() => {
    let timeout;
    if (toast !== null) {
      timeout = setTimeout(() => {
        setT(null);
      }, seconds * 1000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [toast]);

  return <div className={"fixed z-50 left-0 right-0 transition-all duration-300 " + (toast ? "bottom-5 opacity-100" : "bottom-0 opacity-0")}>{toast}</div>;
}

export var setToast;
export var seconds = 10;

export function addToastError(text, waitSeconds = 10) {
  seconds = waitSeconds;
  setToast(
    <div
      className={"rounded-xl shadow-xl p-5 w-full max-w-3xl flex justify-between font-medium items-center mx-auto bg-error-color text-error-on"}
      role="alert"
    >
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <p>{text}</p>
      </div>
      <button className="bg-none border-0 focus:outline-none focus:ring-0" onClick={() => setToast(null)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function addToastUndoAction(text, waitSeconds = 4) {
  return new Promise(async (resolve, reject) => {
    seconds = waitSeconds;
    setToast(
      <div
        className={"rounded-xl shadow-xl p-5 w-full max-w-3xl flex justify-between space-x-8 font-medium items-center mx-auto bg-warning-color text-warning-on"}
        role="alert"
      >
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p>{text}</p>
        </div>
        <button
          className="bg-none flex items-center space-x-2 border-0 cursor-pointer group focus:outline-none focus:ring-0"
          onClick={() => {
            setToast(null);
            reject();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
              clipRule="evenodd"
            />
          </svg>
          <p className="group-hover:underline text-sm">Annuler action</p>
        </button>
      </div>
    );
    await awaitForSeconds(waitSeconds);
    resolve();
  });
}

export function addToastInfo(text, waitSeconds = 6) {
  seconds = waitSeconds;
  setToast(
    <div className={"rounded-xl shadow-xl p-5 w-full max-w-3xl flex justify-between font-medium items-center mx-auto bg-info-color text-info-on"} role="alert">
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>

        <p>{text}</p>
      </div>
      <button className="bg-none border-0 focus:outline-none focus:ring-0" onClick={() => setToast(null)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function addToastSucces(text, waitSeconds = 6) {
  seconds = waitSeconds;
  setToast(
    <div className={"rounded-xl shadow-xl p-5 w-full max-w-3xl flex justify-between font-medium items-center mx-auto bg-green-600 text-white"} role="alert">
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
        <p>{text}</p>
      </div>
      <button className="bg-none border-0 focus:outline-none focus:ring-0" onClick={() => setToast(null)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function addToastWarning(text, waitSeconds = 6) {
  seconds = waitSeconds;
  setToast(
    <div
      className={"rounded-xl shadow-xl p-5 w-full max-w-3xl flex justify-between font-medium items-center mx-auto bg-warning-color text-warning-on"}
      role="alert"
    >
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>

        <p>{text}</p>
      </div>
      <button className="bg-none border-0 focus:outline-none focus:ring-0" onClick={() => setToast(null)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function addCopyToClipboardToast(text, waitSeconds = 5) {
  seconds = waitSeconds;
  setToast(
    <div
      className={"rounded-xl shadow-xl p-5 w-full max-w-3xl flex justify-between font-medium items-center mx-auto bg-primary-color text-primary-on"}
      role="alert"
    >
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
          />
        </svg>

        <p className="">{text}</p>
      </div>
      <button className="bg-none border-0 focus:outline-none focus:ring-0" onClick={() => setToast(null)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
