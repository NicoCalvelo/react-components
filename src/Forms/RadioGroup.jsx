import React, { useState } from "react";
import { Label, Radio, RadioGroup } from "@headlessui/react";

export default function RadioGroupPanel({ className = "", title, value, setValue, verticalDisplay = false, ...props }) {
  // verify that each child is a RadioGroupOption
  const children = React.Children.toArray(props.children);
  if (!children.every((child) => child.type.name === "RadioGroupOption")) {
    throw new Error("<RadioGroupPanel /> Children must be of type RadioGroupOption");
  }

  return (
    <RadioGroup className={"space-y-2 " + className} value={value} onChange={setValue}>
      <Label className={"font-semibold border-b pb-1"}>{title}</Label>
      <div className={verticalDisplay ? "flex flex-col space-y-2 " : "flex space-x-2"}>{props.children}</div>
    </RadioGroup>
  );
}

export function RadioGroupOption({ className = "", text, value, ...props }) {
  return (
    <Radio
      className={"px-4 w-full space-x-5 hover:bg-gray-50 hover:bg-opacity-10 cursor-pointer items-center flex py-2 rounded-lg border " + className}
      value={value}
      {...props}
    >
      {({ checked }) => (
        <>
          <p className={"flex-grow truncate " + (checked ? "font-bold" : "")}>{text}</p>
          {checked && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-success-color">
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </>
      )}
    </Radio>
  );
}
