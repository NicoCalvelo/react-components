import React from "react";

export default function GradientButton({
  className = "",
  hasIcon = false,
  type = "button",
  onClick,
  disable = false,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      type={type}
      className={
        "btn bg-gradient-to-tl from-violet-600 via-indigo-500 to-indigo-800 text-secondary-on disabled:bg-opacity-60 " +
        className
      }
    >
      {props.children}
    </button>
  );
}
