import React from "react";

export default function ElevatedButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  if(!className.includes("bg-")) className = "bg-background-color " + className
  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      {...props}
      className={
        `btn shadow hover:shadow-lg text-primary-color ${className} ` +
        (hasIcon && " pl-4 ")
      }
    >
      {props.children}
    </button>
  );
}
