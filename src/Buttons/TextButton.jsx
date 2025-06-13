import React from "react";

export default function TextButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  if (!className.includes("text-")) className = "text-primary-color hover:bg-primary-dark " + className;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
      className={`btn disabled:text-opacity-50 hover:bg-opacity-5 transition-all ${className}` + (hasIcon ? " !pl-4 " : " ")}
    >
      {props.children}
    </button>
  );
}

export function ErrorTextButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  return (
    <TextButton
      className={`text-error-color hover:bg-error-dark ${className}`}
      hasIcon={hasIcon}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    />
  );
}

export function WarningTextButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  return (
    <TextButton
      className={`text-warning-color hover:bg-warning-dark ${className}`}
      hasIcon={hasIcon}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    />
  );
}

export function SuccessTextButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  return (
    <TextButton
      className={`text-success-color hover:bg-success-dark ${className}`}
      hasIcon={hasIcon}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    />
  );
}

export function InfoTextButton({ className = "", hasIcon = false, type = "button", onClick, disabled = false, ...props }) {
  return (
    <TextButton className={`text-info-color hover:bg-info-dark ${className}`} hasIcon={hasIcon} type={type} onClick={onClick} disabled={disabled} {...props} />
  );
}
