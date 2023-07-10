import React, { useEffect, useState } from "react";

export default function Selectable({ className = "", hasIcon = false, defaultSelected = false, onChange, small = false, ...props }) {
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <button
      onClick={() => {
        onChange(!selected);
        setSelected(!selected);
      }}
      className={
        "flex items-center space-x-1 bg-primary-color transition-all dark:bg-primary-light disabled:opacity-75 focus:outline-none " +
        (small ? "px-4 py-1 rounded-lg " + (hasIcon ? "pl-2" : "") : "px-6 py-2 rounded-full " + hasIcon ? "pl-4" : "") +
        " " +
        className +
        " " +
        (selected
          ? " font-semibold text-primary-on dark:text-primary-dark ease-out duration-150"
          : " border bg-opacity-0 hover:bg-opacity-20 ease-in duration-75")
      }
    >
      {typeof props.children === "function" ? props.children(selected) : props.children}
    </button>
  );
}
