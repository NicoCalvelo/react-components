import React from "react";

export default function OutlinedButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  if (!className.includes("bg-"))
    className = "text-primary-color border-primary-color bg-primary-dark dark:text-primary-light dark:border-primary-light dark:bg-primary-light " + className;
  return (
    <button
      className={`btn border bg-opacity-0 dark:bg-opacity-0 hover:dark:bg-opacity-5 hover:bg-opacity-5 ${className} ` + (hasIcon && " pl-4 ")}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {props.children}
    </button>
  );
}

export function ErrorOutlinedButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  return (
    <OutlinedButton
      className={"border-error-color text-error-color bg-error-color dark:border-error-light dark:text-error-light dark:bg-error-light " + className}
      hasIcon={hasIcon}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    />
  );
}

export function WarningOutlinedButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, reference, ...props }) {
  return (
    <OutlinedButton
      className={
        "border-warning-color text-warning-color bg-warning-color dark:border-warning-light dark:text-warning-light dark:bg-warning-light " + className
      }
      hasIcon={hasIcon}
      type={type}
      onClick={onClick}
      disabled={disabled}
      reference={reference}
      {...props}
    />
  );
}

export function InfoOutlinedButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, reference, ...props }) {
  return (
    <OutlinedButton
      className={"border-info-color text-info-color bg-info-color dark:border-info-light dark:text-info-light dark:bg-info-light " + className}
      hasIcon={hasIcon}
      type={type}
      onClick={onClick}
      disabled={disabled}
      reference={reference}
      {...props}
    />
  );
}

export function SuccessOutlinedButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, reference, ...props }) {
  return (
    <OutlinedButton
      className={
        "border-success-color text-success-color bg-success-color dark:border-success-light dark:text-success-light dark:bg-success-light " + className
      }
      hasIcon={hasIcon}
      type={type}
      onClick={onClick}
      disabled={disabled}
      reference={reference}
      {...props}
    />
  );
}
