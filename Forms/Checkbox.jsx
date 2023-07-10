import React, { useEffect, useState } from "react";

export default function Checkbox({ className = "", defaultSelected = false, onChange }) {
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <ControlledCheckbox
      className={className}
      selected={selected}
      setSelected={(value) => {
        setSelected(value);
        onChange(value);
      }}
    />
  );
}

export function ControlledCheckbox({ className = "", selected, setSelected }) {
  if (selected === undefined || setSelected === undefined) {
    let errorMessage = "For <ControlledCheckbox /> must provide a selected and setSelected value. Otherwise use <Checkbox />";
    console.error(errorMessage);
    return <p className="text-error-color text-sm">{errorMessage}</p>;
  }

  return (
    <div
      className={"w-fit h-fit cursor-pointer rounded-full transition-all duration-100 p-1.5 " + (selected ? "" : "hover:bg-primary-color hover:bg-opacity-20")}
      onClick={() => setSelected(!selected)}
    >
      <div
        className={
          className +
          " h-6 w-6 rounded p-0.5 border-2 transition-all duration-100 ease-in-out " +
          (selected ? "bg-primary-color text-primary-on border-primary-dark" : "border-text-light")
        }
      >
        {selected && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
      </div>
    </div>
  );
}
