import React, { useState } from "react";
import { Column } from "../Layout/Columns";

export const InputVariant = Object.freeze({
  FILLED: "filled",
  OUTLINED: "outlined",
});

export default function FormInput({
  variant = InputVariant.FILLED,
  minLength = undefined,
  maxLength = undefined,
  className = "",
  value,
  setValue,
  title = null,
  required = false,
  defaultValue,
  placeholder = "",
  pattern = undefined,
  errorMessage,
  supportingText,
  disabled = false,
  messageDisabled,
  id,
  type,
  ...props
}) {
  const [isFocus, setFocus] = useState(false);

  return (
    <Column className={`relative group ${getGroupStyle(variant, disabled)} ${className}`}>
      {title && (
        <label
          className={
            `absolute pointer-events-none transition-colors text-xs truncate ${getTitleStyle(variant)}` +
            (isFocus
              ? " text-secondary-color dark:text-secondary-light font-medium"
              : " text-text-light dark:text-dark-text-light")
          }
          htmlFor={id}
        >
          {title}
        </label>
      )}
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
        className={`input peer ${getInputStyle(variant, title !== null)}` + (type == "file" ? " file-input" : "")}
        type={type}
        onInvalid={(e) => {
          if (errorMessage) e.target.setCustomValidity(errorMessage);
        }}
        required={required}
        placeholder={placeholder}
        value={value}
        onBeforeInput={(e) => {
          // This permets to add a ".0" when the user press the "." key
          if (type === "number" && e.data === "." && !e.target.value.includes(",")) {
            e.preventDefault();
            e.target.value = e.target.value + ".0";
            e.target.type = "text";
            // Select the "0" after the "." so the user can replace it
            e.target.setSelectionRange(e.target.value.length - 1, e.target.value.length);
            e.target.type = "number";
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
            } else if (
              e.target.value.length <= maxLength &&
              element &&
              element.classList.contains("text-error-color")
            ) {
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none text-sm opacity-0 peer-invalid:opacity-100 absolute bottom-1.5 right-1 text-error-color w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {maxLength && isFocus && (
        <small className="absolute font-semibold text-error-color bottom-1.5 right-1" id="max_length_text">
          {value ? value.length : defaultValue ? defaultValue.length : `max ${maxLength}`}
        </small>
      )}
      {supportingText && <small className="text-text-light italic absolute left-1 -bottom-5">{supportingText}</small>}
    </Column>
  );
}

function getGroupStyle(variant, disabled) {
  if (variant === InputVariant.FILLED) {
    return " bg-background-dark rounded-t-lg dark:bg-dark-background-light " + (disabled ? "opacity-50" : "");
  } else if (variant === InputVariant.OUTLINED) {
    return "" + (disabled ? "opacity-50" : "");
  }
}

function getTitleStyle(variant) {
  if (variant === InputVariant.FILLED) {
    return " top-1.5 left-2 leading-none ";
  } else if (variant === InputVariant.OUTLINED) {
    return " -top-2 left-2 px-2 bg-background-color dark:bg-dark-background-color ";
  }
}

function getInputStyle(variant, hasTitle) {
  if (variant === InputVariant.FILLED) {
    return " border-b focus:border pl-4 pr-6  " + (hasTitle ? "pt-5 pb-1" : " py-3");
  } else if (variant === InputVariant.OUTLINED) {
    return " border focus:border-2 pl-4 pr-6 " + (hasTitle ? "pt-3 pb-2.5" : "py-3");
  }
}
