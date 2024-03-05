import React from "react";

export default function ElevatedButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  if(!className.includes("bg-")) className = "bg-background-color dark:bg-dark-background-color " + className
  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      {...props}
      className={
        `btn shadow dark:shadow-dark-text-color/20 hover:shadow-lg hover:dark:shadow-dark-text-color/20 text-primary-color ${className} ` +
        (hasIcon && " pl-4 ")
      }
    >
      {props.children}
    </button>
  );
}
