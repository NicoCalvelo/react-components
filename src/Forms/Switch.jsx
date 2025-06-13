import React, { useState } from "react";

export default function Switch({ id, className = "", defaultActive = false, onChange, disabled = false, label, ...props }) {
  const [active, setActive] = useState(defaultActive);

  return (
    <ControlledSwitch
      id={id}
      className={className}
      active={active}
      disabled={disabled}
      label={label}
      setActive={() => {
        setActive(!active);
        if (onChange) onChange(!active);
      }}
      {...props}
    />
  );
}

export function ControlledSwitch({ id, className = "", active, setActive, disabled = false, label, ...props }) {
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
    <div className={"flex items-center space-x-1 " + className}>
      <div
        title={disabled ? "Impossible de modifier" : "Cliquer pour activer/désactiver"}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) {
            setActive(!active);
            if (id) document.getElementById(id).checked = !active;
          }
        }}
        className={
          "relative w-12 transition-all duration-300 ease-out border flex items-center border-1 rounded-full h-6 px-1 " +
          (active
            ? "border-text-light bg-primary-color text-primary-on justify-end "
            : "border-text-color bg-background-color text-text-color justify-start ") +
          " " +
          (disabled ? "opacity-50" : "cursor-pointer")
        }
      >
        <div
          className={
            "transition-all flex-shrink-0 duration-200 ease-out rounded-full h-fit w-fit " +
            (props.children == undefined && (active ? "bg-gray-50 !w-4 !h-4 " : "bg-gray-400 !w-3 !h-3"))
          }
        >
          {typeof props.children === "function" ? props.children(active) : props.children}
        </div>
        <input id={id} type="checkbox" hidden defaultChecked={active} disabled={disabled} />
      </div>
      {label && (
        <label onClick={(e) => e.stopPropagation()} className="text-sm text-text-light ">
          {label}
        </label>
      )}
    </div>
  );
}
