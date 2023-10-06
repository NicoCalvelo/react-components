import React from "react";
import { Column } from "../Layout/columns";
export default function FormTextarea({
  className = "",
  minLength = undefined,
  maxLength = undefined,
  value,
  setValue,
  required = false,
  title = null,
  placeholder = "",
  resizable = true,
  errorMessage,
  id,
  rows = undefined,
}) {
  return (
    <Column className="relative flex-grow h-full">
      {title && (
        <label className="text-sm pr-5 truncate mb-1" htmlFor={id}>
          {title} {required ? <></> : <span className="font-normal text-xs">(facultatif)</span>}
        </label>
      )}
      {errorMessage != undefined && (
        <span className="absolute opacity-0 peer-invalid:opacity-100 text-error-color text-xs left-4 -bottom-5" htmlFor={id}>
          {errorMessage}
        </span>
      )}
      <textarea
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        className={
          "peer bg-background-dark border-text-color focus:border-secondary-color invalid:border-error-color placeholder:text-test-light w-full border-b focus:border p-4 focus:outline-0 focus:ring-1 " +
          className
        }
        style={{ resize: resizable ? "both" : "none" }}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
      />
      <i className={"fi fi-ss-exclamation text-sm opacity-0 peer-invalid:opacity-100 absolute top-8 right-4 text-error-color"} />
    </Column>
  );
}
