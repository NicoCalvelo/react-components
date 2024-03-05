import React, { useEffect, useState } from "react";

export default function Selectable({ className = "", hasIcon = false, defaultSelected = false, onChange, ...props }) {
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <ControlledSelectable
      className={className}
      hasIcon={hasIcon}
      value={selected}
      setValue={() => {
        onChange(!selected);
        setSelected(!selected);
      }}
      {...props}
    />
  );
}

export function ControlledSelectable({ className = "", hasIcon = false, value = false, setValue, ...props }) {
  return (
    <button
      onClick={setValue}
      className={
        "flex items-center space-x-1 bg-primary-color transition-all dark:bg-primary-light disabled:opacity-75 focus:outline-none px-4 py-1 sm:px-6 sm:py-2 rounded-lg sm:rounded-full " +
        (hasIcon ? "pl-2 sm:pl-4" : "") +
        " " +
        className +
        " " +
        (value
          ? " font-semibold text-primary-on dark:text-primary-dark ease-out duration-150"
          : " border border-primary-color bg-opacity-0 hover:bg-opacity-20 ease-in duration-75")
      }
    >
      {typeof props.children === "function" ? props.children(value) : props.children}
    </button>
  );
}
