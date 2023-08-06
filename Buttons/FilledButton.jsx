import React from "react";

export default function FilledButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      {...props}
      className={"btn bg-primary-color text-primary-on dark:bg-primary-light dark:text-primary-dark " + (hasIcon && " pl-4 ") + " " + className}
    >
      {props.children}
    </button>
  );
}

export function ErrorFilledButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      {...props}
      className={"btn bg-error-color text-error-on dark:bg-error-light dark:text-error-dark " + (hasIcon && " pl-4 ") + " " + className}
    >
      {props.children}
    </button>
  );
}

export function WarningFilledButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      {...props}
      className={"btn bg-warning-color text-warning-on dark:bg-warning-light dark:text-warning-dark " + (hasIcon && " pl-4 ") + " " + className}
    >
      {props.children}
    </button>
  );
}

export function InfoFilledButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      {...props}
      className={"btn bg-info-color text-info-on dark:bg-info-light dark:text-info-dark " + (hasIcon && " pl-4 ") + " " + className}
    >
      {props.children}
    </button>
  );
}
