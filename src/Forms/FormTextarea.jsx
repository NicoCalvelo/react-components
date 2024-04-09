import React, { useEffect, useState } from "react";
import { Column } from "../Layout/Columns";

export const TextareaVariant = Object.freeze({
  FILLED: "filled",
  OUTLINED: "outlined",
});

export default function FormTextarea({
  variant = TextareaVariant.FILLED,
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
  resizable = true,
  autoResize = false,
  rows,
  id,
  type,
  ...props
}) {
  const [isFocus, setFocus] = useState(false);

  function resizeElement(e) {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + 5 + "px";
  }
  useEffect(() => {
    if (autoResize) {
      resizeElement({ target: document.getElementById(id) });
    }
  }, [autoResize, id]);

  return (
    <Column className={`relative group ${getGroupStyle(variant, disabled)} ${className}`}>
      <textarea
        id={id}
        {...props}
        minLength={minLength}
        title={disabled && messageDisabled ? messageDisabled : title}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
        onFocus={(e) => setFocus(true)}
        onBlur={(e) => setFocus(false)}
        className={`input peer !pr-20 !pb-5 ${getInputStyle(variant)}`}
        style={{ resize: resizable ? "both" : "none" }}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e);

          if (autoResize) {
            resizeElement(e);
          }
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
        <small
          className={
            "absolute font-semibold bottom-1.5 right-2 " + (value?.length > maxLength ? "text-error-color" : "")
          }
          id="max_length_text"
        >
          {value ? value.length : defaultValue ? defaultValue.length : `max ${maxLength}`}
        </small>
      )}
      {supportingText && <small className="text-text-light italic absolute left-1 -bottom-5">{supportingText}</small>}
    </Column>
  );
}

function getGroupStyle(variant, disabled) {
  if (variant === TextareaVariant.FILLED) {
    return " bg-background-dark rounded-t-lg dark:bg-dark-background-light " + (disabled ? "opacity-50" : "");
  } else if (variant === TextareaVariant.OUTLINED) {
    return "" + (disabled ? "opacity-50" : "");
  }
}

function getInputStyle(variant) {
  if (variant === TextareaVariant.FILLED) {
    return " border-b focus:border pl-4 pr-6 pt-5 pb-1  ";
  } else if (variant === TextareaVariant.OUTLINED) {
    return " border focus:border-2 pl-4 pr-6 pt-3 pb-2.5  ";
  }
}
