import React from "react";
import { Row } from "../Layout/rows";

export default function Switch({ selected, setSelected, disabled = false, label, ...props }) {
  return (
    <Row className="space-x-2">
      <div
        onClick={() => {
          if (!disabled) setSelected(!selected);
        }}
        className={
          "relative w-14 transition-all duration-300 ease-in-out border flex items-center border-1 rounded-full h-8 " +
          (selected ? "border-text-light bg-secondary-color" : "border-text-color bg-gray-700") +
          " " +
          (disabled ? "opacity-75" : "cursor-pointer")
        }
      >
        <div
          className={
            "transitiona-all duration-300 ease-in-out rounded-full " +
            (selected ? "bg-gray-50 w-6 h-6 flex items-center justify-center ml-auto mr-1" : "bg-gray-400 w-4 h-4 mr-auto ml-1")
          }
        >
          {selected && props.children}
        </div>
      </div>
      {label && <label className={"text-sm sm:text-base " + (selected ? "font-semibold" : "")}>{label}</label>}
    </Row>
  );
}
