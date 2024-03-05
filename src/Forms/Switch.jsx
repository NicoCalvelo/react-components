import React, { useState } from "react";

export default function Switch({ id, className = "", defaultActive = false, onChange, disabled = false, ...props }) {
  const [active, setActive] = useState(defaultActive);

  return (
    <ControlledSwitch
      id={id}
      className={className}
      active={active}
      disabled={disabled}
      setActive={() => {
        setActive(!active);
        if (onChange) onChange(!active);
      }}
      {...props}
    />
  );
}

export function ControlledSwitch({ id, className = "", active, setActive, disabled = false, ...props }) {
  if (active == undefined || setActive === undefined) {
    console.error("You must provide a active and setActive function to the ControlledSwitch component");
    return null;
  }
  if (typeof active !== "boolean") {
    console.error("The active prop must be a boolean");
    return null;
  }
  if (typeof setActive !== "function") {
    console.error("The setActive prop must be a function");
    return null;
  }

  return (
    <div
      onClick={() => {
        setActive(!active);
        if (id) document.getElementById(id).checked = !active;
      }}
      className={
        "relative w-14 transition-all duration-300 ease-out border flex items-center border-1 rounded-full h-8 px-1 " +
        (active
          ? "border-text-light bg-secondary-color text-secondary-on justify-end "
          : "border-text-color bg-background-color text-text-color justify-start ") +
        " " +
        (disabled ? "opacity-50" : "cursor-pointer")
      }
    >
      <div
        className={
          "transition-all duration-200 ease-out rounded-full h-fit w-fit " +
          (props.children == undefined && (active ? "bg-gray-50 !w-6 !h-6 " : "bg-gray-400 !w-4 !h-4"))
        }
      >
        {typeof props.children === "function" ? props.children(active) : props.children}
      </div>
      <input id={id} type="checkbox" hidden defaultChecked={active} />
    </div>
  );
}
