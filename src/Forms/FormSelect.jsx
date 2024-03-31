import React, { useState } from "react";
import { Row } from "../Layout/Rows";
import { Column } from "../Layout/Columns";
import Spinner from "../Components/Spinner";

export const SelectVariant = Object.freeze({
  FILLED: "filled",
  OUTLINED: "outlined",
});

export default function FormSelect({
  variant = SelectVariant.FILLED,
  loading = false,
  options,
  allowEmpty = false,
  isMulti = false,
  required = false,
  defaultValue,
  onChange,
  title = null,
  placeholder = "",
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
    <Column className={`relative group ${getGroupStyle(variant, disabled)}`}>
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
      {!loading && (
        <select
          id={id}
          {...props}
          title={disabled && messageDisabled ? messageDisabled : title}
          multiple={isMulti}
          required={required}
          disabled={disabled}
          onFocus={(e) => setFocus(true)}
          onBlur={(e) => setFocus(false)}
          className={`input peer !pr-16 ${getInputStyle(variant)}`}
          onInvalid={(e) => {
            if (errorMessage) e.target.setCustomValidity(errorMessage);
          }}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
        >
          {allowEmpty && <option value={undefined}></option>}
          {options?.map((option, k) => (
            <option key={"option_" + k} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {loading && (
        <div className="w-36 h-12 mt-0.5 border-b border-gray-300">
          <Spinner className="h-5 w-5 absolute right-2 bottom-2 " />
        </div>
      )}
      {!isFocus && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none text-sm opacity-0 peer-invalid:opacity-100 absolute bottom-2 right-8 text-error-color w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {!loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 absolute right-2 bottom-2"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {supportingText && <small className="text-text-light italic absolute left-1 -bottom-5">{supportingText}</small>}
    </Column>
  );
}

function getGroupStyle(variant, disabled) {
  if (variant === SelectVariant.FILLED) {
    return " bg-background-dark dark:bg-dark-background-light " + (disabled ? "opacity-50" : "");
  } else if (variant === SelectVariant.OUTLINED) {
    return "" + (disabled ? "opacity-50" : "");
  }
}

function getTitleStyle(variant) {
  if (variant === SelectVariant.FILLED) {
    return " top-1.5 left-2 leading-none ";
  } else if (variant === SelectVariant.OUTLINED) {
    return " -top-2 left-2 px-2 bg-background-color dark:bg-dark-background-color ";
  }
}

function getInputStyle(variant) {
  if (variant === SelectVariant.FILLED) {
    return " border-b focus:border pl-4 pr-6 pt-5 pb-1  ";
  } else if (variant === SelectVariant.OUTLINED) {
    return " border focus:border-2 pl-4 pr-6 pt-3 pb-2.5  ";
  }
}
