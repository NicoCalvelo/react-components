import React, { useEffect, useState } from "react";
import { Row } from "../Layout/rows";

export default function Switch({ id, className = "", selected = false, setSelected, disabled = false, label, fromRightToLeft = false, ...props }) {
  const [value, setValue] = useState(selected);

  useEffect(() => {
    setValue(selected);
  }, [selected]);

  return (
    <Row className={className + " " + (fromRightToLeft ? "flex-row-reverse pr-6" : "pl-6")}>
      {label && <label className={"text-sm sm:text-base " + (value ? "font-semibold" : "") + (disabled ? " opacity-50" : "")}>{label}</label>}
      <div
        onClick={() => {
          if (!disabled && setSelected !== undefined) setSelected(!value);
          if (setSelected === undefined) {
            if (id === undefined) throw "Must define an id if setSelected isn't defined";
            document.getElementById(id).click();
          }
        }}
        className={
          "relative w-14 transition-all duration-300 ease-in-out border flex items-center border-1 rounded-full h-8 " +
          (value ? "border-text-light bg-secondary-color" : "border-text-color bg-background-color") +
          " " +
          (disabled ? "opacity-50" : "cursor-pointer") +
          " " +
          (fromRightToLeft ? "mr-2" : "ml-2")
        }
      >
        <div
          className={
            "transitiona-all duration-300 ease-in-out rounded-full " +
            (value ? "bg-gray-50 w-6 h-6 flex items-center justify-center ml-auto mr-1" : "bg-gray-400 w-4 h-4 mr-auto ml-1")
          }
        >
          {value && props.children}
        </div>
        <input id={id} type="checkbox" hidden defaultChecked={value} onChange={(e) => setValue(e.target.checked)} />
      </div>
    </Row>
  );
}
