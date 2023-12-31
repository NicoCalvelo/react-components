import React from "react";

export default function FilledButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      {...props}
      className={"btn bg-primary-color text-primary-on hover:bg-opacity-75 transition-colors dark:bg-primary-light dark:text-primary-dark " + (hasIcon && " pl-4 ") + " " + className}
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
      className={"btn bg-error-color text-error-on hover:bg-opacity-75 transition-colors dark:bg-error-light dark:text-error-dark " + (hasIcon && " pl-4 ") + " " + className}
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
      className={"btn bg-warning-color text-warning-on hover:bg-opacity-75 transition-colors dark:bg-warning-light dark:text-warning-dark " + (hasIcon && " pl-4 ") + " " + className}
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
      className={"btn bg-info-color text-info-on hover:bg-opacity-75 transition-colors dark:bg-info-light dark:text-info-dark " + (hasIcon && " pl-4 ") + " " + className}
    >
      {props.children}
    </button>
  );
}

export function SuccesFilledButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      {...props}
      className={"btn bg-succes-color text-succes-on hover:bg-opacity-75 transition-colors dark:bg-succes-light dark:text-succes-dark " + (hasIcon && " pl-4 ") + " " + className}
    >
      {props.children}
    </button>
  );
}
