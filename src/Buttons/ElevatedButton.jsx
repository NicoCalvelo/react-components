import React from "react";

export default function ElevatedButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  if (!className.includes("bg-")) className = "bg-background-color " + className;
  return (
    <button
      className={`btn shadow hover:shadow-lg text-primary-color ${className} ` + (hasIcon && " pl-4 ")}
      onClick={onClick}
      disabled={disable}
      type={type}
      {...props}
    >
      {props.children}
    </button>
  );
}

export function ErrorElevatedButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  return (
    <ElevatedButton className={`bg-error-color text-error-on ${className}`} hasIcon={hasIcon} type={type} onClick={onClick} disable={disable} {...props} />
  );
}

export function WarningElevatedButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  return (
    <ElevatedButton className={`bg-warning-color text-warning-on ${className}`} hasIcon={hasIcon} type={type} onClick={onClick} disable={disable} {...props} />
  );
}

export function SuccessElevatedButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  return (
    <ElevatedButton className={`bg-success-color text-success-on ${className}`} hasIcon={hasIcon} type={type} onClick={onClick} disable={disable} {...props} />
  );
}

export function InfoElevatedButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  return <ElevatedButton className={`bg-info-color text-info-on ${className}`} hasIcon={hasIcon} type={type} onClick={onClick} disable={disable} {...props} />;
}
