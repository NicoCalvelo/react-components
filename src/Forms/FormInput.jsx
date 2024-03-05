import React, { useState } from "react";
import { Column } from "../Layout/Columns";
import { Row } from "../Layout/Rows";

export default function FormInput({
  className = "",
  minLength = undefined,
  maxLength = undefined,
  value,
  setValue,
  title = null,
  required = false,
  defaultValue,
  placeholder = "",
  pattern = undefined,
  errorMessage,
  disabled = false,
  messageDisabled,
  id,
  type,
  ...props
}) {
  const [isFocus, setFocus] = useState(false);

  return (
    <Column className="flex-grow relative space-y-0.5">
      {title && (
        <label className={"transition-all duration-75 text-sm pr-5 truncate " + (isFocus ? "text-secondary-color font-medium" : "")} htmlFor={id}>
          {title}
        </label>
      )}
      <Row className="order-1">
        <input
          {...props}
          id={id}
          minLength={minLength}
          title={disabled && messageDisabled ? messageDisabled : title}
          defaultValue={defaultValue}
          pattern={pattern}
          disabled={disabled}
          onFocus={(e) => setFocus(true)}
          onBlur={(e) => setFocus(false)}
          className={"peer h-10 input " + className + (type == "file" ? " file-input" : "")}
          type={type}
          onInvalid={(e) => {
            if (errorMessage) e.target.setCustomValidity(errorMessage);
          }}
          required={required}
          placeholder={placeholder}
          value={value}
          onBeforeInput={(e) => {
            if (type === "number") {
              if (e.data === "." && !e.target.value.includes(",")) {
                e.preventDefault();
                e.target.value = e.target.value + ".0";
                e.target.type = "text";
                e.target.setSelectionRange(e.target.value.length - 1, e.target.value.length); // Select the "0" after the "."
                e.target.type = "number";
              }
            }
          }}
          onChange={(e) => {
            if (maxLength) {
              const element = document.getElementById("max_length_text");
              if (e.target.value.length > maxLength && element) {
                element.classList.add("text-error-color");
                e.target.classList.add("!ring-error-color");
                e.target.setCustomValidity("Le type de voie ne peut pas dépasser " + maxLength + " caractères.");
                e.target.title = "Le type de voie ne peut pas dépasser " + maxLength + " caractères.";
              } else if (e.target.value.length <= maxLength && element && element.classList.contains("text-error-color")) {
                element.classList.remove("text-error-color");
                e.target.classList.remove("!ring-error-color");
                e.target.setCustomValidity("");
                e.target.title = "";
              }
            }
            if (setValue && (type != "number" || e.nativeEvent.data != ".")) setValue(e);
          }}
        />
        {(!maxLength || !isFocus) && (
          <i className="fi fi-ss-exclamation pointer-events-none text-sm opacity-0 peer-invalid:opacity-100 absolute right-2 text-error-color " />
        )}
        {maxLength && isFocus && (
          <small className="absolute font-semibold right-1" id="max_length_text">
            {value ? value.length : defaultValue?.length}
          </small>
        )}
      </Row>
    </Column>
  );
}
