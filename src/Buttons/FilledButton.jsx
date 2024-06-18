import React from "react";

export default function FilledButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  if (!className.includes("bg-")) className = "bg-primary-color text-primary-on dark:bg-primary-dark dark:text-primary-light " + className;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
      className={`btn transition-all hover:shadow-lg hover:bg-opacity-90 hover:dark:shadow-dark-text-color/20 ${className} ` + (hasIcon ? " !pl-4 " : " ")}
    >
      {props.children}
    </button>
  );
}

export function ErrorFilledButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  return (
    <FilledButton
      className={"bg-error-color text-error-on dark:bg-error-dark dark:text-error-light " + className}
      hasIcon={hasIcon}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    />
  );
}

export function WarningFilledButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  return (
    <FilledButton
      className={"bg-warning-color text-warning-on dark:bg-warning-dark dark:text-warning-light " + className}
      hasIcon={hasIcon}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    />
  );
}

export function InfoFilledButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  return (
    <FilledButton
      className={"bg-info-color text-info-on dark:bg-info-dark dark:text-info-light " + className}
      hasIcon={hasIcon}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    />
  );
}

export function SuccessFilledButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  return (
    <FilledButton
      className={"bg-success-color text-success-on dark:bg-success-dark dark:text-success-light " + className}
      hasIcon={hasIcon}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    />
  );
}
