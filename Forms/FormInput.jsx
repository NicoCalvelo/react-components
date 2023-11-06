import React, { useState } from "react";
import { Column } from "../Layout/columns";
import { Row } from "../Layout/rows";
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
          {title} {required || disabled ? <></> : <span className="font-normal text-xs">(facultatif)</span>}
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
          className={"peer input " + className + (type == "file" ? " file-input" : "")}
          type={type}
          onInvalid={(e) => {
            if (errorMessage) e.target.setCustomValidity(errorMessage);
          }}
          required={required}
          autoComplete={"password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (setValue) setValue(e);

            if (maxLength) {
              const element = document.getElementById("max_lengt_text");
              if (e.target.value.length > maxLength) {
                element.classList.add("text-error-color");
                e.target.classList.add("!ring-error-color");
                e.target.setCustomValidity("Le type de voie ne peut pas dépasser " + maxLength + " caractères.");
                e.target.title = "Le type de voie ne peut pas dépasser " + maxLength + " caractères.";
              } else if (e.target.value.length <= maxLength && element.classList.contains("text-error-color")) {
                element.classList.remove("text-error-color");
                e.target.classList.remove("!ring-error-color");
                e.target.setCustomValidity("");
                e.target.title = "";
              }
            }
          }}
        />
        {(!maxLength || !isFocus) && <i className="fi fi-ss-exclamation text-sm opacity-0 peer-invalid:opacity-100 absolute right-2 text-error-color " />}
        {maxLength && isFocus && (
          <small className="absolute font-semibold right-1" id="max_lengt_text">
            {value ? value.length : defaultValue?.length}
          </small>
        )}
      </Row>
    </Column>
  );
}
