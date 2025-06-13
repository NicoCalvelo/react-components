import React from "react";

export default function OutlinedButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  if (!className.includes("bg-"))
    className = "text-primary-color border-primary-color bg-primary-dark " + className;
  return (
    <button
      className={`btn border transition-all bg-opacity-0 hover:bg-opacity-10 ${className} ` + (hasIcon && " pl-4 ")}
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
      className={"border-error-color text-error-color bg-error-color " + className}
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
        "border-warning-color text-warning-color bg-warning-color " + className
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
      className={"border-info-color text-info-color bg-info-color " + className}
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
        "border-success-color text-success-color bg-success-color " + className
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
