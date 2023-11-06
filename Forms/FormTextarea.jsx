import React, { useState } from "react";
import { Column } from "../Layout/columns";
export default function FormTextarea({
  className = "",
  minLength = undefined,
  maxLength = undefined,
  value,
  setValue,
  defaultValue,
  required = false,
  title = null,
  placeholder = "",
  resizable = true,
  errorMessage,
  disabled = false,
  messageDisabled,
  id,
  rows = undefined,
}) {
  const [isFocus, setFocus] = useState(false);

  return (
    <Column className="relative flex-grow h-full space-y-0.5">
      {title && (
        <label className={"transition-all duration-75 text-sm pr-5 truncate " + (isFocus ? "text-secondary-color font-medium" : "")} htmlFor={id}>
          {title} {required || disabled ? <></> : <span className="font-normal text-xs">(facultatif)</span>}
        </label>
      )}
      {(errorMessage != undefined || messageDisabled != undefined) && (
        <span className={"opacity-0 truncate text-xs ml-4 order-2 " + (errorMessage ? "text-error-color" : "text-gray-500")} htmlFor={id}>
          {errorMessage ? errorMessage : messageDisabled}
        </span>
      )}
      <textarea
        id={id}
        minLength={minLength}
        title={disabled && messageDisabled ? messageDisabled : title}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
        onFocus={(e) => setFocus(true)}
        onBlur={(e) => setFocus(false)}
        className={"peer input " + className}
        style={{ resize: resizable ? "both" : "none" }}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
      />
      {(!maxLength || !isFocus) && <i className="fi fi-ss-exclamation text-sm opacity-0 peer-invalid:opacity-100 absolute right-2 text-error-color " />}
      {maxLength && isFocus && (
        <small className="absolute font-semibold bottom-2 right-1" id="max_lengt_text">
          {value ? value.length : defaultValue?.length}
        </small>
      )}
    </Column>
  );
}
