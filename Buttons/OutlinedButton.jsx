import React from "react";

export default function OutlinedButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, reference, ...props }) {
  return (
    <button
      onClick={onClick}
      ref={reference}
      disabled={disable}
      type={type}
      {...props}
      className={
        "btn border border-primary-color bg-primary-dark dark:bg-primary-light bg-opacity-0 hover:bg-opacity-10 " + (hasIcon && " pl-4 ") + " " + className
      }
    >
      {props.children}
    </button>
  );
}

export function ErrorOutlinedButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, reference, ...props }) {
  return (
    <button
      onClick={onClick}
      ref={reference}
      disabled={disable}
      type={type}
      {...props}
      className={
        "btn border border-error-color bg-error-light dark:bg-error-dark bg-opacity-0 hover:bg-opacity-10 " +
        (hasIcon && " pl-4 ") +
        " " +
        className
      }
    >
      {props.children}
    </button>
  );
}

export function WarningOutlinedButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, reference, ...props }) {
  return (
    <button
      onClick={onClick}
      ref={reference}
      disabled={disable}
      type={type}
      {...props}
      className={
        "btn border border-warning-color bg-warning-color bg-opacity-0 hover:bg-opacity-10 " + (hasIcon && " pl-4 ") + " " + className
      }
    >
      {props.children}
    </button>
  );
}

export function InfoOutlinedButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, reference, ...props }) {
  return (
    <button
      onClick={onClick}
      ref={reference}
      disabled={disable}
      type={type}
      {...props}
      className={"btn border border-info-color bg-info-color bg-opacity-0 hover:bg-opacity-10 " + (hasIcon && " pl-4 ") + " " + className}
    >
      {props.children}
    </button>
  );
}
