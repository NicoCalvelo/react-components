import React, { useState } from "react";

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
        "flex text-xs items-center border border-primary-color space-x-1 bg-primary-color transition-all disabled:opacity-75 focus:outline-none px-3 py-1 rounded " +
        (hasIcon ? "pl-2 sm:pl-4" : "") +
        " " +
        className +
        " " +
        (value
          ? " font-semibold text-primary-on ease-out duration-150"
          : " bg-opacity-0 hover:bg-opacity-20 ease-in duration-75")
      }
    >
      {typeof props.children === "function" ? props.children(value) : props.children}
    </button>
  );
}
