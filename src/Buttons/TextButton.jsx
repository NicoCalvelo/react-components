import React from "react";

export default function TextButton({ className = "", hasIcon = false, type = "button", onClick, disable = false, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      {...props}
      className={
        "btn font-bold bg-primary bg-opacity-0 hover:bg-opacity-10 hover:underline text-primary-dark dark:text-primary-light " +
        (hasIcon && " pl-4 ") + " " +
        className
      }
    >
      {props.children}
    </button>
  );
}
