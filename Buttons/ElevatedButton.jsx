import React from "react";

export default function ElevatedButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      {...props}
      className={
        "btn shadow transition-all duration-75 hover:shadow-lg bg-background-color dark:bg-dark-background-light dark:text-primary-light text-primary-color " +
        (hasIcon && " pl-4 ") +
        " " +
        className
      }
    >
      {props.children}
    </button>
  );
}
