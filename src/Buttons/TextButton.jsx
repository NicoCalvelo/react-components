import React from "react";

export default function TextButton({
  className = "",
  hasIcon = false,
  type = "button",
  onClick,
  disabled = false,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
      className={
        `btn text-primary-color disabled:text-opacity-50 dark:text-primary-light hover:bg-gray-700 hover:dark:bg-gray-300 hover:bg-opacity-5 transition-all ${className} ` +
        (hasIcon ? " !pl-4 " : " ")
      }
    >
      {props.children}
    </button>
  );
}
