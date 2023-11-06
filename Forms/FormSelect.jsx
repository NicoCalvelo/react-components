import React, { useState } from "react";
import { Row } from "../Layout/rows";
import { Column } from "../Layout/columns";
import Spinner from "../Components/Spinner";
export default function FormSelect({
  className = "",
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
            className={"peer input" + " " + className}
            onInvalid={(e) => {
              if (errorMessage) e.target.setCustomValidity(errorMessage);
            }}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            defaultValue={defaultValue ? defaultValue : allowEmpty ? "" : undefined}
          >
            {allowEmpty && <option disabled value=""></option>}
            {options?.map((option, k) => (
              <option key={"option_" + k} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        {loading && <Spinner className="w-4 h-4 absolute right-8" />}
        {!loading && <i className="fi fi-ss-exclamation text-sm opacity-0 peer-invalid:opacity-100 absolute right-8 text-error-color" />}
      </Row>
    </Column>
  );
}
